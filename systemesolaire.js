import './style.css'

import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


function createRenderer(parent){


    
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({});
renderer.setSize( parent.clientWidth, parent.clientHeight );
camera.aspect = parent.clientWidth / parent.clientHeight;
camera.updateProjectionMatrix();

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.z = 5;

const directionalLight = new THREE.DirectionalLight( 0xffffff, 3);
directionalLight.target = scene
directionalLight.translateZ(10)
scene.add(directionalLight)
function createSolar() {
    const solarSystem = new THREE.Group();
    const earthSystem = new THREE.Group();
   

    const earthTexture = new
    THREE.TextureLoader().load('public/earthmap.jpg');

    const sunTexture = new
    THREE.TextureLoader().load('public/sunmap.jpg');

    const moonTexture = new
    THREE.TextureLoader().load('public/moonmap.jpg');
  
    const sunMaterial = new THREE.MeshPhongMaterial({
      map: sunTexture,
      emissiveMap: sunTexture,
      emissive: 0xFFDD99,
      emissiveIntensity: 1,
    });
  
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 10,
      specular: 0x888888,
    });
    
  
    const moonMaterial = new THREE.MeshPhongMaterial({
      map: moonTexture,
      shininess: 50,
      specular: 0xffffff,
    });
  
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(1),
      sunMaterial
    );
  
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(0.5),
      earthMaterial
    );


  
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(0.2),
      moonMaterial
    );

    earthSystem.position.set(6,0,0)

    earthSystem.add(earth);
    earthSystem.add(moon);
    solarSystem.add(sun);
    solarSystem.add(earthSystem);

    
    

    moon.position.set(1.6,0,0)


  
    const pointLight = new THREE.PointLight(0xffffff, 1, 0, 0);
    pointLight.position.set(0, 0, 0);
    solarSystem.add(pointLight);
  
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    solarSystem.add(ambientLight);

    solarSystem.setTime = function(time){
   
      earthSystem.rotation.y = time/28
      earth.rotation.y = time
      solarSystem.rotation.y = time/365
      sun.rotation.y = -time/365

    
      }
  
    return solarSystem;
  }
  

  const solarSystem = createSolar();
  scene.add(solarSystem);

function onWindowResize(){
  camera.aspect = parent.clientWidth/parent.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( parent.clientWidth, parent.clientHeight );
  }

  window.addEventListener( 'resize', onWindowResize, false );

  const millisecondsInYear = 365 * 24 * 60 ;

  let t = 0; 
  let isAnimating = true; 

  document.getElementById("tslider").max = millisecondsInYear;
  
  function animate() {
    if (isAnimating) {
      t += 10; 
      if (t > millisecondsInYear) {
        t = 0; 
      }
    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    solarSystem.setTime(t / 100);
  }
  
  const slider = document.getElementById("tslider");
  slider.addEventListener('input', (e) => {
    isAnimating = false; 
    t = e.target.value; 
    solarSystem.setTime(t / 100); 
  });
  
  slider.addEventListener('change', () => {
    isAnimating = true; 
  });
  
  animate();  

 
  parent.appendChild(renderer.domElement);

}

const parent = document.getElementById('app')

createRenderer(parent);
