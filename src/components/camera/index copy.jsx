import { Canvas } from '@react-three/fiber';
import './index.css';

const App = () => {
  return (
    <Canvas shadows>
      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 1, 3]} intensity={0.5} />

      <mesh>
        <boxGeometry args={[1, 1, 1, 1, 1, 1]} />
        <meshStandardMaterial color="#1abc9c" />
      </mesh>
    </Canvas>
  );
};

export default App;
