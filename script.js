(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const canvas = document.getElementById("water");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = 0;
  let h = 0;
  let t = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const waves = [
    { amp: 18, len: 0.008, speed: 0.018, y: 0.62, color: "rgba(90,160,255,0.18)", width: 1.5 },
    { amp: 26, len: 0.006, speed: 0.014, y: 0.68, color: "rgba(212,176,106,0.35)", width: 1.8 },
    { amp: 14, len: 0.011, speed: 0.022, y: 0.74, color: "rgba(120,190,255,0.16)", width: 1.2 },
    { amp: 34, len: 0.0045, speed: 0.01, y: 0.8, color: "rgba(212,176,106,0.22)", width: 2.2 },
    { amp: 20, len: 0.009, speed: 0.016, y: 0.86, color: "rgba(70,140,220,0.2)", width: 1.4 },
  ];

  const ribbons = [
    { y: 0.28, amp: 40, len: 0.0035, speed: 0.008, phase: 0, color: "rgba(212,176,106,0.45)", width: 1.4 },
    { y: 0.36, amp: 28, len: 0.0048, speed: 0.012, phase: 2.1, color: "rgba(230,200,130,0.28)", width: 1.1 },
    { y: 0.22, amp: 50, len: 0.0028, speed: 0.006, phase: 4.2, color: "rgba(180,150,90,0.25)", width: 1.6 },
  ];

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawBackground() {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#0b1d38");
    g.addColorStop(0.45, "#071428");
    g.addColorStop(1, "#02060f");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    const glow = ctx.createRadialGradient(w * 0.5, h * 0.18, 20, w * 0.5, h * 0.18, w * 0.55);
    glow.addColorStop(0, "rgba(70,140,220,0.28)");
    glow.addColorStop(1, "rgba(70,140,220,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
  }

  function drawPath(points, color, width) {
    ctx.beginPath();
    points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  function sampleWave(cfg, phaseExtra) {
    const points = [];
    const baseY = h * cfg.y;
    for (let x = 0; x <= w; x += 4) {
      const y =
        baseY +
        Math.sin(x * cfg.len + t * cfg.speed + (cfg.phase || 0) + phaseExtra) * cfg.amp +
        Math.sin(x * cfg.len * 2.2 + t * cfg.speed * 1.3) * (cfg.amp * 0.28);
      points.push({ x, y });
    }
    return points;
  }

  function frame() {
    t += 1;
    drawBackground();

    ribbons.forEach((r, i) => {
      const pts = sampleWave(r, i);
      drawPath(pts, r.color, r.width);
      // soft glow pass
      ctx.save();
      ctx.shadowColor = "rgba(212,176,106,0.35)";
      ctx.shadowBlur = 12;
      drawPath(pts, r.color, r.width * 0.7);
      ctx.restore();
    });

    waves.forEach((wave, i) => {
      const pts = sampleWave(wave, i * 0.7);
      drawPath(pts, wave.color, wave.width);
      // filled under wave for depth
      ctx.beginPath();
      pts.forEach((p, idx) => (idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = i % 2 === 0 ? "rgba(20,50,90,0.08)" : "rgba(30,70,120,0.06)";
      ctx.fill();
    });

    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(frame);
})();
