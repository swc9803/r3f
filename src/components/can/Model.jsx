import { useEffect, useRef } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import gsap from 'gsap';
import './index.css';

export const Model = ({ selectedFlavor }) => {
  const gltf = useLoader(GLTFLoader, '/can/can.glb');
  const meshRef = useRef();
  const groupRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    const canAnimationTl = gsap.timeline();
    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    gltf.scene.traverse((node) => {
      if (node instanceof THREE.Mesh && node.name === 'model') {
        meshRef.current = node;
        group.rotation.set(-Math.PI * 0.05, 0, 0.2);
        group.add(node);

        canAnimationTl.to(meshRef.current.rotation, {
          y: `+=${Math.PI * 2}`,
          duration: 1,
          delay: 0.25,
        });
        canAnimationTl.from(
          groupRef.current.scale,
          {
            x: 2,
            y: 2,
            z: 2,
            ease: 'power2',
            duration: 1,
          },
          '<',
        );
        canAnimationTl.to(meshRef.current.rotation, {
          y: `+=${Math.PI * 2}`,
          duration: 30,
          ease: 'none',
          repeat: -1,
        });
      }
    });
  }, [gltf.scene, scene]);

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.material.color, {
        r: new THREE.Color(selectedFlavor.color).r,
        g: new THREE.Color(selectedFlavor.color).g,
        b: new THREE.Color(selectedFlavor.color).b,
        duration: 0.75,
      });
      gsap.to(groupRef.current.rotation, {
        y: `+=${Math.PI * 2}`,
        duration: 0.75,
      });
    }
  }, [selectedFlavor]);

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[-10, 10, 0]} intensity={1.2} />

      <primitive object={gltf.scene} />
    </>
  );
};
