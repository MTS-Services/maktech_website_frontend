import { useEffect, useRef, useState } from "react";

/* ─── Google Fonts ─── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    :root {
      --ora: #FF7A2F;
      --ora-h: #FF9558;
      --ora-d: #CC5A18;
      --ora-dim: rgba(255,122,47,.10);
      --ora-mid: rgba(255,122,47,.20);
      --ora-glow: rgba(255,122,47,.35);
      --b0: #060607; --b1: #0a0a0b; --b2: #111112;
      --b3: #181819; --b4: #202021; --b5: #282829;
      --bdr: #2c2c2d; --bdr2: #3a3a3b;
      --t1: #EDEDED; --t2: #A0A0A2; --t3: #5A5A5C;
      --td: #0E0E0F; --td2: #3E3E40;
      --w1: #FFFFFF; --w2: #F8F6F3; --w3: #F0EDE9;
      --fh: 'Syne', sans-serif;
      --fb: 'Outfit', sans-serif;
      --fm: 'JetBrains Mono', monospace;
      --ease-out: cubic-bezier(.16,1,.3,1);
      --ease-spring: cubic-bezier(.34,1.56,.64,1);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--fb); background: var(--b1); color: var(--t1); -webkit-font-smoothing: antialiased; overflow-x: hidden; cursor: none; }

    /* Cursor */
    #mk-cursor { position:fixed;width:10px;height:10px;background:var(--ora);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .25s var(--ease-out),height .25s var(--ease-out);mix-blend-mode:normal; }
    #mk-cursor-ring { position:fixed;width:38px;height:38px;border:1.5px solid rgba(255,122,47,.5);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .3s var(--ease-out),height .3s var(--ease-out),border-color .3s; }
    body.mk-cursor-hover #mk-cursor { width:16px;height:16px;background:var(--ora-h); }
    body.mk-cursor-hover #mk-cursor-ring { width:58px;height:58px;border-color:rgba(255,122,47,.8); }
    body.mk-cursor-click #mk-cursor { width:7px;height:7px; }

    /* Progress bar */
    #mk-progress { position:fixed;top:0;left:0;height:2px;width:0%;background:linear-gradient(90deg,var(--ora-d),var(--ora),var(--ora-h));z-index:9997;box-shadow:0 0 10px var(--ora-glow),0 0 20px rgba(255,122,47,.2);transition:width .1s linear; }

    /* Animations */
    @keyframes dotPulse { 0%{box-shadow:0 0 0 0 rgba(255,122,47,.6)} 50%{box-shadow:0 0 0 8px rgba(255,122,47,0)} 100%{box-shadow:0 0 0 0 rgba(255,122,47,0)} }
    @keyframes slideDown { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:none} }
    @keyframes lineReveal { from{transform:translateY(100%)} to{transform:none} }
    @keyframes underlineGrow { from{width:0} to{width:100%} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
    @keyframes orbFloat1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-40px,30px) scale(1.05)} 66%{transform:translate(20px,-20px) scale(.97)} }
    @keyframes orbFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-40px)} }
    @keyframes orbFloat3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,20px) scale(1.1)} }
    @keyframes shimmerLine { from{transform:translateX(-50%)} to{transform:translateX(50%)} }
    @keyframes rotateSeal { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes ringExpand { 0%{opacity:0;transform:translate(-50%,-50%) scale(.8)} 20%{opacity:1} 100%{opacity:0;transform:translate(-50%,-50%) scale(1.15)} }
    @keyframes textShimmer { 0%{background-position:100% 50%} 100%{background-position:-100% 50%} }
    @keyframes floatCardIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
    @keyframes floatCard { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }

    .shimmer-text {
      background: linear-gradient(90deg, var(--t1) 0%, var(--ora) 30%, var(--t1) 60%, var(--t1) 100%);
      background-size: 200% 100%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: textShimmer 4s linear infinite;
    }

    /* Scroll reveal classes */
    .mk-reveal { opacity:0; transform:translateY(32px); transition:opacity .7s var(--ease-out),transform .7s var(--ease-out); }
    .mk-reveal.visible { opacity:1; transform:none; }
    .mk-reveal-left { opacity:0; transform:translateX(-40px); transition:opacity .7s var(--ease-out),transform .7s var(--ease-out); }
    .mk-reveal-left.visible { opacity:1; transform:none; }
    .mk-reveal-right { opacity:0; transform:translateX(40px); transition:opacity .7s var(--ease-out),transform .7s var(--ease-out); }
    .mk-reveal-right.visible { opacity:1; transform:none; }
    .mk-reveal-scale { opacity:0; transform:scale(.94); transition:opacity .7s var(--ease-out),transform .7s var(--ease-out); }
    .mk-reveal-scale.visible { opacity:1; transform:none; }

    .mk-stagger > * { opacity:0; transform:translateY(28px); transition:opacity .6s var(--ease-out),transform .6s var(--ease-out); }
    .mk-stagger.visible > *:nth-child(1){opacity:1;transform:none;transition-delay:.05s}
    .mk-stagger.visible > *:nth-child(2){opacity:1;transform:none;transition-delay:.12s}
    .mk-stagger.visible > *:nth-child(3){opacity:1;transform:none;transition-delay:.19s}
    .mk-stagger.visible > *:nth-child(4){opacity:1;transform:none;transition-delay:.26s}
    .mk-stagger.visible > *:nth-child(5){opacity:1;transform:none;transition-delay:.33s}
    .mk-stagger.visible > *:nth-child(6){opacity:1;transform:none;transition-delay:.40s}
    .mk-stagger.visible > *:nth-child(7){opacity:1;transform:none;transition-delay:.47s}
    .mk-stagger.visible > *:nth-child(8){opacity:1;transform:none;transition-delay:.54s}
    .mk-stagger.visible > *:nth-child(9){opacity:1;transform:none;transition-delay:.61s}
    .mk-stagger.visible > *:nth-child(10){opacity:1;transform:none;transition-delay:.68s}

    /* Tag label */
    .mk-tag { display:inline-flex;align-items:center;gap:8px;font-family:var(--fm);font-size:10.5px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--ora);margin-bottom:1rem; }
    .mk-tag::before { content:'';width:18px;height:2px;background:currentColor;border-radius:2px; }
    .mk-tag.on-light { color:var(--ora-d); }

    /* Div line */
    .mk-divline { height:1px;background:linear-gradient(90deg,transparent,rgba(255,122,47,.25),transparent); }

    /* Hero badge */
    .h-badge { display:inline-flex;align-items:center;gap:10px;background:var(--ora-dim);border:1px solid rgba(255,122,47,.3);border-radius:100px;padding:.36rem 1.1rem;font-family:var(--fm);font-size:10.5px;font-weight:500;color:var(--ora);letter-spacing:.08em;margin-bottom:2rem;opacity:0;transform:translateY(-16px);animation:slideDown .8s .2s var(--ease-out) forwards; }
    .h-dot { width:7px;height:7px;border-radius:50%;background:var(--ora);flex-shrink:0;animation:dotPulse 2s ease-in-out infinite; }

    .h-h1-wrap .line { display:block;overflow:hidden; }
    .h-h1-wrap .line-inner { display:block;transform:translateY(100%);animation:lineReveal .9s var(--ease-out) forwards; }
    .h-h1-wrap .line:nth-child(1) .line-inner { animation-delay:.4s; }
    .h-h1-wrap .line:nth-child(2) .line-inner { animation-delay:.6s; }
    .h-hi-underline { position:relative; }
    .h-hi-underline::after { content:'';position:absolute;bottom:-4px;left:0;width:0;height:3px;background:linear-gradient(90deg,var(--ora-d),var(--ora),var(--ora-h));border-radius:2px;animation:underlineGrow 1s 1.5s var(--ease-out) forwards; }

    /* Orbs */
    .orb { position:absolute;border-radius:50%;pointer-events:none;filter:blur(80px); }
    .orb-1 { width:600px;height:600px;top:-200px;right:-150px;background:radial-gradient(ellipse,rgba(255,122,47,.15) 0%,transparent 70%);animation:orbFloat1 8s ease-in-out infinite; }
    .orb-2 { width:400px;height:400px;bottom:-100px;left:-100px;background:radial-gradient(ellipse,rgba(255,122,47,.08) 0%,transparent 70%);animation:orbFloat2 11s ease-in-out infinite; }
    .orb-3 { width:300px;height:300px;top:40%;left:40%;background:radial-gradient(ellipse,rgba(255,122,47,.06) 0%,transparent 70%);animation:orbFloat3 14s ease-in-out infinite; }

    /* Hero grid */
    .hero-grid { position:absolute;inset:0;z-index:1;pointer-events:none;background-image:linear-gradient(rgba(255,122,47,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,122,47,.04) 1px,transparent 1px);background-size:80px 80px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%);-webkit-mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%); }

    /* Floating card */
    .floating-card { position:absolute;right:6%;top:30%;background:rgba(26,26,27,.9);border:1px solid var(--bdr2);border-radius:14px;padding:1.1rem 1.4rem;backdrop-filter:blur(20px);display:flex;align-items:center;gap:.9rem;z-index:3;animation:floatCardIn 1s 2s var(--ease-out) forwards,floatCard 6s 3s ease-in-out infinite;opacity:0; }
    .fc-dot { width:10px;height:10px;border-radius:50%;background:#22c55e;box-shadow:0 0 10px #22c55e;animation:dotPulse 2s infinite; }

    /* Stat strip cells */
    .h-cell { background:var(--b3);padding:1.5rem 1.8rem;transition:background .3s;position:relative;overflow:hidden;cursor:default; }
    .h-cell::before { content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--ora);transform:scaleX(0);transition:transform .4s var(--ease-spring); }
    .h-cell:hover { background:var(--b4); }
    .h-cell:hover::before { transform:scaleX(1); }

    /* Programme card top bar */
    .p-top { position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--ora-d),var(--ora),var(--ora-h));transform:scaleX(0);transform-origin:left;transition:transform .4s var(--ease-out); }
    .p-card-wrap:hover .p-top { transform:scaleX(1); }
    .p-card-wrap { background:var(--b3);padding:1.8rem 1.5rem;transition:background .3s;position:relative;cursor:default;overflow:hidden; }
    .p-card-wrap::after { content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 100%,rgba(255,122,47,.06) 0%,transparent 100%);opacity:0;transition:opacity .4s; }
    .p-card-wrap:hover { background:var(--b4); }
    .p-card-wrap:hover::after { opacity:1; }
    .p-ico { width:44px;height:44px;border-radius:8px;background:var(--ora-dim);border:1px solid rgba(255,122,47,.22);display:flex;align-items:center;justify-content:center;font-size:19px;margin-bottom:.9rem;transition:transform .4s var(--ease-spring),background .3s,box-shadow .3s; }
    .p-card-wrap:hover .p-ico { transform:scale(1.15) rotate(-8deg);background:rgba(255,122,47,.18);box-shadow:0 4px 20px rgba(255,122,47,.2); }

    /* Why card */
    .w-card-wrap { background:var(--b4);border:1px solid var(--bdr);border-radius:14px;padding:1.8rem;transition:border-color .3s,transform .4s var(--ease-spring),box-shadow .4s;cursor:default;position:relative;overflow:hidden; }
    .w-card-wrap::before { content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(ellipse 40% 40% at 50% 50%,rgba(255,122,47,.05) 0%,transparent 70%);opacity:0;transition:opacity .4s; }
    .w-card-wrap:hover { border-color:var(--ora);transform:translateY(-6px);box-shadow:0 20px 50px rgba(255,122,47,.1),0 0 0 1px rgba(255,122,47,.15); }
    .w-card-wrap:hover::before { opacity:1; }

    /* Who card */
    .wo-card-wrap { background:var(--b2);padding:2rem 1.5rem;text-align:center;transition:background .3s;cursor:default;position:relative;overflow:hidden; }
    .wo-card-wrap::after { content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,var(--ora),transparent);transform:scaleX(0);transition:transform .4s var(--ease-spring); }
    .wo-card-wrap:hover { background:var(--b3); }
    .wo-card-wrap:hover::after { transform:scaleX(1); }
    .wo-ico { width:52px;height:52px;border-radius:10px;background:var(--ora-dim);border:1px solid rgba(255,122,47,.22);display:flex;align-items:center;justify-content:center;font-size:22px;margin:0 auto 1rem;transition:transform .4s var(--ease-spring),background .3s,box-shadow .3s; }
    .wo-card-wrap:hover .wo-ico { transform:translateY(-6px) scale(1.12);background:rgba(255,122,47,.18);box-shadow:0 8px 24px rgba(255,122,47,.2); }

    /* About card */
    .d-card-wrap { background:var(--w1);border:1px solid #e0ddd9;border-radius:10px;padding:1.05rem 1.25rem;display:flex;align-items:flex-start;gap:1rem;transition:border-color .3s,transform .4s var(--ease-spring),box-shadow .3s;cursor:default; }
    .d-card-wrap:hover { border-color:var(--ora);transform:translateX(8px) translateY(-2px);box-shadow:0 8px 32px rgba(255,122,47,.12); }
    .d-ico-wrap { width:34px;height:34px;border-radius:8px;background:rgba(255,122,47,.1);border:1px solid rgba(255,122,47,.25);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:10.5px;font-weight:500;color:var(--ora-d);flex-shrink:0;transition:background .3s,transform .3s var(--ease-spring); }
    .d-card-wrap:hover .d-ico-wrap { background:rgba(255,122,47,.18);transform:rotate(-5deg) scale(1.1); }

    /* Corp workshop */
    .corp-ws-wrap { background:var(--b4);border:1px solid var(--bdr);border-radius:10px;padding:1rem 1.25rem;transition:border-color .3s,transform .3s var(--ease-spring),background .3s;cursor:default; }
    .corp-ws-wrap:hover { border-color:var(--ora);transform:translateX(4px);background:var(--b5); }

    /* Corp features */
    .corp-f-item { display:flex;align-items:center;gap:.8rem;font-size:.875rem;color:var(--t2);font-weight:300;transition:color .2s,transform .3s var(--ease-spring);cursor:default; }
    .corp-f-item::before { content:'';width:6px;height:6px;border-radius:50%;background:var(--ora);flex-shrink:0;transition:transform .3s var(--ease-spring),box-shadow .3s; }
    .corp-f-item:hover { color:var(--t1);transform:translateX(6px); }
    .corp-f-item:hover::before { transform:scale(1.5);box-shadow:0 0 8px var(--ora-glow); }

    /* Outcome row */
    .o-row-wrap { display:grid;grid-template-columns:46px 1fr;gap:1.2rem;align-items:start;padding:1.5rem 0;border-bottom:1px solid #d2cecc;transition:transform .3s var(--ease-spring);cursor:default; }
    .o-row-wrap:first-child { border-top:1px solid #d2cecc; }
    .o-row-wrap:hover { transform:translateX(6px); }

    /* Cert */
    .cert-seal-wrap { position:relative;width:100px;height:100px;margin:0 auto 1.5rem; }
    .cert-seal-wrap::before { content:'';position:absolute;inset:-4px;border-radius:50%;background:conic-gradient(from 0deg,transparent 0%,var(--ora) 20%,transparent 40%);animation:rotateSeal 3s linear infinite; }
    .cert-inner { width:100px;height:100px;border-radius:50%;background:var(--b4);border:2px solid var(--bdr2);display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;z-index:1;font-family:var(--fm);font-size:9px;letter-spacing:.07em;color:var(--ora);text-align:center;text-transform:uppercase;line-height:1.65; }
    .cert-card-wrap { background:var(--b4);border:1px solid var(--bdr2);border-radius:24px;padding:3.5rem 2.5rem;text-align:center;position:relative;overflow:hidden;transition:transform .4s var(--ease-spring),box-shadow .4s;cursor:default; }
    .cert-card-wrap:hover { transform:translateY(-8px) scale(1.01);box-shadow:0 30px 80px rgba(255,122,47,.12); }
    .cert-card-wrap::before { content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,var(--ora),transparent); }
    .cert-card-wrap::after { content:'';position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(circle,rgba(255,122,47,.05) 1px,transparent 1px);background-size:20px 20px; }

    .c-dot-wrap { width:18px;height:18px;border-radius:50%;background:var(--ora-dim);border:1px solid rgba(255,122,47,.3);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;transition:background .3s,transform .3s var(--ease-spring); }
    .c-dot-wrap::after { content:'';width:6px;height:6px;border-radius:50%;background:var(--ora); }
    .c-pt-wrap:hover .c-dot-wrap { background:rgba(255,122,47,.25);transform:scale(1.3); }

    /* CTA rings */
    .cta-ring { position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border-radius:50%;border:1px solid rgba(255,122,47,.06);pointer-events:none;animation:ringExpand 4s linear infinite; }
    .cta-ring:nth-child(1){width:300px;height:300px;animation-delay:0s}
    .cta-ring:nth-child(2){width:500px;height:500px;animation-delay:1s}
    .cta-ring:nth-child(3){width:700px;height:700px;animation-delay:2s}
    .cta-ring:nth-child(4){width:900px;height:900px;animation-delay:3s}

    /* Corp panel pulse dot */
    .corp-ph-dot { width:8px;height:8px;border-radius:50%;background:var(--ora);animation:dotPulse 2s ease-in-out infinite; }

    /* Prog section shimmer line */
    .prog-shimmer::before { content:'';position:absolute;top:0;left:-50%;width:200%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,122,47,.4),transparent);animation:shimmerLine 4s linear infinite; }

    /* About section background decoration */
    .about-bg::before { content:'';position:absolute;top:-100px;right:-200px;width:500px;height:500px;border-radius:50%;background:radial-gradient(ellipse,rgba(255,122,47,.06) 0%,transparent 70%);pointer-events:none; }

    /* Btn base */
    .mk-btn { display:inline-block;font-family:var(--fb);font-size:13.5px;font-weight:600;cursor:default;padding:.85rem 2.1rem;border-radius:8px;border:none;text-decoration:none;position:relative;overflow:hidden;transition:transform .3s var(--ease-spring),box-shadow .3s; }
    .mk-btn::before { content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);transform:translateX(-100%);transition:transform .6s ease; }
    .mk-btn:hover::before { transform:translateX(100%); }
    .mk-btn-solid { color:#fff;background:var(--ora); }
    .mk-btn-solid:hover { transform:translateY(-3px);box-shadow:0 12px 40px var(--ora-glow); }
    .mk-btn-od { color:var(--t1);background:transparent;border:1.5px solid var(--bdr2); }
    .mk-btn-od:hover { color:var(--ora);border-color:var(--ora);background:var(--ora-dim);transform:translateY(-3px);box-shadow:0 8px 24px rgba(255,122,47,.15); }
    .mk-btn-ol { color:var(--td);background:transparent;border:1.5px solid #c8c8c8; }
    .mk-btn-ol:hover { color:var(--ora-d);border-color:var(--ora-d);background:rgba(255,122,47,.07);transform:translateY(-3px); }

    @media (max-width:960px) {
      body { cursor:auto; }
      #mk-cursor, #mk-cursor-ring { display:none; }
      .floating-card { display:none!important; }
    }
    @media (max-width:600px) {
      .floating-card { display:none!important; }
    }
  `}</style>
);

/* ─── Helpers ─── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".mk-reveal,.mk-reveal-left,.mk-reveal-right,.mk-reveal-scale,.mk-tag,.mk-stagger").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useCounter() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll("[data-count]").forEach((el) => {
            const target = +el.dataset.count;
            const suffix = el.dataset.suffix || "";
            const dur = 1800;
            const start = performance.now();
            const tick = (now) => {
              const t = Math.min((now - start) / dur, 1);
              const ease = 1 - Math.pow(1 - t, 4);
              el.textContent = Math.round(ease * target) + suffix;
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.5 }
    );
    const strip = document.querySelector(".h-strip");
    if (strip) obs.observe(strip);
    return () => obs.disconnect();
  }, []);
}

function useCursor() {
  useEffect(() => {
    const cursor = document.getElementById("mk-cursor");
    const ring = document.getElementById("mk-cursor-ring");
    if (!cursor || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + "px"; cursor.style.top = my + "px"; };
    const animRing = () => { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx + "px"; ring.style.top = ry + "px"; requestAnimationFrame(animRing); };
    animRing();
    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a,button,.p-card-wrap,.w-card-wrap,.d-card-wrap,.wo-card-wrap,.o-row-wrap,.corp-ws-wrap,.mk-btn").forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("mk-cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("mk-cursor-hover"));
    });
    document.addEventListener("mousedown", () => document.body.classList.add("mk-cursor-click"));
    document.addEventListener("mouseup", () => document.body.classList.remove("mk-cursor-click"));
    return () => document.removeEventListener("mousemove", onMove);
  }, []);
}

function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("mk-progress");
    if (!bar) return;
    const onScroll = () => {
      const s = document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (s / h * 100) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

function useParallaxOrbs() {
  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      document.querySelectorAll(".orb").forEach((orb, i) => {
        const s = (i + 1) * 14;
        orb.style.transform = `translate(${x * s}px,${y * s}px)`;
      });
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);
}

function useParticleCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.life = 0;
        this.maxLife = Math.random() * 300 + 200;
      }
      update() {
        this.x += this.speedX; this.y += this.speedY; this.life++;
        if (this.life > this.maxLife || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity * (1 - this.life / this.maxLife);
        ctx.fillStyle = "#FF7A2F";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    const particles = Array.from({ length: 120 }, () => new Particle());

    const drawLines = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 100) * 0.06;
            ctx.strokeStyle = "#FF7A2F";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => { p.update(); p.draw(); });
      drawLines();
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [canvasRef]);
}

function useMagneticBtns() {
  useEffect(() => {
    const btns = document.querySelectorAll(".mag-btn");
    const handlers = [];
    btns.forEach((btn) => {
      const onMove = (e) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${dx * 0.18}px,${dy * 0.18}px)`;
      };
      const onLeave = () => { btn.style.transform = ""; btn.style.transition = "transform .5s cubic-bezier(.34,1.56,.64,1)"; };
      const onEnter = () => { btn.style.transition = "transform .1s ease"; };
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      btn.addEventListener("mouseenter", onEnter);
      handlers.push({ btn, onMove, onLeave, onEnter });
    });
    return () => handlers.forEach(({ btn, onMove, onLeave, onEnter }) => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
      btn.removeEventListener("mouseenter", onEnter);
    });
  }, []);
}

function useTiltCards() {
  useEffect(() => {
    const cards = document.querySelectorAll(".p-card-wrap,.w-card-wrap");
    const handlers = [];
    cards.forEach((card) => {
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(4px)`;
      };
      const onLeave = () => { card.style.transform = "perspective(600px) rotateY(0) rotateX(0) translateZ(0)"; card.style.transition = "transform .5s cubic-bezier(.34,1.56,.64,1)"; };
      const onEnter = () => { card.style.transition = "transform .1s ease"; };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      card.addEventListener("mouseenter", onEnter);
      handlers.push({ card, onMove, onLeave, onEnter });
    });
    return () => handlers.forEach(({ card, onMove, onLeave, onEnter }) => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
      card.removeEventListener("mouseenter", onEnter);
    });
  }, []);
}

/* ─── Section Components ─── */

function Hero({ canvasRef }) {
  return (
    <>
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", background: "var(--b0)" }}>
        <canvas ref={canvasRef} id="hero-canvas" style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.7 }} />
        <div className="hero-grid" />
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />

        <div className="floating-card">
          <div className="fc-dot" />
          <div style={{ fontFamily: "var(--fm)", fontSize: "10.5px", color: "var(--t2)" }}>
            <span style={{ display: "block", color: "var(--t1)", fontWeight: 500, fontSize: "12px" }}>Now Enrolling</span>
            10 Active Programmes
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 2, padding: "5.5rem 2rem 6rem", maxWidth: "1120px", margin: "0 auto", width: "100%" }}>
          <div className="h-badge"><span className="h-dot" /> Training &amp; Programme Division — Maktech Group</div>

          <h1 className="h-h1-wrap" style={{ fontFamily: "var(--fh)", fontSize: "clamp(2.8rem,5.5vw,5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-.05em", color: "var(--t1)", maxWidth: "900px", marginBottom: "1.5rem" }}>
            <span className="line"><span className="line-inner">Real Skills. Built Inside a</span></span>
            <span className="line"><span className="line-inner h-hi-underline shimmer-text">Full Stack IT Company.</span></span>
          </h1>

          <p style={{ fontSize: "1.1rem", fontWeight: 300, color: "var(--t2)", maxWidth: "580px", lineHeight: 1.84, marginBottom: "2.5rem", opacity: 0, transform: "translateY(20px)", animation: "fadeUp .9s 1s var(--ease-out) forwards" }}>
            Maktech Group is a full stack IT company with 6+ years of active delivery across international markets. Our training division is an extension of live work — not a separate school. Every programme is built from what we actually do every day.
          </p>

          <div style={{ display: "flex", gap: ".9rem", flexWrap: "wrap", opacity: 0, transform: "translateY(20px)", animation: "fadeUp .9s 1.2s var(--ease-out) forwards" }}>
            <a className="mk-btn mk-btn-solid mag-btn" href="#cta">Book a Free Consultation</a>
            <a className="mk-btn mk-btn-od mag-btn" href="#programmes">Explore Programmes</a>
          </div>

          <div className="h-strip" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", marginTop: "5rem", background: "var(--bdr)", border: "1px solid var(--bdr)", borderRadius: "14px", overflow: "hidden", opacity: 0, transform: "translateY(28px)", animation: "fadeUp .9s 1.5s var(--ease-out) forwards" }}>
            {[
              { val: null, count: 6, suffix: "+", label: "Years IT Experience" },
              { val: null, count: 10, suffix: "", label: "Training Programmes" },
              { val: "Live", label: "Project-Based Learning" },
              { val: null, count: 5, suffix: "", label: "Learner Profiles Served" },
            ].map((c, i) => (
              <div className="h-cell" key={i}>
                <div style={{ fontFamily: "var(--fh)", fontSize: c.val ? "1.3rem" : "2.2rem", fontWeight: 800, color: "var(--ora)", lineHeight: 1, letterSpacing: "-.05em", marginBottom: ".35rem", paddingTop: c.val ? ".3rem" : 0 }}
                  data-count={c.count} data-suffix={c.suffix}>
                  {c.val || "0"}
                </div>
                <div style={{ fontFamily: "var(--fm)", fontSize: "10px", color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".12em" }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="mk-divline" />
    </>
  );
}

function About() {
  const aboutCards = [
    { idx: "01", title: "Built by an Active IT Company", desc: "Programmes are designed and led by Maktech professionals currently delivering real IT and digital solutions — not educators working from dated course material." },
    { idx: "02", title: "Live Project Execution — Not Simulation", desc: "Every learner works on real projects throughout the programme, building a portfolio of tangible, demonstrable outputs that carry weight with employers and clients." },
    { idx: "03", title: "Industry-Grade Tools & AI Systems", desc: "Training uses the exact platforms, AI tools, and delivery frameworks Maktech applies to commercial client work across its full-stack technology service lines." },
    { idx: "04", title: "Outcome-First Curriculum Design", desc: "Every programme is scoped backward from a defined professional outcome — job readiness, freelancing income, or business growth — not forward from a content list." },
  ];
  return (
    <>
      <section className="about-bg" style={{ background: "var(--w2)", padding: "8rem 0", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 2rem" }}>
          <div className="mk-tag on-light mk-reveal-left">About the Programme</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start", marginTop: "3.5rem" }} className="responsive-grid-1">
            <div className="mk-reveal-left">
              <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(1.9rem,3.2vw,2.7rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.035em", color: "var(--td)" }}>
                Trained by the Company That<br />
                <span style={{ color: "var(--ora-d)" }}>Builds the Systems</span><br />
                Others Learn About.
              </h2>
            </div>
            <div className="mk-reveal-right">
              <div style={{ fontSize: ".95rem", color: "var(--td2)", lineHeight: 1.88, fontWeight: 300 }}>
                <p>Maktech Group is a full stack IT company — not a training centre that added education as a side offering. We deliver end-to-end technology solutions including web development, app development, UI/UX design, SEO, Google Ads, AI automation, HR management systems, and digital marketing to clients across international markets.</p>
                <p style={{ marginTop: "1.1rem" }}>Our training division was established because the gap between formal education and what the IT industry actually demands is real and costly to careers. We address it the same way we address every problem: by building something grounded, structured, and built to produce results.</p>
                <p style={{ marginTop: "1.1rem" }}>Every programme is designed by professionals actively delivering in the field. Every module reflects our current delivery standards. You are not learning from a syllabus — you are learning from the work itself.</p>
              </div>
              <div className="mk-stagger" style={{ display: "flex", flexDirection: "column", gap: ".7rem", marginTop: "2rem" }}>
                {aboutCards.map((c) => (
                  <div className="d-card-wrap" key={c.idx}>
                    <div className="d-ico-wrap">{c.idx}</div>
                    <div>
                      <strong style={{ display: "block", fontSize: ".875rem", fontWeight: 600, color: "var(--td)", marginBottom: ".2rem" }}>{c.title}</strong>
                      <p style={{ fontSize: ".825rem", color: "var(--td2)", lineHeight: 1.62 }}>{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="mk-divline" />
    </>
  );
}

const programmes = [
  { idx: "01", ico: "🔍", title: "Search Engine Optimisation (SEO)", desc: "Technical and strategic organic search — on-page structure, technical auditing, authority building, keyword architecture, and AI-Enhanced Optimisation (AEO). Learners work on live websites with tracked ranking outcomes.", tags: ["Technical SEO", "Link Building", "AEO", "Analytics"] },
  { idx: "02", ico: "📊", title: "Google Ads & Paid Media", desc: "Account-manager-level paid search training — campaign architecture, bidding strategy, audience targeting, conversion tracking, and return optimisation. Live ad account management included throughout.", tags: ["Search & Display", "Conversion", "Budget Strategy"] },
  { idx: "03", ico: "💻", title: "Web Development & CMS Design", desc: "Structured programme covering HTML, CSS, responsive design, and professional CMS development — including theme customisation, plugin management, and performance optimisation. Learners deploy a full working website.", tags: ["HTML / CSS", "CMS", "Performance", "UX"] },
  { idx: "04", ico: "🚀", title: "Digital Marketing Masterclass", desc: "Full-stack view of modern digital marketing — integrating SEO, paid media, content strategy, social channels, email, and analytics into a unified growth system. For those directing the full digital function.", tags: ["Multi-Channel", "Strategy", "AI Tools", "Analytics"] },
  { idx: "05", ico: "🤝", title: "Freelancing & Client Acquisition", desc: "The business infrastructure behind the skill — positioning, pricing, proposals, client communication, and marketplace strategy across Upwork, Fiverr, and LinkedIn. Start earning from completion day one.", tags: ["Business Setup", "Client Management", "Income Strategy"] },
  { idx: "06", ico: "📱", title: "Apps Development", desc: "Comprehensive mobile and web application development — from concept and architecture to UI implementation, API integration, and deployment. Learners build and publish a fully functional application end-to-end.", tags: ["Mobile Apps", "Web Apps", "API", "Deployment"] },
  { idx: "07", ico: "🎨", title: "UI/UX & Graphics Design", desc: "Practitioner-led design programme covering user interface, user experience principles, wireframing, prototyping, and professional graphics production. Learners build a complete design portfolio using industry-standard tools.", tags: ["Figma", "Prototyping", "Brand Design", "UX Research"] },
  { idx: "08", ico: "🤖", title: "AI Automation", desc: "Forward-focused programme covering AI tools, workflow automation, intelligent marketing systems, and practical machine learning applications for business. Learn how Maktech deploys AI in live commercial operations today.", tags: ["AI Tools", "Automation", "Prompt Engineering"] },
  { idx: "09", ico: "🏢", title: "Corporate Skill Development", desc: "Bespoke workshops for teams and organisations — digital marketing capability, AI adoption, and data-informed decision-making. Fully scoped to your objectives and delivered on-site or remotely.", tags: ["Custom Scoped", "Team Delivery", "On-site / Remote"] },
  { idx: "10", ico: "🏭", title: "Industrial Attachment", desc: "Supervised attachment programme embedding students and fresh graduates inside Maktech Group's active delivery environment — first-hand exposure to professional IT and digital operations in a live commercial setting.", tags: ["Live Environment", "Mentored", "Portfolio Output", "Certificate"] },
];

function Programmes() {
  return (
    <>
      <section id="programmes" className="prog-shimmer" style={{ background: "var(--b2)", padding: "8rem 0", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "end", marginBottom: "3.5rem" }}>
            <div>
              <div className="mk-tag mk-reveal-left">Programmes Offered</div>
              <h2 className="mk-reveal-left" style={{ fontFamily: "var(--fh)", fontSize: "clamp(1.9rem,3.2vw,2.7rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.035em", color: "var(--t1)" }}>
                Ten Programmes.<br /><span style={{ color: "var(--ora)" }}>One Standard</span> of Delivery.
              </h2>
            </div>
            <p className="mk-reveal-right" style={{ fontSize: ".975rem", fontWeight: 300, lineHeight: 1.84, maxWidth: "540px", color: "var(--t2)" }}>
              Each programme is structured around applied, project-based learning — connected directly to the tools, workflows, and standards used inside Maktech's own IT delivery teams.
            </p>
          </div>
          <div className="mk-stagger" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "1px", background: "var(--bdr)", border: "1px solid var(--bdr)", borderRadius: "18px", overflow: "hidden" }}>
            {programmes.map((p) => (
              <div className="p-card-wrap" key={p.idx}>
                <div className="p-top" />
                <div style={{ fontFamily: "var(--fm)", fontSize: "10px", color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: ".9rem" }}>Programme / {p.idx}</div>
                <div className="p-ico">{p.ico}</div>
                <h3 style={{ fontFamily: "var(--fh)", fontSize: ".95rem", fontWeight: 700, color: "var(--t1)", lineHeight: 1.26, marginBottom: ".55rem", letterSpacing: "-.02em" }}>{p.title}</h3>
                <p style={{ fontSize: ".82rem", color: "var(--t2)", lineHeight: 1.74, fontWeight: 300, marginBottom: "1.1rem" }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem" }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{ fontFamily: "var(--fm)", fontSize: "8.5px", letterSpacing: ".09em", textTransform: "uppercase", color: "var(--ora)", background: "var(--ora-dim)", border: "1px solid rgba(255,122,47,.2)", padding: ".18rem .5rem", borderRadius: "100px" }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="mk-divline" />
    </>
  );
}

const whyCards = [
  { num: "01 / Mentorship", title: "Founder-Led & Senior-Led Instruction", body: "Training is delivered by Maktech's founding professionals and senior delivery team — individuals actively delivering IT and digital solutions, not career lecturers working from textbooks." },
  { num: "02 / Technology", title: "AI-Integrated Learning Throughout", body: "Learners are trained on the AI tools, automation workflows, and intelligent marketing systems that competitive IT companies use today — embedded throughout the programme, not as an optional module." },
  { num: "03 / Execution", title: "Live Projects — No Simulations", body: "Every programme includes structured live project work on real briefs. Learners graduate with a portfolio of verified, tangible deliverables they can present directly to clients and employers." },
  { num: "04 / Standards", title: "Full Stack IT Delivery Standards", body: "Instruction is built on the same quality frameworks Maktech applies to its commercial IT contracts — learners experience what high-level professional work actually demands." },
  { num: "05 / Income", title: "Freelancing & Revenue Guidance", body: "Structured guidance on positioning, pricing, and acquiring clients — a clear path to generating professional income from skills from day one after completion." },
  { num: "06 / Career", title: "Active Career Placement Support", body: "Portfolio review, professional profile optimisation, job-readiness coaching, and access to the Maktech professional network — structured support for digital and IT employment outcomes." },
];

function Why() {
  return (
    <>
      <section id="why" style={{ background: "var(--b3)", padding: "8rem 0", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "end", marginBottom: "3.5rem" }}>
            <div>
              <div className="mk-tag mk-reveal-left">Why Maktech Training</div>
              <h2 className="mk-reveal-left" style={{ fontFamily: "var(--fh)", fontSize: "clamp(1.9rem,3.2vw,2.7rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.035em", color: "var(--t1)" }}>
                What Sets This Apart From<br /><span style={{ color: "var(--ora)" }}>Any Other Institute.</span>
              </h2>
            </div>
            <p className="mk-reveal-right" style={{ fontSize: ".975rem", fontWeight: 300, lineHeight: 1.84, maxWidth: "540px", color: "var(--t2)" }}>
              Maktech is a full stack IT company first. The training division is an extension of live commercial operations — not a standalone school. That distinction defines every module's quality and relevance.
            </p>
          </div>
          <div className="mk-stagger" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
            {whyCards.map((c) => (
              <div className="w-card-wrap" key={c.num}>
                <div style={{ fontFamily: "var(--fm)", fontSize: "10.5px", color: "var(--ora)", fontWeight: 500, marginBottom: ".9rem" }}>{c.num}</div>
                <div style={{ fontFamily: "var(--fh)", fontSize: ".97rem", fontWeight: 700, color: "var(--t1)", marginBottom: ".55rem", letterSpacing: "-.015em" }}>{c.title}</div>
                <p style={{ fontSize: ".845rem", color: "var(--t2)", lineHeight: 1.72, fontWeight: 300 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="mk-divline" />
    </>
  );
}

const whoCards = [
  { ico: "🎓", role: "Students", desc: "Build verified, market-relevant IT and digital skills before graduation. Enter the workforce with a portfolio and a clear professional profile — not just a qualification." },
  { ico: "💻", role: "Freelancers", desc: "Deepen your technical capability, raise your service rates, and build a more structured client pipeline — guided by IT professionals who have done it from the ground up." },
  { ico: "📈", role: "Business Owners", desc: "Develop the digital and IT literacy to lead your marketing function, make informed technology decisions, and evaluate vendors with genuine confidence." },
  { ico: "🔍", role: "Job Seekers", desc: "Gain the verified skills, portfolio evidence, and professional readiness to compete effectively for digital and IT roles in a demanding job market." },
  { ico: "🏢", role: "Corporate Teams", desc: "Upskill marketing, commercial, and technology teams with workshops aligned to your organisation's digital maturity goals and business priorities." },
];

function WhoFor() {
  return (
    <>
      <section style={{ background: "var(--b1)", padding: "8rem 0", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 2rem" }}>
          <div className="mk-tag mk-reveal-left">Who This Is For</div>
          <div style={{ maxWidth: "600px", marginBottom: "3.5rem" }}>
            <h2 className="mk-reveal" style={{ fontFamily: "var(--fh)", fontSize: "clamp(1.9rem,3.2vw,2.7rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.035em", color: "var(--t1)", marginBottom: ".75rem" }}>
              One Programme. <span style={{ color: "var(--ora)" }}>Five Types of Learner.</span>
            </h2>
            <p className="mk-reveal" style={{ fontSize: ".975rem", fontWeight: 300, lineHeight: 1.84, color: "var(--t2)" }}>
              Designed to meet each learner at their current position and take them to a clearly defined professional outcome.
            </p>
          </div>
          <div className="mk-stagger" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "1px", background: "var(--bdr)", border: "1px solid var(--bdr)", borderRadius: "18px", overflow: "hidden" }}>
            {whoCards.map((c) => (
              <div className="wo-card-wrap" key={c.role}>
                <div className="wo-ico">{c.ico}</div>
                <div style={{ fontFamily: "var(--fh)", fontSize: ".97rem", fontWeight: 700, color: "var(--t1)", marginBottom: ".45rem", letterSpacing: "-.01em" }}>{c.role}</div>
                <p style={{ fontSize: ".8rem", color: "var(--t2)", lineHeight: 1.65, fontWeight: 300 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="mk-divline" />
    </>
  );
}

const outcomes = [
  { n: "O — 01", title: "Job-Ready Digital & IT Skills", body: "A verified skill set aligned to what employers and clients in the IT and digital sector actively hire for — built through structured delivery and live project work, not passive instruction." },
  { n: "O — 02", title: "Freelancing Income Capability", body: "The technical skills, business understanding, and client acquisition knowledge to begin generating independent professional income from digital and IT services immediately after completion." },
  { n: "O — 03", title: "Business Scaling Capability", body: "An integrated understanding of digital channels, AI systems, and technology-driven growth strategy that connects directly to measurable commercial outcomes for business owners and leaders." },
  { n: "O — 04", title: "Real Portfolio of Project Work", body: "Tangible, documented deliverables from live project execution — websites, apps, campaigns, design work, and strategy outputs that serve as professional evidence of applied competence." },
  { n: "O — 05", title: "Industry-Level Professional Understanding", body: "A practitioner-level view of how the IT and digital industry operates — how companies structure delivery, how clients are served, and how senior professionals think and make decisions." },
];

function Outcomes() {
  return (
    <>
      <section style={{ background: "var(--w3)", padding: "8rem 0" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 2rem" }}>
          <div className="mk-tag on-light mk-reveal-left">Programme Outcomes</div>
          <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: "6rem", marginTop: "3.5rem", alignItems: "start" }}>
            <div className="mk-reveal-left" style={{ position: "sticky", top: "86px" }}>
              <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(1.6rem,2.8vw,2.3rem)", fontWeight: 800, color: "var(--td)", letterSpacing: "-.04em", lineHeight: 1.15, marginBottom: "1rem" }}>
                What You<br /><span style={{ color: "var(--ora-d)" }}>Leave With.</span>
              </h2>
              <p style={{ fontSize: ".9rem", color: "var(--td2)", lineHeight: 1.84, fontWeight: 300 }}>
                These are the designed, measurable outcomes of the Maktech Training Programme — built into the curriculum and verified at completion through live project deliverables.
              </p>
            </div>
            <div className="mk-stagger">
              {outcomes.map((o) => (
                <div className="o-row-wrap" key={o.n}>
                  <div style={{ fontFamily: "var(--fm)", fontSize: "10px", color: "var(--ora-d)", fontWeight: 500, paddingTop: "4px" }}>{o.n}</div>
                  <div>
                    <div style={{ fontFamily: "var(--fh)", fontSize: ".98rem", fontWeight: 700, color: "var(--td)", marginBottom: ".3rem", letterSpacing: "-.02em" }}>{o.title}</div>
                    <p style={{ fontSize: ".855rem", color: "var(--td2)", lineHeight: 1.72, fontWeight: 300 }}>{o.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="mk-divline" />
    </>
  );
}

const certPoints = [
  { title: "Maktech Group Programme Certificate", body: "Issued to learners completing all requirements — demonstrating applied IT and digital skills to a professional standard, verified through live project work." },
  { title: "Credibility from Active IT Operations", body: "Maktech's certification carries professional weight because it comes from a company actively delivering commercial technology solutions — not a standalone academic institution." },
  { title: "Portfolio-Backed Evidence", body: "Certification is accompanied by documented project deliverables learners can present to employers, clients, and on professional platforms — evidence beyond the certificate itself." },
  { title: "6+ Years of International Market Experience", body: "Maktech Group's training credibility is underpinned by six-plus years of active IT and digital services delivery across international markets." },
  { title: "LinkedIn-Ready Professional Credential", body: "Graduates receive guidance on presenting their Maktech certification and project portfolio to maximise professional visibility with employers and potential clients." },
];

function Certification() {
  return (
    <>
      <section id="certification" style={{ background: "var(--b3)", padding: "8rem 0", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 2rem" }}>
          <div className="mk-tag mk-reveal-left">Certification &amp; Authority</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", marginTop: "3.5rem", alignItems: "center" }}>
            <div className="cert-card-wrap mk-reveal-scale">
              <div className="cert-seal-wrap">
                <div className="cert-inner">Maktech<br />Group<br />Certified</div>
              </div>
              <div style={{ fontFamily: "var(--fh)", fontSize: "1.2rem", fontWeight: 700, color: "var(--t1)", marginBottom: ".4rem", letterSpacing: "-.02em", position: "relative", zIndex: 1 }}>Programme Certificate</div>
              <p style={{ fontSize: ".82rem", color: "var(--t2)", fontWeight: 300, position: "relative", zIndex: 1 }}>Issued on successful completion of all programme requirements and live project deliverables</p>
            </div>
            <div className="mk-stagger" style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {certPoints.map((c) => (
                <div className="c-pt-wrap" key={c.title} style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div className="c-dot-wrap" />
                  <p style={{ fontSize: ".89rem", color: "var(--t2)", lineHeight: 1.72, fontWeight: 300 }}>
                    <strong style={{ fontWeight: 700, color: "var(--t1)", display: "block", marginBottom: ".14rem" }}>{c.title}</strong>
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="mk-divline" />
    </>
  );
}

const corpWorkshops = [
  { title: "Digital Marketing Capability for Teams", desc: "SEO, paid media, content strategy, and analytics — structured for marketing and commercial functions needing applied digital competence." },
  { title: "AI Tools & Automation for Business", desc: "Practical adoption of AI workflows and automation systems that reduce manual effort, improve output quality, and scale marketing performance." },
  { title: "App & Product Development Fundamentals", desc: "For non-technical leaders and product teams — understanding the full development lifecycle, how to brief developers, and how to evaluate outputs." },
  { title: "Digital Literacy for Non-Technical Leaders", desc: "Equipping senior teams and directors to confidently lead, brief, and evaluate digital and IT functions and external technology partners." },
  { title: "Custom Scope Engagement", desc: "A fully bespoke workshop designed around your specific technology challenge, team profile, and strategic growth context." },
];

const corpFeatures = [
  "Needs assessment and capability benchmarking before delivery begins",
  "Custom curriculum built around your team, sector, and objectives",
  "Delivered by active Maktech IT and marketing professionals",
  "Post-training benchmarks and progress tracking provided",
  "Single workshops or extended multi-session programmes available",
  "Fully on-site, remote, or hybrid delivery formats supported",
];

function Corporate() {
  return (
    <>
      <section id="corporate" style={{ background: "var(--b2)", padding: "8rem 0" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 2rem" }}>
          <div className="mk-tag mk-reveal-left">Corporate Training</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", marginTop: "3.5rem", alignItems: "start" }}>
            <div className="mk-reveal-left">
              <h2 style={{ fontFamily: "var(--fh)", fontSize: "clamp(1.9rem,3.2vw,2.7rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.035em", color: "var(--t1)", marginBottom: "1.2rem" }}>
                Upskill Your Team to<br /><span style={{ color: "var(--ora)" }}>Full Stack IT Company</span><br />Standard.
              </h2>
              <p style={{ fontSize: ".95rem", color: "var(--t2)", lineHeight: 1.84, fontWeight: 300, marginBottom: "1rem" }}>Maktech offers bespoke corporate training engagements — scoped around your organisation's capability level, strategic objectives, and the outcomes you need to achieve. We do not deliver generic off-the-shelf programmes.</p>
              <p style={{ fontSize: ".95rem", color: "var(--t2)", lineHeight: 1.84, fontWeight: 300, marginBottom: "1rem" }}>Each engagement begins with a capability assessment and brief. We then design and deliver a structured workshop programme — on-site or remote — built directly around your team's needs.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: ".65rem", margin: "1.5rem 0 2.5rem" }}>
                {corpFeatures.map((f) => <div className="corp-f-item" key={f}>{f}</div>)}
              </div>
              <a className="mk-btn mk-btn-od mag-btn" href="#cta">Request a Corporate Proposal</a>
            </div>
            <div className="mk-reveal-right" style={{ background: "var(--b3)", border: "1px solid var(--bdr)", borderRadius: "18px", overflow: "hidden" }}>
              <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid var(--bdr)", fontFamily: "var(--fm)", fontSize: "10px", color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".13em", background: "var(--b4)", display: "flex", alignItems: "center", gap: "8px" }}>
                <div className="corp-ph-dot" /> Available Workshop Tracks
              </div>
              <div style={{ padding: "1.2rem", display: "flex", flexDirection: "column", gap: ".7rem" }}>
                {corpWorkshops.map((w) => (
                  <div className="corp-ws-wrap" key={w.title}>
                    <div style={{ fontSize: ".875rem", fontWeight: 600, color: "var(--t1)", marginBottom: ".22rem" }}>{w.title}</div>
                    <div style={{ fontSize: ".8rem", color: "var(--t2)", fontWeight: 300, lineHeight: 1.55 }}>{w.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="mk-divline" />
    </>
  );
}

function CTA() {
  return (
    <section id="cta" style={{ background: "var(--b0)", padding: "10rem 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
      {[1,2,3,4].map((i) => <div className="cta-ring" key={i} />)}
      <div style={{ position: "absolute", bottom: "-400px", left: "50%", transform: "translateX(-50%)", width: "800px", height: "800px", borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(ellipse,rgba(255,122,47,.08) 0%,transparent 65%)" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,122,47,.12) 1px,transparent 1px)", backgroundSize: "34px 34px", maskImage: "radial-gradient(ellipse 75% 80% at 50% 50%,black 0%,transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 75% 80% at 50% 50%,black 0%,transparent 100%)" }} />
      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 2 }}>
        <div className="mk-reveal" style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "var(--fm)", fontSize: "10.5px", fontWeight: 500, color: "var(--ora)", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "1.75rem" }}>
          <span style={{ display: "block", width: "36px", height: "1px", background: "rgba(255,122,47,.4)" }} />
          Begin Your Transformation
          <span style={{ display: "block", width: "36px", height: "1px", background: "rgba(255,122,47,.4)" }} />
        </div>
        <h2 className="mk-reveal" style={{ fontFamily: "var(--fh)", fontSize: "clamp(2.4rem,5vw,4.2rem)", fontWeight: 800, letterSpacing: "-.05em", lineHeight: 1.08, color: "var(--t1)", maxWidth: "700px", margin: "0 auto 1.2rem" }}>
          The Knowledge Is Here.<br />The <span style={{ color: "var(--ora)" }}>Next Move</span> Is Yours.
        </h2>
        <p className="mk-reveal" style={{ fontSize: "1rem", color: "var(--t2)", maxWidth: "490px", margin: "0 auto 2.8rem", fontWeight: 300, lineHeight: 1.84 }}>
          Whether you are launching a career, building a freelancing practice, growing a business, or developing a team — the first step is a conversation. Book your free consultation with the Maktech training team today.
        </p>
        <div className="mk-reveal" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a className="mk-btn mk-btn-solid mag-btn" href="https://maktechgroup.com/" target="_blank" rel="noreferrer">Book a Free Consultation</a>
          <a className="mk-btn mk-btn-od mag-btn" href="https://maktechgroup.com/" target="_blank" rel="noreferrer">Visit Maktech Group</a>
        </div>
        <p className="mk-reveal" style={{ marginTop: "1.5rem", fontSize: ".8rem", color: "var(--t3)", letterSpacing: ".02em", fontWeight: 300 }}>No obligation. No sales pressure. A professional conversation about your goals and the right programme for you.</p>
      </div>
    </section>
  );
}

/* ─── Root Component ─── */
export default function MaktechTraining() {
  const canvasRef = useRef(null);

  useReveal();
  useCounter();
  useCursor();
  useScrollProgress();
  useParallaxOrbs();
  useParticleCanvas(canvasRef);
  useMagneticBtns();
  useTiltCards();

  return (
    <>
      <FontLoader />
      {/* Custom cursor & progress */}
      <div id="mk-cursor" />
      <div id="mk-cursor-ring" />
      <div id="mk-progress" />

      <Hero canvasRef={canvasRef} />
      <About />
      <Programmes />
      <Why />
      <WhoFor />
      <Outcomes />
      <Certification />
      <Corporate />
      <CTA />
    </>
  );
}
