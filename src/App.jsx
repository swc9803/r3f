import './App.css';
import { Canvas } from '@react-three/fiber';
import MyElement3D from './MyElement3D';

const App = () => {
  return (
    <div>
      <Canvas
        camera={{
          fov: 75,
          position: [7, 7, 0],
        }}
      >
        <MyElement3D />
      </Canvas>
    </div>
  );
};

export default App;
