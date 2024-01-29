// import { OrbitControls } from '@react-three/drei';

const Experience = () => {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[-10, 10, 0]} intensity={1.2} />

      <mesh>
        <meshNormalMaterial />
        {/* <boxBufferGeometry /> */}
      </mesh>
    </>
  );
};

export default Experience;
