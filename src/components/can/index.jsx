import { Model } from './Model.jsx';
import { Canvas } from '@react-three/fiber';
import { Interface } from './Interface.jsx';

const App = () => {
  return (
    <>
      <Interface />
      <Canvas>
        <Model />
      </Canvas>
    </>
  );
};

export default App;
