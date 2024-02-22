import { useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import gsap from 'gsap';
import './index.css';

export const Model = ({ selectedColor }) => {
  const gltf = useLoader(GLTFLoader, '/can/can.glb');

  const canAnimationTl = gsap.timeline();

  canAnimationTl.from(gltf.scene.scale, {
    x: 2,
    y: 2,
    z: 2,
    duration: 2,
    ease: 'power2',
    delay: 0.5,
  });
  canAnimationTl.to(gltf.scene.rotation, {
    y: `+=${Math.PI * 2}`,
    duration: 10,
    ease: 'none',
    repeat: -1,
  });
  canAnimationTl.to(
    gltf.scene.rotation,
    {
      z: -0.3,
      duration: 5,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    },
    '<',
  );

  useEffect(() => {
    gltf.scene.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        if (node.name === 'model') {
          gsap.to(node.material.color, {
            r: new THREE.Color(selectedColor).r,
            g: new THREE.Color(selectedColor).g,
            b: new THREE.Color(selectedColor).b,
            duration: 0.75,
          });
        }
      }
    });
    gsap.to(gltf.scene.rotation, {
      y: `+=${Math.PI * 2}`,
      duration: 0.75,
    });
  }, [gltf.scene, selectedColor]);

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[-10, 10, 0]} intensity={1.2} />

      <primitive rotation={[-Math.PI * 0.05, 0, 0.3]} object={gltf.scene} />
    </>
  );
};
