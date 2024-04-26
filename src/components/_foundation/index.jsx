import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import './index.css';

const App = () => {
  return (
    <Canvas shadows>
      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 1, 3]} intensity={0.5} />

      <Experience />
    </Canvas>
  );
};

export default App;
