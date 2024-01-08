import { useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const MyElement3D = () => {
  const refMesh = useRef();

  useFrame((state, delta) => {
    refMesh.current.rotation.z += delta;
  });

  return (
    <>
      <directionalLight position={[1, 1, 1]} />

      <axesHelper scale={10} />
      <OrbitControls />

      <mesh
        ref={refMesh}
        position={[2, 0, 0]}
        rotation-y={THREE.MathUtils.degToRad(45)}
        scale={[2, 1, 1]}
      >
        <boxGeometry />
        <meshStandardMaterial color="#e67e22" opacity={0.5} transparent={true} />
        <mesh scale={[0.1, 0.1, 0.1]}>
          <sphereGeometry />
          <meshStandardMaterial color="red" />
        </mesh>
      </mesh>
    </>
  );
};

export default MyElement3D;
