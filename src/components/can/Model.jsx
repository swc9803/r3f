import { useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import gsap from 'gsap';
import './index.css';

export const Model = ({ selectedFlavor }) => {
  const gltf = useLoader(GLTFLoader, '/can/can.glb');

  const canAnimationTl = gsap.timeline();

  canAnimationTl.to(gltf.scene.rotation, {
    y: `+=${Math.PI * 2}`,
    duration: 1,
    delay: 0.25,
  });
  canAnimationTl.from(
    gltf.scene.scale,
    {
      x: 2,
      y: 2,
      z: 2,
      ease: 'power2',
      duration: 1,
    },
    '<',
  );
  canAnimationTl.to(gltf.scene.rotation, {
    y: `+=${Math.PI * 2}`,
    duration: 10,
    ease: 'none',
    repeat: -1,
  });

  useEffect(() => {
    gltf.scene.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        if (node.name === 'model') {
          gsap.to(node.material.color, {
            r: new THREE.Color(selectedFlavor.color).r,
            g: new THREE.Color(selectedFlavor.color).g,
            b: new THREE.Color(selectedFlavor.color).b,
            duration: 0.75,
          });
        }
      }
    });
  }, [gltf.scene, selectedFlavor]);

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[-10, 10, 0]} intensity={1.2} />

      <primitive rotation={[-Math.PI * 0.05, 0, 0.3]} object={gltf.scene} />
    </>
  );
};
