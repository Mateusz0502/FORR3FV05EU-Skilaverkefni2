let container;
let camera;
let controls;
let renderer;
let scene;

function init() {

  container = document.querySelector( '#scene-container' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x8FBCD4 );

  createCamera();
  createControls();
  createLights();
  createMeshes();
  createRenderer();

  renderer.setAnimationLoop( () => {
    render();

  } );

}

function createCamera() {

  camera = new THREE.PerspectiveCamera(
    50, //FOV
    container.clientWidth / container.clientHeight, //Aspect Ratio
    0.1, //Near Clipping Plane
    100, //Far Clipping Plane
  );

  camera.position.set( 0, 0, 8 );

}

function createControls() {

  controls = new THREE.OrbitControls( camera, container );
}

function createLights() {

  const ambientLight = new THREE.HemisphereLight(
     0xddeeff, //bright sky color
     0x202020, //dim ground color
     5, //intensity
  );

  const mainLight = new THREE.DirectionalLight( 0xffffff, 5);
  mainLight.position.set( 10, 10, 10 );

  scene.add( ambientLight, mainLight );

}

function createMaterials() {

  const textureLoader = new THREE.TextureLoader();

  const bladeTex = textureLoader.load( 'blade.png' );
  bladeTex.encoding = THREE.sRGBEncoding;
  bladeTex.anisotropy = 16;

  const blade = new THREE.MeshStandardMaterial( {
    map: bladeTex, 
  } );

  const guardTex = textureLoader.load( 'guardhilt.png' );
  guardTex.encoding = THREE.sRGBEncoding;
  guardTex.anisotropy = 16;

  const guard = new THREE.MeshStandardMaterial( {
    map: guardTex,
  } );

  const hilt = new THREE.MeshStandardMaterial( {
    map: guardTex,
  } );

  const pommelTex = textureLoader.load( 'pommel.png' );
  pommelTex.encoding = THREE.sRGBEncoding;
  pommelTex.anisotropy = 16;

  const pommel = new THREE.MeshStandardMaterial( {
    map: pommelTex
  } );

  return {

    blade,
    guard,
    hilt,
    pommel
  };

}

function createGeometries() {

  const blade = new THREE.ConeBufferGeometry( 0.1, 2, 0.1 )
  const guard = new THREE.CylinderBufferGeometry( 0.1, 0.3, 0.1 )
  const hilt = new THREE.CylinderBufferGeometry( 0.05, 0.05, 0.5 )
  const pommel = new THREE.SphereBufferGeometry( 0.1, 10, 10 )

  return {
    blade,
    guard,
    hilt,
    pommel
  };

}

function createMeshes() {

  const sword = new THREE.Group();
  scene.add( sword );

  const materials = createMaterials();
  const geometries = createGeometries();

  const blade = new THREE.Mesh( geometries.blade, materials.blade );
  blade.position.set( 1, 2, 1 );

  const guard = new THREE.Mesh( geometries.guard, materials.guard );
  guard.position.set( 1, 1, 1 );

  const hilt = new THREE.Mesh( geometries.hilt, materials.hilt );
  hilt.position.set( 1, 0.7, 1 );

  const pommel = new THREE.Mesh( geometries.pommel, materials.pommel );
  pommel.position.set( 1, 0.5, 1 );


  sword.add(
    blade,
    guard,
    hilt,
    pommel
  );

}

function createRenderer() {

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );

  renderer.gammaFactor = 2.2;
  renderer.outputEncoding = true;

  renderer.physicallyCorrectLights = true;
  
  container.appendChild( renderer.domElement );

}

function render() {

  renderer.render( scene, camera );

}

function onWindowResize() {

  camera.aspect = container.clientWidth / container.clientHeight;

  camera.updateProjectionMatrix();

  renderer.setSize( container.clientWidth, container.clientHeight );

}

window.addEventListener( 'resize', onWindowResize );

init();
  

