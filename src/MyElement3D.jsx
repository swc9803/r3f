import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';
// import * as THREE from 'three';

const MyElement3D = () => {
  const refMesh = useRef();
  const refWireMesh = useRef();

  useEffect(() => {
    refWireMesh.current.geometry = refMesh.current.geometry;
  }, []);

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 1, 3]} intensity={0.5} />

      <mesh ref={refMesh}>
        <boxGeometry args={[2, 2, 1, 3, 1, 3]} />
        <meshStandardMaterial color="#1abc9c" />
      </mesh>

      <mesh ref={refWireMesh}>
        <meshStandardMaterial emissive="yellow" wireframe={true} />
      </mesh>
    </>
  );
};

export default MyElement3D;
