import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';
import './index.css';

const App = () => {
  return (
    <div>
      <Canvas>
        <Experience />
      </Canvas>
    </div>
  );
};

export default App;
