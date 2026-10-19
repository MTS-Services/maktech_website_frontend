import { useEffect, useRef, useState } from "react";

// The MAKTECH glass mark, traced as three vector shapes in a 500x555 box (the
// same artwork as /hero_logo.webp). Like a vector logo dropped into a 3D logo
// tool, each shape is extruded into real geometry, so it turns a true 360°.
const SHAPES = [
  // big orange glass slab
  { points: [[99, 93], [305, 185], [140, 452], [99, 445]], radius: 9, glass: "orange" },
  // small orange glass wing
  { points: [[377, 99], [465, 258], [303, 187]], radius: 9, glass: "orange" },
  // clear/white glass slab
  { points: [[298, 235], [449, 302], [165, 470]], radius: 9, glass: "white" },
];
const BOX = { w: 500, h: 555 };
const CENTER = { x: 282, y: 281 }; // pivot, in the traced coordinates
const DEPTH = 30; // extrusion thickness
const AUTO_SPEED = 0.5; // rad/s idle rotation (~12.5s per full turn)

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/**
 * Interactive WebGL logo. It turns a full 360° on its own, eases to a stop
 * while the pointer is over it, and can be dragged to spin it by hand (with
 * momentum). Three.js is loaded lazily so it never weighs on first paint.
 * Falls back to the flat image if WebGL is unavailable.
 */
const HeroLogo3D = () => {
  const hostRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      try {
        const THREE = await import("three");
        if (disposed) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
        renderer.setClearColor(0x000000, 0);
        // No tone-mapping: it washes the brand orange out to pastel
        renderer.domElement.style.cssText =
          "position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:pan-y;";
        host.appendChild(renderer.domElement);

        // A small photo studio, generated in code (no HDR file): a dark room lit
        // by bright softboxes. The glass reflects these, and because the logo
        // turns while the studio stays put, the highlights slide across it.
        const buildStudio = () => {
          const studio = new THREE.Scene();
          studio.add(
            new THREE.Mesh(
              new THREE.BoxGeometry(24, 24, 24),
              new THREE.MeshBasicMaterial({ color: 0x15100d, side: THREE.BackSide }),
            ),
          );
          const light = (w, h, pos, color, power) => {
            const mesh = new THREE.Mesh(
              new THREE.PlaneGeometry(w, h),
              new THREE.MeshBasicMaterial({
                color: new THREE.Color(color).multiplyScalar(power),
                side: THREE.DoubleSide,
              }),
            );
            mesh.position.set(...pos);
            mesh.lookAt(0, 0, 0);
            studio.add(mesh);
          };
          light(9, 4, [0, 10, 5], 0xffffff, 7); // top softbox
          light(2.2, 12, [-10, 0, 3], 0xffffff, 6); // left strip
          light(2.2, 12, [10, 0, 3], 0xfff0e4, 5); // right strip (warm)
          light(14, 2.5, [0, -10, 6], 0xff8040, 4); // low orange bounce
          light(5, 9, [3, 1, 11], 0xffffff, 3.2); // big front panel, off-centre
          light(7, 7, [-4, 2, -11], 0xffffff, 2.2); // back fill
          return studio;
        };
        const pmrem = new THREE.PMREMGenerator(renderer);
        const studio = buildStudio();
        const envTexture = pmrem.fromScene(studio, 0.015).texture;
        studio.traverse((o) => {
          o.geometry?.dispose();
          o.material?.dispose();
        });

        const scene = new THREE.Scene();
        scene.environment = envTexture;

        const camera = new THREE.PerspectiveCamera(28, BOX.w / BOX.h, 10, 6000);

        const key = new THREE.DirectionalLight(0xffffff, 0.9);
        key.position.set(-300, 400, 600);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xffb48a, 1.2);
        rim.position.set(500, -200, -300);
        scene.add(rim);

        // Glass = two materials: the broad faces (saturated, tinted by a
        // vertex-colour gradient) and the thick side walls (lighter, glossier,
        // more see-through — that is what reads as a glass edge).
        const GLASS = {
          orange: {
            faceFrom: new THREE.Color(0xff6a30), // top-left of each face
            faceTo: new THREE.Color(0xd13500), // bottom-right
            side: { color: 0xff9560, opacity: 0.8 },
            face: { opacity: 0.82, envMapIntensity: 1.0 },
          },
          white: {
            faceFrom: new THREE.Color(0xffffff),
            faceTo: new THREE.Color(0xe6e9f0),
            side: { color: 0xeef1f6, opacity: 0.74 },
            face: {
              opacity: 0.94,
              envMapIntensity: 1.1,
              emissive: 0xffffff,
              emissiveIntensity: 0.22,
            },
          },
        };
        const makeMaterials = (glass) => {
          const g = GLASS[glass];
          // DoubleSide + transparent: three draws the back faces first, so the
          // rear wall and bevel are faintly visible *through* the front, which
          // is what gives glass its depth.
          const shared = {
            metalness: 0,
            clearcoat: 1,
            transparent: true,
            side: THREE.DoubleSide,
            ior: 1.45,
            iridescence: 0.35,
            iridescenceIOR: 1.3,
            iridescenceThicknessRange: [120, 420],
          };
          const face = new THREE.MeshPhysicalMaterial({
            ...shared,
            color: 0xffffff,
            vertexColors: true,
            roughness: 0.12,
            clearcoatRoughness: 0.04,
            ...g.face,
          });
          const side = new THREE.MeshPhysicalMaterial({
            ...shared,
            roughness: 0.04,
            clearcoatRoughness: 0.02,
            envMapIntensity: 1.6,
            ...g.side,
          });
          return [face, side]; // ExtrudeGeometry: group 0 = caps, group 1 = sides
        };

        // Paint a smooth diagonal gradient over the shape's vertices
        const applyGradient = (geometry, from, to) => {
          const pos = geometry.attributes.position;
          const colors = new Float32Array(pos.count * 3);
          let min = Infinity;
          let max = -Infinity;
          const along = (x, y) => x * 0.55 - y * 0.83; // top-left -> bottom-right
          for (let i = 0; i < pos.count; i += 1) {
            const v = along(pos.getX(i), pos.getY(i));
            min = Math.min(min, v);
            max = Math.max(max, v);
          }
          const c = new THREE.Color();
          for (let i = 0; i < pos.count; i += 1) {
            const t = (along(pos.getX(i), pos.getY(i)) - min) / (max - min || 1);
            c.copy(from).lerp(to, t);
            colors.set([c.r, c.g, c.b], i * 3);
          }
          geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        };

        // Rounded polygon outline -> THREE.Shape (y flipped: image y is down)
        const toShape = (points, radius) => {
          const p = points.map(([x, y]) => new THREE.Vector2(x - CENTER.x, CENTER.y - y));
          const shape = new THREE.Shape();
          const n = p.length;
          for (let i = 0; i < n; i += 1) {
            const prev = p[(i + n - 1) % n];
            const cur = p[i];
            const next = p[(i + 1) % n];
            const a = prev.clone().sub(cur);
            const b = next.clone().sub(cur);
            const r = Math.min(radius, a.length() / 2, b.length() / 2);
            const start = cur.clone().add(a.normalize().multiplyScalar(r));
            const end = cur.clone().add(b.normalize().multiplyScalar(r));
            if (i === 0) shape.moveTo(start.x, start.y);
            else shape.lineTo(start.x, start.y);
            shape.quadraticCurveTo(cur.x, cur.y, end.x, end.y);
          }
          shape.closePath();
          return shape;
        };

        const group = new THREE.Group();
        const geometries = [];
        const materials = [];
        SHAPES.forEach(({ points, radius, glass }) => {
          const geometry = new THREE.ExtrudeGeometry(toShape(points, radius), {
            depth: DEPTH,
            bevelEnabled: true,
            bevelThickness: 6,
            bevelSize: 5,
            bevelSegments: 8,
            curveSegments: 12,
          });
          geometry.translate(0, 0, -DEPTH / 2); // centre the thickness on the pivot
          applyGradient(geometry, GLASS[glass].faceFrom, GLASS[glass].faceTo);
          const mats = makeMaterials(glass);
          group.add(new THREE.Mesh(geometry, mats));
          geometries.push(geometry);
          materials.push(...mats);
        });
        scene.add(group);

        // State: angle (rad), spin velocity from dragging, hover/drag flags
        let angle = 0.5;
        let vel = 0;
        let ease = 1; // 1 = full auto-rotation, 0 = stopped (hover)
        let hovering = false;
        let dragging = false;
        let lastX = 0;
        let lastT = 0;
        const tiltX = 0.14;

        const resize = () => {
          const w = host.clientWidth || BOX.w;
          const h = host.clientHeight || BOX.h;
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          // Fit the whole mark inside the canvas height (tight, so it renders large)
          const visibleH = BOX.h * 1.0;
          const dist = visibleH / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
          camera.position.set(0, 0, dist);
          camera.lookAt(0, 0, 0);
          camera.updateProjectionMatrix();
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(host);

        const render = () => {
          group.rotation.y = angle;
          group.rotation.x = tiltX;
          renderer.render(scene, camera);
        };
        render();

        const onDown = (e) => {
          dragging = true;
          vel = 0;
          lastX = e.clientX;
          lastT = performance.now();
          host.style.cursor = "grabbing";
          try {
            host.setPointerCapture(e.pointerId);
          } catch {
            /* ignore */
          }
        };
        const onMove = (e) => {
          if (!dragging) return;
          const now = performance.now();
          const dx = e.clientX - lastX;
          const turn = dx * 0.012;
          angle += turn;
          const dt = Math.max(0.001, (now - lastT) / 1000);
          vel = clamp(turn / dt, -9, 9);
          lastX = e.clientX;
          lastT = now;
          render();
        };
        const onUp = () => {
          if (!dragging) return;
          dragging = false;
          host.style.cursor = "grab";
        };
        const onEnter = () => {
          hovering = true;
        };
        const onLeave = () => {
          hovering = false;
          onUp();
        };
        host.addEventListener("pointerdown", onDown);
        host.addEventListener("pointermove", onMove);
        host.addEventListener("pointerup", onUp);
        host.addEventListener("pointercancel", onUp);
        host.addEventListener("pointerenter", onEnter);
        host.addEventListener("pointerleave", onLeave);

        let raf = 0;
        let last = performance.now();
        let visible = true;
        const frame = (now) => {
          raf = 0;
          const dt = Math.min(0.05, (now - last) / 1000);
          last = now;
          if (!dragging) {
            // hover stops the auto-turn smoothly; leaving resumes it
            const target = hovering || reduce ? 0 : 1;
            ease += (target - ease) * (1 - Math.exp(-dt * 4));
            angle += (vel + AUTO_SPEED * ease) * dt;
            vel *= Math.exp(-dt * 2.6);
            if (Math.abs(vel) < 0.001) vel = 0;
          }
          render();
          if (visible && !document.hidden) raf = requestAnimationFrame(frame);
        };
        const start = () => {
          if (!raf) {
            last = performance.now();
            raf = requestAnimationFrame(frame);
          }
        };
        const io = new IntersectionObserver((entries) => {
          visible = entries[0]?.isIntersecting !== false;
          if (visible) start();
        });
        io.observe(host);
        const onVis = () => {
          if (!document.hidden) start();
        };
        document.addEventListener("visibilitychange", onVis);
        start();

        cleanup = () => {
          if (raf) cancelAnimationFrame(raf);
          io.disconnect();
          ro.disconnect();
          document.removeEventListener("visibilitychange", onVis);
          host.removeEventListener("pointerdown", onDown);
          host.removeEventListener("pointermove", onMove);
          host.removeEventListener("pointerup", onUp);
          host.removeEventListener("pointercancel", onUp);
          host.removeEventListener("pointerenter", onEnter);
          host.removeEventListener("pointerleave", onLeave);
          geometries.forEach((g) => g.dispose());
          materials.forEach((m) => m.dispose());
          envTexture.dispose();
          pmrem.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        if (!disposed) setFallback(true);
      }
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[14%] z-5 -translate-y-1/2 select-none"
      style={{
        // as wide as the reference (31vw) but capped by screen height, so on
        // short screens it still fits between the heading and the nav pill
        width: "clamp(260px, min(31vw, 54vh), 620px)",
        // centre at 66% of the hero, but never so low that the mark runs into
        // the floating nav pill (mark half-height ≈ 0.3775 × width)
        top: "min(66%, calc(100% - 105px - min(11.7vw, 20.4vh, 234px)))",
      }}
    >
      <div
        ref={hostRef}
        className="pointer-events-auto relative aspect-500/555 w-full cursor-grab drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
      >
        {fallback && (
          <img
            src="/hero_logo.webp"
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>
    </div>
  );
};

export default HeroLogo3D;
