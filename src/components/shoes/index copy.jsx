import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import './index.css';

const App = () => {
  return (
    <div>
      <Canvas
        shadows
        camera={{
          fov: 45,
          position: [0, 0, 4],
        }}
      >
        <Experience />
      </Canvas>
    </div>
  );
};

export default App;
