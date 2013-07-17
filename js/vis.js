var WIDTH = 800, HEIGHT = 600;
var VIEW_ANGLE = 45, ASPECT = WIDTH / HEIGHT, NEAR = 0.1, FAR = 10000;
var renderer, camera, scence, mesh;

function init($container) {
  renderer = new THREE.WebGLRenderer();
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene = new THREE.Scene();
  camera.position.z = 300;
  renderer.setSize(WIDTH, HEIGHT);
  $container.append(renderer.domElement);

  scene.add(camera);
  
  /*var light = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add(light);

  var pl1 = new THREE.PointLight( 0xFFFFFF );
  pl1.position.x = 10;
  pl1.position.y = 50;
  pl1.position.z = 130;
  scene.add(pl1);

  var pl2 = new THREE.PointLight( 0xFFFFFF );
  pl2.position.x = 10;
  pl2.position.y = -50;
  pl2.position.z = 130;
  scene.add(pl2);*/
  
  // LIGHTS

  hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
  hemiLight.color.setHSL( 0.6, 1, 0.6 );
  hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
  hemiLight.position.set( 0, 500, 0 );
  scene.add( hemiLight );

  //

  dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
  dirLight.color.setHSL( 0.1, 1, 0.95 );
  dirLight.position.set( -1, 1.75, 1 );
  dirLight.position.multiplyScalar( 50 );
  scene.add( dirLight );

  dirLight.castShadow = true;

  dirLight.shadowMapWidth = 2048;
  dirLight.shadowMapHeight = 2048;

  var d = 50;

  dirLight.shadowCameraLeft = -d;
  dirLight.shadowCameraRight = d;
  dirLight.shadowCameraTop = d;
  dirLight.shadowCameraBottom = -d;

  dirLight.shadowCameraFar = 3500;
  dirLight.shadowBias = -0.0001;
  dirLight.shadowDarkness = 0.35;
  //dirLight.shadowCameraVisible = true;
}

function addShape() {
  var material = new THREE.MeshLambertMaterial({color: 0xCC0000});
  mesh = new THREE.Mesh(new THREE.SphereGeometry(50, 16, 16), material);
  scene.add(mesh);
}

var x = .3, y = .2, z = .1;

function animate() {
  requestAnimationFrame(animate);
  
  if (mesh.position.x > 50 || mesh.position.x < -50) { x *= -1; }
  if (mesh.position.y > 50 || mesh.position.y < -50) { y *= -1; }
  if (mesh.position.z > 50 || mesh.position.z < -50) { z *= -1; }
  // playing with the ball
  mesh.position.x += x;
  mesh.position.y += y;
  mesh.position.z += z;
  
  renderer.render(scene, camera);
}