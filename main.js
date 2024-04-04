import './style.css'

import * as THREE from "three";

function createRenderer(parent){

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({alpha:false});
renderer.setSize( parent.clientWidth, parent.clientHeight );
camera.aspect = parent.clientWidth / parent.clientHeight;
camera.updateProjectionMatrix();

const geometry = new THREE.TorusGeometry()
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00
  ,shininess: 50, specular: 0xffffff, flatShading: true} );
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
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render( scene, camera );
  }
  animate();

 
  parent.appendChild(renderer.domElement);

}

for (let i = 0; i < 1; i++) {
  
const parent = document.getElementById('app')

createRenderer(parent);
  
  
}
