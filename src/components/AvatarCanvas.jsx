import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AvatarCanvas({ appState, activePersona }) {
  const mountRef = useRef(null);
  const blendshapesRef = useRef(new Float32Array(52));
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const headMeshRef = useRef(null);
  const jawGroupRef = useRef(null);
  const haloRingRef = useRef(null);
  const eyesMeshRef = useRef(null);

  // Expose Global Window API for immediate cross-thread Lip-Sync ingestion from InteractiveDashboard
  useEffect(() => {
    window.dispatchAvatarBlendshapes = (blendshapesArray) => {
      if (!blendshapesArray) return;
      for (let i = 0; i < blendshapesArray.length; i++) {
        const item = blendshapesArray[i];
        if (typeof item === 'object' && item !== null) {
          if (item.categoryName === 'jawOpen') blendshapesRef.current[17] = item.score || 0;
          if (item.categoryName === 'mouthFunnel') blendshapesRef.current[37] = item.score || 0;
          if (item.categoryName === 'mouthSmileLeft') blendshapesRef.current[28] = item.score || 0;
          if (item.categoryName === 'mouthSmileRight') blendshapesRef.current[29] = item.score || 0;
        } else if (typeof item === 'number') {
          if (i < 52) blendshapesRef.current[i] = item;
        }
      }
    };
    window.dispatchAvatarRms = (rmsEnergy) => {
      // Procedural synthetic ARKit fallback mapping upon MediaPipe CDN network rejections
      blendshapesRef.current[17] = Math.min(1.0, rmsEnergy * 3.2); // jawOpen
      blendshapesRef.current[37] = Math.min(1.0, rmsEnergy * 1.8); // mouthFunnel
      blendshapesRef.current[28] = Math.min(0.8, rmsEnergy * 1.2); // mouthSmileLeft
      blendshapesRef.current[29] = Math.min(0.8, rmsEnergy * 1.2); // mouthSmileRight
    };
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. WebGL Renderer Initialization
    const width = mountRef.current.clientWidth || 260;
    const height = mountRef.current.clientHeight || 260;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Three.js Scene & Camera Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 2.5);

    // 3. Cinematic Directional Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    keyLight.position.set(2, 2, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa855f7, 1.5);
    fillLight.position.set(-2, 1, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x10b981, 1.8);
    rimLight.position.set(0, 3, -2);
    scene.add(rimLight);

    // 4. Construct Highly Advanced Cybernetic Humanoid Avatar Master Group
    const avatarGroup = new THREE.Group();
    avatarGroup.position.set(0, -0.2, 0);

    // Dynamic Visor / Holographic Inner Core
    const coreGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const coreMat = new THREE.MeshPhysicalMaterial({
      roughness: 0.2,
      metalness: 0.85,
      color: activePersona === 'Alex' ? 0x0f172a : activePersona === 'Sam' ? 0x1e1b4b : 0x052e16,
      emissive: activePersona === 'Alex' ? 0x0284c7 : activePersona === 'Sam' ? 0x7c3aed : 0x059669,
      emissiveIntensity: 0.35,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    const headMesh = new THREE.Mesh(coreGeo, coreMat);
    headMeshRef.current = headMesh;
    avatarGroup.add(headMesh);

    // Cybernetic Neural Facial Framework (Articulated Lip / Jaw Matrix)
    const jawGroup = new THREE.Group();
    jawGroupRef.current = jawGroup;
    const lowerLipGeo = new THREE.TorusGeometry(0.25, 0.05, 16, 32, Math.PI);
    const lipMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.6
    });
    const lowerLip = new THREE.Mesh(lowerLipGeo, lipMat);
    lowerLip.rotation.z = Math.PI;
    lowerLip.position.set(0, -0.15, 0.42);
    jawGroup.add(lowerLip);
    avatarGroup.add(jawGroup);

    // Holographic Eye Visor Optics
    const eyesGeo = new THREE.CapsuleGeometry(0.12, 0.35, 16, 32);
    const eyesMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true
    });
    const eyesMesh = new THREE.Mesh(eyesGeo, eyesMat);
    eyesMesh.rotation.z = Math.PI / 2;
    eyesMesh.position.set(0, 0.18, 0.48);
    eyesMeshRef.current = eyesMesh;
    avatarGroup.add(eyesMesh);

    // Floating Cybernetic Processing Halo Ring
    const ringGeo = new THREE.TorusGeometry(0.9, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: activePersona === 'Alex' ? 0x38bdf8 : activePersona === 'Sam' ? 0xa855f7 : 0x34d399,
      side: THREE.DoubleSide
    });
    const haloRing = new THREE.Mesh(ringGeo, ringMat);
    haloRing.rotation.x = Math.PI / 2;
    haloRing.position.set(0, 0.75, 0);
    haloRingRef.current = haloRing;
    avatarGroup.add(haloRing);

    scene.add(avatarGroup);

    // 5. High-Performance requestAnimationFrame Morph Target Interaction Loop
    let animFrameId;
    let clock = new THREE.Clock();

    const executeRenderLoop = () => {
      animFrameId = requestAnimationFrame(executeRenderLoop);
      const elapsedTime = clock.getElapsedTime();

      // Idle Micro-Animations (Breathing floating & Visor rotation)
      avatarGroup.position.y = -0.2 + Math.sin(elapsedTime * 1.5) * 0.05;
      avatarGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.15;
      if (haloRingRef.current) {
        haloRingRef.current.rotation.z = elapsedTime * 1.2;
      }

      // Live Dynamic UI Lighting / Visor Emissive Shifts matching Master appState
      if (eyesMeshRef.current && headMeshRef.current) {
        let targetEyeColor = 0x38bdf8;
        let targetEmissiveIntensity = 0.35;
        
        if (appState === 'PRESENTING') {
          targetEyeColor = 0x3b82f6;
          targetEmissiveIntensity = 0.8;
        } else if (appState === 'LISTENING') {
          targetEyeColor = 0xf59e0b;
          targetEmissiveIntensity = 0.9;
        } else if (appState === 'ANSWERING') {
          targetEyeColor = 0xa855f7;
          targetEmissiveIntensity = 1.0;
        }

        eyesMeshRef.current.material.color.setHex(targetEyeColor);
        headMeshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(headMeshRef.current.material.emissiveIntensity, targetEmissiveIntensity, 0.1);
      }

      // Buttery 60 FPS Real-Time ARKit Blendshape Lip-Sync Procedural Scaling
      if (jawGroupRef.current) {
        const jawOpenWeight = blendshapesRef.current[17] || 0; // ARKit index 17 = jawOpen
        const mouthFunnelWeight = blendshapesRef.current[37] || 0; // ARKit index 37 = mouthFunnel

        // Interpolate Articulated Jaw Position and Scale
        const targetJawY = -0.15 - (jawOpenWeight * 0.22);
        const targetJawScaleY = 1.0 + (mouthFunnelWeight * 0.8);

        jawGroupRef.current.position.y = THREE.MathUtils.lerp(jawGroupRef.current.position.y, targetJawY, 0.25);
        jawGroupRef.current.scale.y = THREE.MathUtils.lerp(jawGroupRef.current.scale.y, targetJawScaleY, 0.25);
        
        // Procedurally scale floating halo processing rings and holographic eye optics
        if (haloRingRef.current) {
          haloRingRef.current.scale.setScalar(THREE.MathUtils.lerp(haloRingRef.current.scale.x, 1.0 + (jawOpenWeight * 0.35), 0.2));
        }
        if (eyesMeshRef.current) {
          const smileWeight = blendshapesRef.current[28] || 0; // ARKit index 28 = mouthSmileLeft
          eyesMeshRef.current.scale.y = THREE.MathUtils.lerp(eyesMeshRef.current.scale.y, 1.0 + (smileWeight * 0.45), 0.2);
        }
      }

      renderer.render(scene, camera);
    };

    executeRenderLoop();

    // Clean Resizing & Context Termination
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return;
      const nw = mountRef.current.clientWidth || 260;
      const nh = mountRef.current.clientHeight || 260;
      rendererRef.current.setSize(nw, nh);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [appState, activePersona]);

  return (
    <div
      ref={mountRef}
      style={{
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(2,6,23,0.9))',
        border: appState === 'PRESENTING' ? '4px solid #3b82f6' : appState === 'LISTENING' ? '4px solid #f59e0b' : appState === 'ANSWERING' ? '4px solid #8b5cf6' : '4px solid #475569',
        boxShadow: appState === 'PRESENTING' ? '0 0 45px rgba(59,130,246,0.4)' : appState === 'ANSWERING' ? '0 0 45px rgba(168,85,247,0.4)' : '0 10px 25px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        transition: 'all 0.3s ease'
      }}
    />
  );
}
