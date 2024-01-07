import './App.css'
import { Canvas } from "@react-three/fiber";
import MyElement3D from './MyElement3D';

const App = () => {
  return (
    <div>
      <Canvas>
        <MyElement3D />
      </Canvas>
    </div>
  )
}

export default App
