import './App.css';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/index.jsx';
import Earth from './components/earth/index.jsx';
import MipMap from './components/mipmap/index.jsx';
import Scroll from './components/scroll/index.jsx';
import Rapier from './components/rapier/index.jsx';
import Transition from './components/transition/index.jsx';
import Pofo from './components/pofo/index.jsx';
import Hover from './components/hover/index.jsx';
import Can from './components/can/index.jsx';

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
          <Route path="/scroll" element={<Scroll />} />
          <Route path="/rapier" element={<Rapier />} />
          <Route path="/transition" element={<Transition />} />
          <Route path="/pofo" element={<Pofo />} />
          <Route path="/hover" element={<Hover />} />
          <Route path="/can" element={<Can />} />
        </Routes>
      </CanvasContainer>
    </Router>
  );
};

export default App;
