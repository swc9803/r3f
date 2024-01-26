import { OrbitControls, ScrollControls } from '@react-three/drei';
import Office from './Office.jsx';
import Overlay from './Overlay.jsx';

const Experience = () => {
  return (
    <>
      <ambientLight intensity={3} />

      <OrbitControls enableZoom={false} />

      <ScrollControls pages={3} damping={0.25}>
        <Overlay />
        <Office />
      </ScrollControls>
    </>
  );
};

export default Experience;
