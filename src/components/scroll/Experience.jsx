import { OrbitControls } from '@react-three/drei';
import Office from './Office.jsx';

const Experience = () => {
  return (
    <>
      <ambientLight intensity={3} />

      <OrbitControls />

      <Office />
    </>
  );
};

export default Experience;
