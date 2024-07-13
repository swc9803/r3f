import './App.css';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Lenis from '@studio-freight/lenis';

import Home from './components/home/index.jsx';
import Earth from './components/earth/index.jsx';
import MipMap from './components/mipmap/index.jsx';
import Scroll from './components/scroll/index.jsx';
import Rapier from './components/rapier/index.jsx';
import Transition from './components/transition/index.jsx';
import Pofo from './components/pofo/index.jsx';
import Hover from './components/hover/index.jsx';
import Can from './components/can/index.jsx';
import Clip from './components/clip/index.jsx';
import Camera from './components/camera/index.jsx';
import Camping from './components/camping/index.jsx';
import Responsive from './components/responsive/index.jsx';
import Slideshow from './components/slideshow/index.jsx';
import Explode from './components/explode/index.jsx';
import Shoe from './components/shoe/index.jsx';
import Test from './components/test/index.jsx';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const App = () => {
  const lenis = new Lenis();

  const lenisScroll = (time) => {
    lenis.raf(time);
    requestAnimationFrame(lenisScroll);
  };

  lenisScroll();

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
          <Route path="/clip" element={<Clip />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/camping" element={<Camping />} />
          <Route path="/responsive" element={<Responsive />} />
          <Route path="/slideshow" element={<Slideshow />} />
          <Route path="/explode" element={<Explode />} />
          <Route path="/shoe" element={<Shoe />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </CanvasContainer>
    </Router>
  );
};

export default App;
