import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

const MyElement3D = () => {
  const refMesh = useRef();
  const refWireMesh = useRef();
  const [xSize, setXSize] = useState(1);
  const ySize = 1;
  const zSize = 1;
  const xSegments = 1;
  const ySegments = 1;
  const zSegments = 1;

  useFrame((state, delta) => {
    setXSize((prev) => {
      const newSize = prev + delta;
      if (newSize >= 5) return 1;
      return newSize;
    });
  });

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 1, 3]} intensity={0.5} />

      <mesh ref={refMesh}>
        <boxGeometry args={[xSize, ySize, zSize, xSegments, ySegments, zSegments]} />
        <meshStandardMaterial color="#1abc9c" />
      </mesh>

      <mesh ref={refWireMesh} geometry={refMesh.current?.geometry}>
        <meshStandardMaterial emissive="yellow" wireframe={true} />
      </mesh>
    </>
  );
};

export default MyElement3D;
