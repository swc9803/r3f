import { OrbitControls, Text } from '@react-three/drei';

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <Text font={'fonts/Poppins-Black.ttf'}>
        MY LITTLE{'\n'}CAMPING
        <meshBasicMaterial color={'white'} />
      </Text>
    </>
  );
};
