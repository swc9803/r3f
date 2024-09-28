import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import './index.css';

const App = () => {
  return (
    <div>
      <Canvas
        camera={{
          fov: 64,
          position: [2.3, 1.5, 2.3],
        }}
      >
        <Experience />

        <Picker />
      </Canvas>
    </div>
  );
};

export default App;
