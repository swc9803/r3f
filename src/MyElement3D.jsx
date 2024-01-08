import { useRef } from 'react';
import { OrbitControls } from '@react-three/drei';

const MyElement3D = () => {
  const refMesh = useRef();

  return (
    <>
      <directionalLight position={[1, 1, 1]} />

      <axesHelper scale={10} />
      <OrbitControls />

      <mesh ref={refMesh}>
        <boxGeometry />
        <meshStandardMaterial color="#e67e22" />
      </mesh>
    </>
  );
};

export default MyElement3D;
