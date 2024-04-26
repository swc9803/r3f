import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { degToRad } from 'three/src/math/MathUtils';

const App = () => {
  return (
    <Canvas shadows>
      <OrbitControls />
      <ambientLight intensity={1} />
      <directionalLight position={[2, 1, 3]} intensity={0.5} />

      <mesh scale-x={1.5}>
        <mesh rotation-z={degToRad(-45)}>
          <ringGeometry args={[1.4, 1.5, 4]} />
          <meshStandardMaterial color="#f10000" />
        </mesh>
      </mesh>
    </Canvas>
  );
};

export default App;
