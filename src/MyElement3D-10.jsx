import { OrbitControls, SoftShadows } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
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

  const config = useControls({
    size: { value: 25, min: 0, max: 100 },
    focus: { value: 0, min: 0, max: 10 },
    samples: { value: 10, min: 1, max: 100, step: 1 },
  });

  return (
    <>
      <OrbitControls />

      <SoftShadows {...config} />

      <ambientLight intensity={0.1} />

      <directionalLight castShadow color="#ffffff" intensity={1} position={[0, 5, 0]} />

      <mesh receiveShadow rotation-x={THREE.MathUtils.degToRad(-90)}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color="#2c3e50"
          roughness={0.5}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh castShadow receiveShadow position-y={1.7}>
        <torusKnotGeometry args={[1, 0.2, 128, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.2} />
      </mesh>

      {new Array(10).fill().map((item, index) => {
        return (
          <group key={index} rotation-y={THREE.MathUtils.degToRad(45 * index)}>
            <mesh
              castShadow
              receiveShadow
              geometry={torusGeometry}
              material={torusMaterial}
              position={[3, 0.5, 0]}
            />
          </group>
        );
      })}

      <group name="smallSpherePivot">
        <mesh castShadow receiveShadow position={[3, 0.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#e74c3c" roughness={0.2} metalness={0.5} />
        </mesh>
      </group>
    </>
  );
};

export default MyElement3D;
