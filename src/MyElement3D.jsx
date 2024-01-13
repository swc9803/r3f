import { AccumulativeShadows, OrbitControls, RandomizedLight } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: '#9b59b6',
  roughness: 0.5,
  metalness: 0.9,
});

const MyElement3D = () => {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const smallSpherePivot = state.scene.getObjectByName('smallSpherePivot');
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 10);
  });

  return (
    <>
      <OrbitControls />

      <ambientLight intensity={0.1} />

      <directionalLight color="#ffffff" intensity={1} position={[0, 5, 0]} />

      <mesh castShadow position-y={1.7}>
        <torusKnotGeometry args={[1, 0.2, 128, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.2} />
      </mesh>

      {new Array(10).fill().map((item, index) => {
        return (
          <group key={index} rotation-y={THREE.MathUtils.degToRad(45 * index)}>
            <mesh
              castShadow
              geometry={torusGeometry}
              material={torusMaterial}
              position={[3, 0.5, 0]}
            />
          </group>
        );
      })}

      <group name="smallSpherePivot">
        <mesh castShadow position={[3, 0.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#e74c3c" roughness={0.2} metalness={0.5} />
        </mesh>
      </group>

      <AccumulativeShadows
        position={[0, 0.01, 0]}
        scale={12}
        color="#000000"
        opacity={0.7}
        alphaTest={1}
        frames={Infinity}
        temporal
        blend={30}
      >
        <RandomizedLight
          radius={0.5}
          ambient={0.21}
          intensity={1.5}
          position={[5, 3, 0]}
        />
        {/* <RandomizedLight
          amount={4}
          radius={0.5}
          ambient={0.21}
          intensity={0.6}
          position={[-5, 3, 5]}
        /> */}
      </AccumulativeShadows>
    </>
  );
};

export default MyElement3D;
