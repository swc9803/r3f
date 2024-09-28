import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './style.scss';

const GRID_SIZE = 11;
const CUBE_SPACING = 1.05;

const WaveCubes = () => {
  const cubesRef = useRef([]);

  useEffect(() => {
    gsap.to(
      cubesRef.current.map((cube) => cube.position),
      {
        y: -0.5,
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: {
          grid: [GRID_SIZE, GRID_SIZE],
          from: 'center',
          amount: 1.5,
        },
      },
    );
  }, []);

  return (
    <>
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
        const row = Math.floor(index / GRID_SIZE);
        const col = index % GRID_SIZE;

        return (
          <mesh
            key={index}
            position={[
              col * CUBE_SPACING - (GRID_SIZE * CUBE_SPACING) / 2,
              0,
              row * CUBE_SPACING - (GRID_SIZE * CUBE_SPACING) / 2,
            ]}
            ref={(el) => (cubesRef.current[index] = el)}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="skyblue" />
          </mesh>
        );
      })}
    </>
  );
};

const App = () => {
  return (
    <Canvas shadows>
      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 1, 3]} intensity={0.5} />
      <WaveCubes />

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.6}
        panSpeed={0.5}
        rotateSpeed={0.4}
      />
    </Canvas>
  );
};

export default App;
