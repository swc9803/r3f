import * as THREE from 'three';
import { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, Text, TrackballControls } from '@react-three/drei';

const Word = ({ children, ...props }) => {
  const color = new THREE.Color();
  const fontProps = {
    font: '',
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    'material-toneMapped': false,
  };
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const over = (e) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);

  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer';
    return () => (document.body.style.cursor = 'auto');
  }, [hovered]);

  useFrame(() => {
    ref.current.material.color.lerp(color.set(hovered ? '#fa2720' : 'white'), 0.1);
  });

  return (
    <Billboard {...props}>
      <Text
        ref={ref}
        onPointerOver={over}
        onPointerOut={out}
        onClick={() => console.log('clicked')}
        {...fontProps}
        children={children}
      />
    </Billboard>
  );
};

const wordsArray = ['1', '2', '3', '4', '5', '6', '7', '8'];

// default value 추가 const Cloud = ({ count = 4, radius = 20 }) => {
const Cloud = ({ count, radius }) => {
  const words = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (count + 1);
    const thetaSpan = (Math.PI * 2) / count;
    for (let i = 1; i < count + 1; i++)
      for (let j = 0; j < count; j++)
        temp.push([
          new THREE.Vector3().setFromSpherical(
            spherical.set(radius, phiSpan * i, thetaSpan * j),
          ),
          wordsArray[i - 1],
        ]);
    return temp;
  }, [count, radius]);

  return words.map(([pos, word], index) => (
    <Word key={index} position={pos} children={word} />
  ));
};

const App = () => {
  return (
    <>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
        <fog attach="fog" args={['#202025', 0, 80]} />
        <Suspense fallback={null}>
          <group rotation={[10, 10.5, 10]}>
            <Cloud count={8} radius={20} />
          </group>
        </Suspense>
        <TrackballControls />
      </Canvas>
    </>
  );
};

export default App;