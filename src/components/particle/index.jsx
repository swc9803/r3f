import * as THREE from 'three';
import './index.css';

import fragment from './fragment.glsl';
import vertex from './vertex.glsl';

import { gsap } from "gsap";

export default class Sketch {
	constructor(selector) {
    this.scene = new THREE.Scene();
		
    this.renderer = new THREE.WebGLRenderer();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.width = window.innerWidth
		this.height = window.innerHeight

    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        time: { value: 0 },
      },
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);

    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.material.uniforms.time.value += 0.01;
}

// const App = () => {
//   return (

//   );
// };

// export default App;
