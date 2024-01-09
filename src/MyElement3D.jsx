import { Box, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const MyBox = (props) => {
  const geom = new THREE.BoxGeometry();
  return <mesh {...props} geometry={geom}></mesh>;
};

const MyElement3D = () => {
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 1, 3]} intensity={0.5} />

      {/* 1 */}
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="#1abc9c" />
      </mesh>

      {/* 2 three.js 사용 */}
      <Box position={[1.2, 0, 0]}>
        <meshStandardMaterial color="#8e44ad" />
      </Box>

      {/* 3 컴포넌트 사용 */}
      <MyBox position={[-1.2, 0, 0]}>
        <meshStandardMaterial color="#e74c3c" />
      </MyBox>
    </>
  );
};

export default MyElement3D;
