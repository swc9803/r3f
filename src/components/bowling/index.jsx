import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';

function BowlingGame() {
  const { scene } = useGLTF('/models/bowling.glb');
  const [pins, setPins] = useState([]);
  const [ballShot, setBallShot] = useState(false);
  const [tryAgainVisible, setTryAgainVisible] = useState(false);
  const kinematicRef = useRef();
  const dynamicBall = useRef(null);
  const clock = useRef(0);

  useEffect(() => {
    const positions = [];
    for (let i = 1; i <= 10; i++) {
      const p = scene.getObjectByName(`Pin_Pos_${i}`);
      if (p) positions.push(p.position.clone());
    }
    setPins(positions);
  }, [scene]);

  useFrame((_, delta) => {
    if (!ballShot && kinematicRef.current) {
      clock.current += delta;
      const x = Math.sin(clock.current * 2) * 0.6;
      kinematicRef.current.setNextKinematicTranslation({ x, y: 0.2, z: -2.4 });
    }
  });

  const shootBall = () => {
    if (ballShot || !kinematicRef.current) return;
    const pos = kinematicRef.current.translation();
    const rot = kinematicRef.current.rotation();
    setBallShot(true);
    dynamicBall.current = { pos, rot };
    setTimeout(() => setTryAgainVisible(true), 2500);
  };

  const resetGame = () => {
    setBallShot(false);
    setTryAgainVisible(false);
    clock.current = 0;
  };

  return (
    <>
      {/* Stage */}
      <RigidBody type="fixed" colliders="trimesh">
        {(() => {
          const source = scene.getObjectByName('Stage');
          const mesh = source.clone();
          mesh.position.copy(source.position);
          mesh.scale.copy(source.scale);
          mesh.rotation.copy(source.rotation);
          return <primitive object={mesh} />;
        })()}
      </RigidBody>

      {/* Pins */}
      {pins.map((pos, i) => {
        const source = scene.getObjectByName('Pin');
        const mesh = source.clone();
        mesh.position.copy(source.position);
        mesh.scale.copy(source.scale);
        mesh.rotation.copy(source.rotation);
        return (
          <RigidBody
            key={i}
            position={[pos.x, pos.y + 0.2, pos.z]}
            colliders="hull"
            restitution={1}
            friction={0.4}
          >
            <primitive object={mesh} />
          </RigidBody>
        );
      })}

      {/* Kinematic Ball */}
      {!ballShot && (
        <RigidBody
          type="kinematicPosition"
          colliders="ball"
          ref={kinematicRef}
          position={[0, 0.2, -2.4]}
        >
          {(() => {
            const source = scene.getObjectByName('Ball');
            const mesh = source.clone();
            mesh.position.copy(source.position);
            mesh.scale.copy(source.scale);
            mesh.rotation.copy(source.rotation);
            return <primitive object={mesh} />;
          })()}
        </RigidBody>
      )}

      {/* Shot Ball */}
      {ballShot && (
        <RigidBody
          type="dynamic"
          colliders="ball"
          position={[
            dynamicBall.current.pos.x,
            dynamicBall.current.pos.y,
            dynamicBall.current.pos.z,
          ]}
          rotation={[
            dynamicBall.current.rot.x,
            dynamicBall.current.rot.y,
            dynamicBall.current.rot.z,
          ]}
          restitution={0.9}
          friction={0.3}
          onReady={(body) => {
            body.applyImpulse({ x: 0, y: 0, z: 12 }, true);
          }}
        >
          <primitive object={scene.getObjectByName('Ball').clone()} />
        </RigidBody>
      )}

      {/* UI */}
      <Html>
        {!ballShot && (
          <button style={btnStyle} onClick={shootBall}>
            SHOOT
          </button>
        )}
        {tryAgainVisible && (
          <button style={btnStyle} onClick={resetGame}>
            Try Again
          </button>
        )}
      </Html>
    </>
  );
}

const btnStyle = {
  position: 'absolute',
  bottom: '10%',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '1em 2em',
  fontSize: '1.2em',
  borderRadius: '1em',
  background: 'white',
  color: 'black',
  cursor: 'pointer',
  boxShadow: '0 0 20px rgba(255,255,255,0.5)',
};

export default function BowlingExperience() {
  return (
    <Canvas camera={{ position: [0, 0.6, -3.1], fov: 75 }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 2, -3.5]} intensity={0.7} />
      <directionalLight position={[0, 1, 3]} intensity={0.7} />
      <OrbitControls />
      <Physics gravity={[0, -9.8, 0]}>
        <BowlingGame />
      </Physics>
    </Canvas>
  );
}
