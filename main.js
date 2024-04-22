import './style.css'

import * as THREE from "three";

function createRenderer(parent){

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize( parent.clientWidth, parent.clientHeight );
camera.aspect = parent.clientWidth / parent.clientHeight;
camera.updateProjectionMatrix();

const envMapLoader = new THREE.TextureLoader();
const envMapEquirectangular = envMapLoader.load('public/earthmap.jpg', (texture) => {
  // Set the envMap property of the material to the equirectangular texture
  material.envMap = texture;
  material.needsUpdate = true; // Update the material with the new envMap
});


const geometry = new THREE.TorusGeometry(3,1,40).scale(0.7,0.7,0.7)
const material = new THREE.MeshPhysicalMaterial({  
  roughness: 0,  
  transmission: 1, 
  metalness:2,
  reflectivity:1, 
  thickness: 0.5, // Add refraction!
});
const cube = new THREE.Mesh( geometry, material ); scene.add( cube );
camera.position.z = 5;




const directionalLight = new THREE.DirectionalLight( 0xfffff, 1);
directionalLight.target = cube
directionalLight.translateZ(10)
scene.add(directionalLight)

function onWindowResize(){
  camera.aspect = parent.clientWidth/parent.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( parent.clientWidth, parent.clientHeight );
  }
  window.addEventListener( 'resize', onWindowResize, false );


function animate() {

  requestAnimationFrame( animate );
  cube.rotation.x += 0.007;
  cube.rotation.y += 0.007;
  renderer.render( scene, camera );
  }
  animate();

 
  parent.appendChild(renderer.domElement);

}

for (let i = 0; i < 1; i++) {
  
const parent = document.getElementById('app')

createRenderer(parent);
  
  
}
