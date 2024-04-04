import './style.css'

import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


function createRenderer(parent){


    
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({alpha:false});
renderer.setSize( parent.clientWidth, parent.clientHeight );
camera.aspect = parent.clientWidth / parent.clientHeight;
camera.updateProjectionMatrix();

const controls = new OrbitControls( camera, renderer.domElement );


const textureEarth = new
THREE.TextureLoader().load('public/sunmap.jpg');

// MATERIALS
const groundMat = new THREE.MeshPhongMaterial( {
    map: textureEarth,
      emissiveMap: textureEarth,
      emissive: 0xFFDD99,
      emissiveIntensity: 1,
     } );
const matteBlack = new THREE.MeshLambertMaterial( { color: 0x000000 } );
const matteWhite = new THREE.MeshLambertMaterial( { color: 0xffffff } );
const shinyRed = new THREE.MeshPhongMaterial( { color: 0xff0000
    ,shininess: 50, specular: 0xffffff} );




// Head
const robot = new THREE.Group()


const head = new THREE.Group()


    head.add(new THREE.Mesh(new
    THREE.CylinderGeometry(0.05,0.05,0.5).rotateZ(Math.PI/2).translate(0,1,0),
    shinyRed))
    
    head.add(new THREE.Mesh(new
    THREE.CylinderGeometry(0.05,0.05,0.25).rotateY(Math.PI/2).translate(0,0.85
    ,0), shinyRed))

    head.add(new THREE.Mesh(new
    THREE.CylinderGeometry(0.3,0.5,0.5).translate(0,0.5,0), shinyRed))

    head.add(new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.3,0.3).rotateX(0.2).translate(0,0.1,-0.01),
    shinyRed))

// Eyes
const eye = new THREE.Group();
eye.add(new THREE.Mesh(new
THREE.SphereGeometry().scale(0.1,0.1,0.03),matteWhite))
const pupil = new THREE.Mesh(new
THREE.SphereGeometry().scale(0.03,0.03,0.03),matteBlack)
pupil.position.set(0,0,0.03)
eye.add(pupil)


const eyeR = eye.clone()
eyeR.position.set(0.13,0.5,0.38)
eyeR.rotateY(0.2)
eyeR.rotateX(-0.4)
eyeR.name = "eyeR"
head.add(eyeR)

const eyeL = eye.clone()
eyeL.position.set(-0.13,0.5,0.38)
eyeL.rotateY(-0.2)
eyeL.rotateX(-0.4)
eyeL.name = "eyeL"
head.add(eyeL)

scene.add(head)
camera.position.z = 5; 


//Body

const body = new THREE.Group();
body.add(
    new THREE.Mesh(
        new THREE.CylinderGeometry(4, 7, 10).scale(0.1,0.1,0.1).translate(0,-0.6,0), shinyRed
    )
)

body.add(
    new THREE.Mesh(
        new THREE.CylinderGeometry(7, 4, 5).scale(0.1,0.1,0.1).translate(0,-1.35,0), shinyRed
    )
)


// Legs

const leg = new THREE.Group()
leg.add(
    new THREE.Mesh(
        new THREE.SphereGeometry().scale(0.15,0.15,0.15).translate(1,-0.5,0), shinyRed
    )
)

leg.add(
    new THREE.Mesh(
        new THREE.CylinderGeometry(0.5,0.5,3).scale(0.2,0.2,0.2).translate(1,-0.2,0), shinyRed
    )
)


leg.add(
    new THREE.Mesh(
        new THREE.CylinderGeometry(0.5,0.5,3).scale(0.2,0.2,0.2).translate(1,-0.6,0), shinyRed
    )
)


leg.add(
    new THREE.Mesh(
        new THREE.BoxGeometry(1.5,0.8,3).scale(0.2,0.2,0.2).translate(1,-1,0.15), shinyRed
    )
)

const legs = new THREE.Group()

const legL = leg.clone()
legL.position.set(-1.35,-1.5,0)
legL.name = "legL"
legs.add(legL)


const legR = leg.clone()
legR.position.set(-0.65,-1.5,0)
legR.name = "legR"
legs.add(legL)
legs.add(legR)



//Arms
const arm = new THREE.Group()

arm.add(
    new THREE.Mesh(
        new THREE.SphereGeometry().scale(0.15,0.15,0.15).translate(1,0,0), shinyRed
    )
)

arm.add(
    new THREE.Mesh(
        new THREE.CylinderGeometry(0.5,0.5,4.5).scale(0.15,0.15,0.15).rotateZ(Math.PI / 8).translate(1.12,-0.3,0), shinyRed
    )
)

arm.add(
    new THREE.Mesh(
        new THREE.SphereGeometry().scale(0.15,0.15,0.15).translate(1.25,-0.6,0), shinyRed
    )
)


arm.add(
    new THREE.Mesh(
        new THREE.CylinderGeometry(0.5,0.5,3.5).scale(0.15,0.15,0.15).rotateX(Math.PI / 2).rotateY(Math.PI/-16).translate(1.20,-0.6,0.35), shinyRed
    )
)






    
const pinceCylinderMeshMaterial = shinyRed.clone();
pinceCylinderMeshMaterial.side = THREE.DoubleSide;

 const pinceCylinderMesh =   new THREE.Mesh(
        new THREE.CylinderGeometry(0.5,0.5,.8, 10, 31, true, 0.64716, 3.14185813604723).scale(0.2,0.2,0.2).rotateZ(-Math.PI / 2).rotateX(Math.PI / 8).translate(1.15,-0.57,0.72), pinceCylinderMeshMaterial
    )

const pinceCylinderMeshExt = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5,0.5,.8, 10, 31, true, 0.64716, 2.885813604723).scale(0.15,0.2,0.15).rotateZ(-Math.PI / 2).rotateX(0.1).rotateX(Math.PI / 8).translate(1.15,-0.56,0.73), pinceCylinderMeshMaterial
)


const pinceRingMesh = new THREE.Mesh(
    new THREE.RingGeometry(10.5,7,30,14, 2.5, 3.10).scale(0.0095,0.0095,0.0095).rotateY(-Math.PI / 2).rotateX(Math.PI / 8).rotateZ(0).translate(1.23,-0.563 ,0.72), pinceCylinderMeshMaterial
)


const pinceRectangleMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(27,7,1,1).scale(0.0062,0.00435,0.002).rotateX(-Math.PI / 5).translate(1.15,-0.49,0.68), shinyRed
)

const pinceRectangleMeshBottom = pinceRectangleMesh.clone()
pinceRectangleMeshBottom.rotateX(Math.PI / 10)
pinceRectangleMeshBottom.position.set(0.0,0.04,0.27)

arm.add(pinceRectangleMeshBottom)



arm.add(pinceRectangleMesh)

const pinceRingMeshL = pinceRingMesh.clone()
const pinceRingMeshR = pinceRingMesh.clone()
pinceRingMeshR.translateX(-0.16)

arm.add(pinceRingMeshL)
arm.add(pinceRingMeshR)

/*arm.add(pinceRingMesh)*/
arm.add(pinceCylinderMeshExt)
arm.add(pinceCylinderMesh)




arm.rotateZ(0.2)
arm.position.set(-0.4,-0.35,0)
const armL = arm.clone()
armL.rotateZ(-0.4)
armL.scale.x *= -1
armL.position.set(0.38,-0.38,0)

const directionalLight = new THREE.DirectionalLight( 0xffffff, 3);
directionalLight.target = head
directionalLight.translateZ(10)
scene.add(directionalLight)


const arms = new THREE.Group()

arm.name = "armR"
armL.name = "armL"
arms.add(arm)
arms.add(armL)



const ground = new THREE.Mesh(

    new THREE.PlaneGeometry(20,20,20,20,20,20).rotateX(-Math.PI/ 2).translate(0,-2.58,0), groundMat


)




scene.add(ground)

robot.add(head)
robot.add(body)
robot.add(legs)
robot.add(arms)

const robotScene = new THREE.Group()

robotScene.add(robot)

scene.add(robotScene)
// Resize
function onWindowResize(){
  camera.aspect = parent.clientWidth/parent.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( parent.clientWidth, parent.clientHeight );
  }
  window.addEventListener( 'resize', onWindowResize, false );


  head.name = "head"
  legs.name = "legs"
  body.name = "body"
  arms.name = "arms"
 

  const circleRadius = 5;
  let angle = 0;


function animate(chrono) {

  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  controls.update();

  angle += 0.005; 
  
  const x = circleRadius * Math.cos(angle);
  const z = circleRadius * Math.sin(angle);
  robotScene.position.x = x;
  robotScene.position.z = z;

  
  const verticalOscillationMagnitude = 0.004; 
  const verticalOscillationSpeed = 0.004; 
  robotScene.position.y += verticalOscillationMagnitude * Math.sin(chrono * verticalOscillationSpeed);

 
  const nextAngle = angle + 0.01;
  const nextX = circleRadius * Math.cos(nextAngle);
  const nextZ = circleRadius * Math.sin(nextAngle);

  robotScene.lookAt(nextX, robotScene.position.y, nextZ);

  robot.getObjectByName("head").rotation.y = Math.sin(chrono/200)/5;
  robot.getObjectByName("legs").getObjectByName("legR").rotation.x = Math.sin(chrono/500)/2;
  robot.getObjectByName("legs").getObjectByName("legL").rotation.x = -Math.sin(chrono/500)/2;

  robot.getObjectByName("arms").getObjectByName("armL").rotation.x = -Math.sin(chrono/500)/2;
  robot.getObjectByName("arms").getObjectByName("armR").rotation.x = Math.sin(chrono/500)/2;
  
 
  }
  requestAnimationFrame( animate );
  

 
  parent.appendChild(renderer.domElement);

}




const parent = document.getElementById('app')

createRenderer(parent);
