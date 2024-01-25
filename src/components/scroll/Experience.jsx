import { OrbitControls } from '@react-three/drei';

// export const Experience = () => {
const Experience = () => {
  return (
    <>
      <OrbitControls />
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
};

export default Experience;
