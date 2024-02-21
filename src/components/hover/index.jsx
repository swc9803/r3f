import { Canvas } from '@react-three/fiber';
import Test from './Test.jsx';
import './index.css';

const App = () => {
  return (
    <div>
      <Canvas
        shadows
        camera={{
          position: [7, 7, 0],
        }}
      >
        <Test />
      </Canvas>
    </div>
  );
};

export default App;
