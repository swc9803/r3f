import {
  CameraControls,
  Text,
  Environment,
  MeshReflectorMaterial,
  RenderTexture,
} from '@react-three/drei';
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
        <meshBasicMaterial color={'white'} toneMapped={false}>
          <RenderTexture attach={'map'}>
            <color attach="background" args={['#fff']} />
            <Environment preset="sunset" />
            <Camping
              scale={1.6}
              rotation-y={-degToRad(25)}
              rotation-x={degToRad(40)}
              position-y={-0.5}
            />
          </RenderTexture>
        </meshBasicMaterial>
      </Text>
      <group rotation-y={-degToRad(25)} position-x={3}>
        <Camping scale={0.6} />
      </group>
      <mesh position-y={-0.48} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={10}
          roughness={1}
          depthScale={1}
          opacity={0.5}
          transparent
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#333"
          metalness={0.5}
        />
      </mesh>
      <Environment preset="sunset" />
    </>
  );
};
