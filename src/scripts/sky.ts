/**
 * Sun and moon for a fixed place, and the sky that follows from them.
 *
 * Positions use the low-precision Meeus/NOAA formulations — far more accuracy
 * than a 320px drawing needs, and pure arithmetic, so nothing is fetched.
 * Checked against known values for Florianópolis: solar noon altitude 39.0° at
 * the June solstice (39.0° expected) and 85.8° at the December one (85.8°).
 */

const RAD = Math.PI / 180;
const LAT = -27.5954;
const LON = -48.548;

/** Brazil abolished DST in 2019, so this offset is a constant. If that ever
    changes, the caption and the sky both silently drift by an hour. */
const UTC_OFFSET = -3;

type Position = { altitude: number; azimuth: number };
type RGB = [number, number, number];

const days = (d: Date) => d.valueOf() / 86400000 - 0.5 + 2440588 - 2451545;

const horizontal = (H: number, dec: number): Position => {
  const phi = LAT * RAD;
  return {
    altitude:
      Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H)) / RAD,
    azimuth:
      (Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(dec) * Math.cos(phi)) / RAD +
        180 +
        360) %
      360,
  };
};

const siderealHourAngle = (d: number, ra: number) =>
  (280.16 + 360.9856235 * d) * RAD - -LON * RAD - ra;

export function sunPosition(date: Date): Position {
  const d = days(date);
  const M = (357.5291 + 0.98560028 * d) * RAD;
  const C = (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M)) * RAD;
  const L = M + C + Math.PI + 102.9372 * RAD;
  const e = 23.4397 * RAD;
  const dec = Math.asin(Math.sin(e) * Math.sin(L));
  const ra = Math.atan2(Math.cos(e) * Math.sin(L), Math.cos(L));
  return horizontal(siderealHourAngle(d, ra), dec);
}

export function moonData(date: Date): Position & { fraction: number; waxing: boolean } {
  const d = days(date);
  const e = 23.4397 * RAD;
  const M = (134.963 + 13.064993 * d) * RAD;
  const L = (218.316 + 13.176396 * d) * RAD;
  const F = (93.272 + 13.22935 * d) * RAD;
  const lam = L + 6.289 * RAD * Math.sin(M);
  const bet = 5.128 * RAD * Math.sin(F);
  const ra = Math.atan2(Math.sin(lam) * Math.cos(e) - Math.tan(bet) * Math.sin(e), Math.cos(lam));
  const dec = Math.asin(Math.sin(bet) * Math.cos(e) + Math.cos(bet) * Math.sin(e) * Math.sin(lam));

  const sM = (357.5291 + 0.98560028 * d) * RAD;
  const sL = sM + (1.9148 * Math.sin(sM) + 0.02 * Math.sin(2 * sM)) * RAD + Math.PI + 102.9372 * RAD;
  const sRa = Math.atan2(Math.cos(e) * Math.sin(sL), Math.cos(sL));
  const sDec = Math.asin(Math.sin(e) * Math.sin(sL));

  const dist = 385001 - 20905 * Math.cos(M);
  const sdist = 149598000;
  const psi = Math.acos(
    Math.sin(sDec) * Math.sin(dec) + Math.cos(sDec) * Math.cos(dec) * Math.cos(sRa - ra),
  );
  const inc = Math.atan2(sdist * Math.sin(psi), dist - sdist * Math.cos(psi));
  const angle = Math.atan2(
    Math.cos(sDec) * Math.sin(sRa - ra),
    Math.sin(sDec) * Math.cos(dec) - Math.cos(sDec) * Math.sin(dec) * Math.cos(sRa - ra),
  );

  return {
    ...horizontal(siderealHourAngle(d, ra), dec),
    fraction: (1 + Math.cos(inc)) / 2,
    waxing: angle < 0,
  };
}

/** zenith / mid / horizon, keyed on solar altitude in degrees. */
const STOPS: [number, RGB, RGB, RGB][] = [
  [-90, [1, 3, 10], [2, 4, 11], [4, 6, 14]],
  [-15, [4, 8, 18], [7, 13, 28], [13, 21, 40]],
  [-8, [10, 18, 38], [22, 30, 58], [48, 40, 66]],
  [-4, [20, 32, 62], [46, 44, 82], [116, 62, 74]],
  [-1, [30, 46, 84], [78, 60, 96], [176, 88, 68]],
  [2, [38, 74, 132], [116, 106, 122], [226, 126, 62]],
  [7, [44, 96, 168], [130, 146, 168], [236, 176, 116]],
  [18, [46, 106, 184], [110, 152, 200], [196, 208, 214]],
  [45, [40, 104, 184], [92, 147, 203], [183, 212, 228]],
  [90, [30, 92, 178], [78, 134, 196], [166, 200, 222]],
];

const lerp = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

const rgba = (c: RGB, alpha = 1) =>
  `rgba(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])},${alpha})`;

export function palette(altitude: number) {
  let i = 0;
  while (i < STOPS.length - 2 && altitude > STOPS[i + 1][0]) i++;
  const a = STOPS[i];
  const b = STOPS[i + 1];
  const t = Math.max(0, Math.min(1, (altitude - a[0]) / (b[0] - a[0])));
  return { zenith: lerp(a[1], b[1], t), mid: lerp(a[2], b[2], t), horizon: lerp(a[3], b[3], t) };
}

/** North-facing aperture: in the southern hemisphere the sun crosses the north,
    so one window sees the whole arc from rise to set. */
const FOV = 270;

function project(pos: Position, aspect: number, pad: number) {
  const rel = ((pos.azimuth + 180) % 360) - 180;
  const y = 92 - (Math.max(-8, Math.min(90, pos.altitude)) / 90) * 88;
  // The aperture is an arch, so the usable width narrows toward the top.
  const rTop = 50 / aspect;
  let half = 50;
  if (y < rTop) {
    const k = 1 - (rTop - y) / rTop;
    half = 50 * Math.sqrt(Math.max(0, 1 - (1 - k) * (1 - k)));
  }
  half = Math.max(6, half - pad);
  return {
    x: Math.max(50 - half, Math.min(50 + half, 50 + (rel / FOV) * 100)),
    y,
    visible: Math.abs(rel) < FOV / 2,
  };
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const SVG = "http://www.w3.org/2000/svg";
const MASK =
  "linear-gradient(180deg,transparent 0%,rgba(0,0,0,.5) 8%,#000 24%,#000 66%,rgba(0,0,0,.4) 88%,transparent 99%)";

function cloudDeck(filter: string, lit: RGB, base: RGB, opacity: number, dur: number, reverse: boolean) {
  const wrap = document.createElement("div");
  wrap.className = "sky-layer";
  wrap.style.opacity = Math.min(1, opacity).toFixed(2);
  wrap.style.webkitMaskImage = MASK;
  wrap.style.maskImage = MASK;

  const inner = document.createElement("div");
  inner.className = "sky-pan";
  inner.style.animation = `${reverse ? "skyPanReverse" : "skyPan"} ${dur}s linear infinite`;

  const svg = document.createElementNS(SVG, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("preserveAspectRatio", "none");

  const id = `${filter}-${Math.round(lit[0] + base[1] * 7 + opacity * 1000)}`;
  const defs = document.createElementNS(SVG, "defs");
  const grad = document.createElementNS(SVG, "linearGradient");
  grad.setAttribute("id", id);
  grad.setAttribute("x1", "0");
  grad.setAttribute("y1", "0");
  grad.setAttribute("x2", "0");
  grad.setAttribute("y2", "1");
  ([[0, lit], [0.5, lerp(lit, base, 0.4)], [1, base]] as [number, RGB][]).forEach(([offset, c]) => {
    const stop = document.createElementNS(SVG, "stop");
    stop.setAttribute("offset", String(offset));
    stop.setAttribute("stop-color", rgba(c));
    grad.appendChild(stop);
  });
  defs.appendChild(grad);
  svg.appendChild(defs);

  const rect = document.createElementNS(SVG, "rect");
  rect.setAttribute("width", "100%");
  rect.setAttribute("height", "100%");
  rect.setAttribute("fill", `url(#${id})`);
  rect.setAttribute("filter", `url(#${filter})`);
  svg.appendChild(rect);
  inner.appendChild(svg);
  wrap.appendChild(inner);
  return wrap;
}

export function renderSky(
  host: HTMLElement,
  spill: HTMLElement | null,
  caption: HTMLElement | null,
  now: Date,
) {
  const sun = sunPosition(now);
  const moon = moonData(now);
  const alt = sun.altitude;
  const pal = palette(alt);

  const W = host.clientWidth || 252;
  const H = host.clientHeight || 315;
  const aspect = H / W || 1.25;
  const sp = project(sun, aspect, 7);
  const mp = project(moon, aspect, 9);

  const dayness = clamp01((alt + 6) / 12);
  const night = 1 - clamp01((alt + 12) / 14);

  host.replaceChildren();

  const sky = document.createElement("div");
  sky.className = "sky-layer";
  sky.style.background = `linear-gradient(180deg,${rgba(pal.zenith)} 0%,${rgba(pal.mid)} 52%,${rgba(pal.horizon)} 100%)`;
  host.appendChild(sky);

  // Scattering bloom sits where the sun actually is, not at a fixed corner.
  if (sp.visible && alt > -12) {
    const strength = clamp01(1 - Math.abs(alt) / 26) * 0.85 + 0.15;
    const bloom = document.createElement("div");
    bloom.className = "sky-layer";
    bloom.style.background =
      `radial-gradient(120% 78% at ${sp.x.toFixed(1)}% ${Math.min(104, sp.y + 12).toFixed(1)}%,` +
      `${rgba(lerp(pal.horizon, [255, 214, 150], 0.55), 0.85 * strength)} 0%,` +
      `${rgba(pal.horizon, 0.32 * strength)} 34%,transparent 68%)`;
    host.appendChild(bloom);
  }

  if (night > 0.05) {
    const field = document.createElement("div");
    field.className = "sky-layer";
    field.style.opacity = night.toFixed(2);
    const tints = ["#fff", "#fff", "#fff6e2", "#e6eeff"];
    for (let i = 0; i < 78; i++) {
      const star = document.createElement("i");
      star.className = "sky-star";
      const size = Math.random() < 0.82 ? 1 : Math.random() < 0.9 ? 1.5 : 2;
      star.style.width = star.style.height = `${size}px`;
      star.style.left = `${(3 + Math.random() * 94).toFixed(1)}%`;
      star.style.top = `${(2 + Math.random() * 62).toFixed(1)}%`;
      star.style.opacity = (0.2 + Math.random() * 0.8).toFixed(2);
      star.style.background = tints[Math.floor(Math.random() * tints.length)];
      if (size > 1) star.style.boxShadow = `0 0 ${size * 2.2}px rgba(255,255,255,.7)`;
      // Only a fifth twinkle; a field where every star pulses reads as cartoon.
      if (Math.random() < 0.2) {
        star.style.animation = `skyTwinkle ${(3.4 + Math.random() * 4.6).toFixed(1)}s ease-in-out ${(Math.random() * 6).toFixed(1)}s infinite`;
      }
      field.appendChild(star);
    }
    host.appendChild(field);
  }

  if (mp.visible && moon.altitude > -2 && night > 0.02) {
    host.appendChild(drawMoon(mp, moon, W, night));
  }

  if (sp.visible && alt > -1.2) {
    const low = clamp01(1 - alt / 12);
    const core = lerp([255, 253, 244], [255, 148, 62], low * 0.92);
    const size = W * 0.14 * (1 + low * 0.85);
    const disc = document.createElement("div");
    disc.className = "sky-sun";
    // Refraction flattens the disc as it nears the horizon.
    disc.style.width = `${size * (1 + low * 0.22)}px`;
    disc.style.height = `${size}px`;
    disc.style.left = `${sp.x}%`;
    disc.style.top = `${sp.y}%`;
    disc.style.background =
      `radial-gradient(circle,#fffdf6 0%,${rgba(core)} 46%,${rgba(core)} 62%,${rgba(core, 0.5)} 68%,rgba(255,255,255,0) 78%)`;
    disc.style.filter =
      `drop-shadow(0 0 ${30 + low * 44}px ${rgba(core, 0.7)}) drop-shadow(0 0 ${10 + low * 14}px ${rgba(core, 0.85)})`;
    host.appendChild(disc);
  }

  const lit = lerp(pal.horizon, [255, 250, 238], 0.42 * dayness + 0.1);
  const base = lerp(pal.zenith, [16, 20, 32], 0.34);
  const cover = 0.4;
  host.appendChild(cloudDeck("sky-cirrus", lit, base, 0.12 + cover * 0.18, 190, false));
  host.appendChild(cloudDeck("sky-alto", lit, base, 0.1 + cover * 0.34, 118, true));
  host.appendChild(cloudDeck("sky-cumulus", lit, base, 0.09 + cover * 0.5, 300, false));

  // City skyglow from below: Florianópolis is coastal, so he is never lit by
  // nothing. This is what keeps his face readable after dark.
  if (night > 0.1) {
    const glow = document.createElement("div");
    glow.className = "sky-layer";
    glow.style.background = `radial-gradient(120% 62% at 50% 108%,rgba(226,158,84,${(0.3 * night).toFixed(2)}) 0%,transparent 72%)`;
    host.appendChild(glow);
  }

  const portrait = host.parentElement?.querySelector<HTMLImageElement>(".sky-portrait");
  if (portrait) {
    portrait.style.filter =
      `brightness(${(0.66 + 0.42 * dayness).toFixed(2)}) contrast(${(0.98 + 0.08 * dayness).toFixed(2)})` +
      ` saturate(${(0.72 + 0.32 * dayness).toFixed(2)})` +
      ` drop-shadow(0 0 3px rgba(255,226,178,${(0.12 + 0.2 * dayness).toFixed(2)}))`;
  }

  // The light landing on him is the sky's own horizon colour.
  if (spill) {
    const c = `rgba(${pal.horizon.map((v) => Math.round(v)).join(",")},`;
    spill.style.background =
      `linear-gradient(172deg,${c}${(0.16 + 0.3 * dayness).toFixed(2)}) 0%,` +
      `${c}${(0.06 + 0.12 * dayness).toFixed(2)}) 48%,transparent 78%)`;
    spill.style.mixBlendMode = night > 0.5 ? "multiply" : "soft-light";
  }

  if (caption) {
    const local = new Date(now.valueOf() + (UTC_OFFSET * 60 + now.getTimezoneOffset()) * 60000);
    const h24 = local.getHours();
    const mm = String(local.getMinutes()).padStart(2, "0");
    const clock = `${h24 % 12 || 12}:${mm} ${h24 < 12 ? "AM" : "PM"}`;
    caption.innerHTML = (caption.dataset.template || "").replace("{time}", `<b>${clock}</b>`);
  }
}

function drawMoon(
  mp: { x: number; y: number },
  moon: { fraction: number; waxing: boolean },
  W: number,
  night: number,
) {
  const md = Math.max(18, W * 0.175);
  const R = md / 2;
  const f = Math.max(0.02, Math.min(0.98, moon.fraction));
  const rx = R * (2 * f - 1);
  const sweep = rx >= 0 ? 1 : 0;
  // The terminator is an ellipse, so the lit region is two arcs. Offsetting a
  // dark disc instead only ever looks right for a crescent.
  const d = `M ${R},0 A ${R},${R} 0 0,1 ${R},${md} A ${Math.abs(rx).toFixed(2)},${R} 0 0,${sweep} ${R},0 Z`;
  const uid = `m${Math.round(f * 1000)}`;

  const svg = document.createElementNS(SVG, "svg");
  svg.setAttribute("viewBox", `0 0 ${md} ${md}`);
  svg.setAttribute("width", String(md));
  svg.setAttribute("height", String(md));
  svg.setAttribute("class", "sky-moon");
  svg.style.left = `${mp.x}%`;
  svg.style.top = `${mp.y}%`;
  svg.style.opacity = clamp01(night * 1.3).toFixed(2);
  if (!moon.waxing) svg.style.transform = "translate(-50%,-50%) scaleX(-1)";
  svg.style.filter = `drop-shadow(0 0 ${(12 + 14 * night).toFixed(0)}px rgba(206,220,246,${(0.26 * night).toFixed(2)}))`;

  const defs = document.createElementNS(SVG, "defs");
  const grad = document.createElementNS(SVG, "radialGradient");
  grad.setAttribute("id", uid);
  grad.setAttribute("cx", "38%");
  grad.setAttribute("cy", "34%");
  [["0", "#fbf7ec"], [".55", "#e6dfcd"], [".85", "#c2baa5"], ["1", "#a49b86"]].forEach(([o, c]) => {
    const stop = document.createElementNS(SVG, "stop");
    stop.setAttribute("offset", o);
    stop.setAttribute("stop-color", c);
    grad.appendChild(stop);
  });
  defs.appendChild(grad);

  const clip = document.createElementNS(SVG, "clipPath");
  clip.setAttribute("id", `c${uid}`);
  const clipPath = document.createElementNS(SVG, "path");
  clipPath.setAttribute("d", d);
  clip.appendChild(clipPath);
  defs.appendChild(clip);
  svg.appendChild(defs);

  // Full disc first: a gibbous moon reads as a sphere with a shadow on it,
  // not as a floating lune. Earthshine only lifts a thin crescent, as in life.
  const disc = document.createElementNS(SVG, "circle");
  disc.setAttribute("cx", String(R));
  disc.setAttribute("cy", String(R));
  disc.setAttribute("r", String(R));
  disc.setAttribute("fill", f < 0.25 ? "#252b3c" : "#191e2b");
  disc.setAttribute("opacity", "0.95");
  svg.appendChild(disc);

  const rim = document.createElementNS(SVG, "circle");
  rim.setAttribute("cx", String(R));
  rim.setAttribute("cy", String(R));
  rim.setAttribute("r", String(R - 0.4));
  rim.setAttribute("fill", "none");
  rim.setAttribute("stroke", "rgba(206,218,242,.26)");
  rim.setAttribute("stroke-width", "0.9");
  svg.appendChild(rim);

  const path = document.createElementNS(SVG, "path");
  path.setAttribute("d", d);
  path.setAttribute("fill", `url(#${uid})`);
  svg.appendChild(path);

  const maria = document.createElementNS(SVG, "g");
  maria.setAttribute("clip-path", `url(#c${uid})`);
  maria.setAttribute("opacity", "0.14");
  maria.setAttribute("filter", "url(#sky-soft)");
  ([[0.4, 0.31, 0.15], [0.57, 0.38, 0.1], [0.45, 0.53, 0.12], [0.63, 0.63, 0.08], [0.32, 0.63, 0.07]] as [number, number, number][])
    .forEach(([cx, cy, r]) => {
      const e = document.createElementNS(SVG, "ellipse");
      e.setAttribute("cx", (cx * md).toFixed(1));
      e.setAttribute("cy", (cy * md).toFixed(1));
      e.setAttribute("rx", (r * md).toFixed(1));
      e.setAttribute("ry", (r * md * 0.8).toFixed(1));
      e.setAttribute("fill", "#8d8674");
      maria.appendChild(e);
    });
  svg.appendChild(maria);

  return svg;
}
