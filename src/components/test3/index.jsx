import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

// Vertex Shader
const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader
const fragmentShader = `
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vec4 texture1 = texture2D(uTexture1, vUv);
    vec4 texture2 = texture2D(uTexture2, vUv);

    float transitionFactor = smoothstep(0.0, 1.0, uHover);
    vec4 finalTexture = mix(texture1, texture2, transitionFactor);
    
    gl_FragColor = finalTexture;
  }
`;

const ImageTransition = ({ texture1, texture2 }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Load the two textures
  const [texture1Image, texture2Image] = useLoader(TextureLoader, [texture1, texture2]);

  // Update the shader uniforms each frame
  useFrame(() => {
    meshRef.current.material.uniforms.uTime.value += 0.01;
    meshRef.current.material.uniforms.uHover.value = hovered ? 1.0 : 0.0;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[1.5, 1]} />
      <shaderMaterial
        uniforms={{
          uTexture1: { value: texture1Image },
          uTexture2: { value: texture2Image },
          uTime: { value: 0 },
          uHover: { value: 0 },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas>
      {/* Pass in the paths to your images */}
      <ImageTransition texture1="day.jpg" texture2="night.jpg" />
    </Canvas>
  );
};

export default App;
