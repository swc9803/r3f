import './App.css';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/index.jsx';
import Earth from './components/earth/index.jsx';
import MipMap from './components/mipmap/index.jsx';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const App = () => {
  return (
    <Router>
      <CanvasContainer>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/earth" element={<Earth />} />
          <Route path="/mipmap" element={<MipMap />} />
        </Routes>
      </CanvasContainer>
    </Router>
  );
};

export default App;
