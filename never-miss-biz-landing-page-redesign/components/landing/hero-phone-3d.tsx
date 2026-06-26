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
    const LOOP_DURATION = 13; // seconds, full conversation cycle

    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = SCREEN_W;
    screenCanvas.height = SCREEN_H;
    const sctx = screenCanvas.getContext("2d")!;

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

    function drawBubble(
      c: CanvasRenderingContext2D,
      text: string,
      bg: string,
      fg: string,
      maxBubbleWidth: number,
      fontSize: number
    ) {
      const padX = 26, padY = 22, lineHeight = fontSize + 12;
      c.font = `bold ${fontSize}px -apple-system, Helvetica, Arial, sans-serif`;
      const lines = wrapText(c, text, maxBubbleWidth - padX * 2);
      const textWidth = Math.max(...lines.map((l) => c.measureText(l).width));
      const bubbleWidth = Math.min(maxBubbleWidth, textWidth + padX * 2);
      const bubbleHeight = lines.length * lineHeight + padY * 2;
      const x = (SCREEN_W - bubbleWidth) / 2;
      const y = (SCREEN_H - bubbleHeight) / 2;

      c.fillStyle = bg;
      roundRectPath(c, x, y, bubbleWidth, bubbleHeight, 22);
      c.fill();

      c.fillStyle = fg;
      c.textAlign = "left";
      c.textBaseline = "top";
      lines.forEach((line, i) => {
        const lineWidth = c.measureText(line).width;
        c.fillText(line, x + (bubbleWidth - lineWidth) / 2, y + padY + i * lineHeight + 2);
      });
    }

    function drawTyping(c: CanvasRenderingContext2D, phase: number) {
      const w = 140, h = 80;
      const x = (SCREEN_W - w) / 2;
      const y = (SCREEN_H - h) / 2;
      c.fillStyle = "#1f1f23";
      roundRectPath(c, x, y, w, h, 32);
      c.fill();
      for (let i = 0; i < 3; i++) {
        c.beginPath();
        const dotY = y + h / 2 + (i === phase ? -6 : 0);
        c.arc(x + 38 + i * 32, dotY, 7.5, 0, Math.PI * 2);
        c.fillStyle = i === phase ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)";
        c.fill();
      }
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
      c.fillText("(407) 555-0182", SCREEN_W / 2, y + 68);
    }

    // ---- One message at a time, large and centered — far more legible
    // at small phone sizes than a stacked conversation thread ----
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

      const maxWidth = 360;

      if (cycleT <= 1.8) {
        drawMissedCallCard(sctx);
      } else if (cycleT <= 4.4) {
        drawBubble(sctx, "Missed your call \u2014 got a time?", "#D4AF37", "#1a1407", maxWidth, 32);
      } else if (cycleT <= 5.8) {
        const phase = Math.floor((cycleT * 3) % 3);
        drawTyping(sctx, phase);
      } else if (cycleT <= 8.4) {
        drawBubble(sctx, "Yes, 2pm works!", "#1f1f23", "#f5f1e6", maxWidth, 34);
      } else if (cycleT <= 12.0) {
        drawBubble(sctx, "Booked for 2pm \u2705", "#D4AF37", "#1a1407", maxWidth, 36);
      }
    }

    drawScreen(0);
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    const screenGeo = new THREE.PlaneGeometry(1.5, 3.3);
    const screenMat = new THREE.MeshStandardMaterial({
      map: screenTexture,
      emissiveMap: screenTexture,
      emissive: 0xd4af37,
      emissiveIntensity: 0.5,
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.6,
      envMapIntensity: 0,
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
