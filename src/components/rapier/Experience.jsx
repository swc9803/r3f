import { Box, Sphere, OrbitControls } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

const Experience = () => {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[-10, 10, 0]} intensity={0.6} />

      <OrbitControls />

      <RigidBody position={[3, 10, 0]} colliders={'ball'}>
        <Sphere>
          <meshStandardMaterial color="hotpink" />
        </Sphere>
      </RigidBody>

      <RigidBody position={[3, 5, 0]}>
        <Box>
          <meshStandardMaterial color="royalblue" />
        </Box>
      </RigidBody>

      <RigidBody type="fixed">
        <Box position={[0, 0, 0]} args={[10, 1, 10]}>
          <meshStandardMaterial color="springgreen" />
        </Box>
      </RigidBody>
    </>
  );
};

export default Experience;
