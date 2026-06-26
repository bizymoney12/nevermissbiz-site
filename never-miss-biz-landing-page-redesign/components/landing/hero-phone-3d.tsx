"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 3D rotating phone centerpiece for the hero. Tilts toward the cursor,
 * shows a soft gold waveform on the screen, and pulses outward signal
 * rings — representing an incoming call being caught instead of missed.
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

  // Lighting — warm gold key light, cool fill, soft ambient for that glossy look
  // Note: intensities are higher than they'd "look like they should be" because three.js's
  // physically-correct lighting model (default since r155) requires much larger numbers
  // than the old simplified model for the same visual brightness — roughly a 4π factor.
  scene.add(new THREE.AmbientLight(0x404040, 3));
  const keyLight = new THREE.PointLight(0xd4af37, 90, 30);
  keyLight.position.set(4, 4, 6);
  scene.add(keyLight);
  const fillLight = new THREE.PointLight(0x6e89ff, 50, 30);
  fillLight.position.set(-5, -2, 4);
  scene.add(fillLight);
  const rimLight = new THREE.PointLight(0xffffff, 63, 30);
  rimLight.position.set(0, 5, -5);
  scene.add(rimLight);

    const phoneGroup = new THREE.Group();
    phoneGroup.scale.set(0.62, 0.62, 0.62);
    phoneGroup.position.set(0, -0.3, -1.4);
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

    // Bezel — modern rounded metal frame
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
    });
    const bezel = new THREE.Mesh(bezelGeo, bezelMat);
    phoneGroup.add(bezel);

    // Body — dark glass insert
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
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.z = 0.07;
    phoneGroup.add(body);

    // Screen — designed waveform graphic, flat plane for reliable UV mapping
    // (ExtrudeGeometry doesn't normalize UVs for custom shapes, which distorts textures)
    function buildScreenTexture() {
      const c = document.createElement("canvas");
      c.width = 420;
      c.height = 900;
      const cx = c.getContext("2d")!;
      cx.fillStyle = "#0d0a05";
      cx.fillRect(0, 0, c.width, c.height);

      cx.fillStyle = "rgba(212,175,55,0.35)";
      for (let i = 0; i < 4; i++) {
        cx.beginPath();
        cx.arc(168 + i * 22, 46, 3.5, 0, Math.PI * 2);
        cx.fill();
      }

      const barCount = 26;
      const barWidth = 7;
      const gap = 6;
      const totalWidth = barCount * (barWidth + gap);
      const startX = (c.width - totalWidth) / 2;
      const centerY = c.height * 0.56;
      cx.shadowColor = "rgba(212,175,55,0.55)";
      cx.shadowBlur = 16;
      for (let i = 0; i < barCount; i++) {
        const h = 16 + Math.abs(Math.sin(i * 0.45)) * 85 + Math.random() * 10;
        cx.fillStyle = "rgba(212,175,55,0.55)";
        cx.fillRect(startX + i * (barWidth + gap), centerY - h / 2, barWidth, h);
      }
      cx.shadowBlur = 0;
      return new THREE.CanvasTexture(c);
    }

    const screenGeo = new THREE.PlaneGeometry(1.5, 3.3);
    const screenTexture = buildScreenTexture();
    const screenMat = new THREE.MeshStandardMaterial({
      map: screenTexture,
      emissiveMap: screenTexture,
      emissive: 0xd4af37,
      emissiveIntensity: 0.55,
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
    function animate() {
      const t = clock.getElapsedTime();

      phoneGroup.rotation.y += (targetRotY - phoneGroup.rotation.y) * 0.06;
      phoneGroup.rotation.x += (-targetRotX - phoneGroup.rotation.x) * 0.06;
      phoneGroup.rotation.y += Math.sin(t * 0.4) * 0.0015;
      phoneGroup.position.y = Math.sin(t * 0.6) * 0.12;

      pulseRings.forEach((p) => {
        const local = ((t + p.delay) % 3.3) / 3.3;
        const scale = 1 + local * 2.2;
        p.mesh.scale.set(scale, scale, scale);
        (p.mesh.material as THREE.MeshBasicMaterial).opacity =
          local < 0.08 ? 0 : (1 - local) * 0.35;
      });

      (screen.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.55 + Math.sin(t * 1.1) * 0.1;

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
