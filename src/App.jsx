import './App.css';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Earth from './components/earth/index.jsx';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const App = () => {
  return (
    <CanvasContainer>
      <Canvas>
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </CanvasContainer>
  );
};

export default App;
