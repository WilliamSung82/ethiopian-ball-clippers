import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export function initThreeScene(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(500, 500);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Coffee bean shape
  const beanGeometry = new THREE.SphereGeometry(1, 32, 32);
  const positions = beanGeometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    let x = positions.getX(i);
    let y = positions.getY(i);
    let z = positions.getZ(i);
    y *= 1.5;
    x *= 0.7;
    const creaseDepth = 0.15 * Math.exp(-x * x * 20) * Math.cos(y * 1.2);
    z -= creaseDepth;
    positions.setXYZ(i, x, y, z);
  }
  beanGeometry.computeVertexNormals();

  const beanMaterial = new THREE.MeshStandardMaterial({
    color: 0x3d2a14,
    roughness: 0.6,
    metalness: 0.1,
  });

  const bean = new THREE.Mesh(beanGeometry, beanMaterial);
  bean.rotation.x = 0.3;
  bean.rotation.z = -0.3;
  scene.add(bean);

  const ambientLight = new THREE.AmbientLight(0xd4a574, 0.4);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xd4a574, 1.2);
  keyLight.position.set(3, 4, 5);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xc8956e, 0.6);
  rimLight.position.set(-3, -2, -3);
  scene.add(rimLight);

  let mx = 0, my = 0;
  document.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 0.5;
    my = (e.clientY / window.innerHeight - 0.5) * 0.5;
  });

  function animate() {
    requestAnimationFrame(animate);
    bean.rotation.y += 0.005;
    bean.rotation.x += Math.sin(Date.now() * 0.001) * 0.002;
    bean.position.y = Math.sin(Date.now() * 0.001) * 0.15;
    bean.rotation.x += (my * 0.3 - bean.rotation.x) * 0.02;
    bean.rotation.z += (-mx * 0.3 - bean.rotation.z) * 0.02;
    renderer.render(scene, camera);
  }
  animate();
}
