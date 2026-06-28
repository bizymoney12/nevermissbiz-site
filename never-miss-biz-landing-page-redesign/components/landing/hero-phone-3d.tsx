"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 3D rotating phone centerpiece for the hero. Tilts toward the cursor,
 * and plays a looping SMS conversation on screen showing the actual
 * missed-call-recovery flow: missed call → automated text → reply →
 * booked confirmation.
 *
 * All geometry/material/texture disposal happens in the effect cleanup
 * to avoid leaking WebGL resources across client-side navigations.
 */
export function HeroPhone3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    // Lighting — pushed well past "looks right" on paper because three.js's
    // physically-correct lighting model (default since r155) needs much larger
    // numbers than the old simplified model for the same visual brightness.
    // Materials below also carry their own small self-emissive glow as a safety
    // net so the phone is never fully dependent on getting this math exactly right.
    scene.add(new THREE.AmbientLight(0x404040, 5));
    const keyLight = new THREE.PointLight(0xd4af37, 160, 30);
    keyLight.position.set(4, 4, 6);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(0x6e89ff, 90, 30);
    fillLight.position.set(-5, -2, 4);
    scene.add(fillLight);
    const rimLight = new THREE.PointLight(0xffffff, 110, 30);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    const isMobile = window.innerWidth < 768;
    const phoneGroup = new THREE.Group();
    phoneGroup.scale.set(isMobile ? 0.46 : 0.68, isMobile ? 0.46 : 0.68, isMobile ? 0.46 : 0.68);
    let baseY = isMobile ? -1.5 : -1.9;
    phoneGroup.position.set(0, baseY, -1.4);
    scene.add(phoneGroup);

    // Soft procedural environment for believable reflections on the metal bezel
    const envCanvas = document.createElement("canvas");
    envCanvas.width = 16;
    envCanvas.height = 256;
    const envCtx = envCanvas.getContext("2d")!;
    const grad = envCtx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, "#1a1712");
    grad.addColorStop(0.42, "#3a2f17");
    grad.addColorStop(0.5, "#D4AF37");
    grad.addColorStop(0.58, "#3a2f17");
    grad.addColorStop(1, "#08080a");
    envCtx.fillStyle = grad;
    envCtx.fillRect(0, 0, 16, 256);
    const envTexture = new THREE.CanvasTexture(envCanvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromEquirectangular(envTexture);
    scene.environment = envRT.texture;

    function roundedRect(w: number, h: number, r: number) {
      const s = new THREE.Shape();
      const x = -w / 2;
      const y = -h / 2;
      s.moveTo(x, y + r);
      s.lineTo(x, y + h - r);
      s.quadraticCurveTo(x, y + h, x + r, y + h);
      s.lineTo(x + w - r, y + h);
      s.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
      s.lineTo(x + w, y + r);
      s.quadraticCurveTo(x + w, y, x + w - r, y);
      s.lineTo(x + r, y);
      s.quadraticCurveTo(x, y, x, y + r);
      return s;
    }

    // Bezel — modern rounded metal frame. Small self-emissive glow so it
    // never goes fully dark even in worst-case lighting conditions.
    const bezelGeo = new THREE.ExtrudeGeometry(roundedRect(2.05, 4.1, 0.32), {
      depth: 0.32,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.02,
      bevelSegments: 4,
      curveSegments: 12,
    });
    bezelGeo.translate(0, 0, -0.16);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.92,
      roughness: 0.18,
      envMapIntensity: 1.1,
      emissive: 0xd4af37,
      emissiveIntensity: 0.18,
    });
    const bezel = new THREE.Mesh(bezelGeo, bezelMat);
    phoneGroup.add(bezel);

    // Body — dark glass insert, with a faint warm self-glow instead of pure black
    const bodyGeo = new THREE.ExtrudeGeometry(roundedRect(1.88, 3.92, 0.28), {
      depth: 0.26,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.012,
      bevelSegments: 3,
      curveSegments: 12,
    });
    bodyGeo.translate(0, 0, -0.13);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0c,
      metalness: 0.4,
      roughness: 0.22,
      envMapIntensity: 1.3,
      emissive: 0x1a140a,
      emissiveIntensity: 0.4,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.z = 0.07;
    phoneGroup.add(body);

    // ---- Screen: looping SMS conversation showing the actual product flow ----
    const SCREEN_W = 420;
    const SCREEN_H = 900;
    const RES_SCALE = 3; // bumped again for extra crispness margin
    const RING_DURATION = 1.6;
    const MISSED_CALL_DURATION = 1.8;
    const PHASE_OFFSET = RING_DURATION + MISSED_CALL_DURATION;
    const LOOP_DURATION = 16.5; // seconds, full conversation cycle

    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = SCREEN_W * RES_SCALE;
    screenCanvas.height = SCREEN_H * RES_SCALE;
    const sctx = screenCanvas.getContext("2d")!;
    sctx.scale(RES_SCALE, RES_SCALE);

    function roundRectPath(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
      c.beginPath();
      c.moveTo(x + r, y);
      c.lineTo(x + w - r, y);
      c.quadraticCurveTo(x + w, y, x + w, y + r);
      c.lineTo(x + w, y + h - r);
      c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      c.lineTo(x + r, y + h);
      c.quadraticCurveTo(x, y + h, x, y + h - r);
      c.lineTo(x, y + r);
      c.quadraticCurveTo(x, y, x + r, y);
      c.closePath();
    }

    function wrapText(c: CanvasRenderingContext2D, text: string, maxWidth: number) {
      const words = text.split(" ");
      const lines: string[] = [];
      let current = "";
      for (const word of words) {
        const test = current ? current + " " + word : word;
        if (c.measureText(test).width > maxWidth && current) {
          lines.push(current);
          current = word;
        } else {
          current = test;
        }
      }
      if (current) lines.push(current);
      return lines;
    }

    function drawRingingScreen(c: CanvasRenderingContext2D, t: number) {
      const cx = SCREEN_W / 2, cy = SCREEN_H / 2 - 40;
      const pulse = 1 + Math.sin(t * 7) * 0.1;

      // soft pulsing glow ring behind the icon
      const glowR = 70 + Math.sin(t * 7) * 8;
      const grad = c.createRadialGradient(cx, cy, 10, cx, cy, glowR);
      grad.addColorStop(0, "rgba(212,175,55,0.35)");
      grad.addColorStop(1, "rgba(212,175,55,0)");
      c.fillStyle = grad;
      c.beginPath();
      c.arc(cx, cy, glowR, 0, Math.PI * 2);
      c.fill();

      c.save();
      c.translate(cx, cy);
      c.scale(pulse, pulse);
      c.font = "60px -apple-system, Helvetica, Arial, sans-serif";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText("\uD83D\uDCDE", 0, 4);
      c.restore();

      c.textAlign = "center";
      c.textBaseline = "top";
      c.fillStyle = "rgba(255,255,255,0.6)";
      c.font = "600 20px -apple-system, Helvetica, Arial, sans-serif";
      c.fillText("Incoming Call...", SCREEN_W / 2, cy + 76);
    }

    function drawMissedCallCard(c: CanvasRenderingContext2D) {
      const w = 340, h = 140;
      const x = (SCREEN_W - w) / 2;
      const y = (SCREEN_H - h) / 2;
      c.fillStyle = "rgba(255,255,255,0.07)";
      roundRectPath(c, x, y, w, h, 24);
      c.fill();
      c.textAlign = "center";
      c.textBaseline = "top";
      c.fillStyle = "rgba(255,255,255,0.55)";
      c.font = "bold 19px -apple-system, Helvetica, Arial, sans-serif";
      c.fillText("MISSED CALL", SCREEN_W / 2, y + 30);
      c.fillStyle = "#ffffff";
      c.font = "bold 34px -apple-system, Helvetica, Arial, sans-serif";
      c.fillText("(407) 555-5555", SCREEN_W / 2, y + 68);
    }

    // ---- Conversation thread setup — bubbles accumulate and the stack
    // scrolls upward as new ones arrive, same as a real phone, instead of
    // swapping one message at a time. ----
    const BUBBLE_FONT = 23;
    const BUBBLE_LINE_H = BUBBLE_FONT + 10;
    const BUBBLE_PAD_X = 18;
    const BUBBLE_PAD_Y = 14;
    const BUBBLE_GAP = 12;
    const BUBBLE_MAX_W = 300;
    const MSG_AREA_TOP = 112;
    const MSG_AREA_BOTTOM = SCREEN_H - 22;

    function measureBubble(c: CanvasRenderingContext2D, text: string) {
      c.font = `600 ${BUBBLE_FONT}px -apple-system, Helvetica, Arial, sans-serif`;
      const lines = wrapText(c, text, BUBBLE_MAX_W - BUBBLE_PAD_X * 2);
      const textWidth = Math.max(...lines.map((l) => c.measureText(l).width));
      const bubbleWidth = Math.min(BUBBLE_MAX_W, textWidth + BUBBLE_PAD_X * 2);
      const bubbleHeight = lines.length * BUBBLE_LINE_H + BUBBLE_PAD_Y * 2;
      return { lines, bubbleWidth, bubbleHeight };
    }

    function drawBubbleAt(
      c: CanvasRenderingContext2D,
      text: string,
      align: "left" | "right",
      bg: string,
      fg: string,
      bottomY: number
    ) {
      const { lines, bubbleWidth, bubbleHeight } = measureBubble(c, text);
      const x = align === "right" ? SCREEN_W - 20 - bubbleWidth : 20;
      const y = bottomY - bubbleHeight;
      c.fillStyle = bg;
      roundRectPath(c, x, y, bubbleWidth, bubbleHeight, 18);
      c.fill();
      c.fillStyle = fg;
      c.textAlign = "left";
      c.textBaseline = "top";
      lines.forEach((line, i) => {
        c.fillText(line, x + BUBBLE_PAD_X, y + BUBBLE_PAD_Y + i * BUBBLE_LINE_H + 1);
      });
      return bubbleHeight;
    }

    function drawTypingAt(c: CanvasRenderingContext2D, align: "left" | "right", bottomY: number, phase: number) {
      const w = 84, h = 50;
      const x = align === "right" ? SCREEN_W - 20 - w : 20;
      const y = bottomY - h;
      c.fillStyle = "#1f1f23";
      roundRectPath(c, x, y, w, h, 24);
      c.fill();
      for (let i = 0; i < 3; i++) {
        c.beginPath();
        const dotY = y + h / 2 + (i === phase ? -4 : 0);
        c.arc(x + 22 + i * 20, dotY, 5, 0, Math.PI * 2);
        c.fillStyle = i === phase ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)";
        c.fill();
      }
      return h;
    }

    type ConvoEvent =
      | { t: number; type: "typing"; align: "left" | "right" }
      | { t: number; type: "msg"; align: "left" | "right"; bg: string; fg: string; text: string };

    const events: ConvoEvent[] = [
      { t: PHASE_OFFSET + 0.2, type: "typing", align: "right" },
      { t: PHASE_OFFSET + 1.0, type: "msg", align: "right", bg: "#D4AF37", fg: "#1a1407", text: "Sorry, we missed your call, how can we help?" },
      { t: PHASE_OFFSET + 2.4, type: "typing", align: "left" },
      { t: PHASE_OFFSET + 3.2, type: "msg", align: "left", bg: "#1f1f23", fg: "#f5f1e6", text: "I'd like to book an appointment!" },
      { t: PHASE_OFFSET + 4.6, type: "typing", align: "right" },
      { t: PHASE_OFFSET + 5.4, type: "msg", align: "right", bg: "#D4AF37", fg: "#1a1407", text: "We have 2pm or 4pm available, what works best?" },
      { t: PHASE_OFFSET + 6.8, type: "typing", align: "left" },
      { t: PHASE_OFFSET + 7.6, type: "msg", align: "left", bg: "#1f1f23", fg: "#f5f1e6", text: "Yes, 2pm works!" },
      { t: PHASE_OFFSET + 9.0, type: "typing", align: "right" },
      { t: PHASE_OFFSET + 9.8, type: "msg", align: "right", bg: "#D4AF37", fg: "#1a1407", text: "All set, booked for 2pm! \u2705" },
    ];

    function drawScreen(cycleT: number) {
      sctx.clearRect(0, 0, SCREEN_W, SCREEN_H);
      sctx.fillStyle = "#0d0a05";
      sctx.fillRect(0, 0, SCREEN_W, SCREEN_H);

      // Header (always visible)
      sctx.textAlign = "center";
      sctx.textBaseline = "top";
      sctx.fillStyle = "rgba(212,175,55,0.9)";
      sctx.font = "bold 28px -apple-system, Helvetica, Arial, sans-serif";
      sctx.fillText("AUTOMATED", SCREEN_W / 2, 54);
      sctx.fillStyle = "rgba(255,255,255,0.15)";
      sctx.fillRect(40, 96, SCREEN_W - 80, 1.5);

      if (cycleT <= RING_DURATION) {
        drawRingingScreen(sctx, cycleT);
        return;
      }
      if (cycleT <= PHASE_OFFSET) {
        drawMissedCallCard(sctx);
        return;
      }

      // Find active typing indicator: the most recent event at or before
      // cycleT, if it's a typing event (i.e. we haven't reached its message yet)
      let activeTyping: "left" | "right" | null = null;
      for (let i = events.length - 1; i >= 0; i--) {
        if (events[i].t <= cycleT) {
          if (events[i].type === "typing") activeTyping = events[i].align;
          break;
        }
      }

      const revealedMsgs = events.filter((e) => e.type === "msg" && e.t <= cycleT) as Extract<ConvoEvent, { type: "msg" }>[];
      const typingPhase = Math.floor((cycleT * 3) % 3);
      const areaHeight = MSG_AREA_BOTTOM - MSG_AREA_TOP;

      // First pass (newest-to-oldest): figure out which items actually fit
      // in the visible area, same logic regardless of which anchor we use.
      type StackItem =
        | { kind: "typing"; align: "left" | "right"; height: number }
        | { kind: "msg"; msg: Extract<ConvoEvent, { type: "msg" }>; height: number };
      const fitted: StackItem[] = [];
      let usedHeight = 0;
      if (activeTyping) {
        fitted.push({ kind: "typing", align: activeTyping, height: 50 });
        usedHeight += 50 + BUBBLE_GAP;
      }
      for (let i = revealedMsgs.length - 1; i >= 0; i--) {
        const msg = revealedMsgs[i];
        const { bubbleHeight } = measureBubble(sctx, msg.text);
        if (usedHeight + bubbleHeight + BUBBLE_GAP > areaHeight) break;
        fitted.push({ kind: "msg", msg, height: bubbleHeight });
        usedHeight += bubbleHeight + BUBBLE_GAP;
      }

      const totalRevealed = revealedMsgs.length + (activeTyping ? 1 : 0);
      const everythingFits = fitted.length === totalRevealed;

      if (everythingFits) {
        // Conversation hasn't filled the screen yet — start from the top,
        // newest message lowest, growing downward (how a thread naturally
        // begins) instead of being glued to the bottom with a big gap above.
        let y = MSG_AREA_TOP;
        for (let i = fitted.length - 1; i >= 0; i--) {
          const item = fitted[i];
          if (item.kind === "typing") drawTypingAt(sctx, item.align, y + item.height, typingPhase);
          else drawBubbleAt(sctx, item.msg.text, item.msg.align, item.msg.bg, item.msg.fg, y + item.height);
          y += item.height + BUBBLE_GAP;
        }
      } else {
        // Thread has overflowed the visible area — anchor to the bottom so
        // the newest message is always visible, older ones scroll up and
        // off the top, same as a real phone.
        let y = MSG_AREA_BOTTOM;
        for (const item of fitted) {
          if (item.kind === "typing") drawTypingAt(sctx, item.align, y, typingPhase);
          else drawBubbleAt(sctx, item.msg.text, item.msg.align, item.msg.bg, item.msg.fg, y);
          y -= item.height + BUBBLE_GAP;
        }
      }
    }

    drawScreen(0);
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const screenGeo = new THREE.PlaneGeometry(1.5, 3.3);
    // MeshBasicMaterial is unlit — the screen renders exactly as drawn on the
    // canvas regardless of scene lighting, which is also how a real phone
    // screen behaves (self-lit, not reflecting ambient light much). This is
    // what actually fixes the crispness — no more diffuse/specular softening
    // from the point lights affecting the text.
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.z = 0.23;
    phoneGroup.add(screen);

    // Camera notch — small detail that reads as "modern phone" at a glance
    const notchGeo = new THREE.ExtrudeGeometry(roundedRect(0.34, 0.085, 0.04), {
      depth: 0.02,
      bevelEnabled: false,
    });
    const notchMat = new THREE.MeshStandardMaterial({
      color: 0x000000,
      metalness: 0.2,
      roughness: 0.4,
    });
    const notch = new THREE.Mesh(notchGeo, notchMat);
    notch.position.set(0, 1.62, 0.28);
    phoneGroup.add(notch);

    // Pulsing signal rings emanating from the phone
    const pulseRings: { mesh: THREE.Mesh; delay: number }[] = [];
    for (let i = 0; i < 3; i++) {
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(1, 0.015, 8, 64),
        new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0 })
      );
      pulseRings.push({ mesh: torus, delay: i * 1.1 });
      phoneGroup.add(torus);
    }

    function resize() {
      if (!canvas) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      // Re-check mobile breakpoint on resize/orientation change
      const nowMobile = window.innerWidth < 768;
      const newScale = nowMobile ? 0.46 : 0.68;
      phoneGroup.scale.set(newScale, newScale, newScale);
      baseY = nowMobile ? -1.5 : -1.9;
    }
    window.addEventListener("resize", resize);
    resize();

    // Mouse parallax — tilt phone toward cursor
    let targetRotX = 0;
    let targetRotY = 0;
    function handleMouseMove(e: MouseEvent) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotY = nx * 0.45;
      targetRotX = ny * 0.25;
    }
    window.addEventListener("mousemove", handleMouseMove);

    const clock = new THREE.Clock();
    let frameId = 0;
    let lastDrawTick = -1;
    function animate() {
      const t = clock.getElapsedTime();
      const cycleT = t % LOOP_DURATION;

      phoneGroup.rotation.y += (targetRotY - phoneGroup.rotation.y) * 0.06;
      phoneGroup.rotation.x += (-targetRotX - phoneGroup.rotation.x) * 0.06;
      phoneGroup.rotation.y += Math.sin(t * 0.4) * 0.0015;
      phoneGroup.position.y = baseY + Math.sin(t * 0.6) * 0.12;

      pulseRings.forEach((p) => {
        const local = ((t + p.delay) % 3.3) / 3.3;
        const scale = 1 + local * 2.2;
        p.mesh.scale.set(scale, scale, scale);
        (p.mesh.material as THREE.MeshBasicMaterial).opacity =
          local < 0.08 ? 0 : (1 - local) * 0.35;
      });

      // Redraw the screen ~10x/sec — smooth enough for the typing dots,
      // cheap enough to not matter for performance.
      const tick = Math.floor(cycleT * 10);
      if (tick !== lastDrawTick) {
        lastDrawTick = tick;
        drawScreen(cycleT);
        screenTexture.needsUpdate = true;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);

      bezelGeo.dispose();
      bodyGeo.dispose();
      screenGeo.dispose();
      notchGeo.dispose();
      bezelMat.dispose();
      bodyMat.dispose();
      screenMat.dispose();
      notchMat.dispose();
      screenTexture.dispose();
      envTexture.dispose();
      envRT.texture.dispose();
      pulseRings.forEach((p) => {
        p.mesh.geometry.dispose();
        (p.mesh.material as THREE.Material).dispose();
      });
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
