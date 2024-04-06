import { CameraControls, Text, Environment } from '@react-three/drei';
import { Camping } from './Camping';
import { degToRad } from 'three/src/math/MathUtils';
import { useEffect, useRef } from 'react';

export const Experience = () => {
  const controls = useRef();

  const intro = async () => {
    controls.current.dolly(-22);
    controls.current.smoothTime = 1.6;
    controls.current.dolly(22, true);
  };

  useEffect(() => {
    intro();
  }, []);

  return (
    <>
      <CameraControls ref={controls} />
      <Text
        font={'fonts/Poppins-Black.ttf'}
        position={[-1.3, -0.5, 1]}
        lineHeight={0.8}
        textAlign="center"
        rotation-y={degToRad(30)}
        anchorY={'bottom'}
      >
        MY LITTLE{'\n'}CAMPING
        <meshBasicMaterial color={'white'} />
      </Text>
      <group rotation-y={-degToRad(25)} position-x={3}>
        <Camping scale={0.6} />
      </group>
      <Environment preset="sunset" />
    </>
  );
};
