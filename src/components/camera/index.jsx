import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Box } from './Box.jsx';
import { Vector3 } from 'three';

const Rig = () => {
  const { camera, mouse } = useThree();
  const vec = new Vector3();

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x, mouse.y, camera.position.z), 0.05); // 카메라 위치 이동
    camera.lookAt(0, 0, 0); // 중앙을 바라봄
  });
};

const App = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <directionalLight position={[0, 0, 1]} />
      {[...Array(5).keys()].map((i) => (
        <group key={i * 6}>
          <Box position={[-5, -3 + i * 1.5, 0]} text={'A'} />
          <Box position={[-3, -3 + i * 1.5, 0]} text={'B'} />
          <Box position={[-1, -3 + i * 1.5, 0]} text={'C'} />
          <Box position={[1, -3 + i * 1.5, 0]} text={'D'} />
          <Box position={[3, -3 + i * 1.5, 0]} text={'E'} />
          <Box position={[5, -3 + i * 1.5, 0]} text={'F'} />
        </group>
      ))}
      <Rig />
    </Canvas>
  );
};

export default App;
