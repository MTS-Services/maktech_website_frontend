import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Port of Framer's "CMS Gallery" / Orbit component (cmsgallery.framer.website).
// Image cards orbit in a ring during the intro, then fan out into a draggable,
// endlessly looping curved row rendered with WebGL. The numbers below are the
// exact values that component uses. Unlike the Framer original, the intro plays
// inline inside this section instead of covering the whole page, and a slide may
// paint its own face with `draw(w, h) => canvas` (plus an async `prepare()`) so
// full service cards can ride the gallery in place of plain images.
const GALLERY_DEFAULTS = {
  width: 32, // card width, % of the viewport
  height: 40, // card height, % of the viewport (capped to width * 0.78)
  gap: 14, // px between cards
  curve: 0.72, // how much the row bows across the screen
  bend: 0.85, // fabric-like flex from drag speed
  momentum: 0.65, // how far the row coasts after release
}
const INTRO_DEFAULTS = {
  duration: 4.5, // seconds, includes a 0.5s slow-down at the end
  mark: 'ORBIT',
  background: '#2429FF',
  color: '#EDFF58',
}

// Texture size for a drawn card; aspect matches the landscape card rect
const CARD_TEX_W = 1024
const CARD_TEX_H = 800

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v))
const lerp = (a, b, t) => a + (b - a) * t
const smoothstep = (e) => {
  const t = clamp(e)
  return t * t * (3 - 2 * t)
}
const smootherstep = (e) => {
  const t = clamp(e)
  return t * t * t * (t * (6 * t - 15) + 10)
}
// The intro's main easing curve
const settle = (e) => {
  const t = clamp(e)
  return t * t * (6 - 8 * t + 3 * t * t)
}
const wrap = (e, m) => ((e % m) + m) % m
const numGuard = (e, fallback, min, max) =>
  typeof e === 'number' && Number.isFinite(e) ? clamp(e, min, max) : fallback

const resolveGallery = (g) => ({
  width: numGuard(g?.width, GALLERY_DEFAULTS.width, 20, 48),
  height: numGuard(g?.height, GALLERY_DEFAULTS.height, 20, 60),
  gap: numGuard(g?.gap, GALLERY_DEFAULTS.gap, 0, 48),
  curve: numGuard(g?.curve, GALLERY_DEFAULTS.curve, 0, 1.8),
  bend: numGuard(g?.bend, GALLERY_DEFAULTS.bend, 0, 1.5),
  momentum: numGuard(g?.momentum, GALLERY_DEFAULTS.momentum, 0, 1),
})

const isSafeLink = (href) => {
  if (typeof href !== 'string' || !href.trim()) return false
  try {
    const u = new URL(href, window.location.href)
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(u.protocol)
  } catch {
    return false
  }
}
const isInternal = (href) => href.startsWith('/') && !href.startsWith('//')

// Best source for a plain-image item at a target width
const pickSrc = (item, target) => {
  if (item.srcSet) {
    const list = item.srcSet
      .split(',')
      .map((e) => {
        const m = e.trim().match(/^(.*)\s+(\d+)w$/)
        return m ? { url: m[1], width: Number(m[2]) } : null
      })
      .filter(Boolean)
      .sort((a, b) => a.width - b.width)
    if (list.length) return (list.find((e) => e.width >= target) || list[list.length - 1]).url
  }
  try {
    const u = new URL(item.src)
    if (u.hostname === 'framerusercontent.com' && target <= 640) {
      u.searchParams.set('scale-down-to', '512')
      return u.href
    }
  } catch {
    /* relative URL */
  }
  return item.src
}

// ── Shaders ─────────────────────────────────────────────────────────────
const VERTEX = `
precision highp float;
attribute vec2 a_position;
uniform vec2 u_view;
uniform vec4 u_rect;
uniform vec2 u_cover;
uniform float u_angle;
uniform float u_curve;
uniform float u_bend;
uniform float u_pinch;
varying vec2 v_uv;
varying float v_light;
void main() {
    vec2 local = a_position * u_rect.zw;
    float waistX = cos(a_position.x * 3.14159265);
    float waistY = cos(a_position.y * 3.14159265);
    // A smooth saddle: lifted corners and a pinched middle, without folds
    // that invert the mesh or change the image's identity.
    local.y *= 1.0 - u_pinch * 0.34 * waistX * waistX;
    local.x *= 1.0 - u_pinch * 0.12 * waistY * waistY;
    float c = cos(u_angle), s = sin(u_angle);
    vec2 p = u_rect.xy + mat2(c, -s, s, c) * local;
    float gx = (p.x - u_view.x * 0.5) / (u_view.x * 0.5);
    p.y = u_view.y * 0.5 + (p.y - u_view.y * 0.5) * (1.0 + u_curve * gx * gx);
    float anchor = sin((a_position.x + 0.5) * 3.14159265);
    float wave = sin(gx * 2.3 + a_position.y * 2.4);
    p.x += u_bend * a_position.y * u_rect.z * 0.085;
    p.y += u_bend * wave * anchor * u_rect.w * 0.13;
    v_light = 1.0 - u_bend * cos(gx * 2.3 + a_position.y * 2.4) * anchor * 0.07 - u_pinch * waistX * waistX * 0.045;
    v_uv = (a_position + 0.5) * u_cover + (1.0 - u_cover) * 0.5;
    gl_Position = vec4(p.x / u_view.x * 2.0 - 1.0, 1.0 - p.y / u_view.y * 2.0, 0.0, 1.0);
}`
const FRAGMENT = `
precision mediump float;
uniform sampler2D u_image;
uniform float u_opacity;
varying vec2 v_uv;
varying float v_light;
void main() {
    vec4 image = texture2D(u_image, v_uv);
    gl_FragColor = vec4(image.rgb * v_light, image.a * u_opacity);
}`

// ── Geometry ────────────────────────────────────────────────────────────
const layout = (w, h, count, g) => {
  const phone = w < 600
  const cardW = (w * (phone ? Math.max(66, g.width) : g.width)) / 100
  const cardH = Math.min((h * g.height) / 100, cardW * 0.78)
  const radius = Math.min(w * (phone ? 0.28 : 0.19), h * 0.25, 225)
  const ringW = Math.min(w * (phone ? 0.2 : 0.115), radius * 0.75)
  return {
    w,
    h,
    count,
    cardW,
    cardH,
    spacing: cardW + g.gap,
    radius,
    ringW,
    ringH: ringW * 0.72,
  }
}

// Position on the intro ring
const circlePose = (p, index, m) => {
  const ring = Math.min(m.count, 12)
  const base = -Math.PI / 4 - Math.PI * 2 * (1 - settle(p / 0.54))
  const phase = (index / Math.max(1, ring)) * Math.PI * 2
  return {
    x: m.w / 2 + Math.sin(base + phase) * m.radius,
    y: m.h / 2 - Math.cos(base + phase) * m.radius,
    angle: Math.sin(base + phase) * 0.02,
  }
}

// Horizontal offset of the whole row during the intro's fan-out
const introOffset = (p, m, slow = 8 / 9) => {
  if (m.count < 2) return 0
  const hinge = slow * 0.75
  const over = -0.42
  if (p < slow) {
    const t = clamp((p - hinge) / (slow - hinge))
    const o = (((5 / 3) * 0.18) / (0.25 - over)) * ((slow - hinge) / (1 - slow))
    const e = t ** 3 * (10 - 4 * o + (-15 + 7 * o) * t + (6 - 3 * o) * t * t)
    return lerp(m.spacing * 0.25, m.spacing * over, e)
  }
  const t = clamp((p - slow) / (1 - slow))
  const e = (5 / 3) * t - (5 / 3) * t ** 4 + t ** 5
  return lerp(m.spacing * over, -m.spacing * 0.6, e)
}

// A single card's pose during the intro (ring → row)
const introPose = (p, index, m, g, forced, slow = 8 / 9) => {
  const o = clamp(p / slow)
  const ring = Math.min(m.count, 12)
  const c = index / Math.max(1, ring - 1)
  const slot = forced ?? index - Math.floor(ring / 2)
  const u = circlePose(o, index, m)
  const d = settle((o - 0.5 - c * 0.012) / 0.28)
  const f = ring < 2 ? 0 : Math.min(m.w * 0.08, m.ringW * 0.65)
  const stackX = m.w / 2 - f / 2
  const stackMid = m.h / 2
  const h = c - (ring > 1 ? 0.5 : 0)
  const gx = stackX + c * f
  const gy =
    stackMid +
    h * m.ringH * 0.1 +
    h * m.radius * 0.04 * Math.sin(Math.PI * clamp((o - 0.5) / 0.26)) ** 2
  const v = Math.sin(Math.PI * d) ** 2 * m.radius * 0.06
  const y = lerp(u.x, gx, d) + v * (c - 0.5)
  const b = lerp(u.y, gy, d) - v * 0.35
  const x = settle((o - c * 0.02 - 0.75) / 0.23)
  const rowX = m.w / 2 + slot * m.spacing + introOffset(p, m, slow)
  const S = Math.sin(Math.PI * x) ** 2
  const grow = 0.85 + 0.15 * settle(o / 0.2)
  return {
    index: wrap(slot, m.count),
    x: lerp(y, rowX, x),
    y: lerp(b, m.h / 2, x) - S * m.cardH * 0.04,
    w: lerp(m.ringW * grow, m.cardW, x),
    h: lerp(m.ringH * grow, m.cardH, x),
    angle: u.angle * (1 - d) * (1 - x) + Math.sin(Math.PI * d) ** 2 * (1 - x) * c * 0.015,
    curve: g.curve * x,
    bend: Math.sin(Math.PI * d) ** 2 * (1 - x) * 0.025 + S * 0.045,
    pinch: Math.sin(Math.PI * d) ** 2 * (1 - x) * 0.06,
    opacity: smoothstep((o - c * 0.13) / 0.035),
  }
}

// The steady, draggable row
const rowPoses = (offset, bend, m, g) => {
  if (!m.count) return []
  const reach = Math.ceil(m.w / m.spacing / 2) + 2
  const center = -offset / m.spacing
  const out = []
  for (let s = Math.floor(center) - reach; s <= Math.floor(center) + reach; s++)
    out.push({
      index: wrap(s, m.count),
      x: m.w / 2 + s * m.spacing + offset,
      y: m.h / 2,
      w: m.cardW,
      h: m.cardH,
      angle: 0,
      curve: g.curve,
      bend,
      pinch: 0,
      opacity: 1,
    })
  return out
}

// Outline of a card on screen, for hit-testing and the hover caption
const perimeter = (pose, m, warped) => {
  const point = (r, i) => {
    const a = Math.cos(pose.angle)
    const o = Math.sin(pose.angle)
    let sx, sy
    if (warped) {
      const nx = r * pose.w * (1 - pose.pinch * 0.12 * Math.cos(i * Math.PI) ** 2)
      const ny = i * pose.h * (1 - pose.pinch * 0.34 * Math.cos(r * Math.PI) ** 2)
      sx = pose.x + a * nx + o * ny
      sy = pose.y - o * nx + a * ny
      const u = (sx - m.w / 2) / Math.max(1, m.w / 2)
      sy = m.h / 2 + (sy - m.h / 2) * (1 + pose.curve * u * u)
      sx += pose.bend * i * pose.w * 0.085
      sy += pose.bend * Math.sin(u * 2.3 + i * 2.4) * Math.sin((r + 0.5) * Math.PI) * pose.h * 0.13
    } else {
      const n = (pose.x - m.w / 2) / Math.max(1, m.w / 2)
      const l = 1 + pose.curve * n * n
      const uy = i * pose.h * l
      const dx = r * pose.w + Math.tan((pose.bend * 3 * Math.PI) / 180) * uy
      sx = pose.x + a * dx - o * uy
      sy = pose.y + o * dx + a * uy + pose.bend * Math.sin(n * 2.3) * pose.h * 0.1
    }
    return { x: sx, y: sy }
  }
  const pts = []
  for (let e = 0; e <= 24; e++) pts.push(point(e / 24 - 0.5, -0.5))
  for (let e = 1; e <= 8; e++) pts.push(point(0.5, e / 8 - 0.5))
  for (let e = 1; e <= 24; e++) pts.push(point(0.5 - e / 24, 0.5))
  for (let e = 1; e < 8; e++) pts.push(point(-0.5, 0.5 - e / 8))
  return pts
}

const pointInPoly = (x, y, poly) => {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i]
    const b = poly[j]
    if (a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) inside = !inside
  }
  return inside
}

// ── WebGL renderer ──────────────────────────────────────────────────────
const createRenderer = (canvas, items, onReady) => {
  const gl = canvas.getContext('webgl', {
    alpha: true,
    antialias: true,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
    premultipliedAlpha: false,
  })
  if (!gl) return null

  const textures = []
  const imgs = []
  const timers = []
  let destroyed = false
  let lost = false
  let viewW = 1
  let viewH = 1
  let vertexCount = 0
  let vShader = null
  let fShader = null
  let program = null
  let buffer = null

  const dispose = () => {
    destroyed = true
    imgs.forEach((img) => {
      img.onload = null
      img.onerror = null
      img.src = ''
    })
    timers.forEach(clearTimeout)
    textures.forEach((t) => t && gl.deleteTexture(t.handle))
    buffer && gl.deleteBuffer(buffer)
    program && gl.deleteProgram(program)
    vShader && gl.deleteShader(vShader)
    fShader && gl.deleteShader(fShader)
  }

  const compile = (type, src) => {
    const s = gl.createShader(type)
    if (!s) throw new Error('Shader unavailable')
    gl.shaderSource(s, src)
    gl.compileShader(s)
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      gl.deleteShader(s)
      throw new Error('Shader compilation failed')
    }
    return s
  }

  try {
    vShader = compile(gl.VERTEX_SHADER, VERTEX)
    fShader = compile(gl.FRAGMENT_SHADER, FRAGMENT)
    program = gl.createProgram()
    buffer = gl.createBuffer()
    if (!program || !buffer) throw new Error('Renderer unavailable')
    gl.attachShader(program, vShader)
    gl.attachShader(program, fShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Renderer link failed')
    gl.useProgram(program)

    const coarse = window.matchMedia('(pointer: coarse)').matches
    const cols = coarse ? 32 : 48
    const rows = coarse ? 16 : 24
    const verts = []
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        const x0 = c / cols - 0.5
        const x1 = (c + 1) / cols - 0.5
        const y0 = r / rows - 0.5
        const y1 = (r + 1) / rows - 0.5
        verts.push(x0, y0, x1, y0, x0, y1, x0, y1, x1, y0, x1, y1)
      }
    vertexCount = verts.length / 2
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
  } catch {
    dispose()
    return null
  }

  const u = (name) => gl.getUniformLocation(program, name)
  const uni = {
    view: u('u_view'),
    rect: u('u_rect'),
    cover: u('u_cover'),
    angle: u('u_angle'),
    curve: u('u_curve'),
    bend: u('u_bend'),
    pinch: u('u_pinch'),
    opacity: u('u_opacity'),
  }

  const upload = (idx, source, natW, natH) => {
    const handle = gl.createTexture()
    if (!handle) return
    try {
      gl.bindTexture(gl.TEXTURE_2D, handle)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      const max = Math.min(1024, gl.getParameter(gl.MAX_TEXTURE_SIZE))
      const scale = Math.min(1, max / Math.max(natW, natH))
      let src = source
      if (scale < 1) {
        const c = document.createElement('canvas')
        c.width = Math.round(natW * scale)
        c.height = Math.round(natH * scale)
        const ctx = c.getContext('2d')
        if (!ctx) throw new Error('Image unavailable')
        ctx.drawImage(source, 0, 0, c.width, c.height)
        src = c
      }
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src)
      textures[idx] = { handle, w: natW, h: natH }
    } catch {
      gl.deleteTexture(handle)
    }
  }

  // Drawn cards are rendered at the current card rect's aspect ratio, so the
  // cover-fit crop is a no-op and the whole card stays readable.
  const drawItems = []
  let cardAspect = CARD_TEX_W / CARD_TEX_H
  const cardDims = () => ({ w: Math.max(1, Math.round(CARD_TEX_H * cardAspect)), h: CARD_TEX_H })

  items.forEach((item, idx) => {
    let done = false
    const mark = () => {
      if (done) return
      done = true
      clearTimeout(timers[idx])
      onReady()
    }
    if (item.draw) {
      drawItems.push(idx)
      Promise.resolve(item.prepare?.())
        .then(() => {
          if (destroyed || lost) return mark()
          const { w, h } = cardDims()
          const canvasCard = item.draw(w, h)
          if (canvasCard) upload(idx, canvasCard, canvasCard.width, canvasCard.height)
          mark()
        })
        .catch(mark)
      timers[idx] = window.setTimeout(mark, 6000)
    } else {
      const img = new Image()
      imgs.push(img)
      img.crossOrigin = 'anonymous'
      img.decoding = 'async'
      img.onload = () => {
        if (!destroyed && !lost) upload(idx, img, img.naturalWidth, img.naturalHeight)
        mark()
      }
      img.onerror = mark
      timers[idx] = window.setTimeout(mark, 6000)
      img.src = pickSrc(item, items.length > 16 ? 512 : 640)
    }
  })

  const onLost = (e) => {
    e.preventDefault()
    lost = true
    canvas.style.opacity = '0'
  }
  canvas.addEventListener('webglcontextlost', onLost)

  return {
    ready: () => !destroyed && !lost && items.length > 0 && items.every((_, i) => !!textures[i]),
    // Re-render drawn cards whenever the card rect's aspect changes, so text
    // stays sharp and uncropped. Sets the aspect for not-yet-loaded cards too.
    redrawCards(aspect) {
      if (!Number.isFinite(aspect) || aspect <= 0 || Math.abs(aspect - cardAspect) < 0.01) return
      cardAspect = aspect
      if (destroyed || lost) return
      const { w, h } = cardDims()
      for (const idx of drawItems) {
        const old = textures[idx]
        if (!old) continue // not loaded yet; its first draw will use the new aspect
        const card = items[idx].draw(w, h)
        if (!card) continue
        upload(idx, card, card.width, card.height)
        if (textures[idx] && textures[idx].handle !== old.handle) gl.deleteTexture(old.handle)
      }
    },
    resize(w, h) {
      viewW = Math.max(1, w)
      viewH = Math.max(1, h)
      const coarse = window.matchMedia('(pointer: coarse)').matches
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        coarse ? 1.5 : 2,
        Math.sqrt((coarse ? 14e5 : 28e5) / (viewW * viewH)),
      )
      const pw = Math.round(viewW * dpr)
      const ph = Math.round(viewH * dpr)
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw
        canvas.height = ph
      }
      if (!lost) gl.viewport(0, 0, pw, ph)
    },
    draw(poses) {
      if (destroyed || lost) return
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.uniform2f(uni.view, viewW, viewH)
      for (const pose of poses) {
        const tex = textures[pose.index]
        if (!tex || pose.opacity < 0.001 || pose.x + pose.w < 0 || pose.x - pose.w > viewW) continue
        const rectR = pose.w / Math.max(1, pose.h)
        const imgR = tex.w / Math.max(1, tex.h)
        gl.bindTexture(gl.TEXTURE_2D, tex.handle)
        gl.uniform4f(uni.rect, pose.x, pose.y, pose.w, pose.h)
        gl.uniform2f(uni.cover, imgR > rectR ? rectR / imgR : 1, imgR < rectR ? imgR / rectR : 1)
        gl.uniform1f(uni.angle, pose.angle)
        gl.uniform1f(uni.curve, pose.curve)
        gl.uniform1f(uni.bend, pose.bend)
        gl.uniform1f(uni.pinch, pose.pinch)
        gl.uniform1f(uni.opacity, pose.opacity)
        gl.drawArrays(gl.TRIANGLES, 0, vertexCount)
      }
    },
    destroy() {
      canvas.removeEventListener('webglcontextlost', onLost)
      dispose()
    },
  }
}

// ── Animation engine ────────────────────────────────────────────────────
// canvas: the WebGL <canvas>; region: the outer [data-orbit] element (also the
// pointer surface); markEl: the intro "ORBIT" letters; cardsLayer: the DOM
// fallback <div> of card nodes; cfg: { items, gallery, duration, motion,
// reduced, onCurrent, captionHost, captionEnabled, follow }.
const createEngine = (canvas, region, markEl, cardsLayer, cfg) => {
  const slow = 1 - 0.5 / cfg.duration
  let destroyed = false
  let raf = 0
  let last = 0
  let visible = true
  let dragging = false
  let hovering = false // pointer over the section (pauses autoplay)
  let pointerId = -1
  let grabX = 0
  let moveX = 0
  let grabY = 0
  let pressTime = 0
  let moved = false
  let vertical = false
  let offset = cfg.motion.offset
  let target = offset
  let velocity = 0
  let flex = 0
  let lastCurrent = -1
  let poses = []
  let introShift = 0

  const cardNodes = cardsLayer ? Array.from(cardsLayer.querySelectorAll('[data-orbit-card]')) : []
  const letters = markEl ? Array.from(markEl.querySelectorAll('[data-orbit-part]')) : []
  let metrics = layout(1, 1, cfg.items.length, cfg.gallery)
  let markScale = 1
  let renderer = null

  const caption = cfg.captionHost
  const clipPath = caption?.querySelector('[data-orbit-caption-clip]')
  const shade = caption?.querySelector('[data-orbit-caption-shade]')
  const gradient = caption?.querySelector('linearGradient')
  const fo = caption?.querySelector('foreignObject')
  const titleEl = caption?.querySelector('[data-orbit-caption-title]')
  const arrowEl = caption?.querySelector('[data-orbit-caption-arrow]')
  const labelEl = caption?.querySelector('[data-orbit-caption-label]')
  let hoverPt = null
  let keyFocus = false
  let lineHeight = 22

  try {
    renderer = createRenderer(canvas, cfg.items, () => schedule())
  } catch {
    renderer = null
  }

  const hideCaption = () => {
    if (caption) caption.style.opacity = '0'
    if (labelEl) labelEl.style.transform = 'translateY(4px)'
    if (!dragging && cfg.motion.done) region.style.cursor = 'grab'
  }

  // Draw a drawn-card into its DOM fallback node once (WebGL-less path)
  const paintFallback = (node, item) => {
    if (!item.draw) {
      node.style.backgroundImage = `url("${pickSrc(item, 640)}")`
      return
    }
    if (!item._fallbackUrl) {
      const c = item.draw(640, 500)
      item._fallbackUrl = c ? c.toDataURL('image/webp', 0.85) : ''
    }
    node.style.backgroundImage = item._fallbackUrl ? `url("${item._fallbackUrl}")` : 'none'
  }

  const paintCaption = () => {
    if (
      !caption ||
      !cfg.captionEnabled ||
      destroyed ||
      !cfg.motion.done ||
      dragging ||
      document.hidden ||
      !visible ||
      Math.abs(offset - target) > 0.8 ||
      Math.abs(velocity) > 5 ||
      Math.abs(flex) > 0.04
    ) {
      hideCaption()
      return
    }
    const warped = !!renderer?.ready()
    const rect = region.getBoundingClientRect()
    const px = hoverPt ? ((hoverPt.x - rect.left) * metrics.w) / Math.max(1, rect.width) : 0
    const py = hoverPt ? ((hoverPt.y - rect.top) * metrics.h) / Math.max(1, rect.height) : 0
    const pose = hoverPt
      ? [...poses].reverse().find((p) => p.opacity > 0.9 && pointInPoly(px, py, perimeter(p, metrics, warped)))
      : keyFocus
        ? poses.reduce(
            (best, p) =>
              !best || Math.abs(p.x - metrics.w / 2) < Math.abs(best.x - metrics.w / 2) ? p : best,
            undefined,
          )
        : undefined
    const item = pose && cfg.items[pose.index]
    const text = item?.title?.trim() || item?.alt?.trim() || ''
    if (!pose || !text || !clipPath || !shade || !gradient || !fo || !titleEl || !arrowEl) {
      hideCaption()
      return
    }
    const pts = perimeter(pose, metrics, warped)
    const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ') + ' Z'
    clipPath.setAttribute('d', d)
    shade.setAttribute('d', d)
    caption.setAttribute('viewBox', `0 0 ${metrics.w} ${metrics.h}`)
    const bottom = pts.slice(32, 57)
    const topY = Math.min(...bottom.map((p) => p.y))
    const botY = Math.max(...bottom.map((p) => p.y))
    const padX = Math.min(22, pose.w * 0.07)
    const bandH = Math.min(pose.h - padX * 2, Math.max(Math.min(50, pose.h * 0.24), lineHeight + 8))
    const x0 = pose.x - pose.w / 2 + padX
    fo.setAttribute('x', String(x0))
    fo.setAttribute('y', String(topY - padX - bandH))
    fo.setAttribute('width', String(Math.max(1, pose.w - padX * 2)))
    fo.setAttribute('height', String(bandH))
    gradient.setAttribute('x1', '0')
    gradient.setAttribute('x2', '0')
    gradient.setAttribute('y1', String(topY - bandH - padX - pose.h * 0.12))
    gradient.setAttribute('y2', String(botY))
    titleEl.textContent = text
    const linked = !!item?.href && isSafeLink(item.href)
    arrowEl.style.display = linked ? 'block' : 'none'
    caption.style.opacity = '1'
    if (labelEl) labelEl.style.transform = 'translateY(0px)'
    if (hoverPt) region.style.cursor = linked ? 'pointer' : 'grab'
  }

  const schedule = () => {
    if (!destroyed && !document.hidden && (visible || !cfg.motion.done) && !raf) {
      last = 0
      raf = requestAnimationFrame(tick)
    }
  }

  const relayout = () => {
    const w = region.clientWidth || 1200
    const h = region.clientHeight || 800
    const prevSpacing = metrics.spacing
    metrics = layout(w, h, cfg.items.length, cfg.gallery)
    markScale = Math.min(1, (metrics.radius * 1.3) / Math.max(1, markEl?.scrollWidth || 1))
    if (prevSpacing > 1 && cfg.motion.done) {
      target *= metrics.spacing / prevSpacing
      offset *= metrics.spacing / prevSpacing
      cfg.motion.offset = target
    }
    renderer?.resize(w, h)
    renderer?.redrawCards(metrics.cardW / Math.max(1, metrics.cardH))
    if (labelEl && typeof window.getComputedStyle === 'function') {
      const cs = window.getComputedStyle(labelEl)
      lineHeight = Number.parseFloat(cs.lineHeight) || (Number.parseFloat(cs.fontSize) || 18) * 1.2
    }
    schedule()
  }

  const paintMark = (p) => {
    if (!markEl) return
    const gone = cfg.motion.done
    markEl.style.opacity = gone ? '0' : '1'
    markEl.style.transform = `translate(-50%, -50%) scale(${markScale * (1 + 0.1 * (1 - settle((p - 0.015) / 0.2)))})`
    letters.forEach((letter, i) => {
      const r = i / Math.max(1, letters.length - 1)
      const inT = (p - 0.015 - r * 0.025) / 0.18
      const outT = (p - 0.44 - (1 - r) * 0.025) / 0.13
      const rise = settle(inT)
      const fall = smootherstep(outT)
      letter.style.transform = `translateY(${(1 - rise + fall) * 45}%)`
      letter.style.opacity = String(smootherstep(inT) * (1 - fall))
    })
  }

  const paintCards = (list, webglReady) => {
    if (cardsLayer) cardsLayer.style.opacity = webglReady ? '0' : '1'
    canvas.style.opacity = webglReady ? '1' : '0'
    cardNodes.forEach((node, i) => {
      const pose = list[i]
      const item = pose && cfg.items[pose.index]
      if (!pose || !item || pose.opacity < 0.001) {
        node.style.opacity = '0'
        return
      }
      if (node.dataset.orbitIndex !== String(pose.index)) {
        node.dataset.orbitIndex = String(pose.index)
        paintFallback(node, item)
      }
      const o = (pose.x - metrics.w / 2) / Math.max(1, metrics.w / 2)
      const s = 1 + pose.curve * o * o
      node.style.width = `${pose.w}px`
      node.style.height = `${pose.h * s}px`
      node.style.transform = `translate(${pose.x - pose.w / 2}px, ${
        pose.y - (pose.h * s) / 2 + pose.bend * Math.sin(o * 2.3) * pose.h * 0.1
      }px) rotate(${pose.angle}rad) skewX(${pose.bend * 3}deg)`
      if (pose.pinch > 0.001) {
        const t = pose.pinch * 6
        const n = pose.pinch * 17
        node.style.clipPath = `polygon(0% 0%,25% ${n * 0.5}%,50% ${n}%,75% ${n * 0.5}%,100% 0%,${100 - t}% 50%,100% 100%,75% ${100 - n * 0.5}%,50% ${100 - n}%,25% ${100 - n * 0.5}%,0% 100%,${t}% 50%)`
      } else node.style.clipPath = 'none'
      node.style.opacity = String(pose.opacity)
    })
  }

  const tick = (now) => {
    raf = 0
    if (destroyed) return
    const dt = last ? Math.min((now - last) / 1000, 0.04) : 1 / 60
    last = now

    const t = cfg.motion.done
      ? 1
      : cfg.motion.started
        ? clamp((now - cfg.motion.started) / (cfg.duration * 1000))
        : 0 // intro armed but not yet in view: hold the opening ring frame
    if (!cfg.motion.done) {
      offset = target = introOffset(t, metrics, slow)
      cfg.motion.offset = target
      if (t >= 1) cfg.motion.done = true
    }

    if (!cfg.motion.done && t < 1) {
      const ring = Math.min(cfg.items.length, 12)
      const tt = clamp(t / slow)
      poses = Array.from({ length: ring }, (_, i) => introPose(t, i, metrics, cfg.gallery, undefined, slow))
      if (tt > 0.78 && ring > 0) {
        const extras = rowPoses(introOffset(1, metrics, slow), 0, metrics, cfg.gallery)
        for (const ex of extras) {
          const slot = Math.round((ex.x - metrics.w / 2 - introOffset(1, metrics, slow)) / metrics.spacing)
          if (slot < -Math.floor(ring / 2) || slot >= Math.ceil(ring / 2)) {
            const p = introPose(t, wrap(slot + Math.floor(ring / 2), ring), metrics, cfg.gallery, slot, slow)
            poses.unshift({ ...p, opacity: smootherstep((tt - 0.78) / 0.2) })
          }
        }
      }
    } else {
      if (!dragging) {
        velocity *= Math.exp(-dt * lerp(9, 3.5, cfg.gallery.momentum))
        target += velocity * dt
      }
      // Gentle auto-scroll when idle; pauses on hover and while dragging
      if (cfg.autoplay && !cfg.reduced && !dragging && !(cfg.holdOnHover && hovering))
        target -= cfg.autoplay * dt
      const prev = offset
      offset = cfg.reduced ? target : lerp(offset, target, 1 - Math.exp(-dt * (dragging ? 18 : 13)))
      introShift = (offset - prev) / Math.max(0.001, dt)
      const want = cfg.reduced
        ? 0
        : clamp(introShift / Math.max(400, metrics.w), -1.4, 1.4) * cfg.gallery.bend
      flex = lerp(flex, want, 1 - Math.exp(-dt * 9))
      cfg.motion.offset = offset
      const span = metrics.spacing * cfg.items.length
      if (span > 0 && Math.abs(offset) > span * 4 && !dragging) {
        const jump = Math.trunc(offset / span) * span
        offset -= jump
        target -= jump
        cfg.motion.offset = offset
      }
      poses = rowPoses(offset, flex, metrics, cfg.gallery)
      const current = cfg.items.length ? wrap(Math.round(-offset / metrics.spacing), cfg.items.length) : -1
      if (current !== lastCurrent) {
        lastCurrent = current
        cfg.onCurrent(current)
      }
    }

    paintMark(clamp(t))
    const visiblePoses = poses.filter((p) => p.x + p.w > 0 && p.x - p.w < metrics.w && p.opacity > 0.001)
    const webglReady = !!renderer?.ready()
    if (webglReady) renderer.draw(visiblePoses)
    paintCards(visiblePoses, webglReady)
    paintCaption()
    const autoplaying =
      cfg.autoplay && !cfg.reduced && cfg.motion.done && !(cfg.holdOnHover && hovering)
    const busy =
      !cfg.motion.done ||
      autoplaying ||
      Math.abs(target - offset) > 0.15 ||
      Math.abs(velocity) > 0.3 ||
      Math.abs(flex) > 0.002
    if (busy && !document.hidden && (visible || !cfg.motion.done)) raf = requestAnimationFrame(tick)
  }

  const within = (e) => {
    const rect = region.getBoundingClientRect()
    return {
      rect,
      inside:
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom,
    }
  }
  const onInteractive = (e) =>
    e.composedPath().some(
      (n) =>
        n instanceof Element &&
        n.matches(`a,button,input,textarea,select,h1,h2,h3,h4,h5,h6,p,[contenteditable='true'],[role='button']`),
    )

  const onDown = (e) => {
    if (!cfg.motion.done || cfg.items.length < 1 || e.button !== 0 || !e.isPrimary) return
    const { rect, inside } = within(e)
    if (!inside || onInteractive(e)) return
    const localY = e.clientY - rect.top
    if (Math.abs(localY - rect.height / 2) > Math.min(rect.height * 0.4, metrics.cardW * 0.95)) {
      const localX = e.clientX - rect.left
      if (!poses.some((p) => p.opacity > 0.9 && pointInPoly(localX, localY, perimeter(p, metrics, !!renderer?.ready()))))
        return
    }
    keyFocus = false
    dragging = true
    pointerId = e.pointerId
    grabX = moveX = e.clientX
    grabY = e.clientY
    pressTime = performance.now()
    moved = false
    vertical = false
    target = offset
    velocity = 0
    region.style.cursor = 'grabbing'
    hideCaption()
    schedule()
  }

  const onMove = (e) => {
    const { inside } = within(e)
    hovering = inside
    if (caption) {
      if (inside) keyFocus = false
      hoverPt =
        e.pointerType !== 'touch' &&
        window.matchMedia('(hover: hover)').matches &&
        inside &&
        !onInteractive(e)
          ? { x: e.clientX, y: e.clientY }
          : null
      paintCaption()
    }
    if (!dragging || e.pointerId !== pointerId) return
    const dx = e.clientX - grabX
    const dy = e.clientY - grabY
    if (!moved && Math.hypot(dx, dy) > 6) {
      vertical = e.pointerType === 'touch' && Math.abs(dy) > Math.abs(dx)
      if (vertical) {
        dragging = false
        region.style.cursor = 'grab'
        return
      }
      moved = true
    }
    if (!moved) return
    const now = performance.now()
    const step = e.clientX - moveX
    const v = step / Math.max(0.008, (now - pressTime) / 1000)
    target += step
    velocity = lerp(velocity, clamp(v, -3500, 3500), 0.6)
    moveX = e.clientX
    pressTime = now
    if (e.cancelable && e.pointerType === 'touch') e.preventDefault()
    schedule()
  }

  const onUp = (e) => {
    if (!dragging || e.pointerId !== pointerId) return
    dragging = false
    region.style.cursor = 'grab'
    if (cfg.reduced || cfg.gallery.momentum <= 0 || performance.now() - pressTime > 120 || !moved)
      velocity = 0
    if (!moved && e.type === 'pointerup') {
      const { rect } = within(e)
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const hit = [...poses]
        .reverse()
        .find((p) => p.opacity > 0.9 && pointInPoly(x, y, perimeter(p, metrics, !!renderer?.ready())))
      const item = hit && cfg.items[hit.index]
      if (item?.href && isSafeLink(item.href)) cfg.follow(item)
    }
    schedule()
  }

  const onCancel = () => {
    dragging = false
    hovering = false
    velocity = 0
    hoverPt = null
    keyFocus = false
    hideCaption()
    region.style.cursor = 'grab'
    schedule()
  }
  const onVisibility = () => {
    if (document.hidden) {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      onCancel()
    } else schedule()
  }
  const onLeave = () => {
    hoverPt = null
    hovering = false
    paintCaption()
    schedule() // resume auto-scroll
  }
  const onFocus = () => {
    keyFocus = region.matches(':focus-visible')
    paintCaption()
  }
  const onBlur = () => {
    keyFocus = false
    hoverPt = null
    hideCaption()
  }

  const resizer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(relayout) : null
  resizer?.observe(region)
  const io =
    typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver((entries) => {
          visible = entries[0]?.isIntersecting !== false
          // Start the intro the first time the section scrolls into view
          if (visible && !cfg.motion.done && !cfg.motion.started)
            cfg.motion.started = performance.now()
          if (!visible) onCancel()
          if (visible) schedule()
          else if (cfg.motion.done && raf) {
            cancelAnimationFrame(raf)
            raf = 0
          }
        })
      : null
  io?.observe(region)

  document.addEventListener('visibilitychange', onVisibility)
  document.fonts?.addEventListener('loadingdone', relayout)
  window.addEventListener('resize', relayout)
  window.addEventListener('pointerdown', onDown)
  window.addEventListener('pointermove', onMove, { passive: false })
  window.addEventListener('pointerup', onUp)
  window.addEventListener('pointercancel', onCancel)
  window.addEventListener('blur', onCancel)
  if (caption) {
    region.addEventListener('pointerleave', onLeave)
    region.addEventListener('focus', onFocus)
    region.addEventListener('blur', onBlur)
  }
  relayout()

  return {
    step(dir) {
      if (!cfg.motion.done) return
      if (caption) {
        keyFocus = true
        hoverPt = null
        hideCaption()
      }
      velocity = 0
      target = (Math.round(target / metrics.spacing) - dir) * metrics.spacing
      schedule()
    },
    activate() {
      if (!cfg.motion.done || !cfg.items.length) return
      cfg.follow(cfg.items[wrap(Math.round(-offset / metrics.spacing), cfg.items.length)])
    },
    destroy() {
      hideCaption()
      destroyed = true
      if (raf) cancelAnimationFrame(raf)
      resizer?.disconnect()
      io?.disconnect()
      renderer?.destroy()
      document.removeEventListener('visibilitychange', onVisibility)
      document.fonts?.removeEventListener('loadingdone', relayout)
      window.removeEventListener('resize', relayout)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onCancel)
      window.removeEventListener('blur', onCancel)
      if (caption) {
        region.removeEventListener('pointerleave', onLeave)
        region.removeEventListener('focus', onFocus)
        region.removeEventListener('blur', onBlur)
      }
    },
  }
}

const resolveSlide = (slide, i) => {
  if (slide.draw)
    return {
      draw: slide.draw,
      prepare: slide.prepare,
      title: slide.title || '',
      alt: slide.alt || slide.title || `Image ${i + 1}`,
      href: slide.href || '',
      src: '',
    }
  return {
    src: (slide.image || '').trim(),
    srcSet: slide.srcSet,
    alt: slide.alt || slide.title || `Image ${i + 1}`,
    title: slide.title || '',
    href: slide.href || '',
  }
}

/**
 * Draggable, endlessly looping WebGL image gallery that enters by orbiting the
 * cards in a ring and fanning them into a curved row. Fills its parent, so give
 * the parent a height. A slide may paint its own face via `draw(w, h) => canvas`.
 */
const OrbitGallery = ({
  slides,
  gallery,
  intro,
  caption,
  preloader = true,
  autoplay = 0, // px/s of idle auto-scroll (0 = off)
  holdOnHover = true,
  ariaLabel = 'Image gallery. Drag horizontally or use left and right arrow keys.',
}) => {
  const navigate = useNavigate()
  const regionRef = useRef(null)
  const canvasRef = useRef(null)
  const markRef = useRef(null)
  const cardsRef = useRef(null)
  const captionRef = useRef(null)
  const engineRef = useRef(null)
  const motionRef = useRef(null)
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const introCfg = { ...INTRO_DEFAULTS, ...intro }
  const captionCfg = { enabled: true, color: '#FFFFFF', ...caption }
  const galleryCfg = useMemo(() => resolveGallery(gallery), [gallery])
  const items = useMemo(() => slides.map(resolveSlide), [slides])
  const mediaKey = items.map((it) => (it.draw ? `d|${it.alt}` : `i|${it.src}`)).join(';')
  const duration = numGuard(introCfg.duration, INTRO_DEFAULTS.duration, 3.5, 5)
  const marks = Array.from(introCfg.mark || '')

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const region = regionRef.current
    const canvas = canvasRef.current
    if (!region || !canvas) return
    const motion = {
      started: 0, // set when the section first scrolls into view
      done: !preloader || reduced,
      offset: 0,
    }
    motionRef.current = motion
    const follow = (item) => {
      if (!item?.href || !isSafeLink(item.href)) return
      if (isInternal(item.href)) {
        navigate(item.href)
        return
      }
      const a = document.createElement('a')
      a.href = item.href
      if (item.target === '_blank') {
        a.target = '_blank'
        a.rel = 'noopener noreferrer'
      }
      a.click()
    }
    const engine = createEngine(canvas, region, markRef.current, cardsRef.current, {
      items,
      gallery: galleryCfg,
      duration,
      motion,
      reduced,
      autoplay: numGuard(autoplay, 0, -400, 400),
      holdOnHover,
      onCurrent: () => {},
      captionHost: captionRef.current,
      captionEnabled: captionCfg.enabled !== false,
      follow,
    })
    engineRef.current = engine
    return () => {
      engine.destroy()
      engineRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaKey, galleryCfg, duration, reduced, preloader])

  const onKeyDown = (e) => {
    if (e.target !== e.currentTarget) return
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      engineRef.current?.step(e.key === 'ArrowRight' ? 1 : -1)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      engineRef.current?.activate()
    }
  }

  return (
    <div
      ref={regionRef}
      data-orbit=""
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={items.length ? 0 : -1}
      onKeyDown={onKeyDown}
      className="relative isolate h-full w-full cursor-grab touch-pan-y select-none overflow-hidden outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-current"
      style={{ background: introCfg.background, containerType: 'inline-size' }}
    >
      {/* DOM fallback cards (shown only when WebGL is unavailable) */}
      <div ref={cardsRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
        {Array.from({ length: 32 }, (_, i) => (
          <div
            key={i}
            data-orbit-card=""
            className="absolute top-0 left-0 h-px w-px bg-cover bg-center opacity-0 will-change-transform"
          />
        ))}
      </div>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
      />

      {captionCfg.enabled !== false && (
        <svg
          ref={captionRef}
          data-orbit-caption=""
          aria-hidden="true"
          width="100%"
          height="100%"
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-200 ease-out"
        >
          <defs>
            <clipPath id="orbit-clip">
              <path data-orbit-caption-clip="" />
            </clipPath>
            <linearGradient id="orbit-shade" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.68" />
            </linearGradient>
          </defs>
          <g clipPath="url(#orbit-clip)">
            <path data-orbit-caption-shade="" fill="url(#orbit-shade)" />
            <foreignObject>
              <div
                data-orbit-caption-label=""
                xmlns="http://www.w3.org/1999/xhtml"
                className="flex h-full w-full items-center justify-between gap-3"
                style={{
                  color: captionCfg.color,
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '18px',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  lineHeight: '1.2em',
                  transform: 'translateY(4px)',
                  transition: reduced ? 'none' : 'transform 0.28s ease-out',
                }}
              >
                <span data-orbit-caption-title="" className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap" />
                <span data-orbit-caption-arrow="" className="shrink-0" style={{ display: 'none' }}>
                  ↗
                </span>
              </div>
            </foreignObject>
          </g>
        </svg>
      )}

      {/* Intro center mark */}
      <div
        ref={markRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 w-max opacity-0"
        style={{
          color: introCfg.color,
          fontFamily: '"Inter", sans-serif',
          fontSize: '30px',
          fontWeight: 500,
          letterSpacing: '-0.04em',
          lineHeight: '1.15em',
          whiteSpace: 'pre',
        }}
      >
        <span className="flex">
          {marks.map((ch, i) => (
            <span key={i} className="block overflow-hidden" style={{ padding: '0.14em 0' }}>
              <span data-orbit-part="" className="block">
                {ch}
              </span>
            </span>
          ))}
        </span>
      </div>

      <span aria-live="polite" aria-atomic="true" className="sr-only" />
    </div>
  )
}

export default OrbitGallery
