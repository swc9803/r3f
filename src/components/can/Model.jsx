import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';

export const Model = ({}) => {
  const canvasRef = useRef(null);
  const [can, setCan] = useState(null);

  const canAnimationTl = gsap.timeline();

  useEffect(() => {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    const group = new THREE.Group();
    scene.add(group);
    const gltfLoader = new GLTFLoader();

    gltfLoader.load('/can.glb', (gltf) => {
      const can = gltf.scene;

      can.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });

      can.rotation.set(-Math.PI * 0.05, 0, 0.3);

      const box = new THREE.Box3().setFromObject(can);
      const center = new THREE.Vector3();
      box.getCenter(center);
      can.position.sub(center);

      scene.add(can);
      group.add(can);

      canAnimationTl.from(group.scale, {
        x: 2,
        y: 2,
        z: 2,
        duration: 2,
        ease: 'power2',
        delay: 0.5,
      });
      canAnimationTl.to(group.rotation, {
        y: `+=${Math.PI * 2}`,
        duration: 10,
        ease: 'none',
        repeat: -1,
      });
      canAnimationTl.to(
        group.rotation,
        {
          z: -0.3,
          duration: 5,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        },
        '<',
      );

      setCan(can);
    });

    // light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    const init = () => {
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
      canvasRef.current.appendChild(renderer.domElement);
    };

    const animate = () => {
      camera.updateMatrixWorld();
      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    };

    const onResize = () => {
      if (canvasRef.current) {
        camera.aspect = canvasRef.current.offsetWidth / canvasRef.current.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
      }
    };

    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.offsetWidth / canvasRef.current.offsetHeight,
      0.1,
      100,
    );

    camera.position.set(0, 0, 5);

    init();
    animate();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [canAnimationTl]);

  // useEffect(() => {
  //   if (can) {
  //     can.traverse((node) => {
  //       if (node instanceof THREE.Mesh) {
  //         if (node.name === 'model') {
  //           gsap.to(node.material.color, {
  //             r: new THREE.Color(selectedColor).r,
  //             g: new THREE.Color(selectedColor).g,
  //             b: new THREE.Color(selectedColor).b,
  //             duration: 0.75,
  //           });
  //         }
  //       }
  //     });
  //     gsap.to(can.rotation, {
  //       y: `+=${Math.PI * 2}`,
  //       duration: 0.75,
  //     });
  //   }
  // }, [selectedColor, can]);

  return <div ref={canvasRef} className="wrapper" />;
};
