import { Environment, Float, OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
import { Banana } from './Banana';
import { Heart } from './Heart';

export const Experience = () => {
  const { item } = useControls({
    item: {
      value: 'heart',
      options: ['heart', 'banana'],
    },
  });

  return (
    <>
      <OrbitControls enableZoom={false} />
      <Float floatIntensity={2} speed={3}>
        <Heart scale={0.25} visible={item === 'heart'} />
        <Banana scale={0.15} visible={item === 'banana'} />
      </Float>
      <Environment preset="sunset" background blur={0.4} />
    </>
  );
};
