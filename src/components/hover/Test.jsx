import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

const Test = () => {
  const gltf = useLoader(GLTFLoader, '/models/people.glb');

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />

      <primitive object={gltf.scene} />
    </>
  );
};

export default Test;
