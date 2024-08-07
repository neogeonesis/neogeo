let scene, camera, renderer, loader, model;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Configurar la escena de THREE.js
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({canvas: canvas});
  renderer.setSize(width, height);

  // Cargar el modelo GLB
  loader = new THREE.GLTFLoader();
  loader.load('model.glb', function (gltf) {
    model = gltf.scene;
    scene.add(model);
    model.position.set(0, 0, 0);
  }, undefined, function (error) {
    console.error('An error happened:', error);
  });

  // Agregar una luz
  const light = new THREE.AmbientLight(0x404040);
  scene.add(light);
}

function draw() {
  background(200);

  if (model) {
    model.rotation.x += 0.01;
    model.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  renderer.setSize(windowWidth, windowHeight);
  camera.aspect = windowWidth / windowHeight;
  camera.updateProjectionMatrix();
}
