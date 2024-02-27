import './index.scss';
import Lenis from '@studio-freight/lenis';
import { Section1 } from './Section1.jsx';

const App = () => {
  const lenis = new Lenis();

  const lenisScroll = (time) => {
    lenis.raf(time);
    requestAnimationFrame(lenisScroll);
  };

  lenisScroll();

  return (
    <div className="container">
      <div className="blank" />
      <Section1 />
      <div className="blank" />
    </div>
  );
};

export default App;
