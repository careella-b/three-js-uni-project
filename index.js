import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
import { GUI } from "https://cdn.jsdelivr.net/npm/lil-gui@0.17/+esm";

/**
 * Set up the scene
 */
const scene = new THREE.Scene();

/**
 * Set up the camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.x = -1;
camera.position.z = 4;
camera.position.y = 2;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor("#f88379");
document.body.appendChild(renderer.domElement);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

// Texture for door and windows
const woodColourTexture = textureLoader.load("textures/wooddoor/WoodColour.jpg");
const woodAmbientOcclusionTexture = textureLoader.load("textures/wooddoor/WoodAmbientOcclusion.jpg");
const woodNormalTexture = textureLoader.load("textures/wooddoor/WoodNormal.jpg");
const woodHeightTexture = textureLoader.load("textures/wooddoor/WoodHeight.jpg");
const woodRoughnessTexture = textureLoader.load("textures/wooddoor/WoodRoughness.jpg");

// Texture for house wall
const stoneColourTexture = textureLoader.load("textures/stonewall/StoneBricksColour.jpg");
const stoneAmbientOcclusionTexture = textureLoader.load("textures/stonewall/StoneBricksAmbientOcclusion.jpg");
const stoneNormalTexture = textureLoader.load("textures/stonewall/StoneBricksNormal.jpg");
const stoneRoughnessTexture = textureLoader.load("textures/stonewall/StoneBricksRoughness.jpg");

// Texture for groud
const groundColourTexture = textureLoader.load("textures/ground/GroundColour.jpg");
const groundAmbientOcclusionTexture = textureLoader.load("textures/ground/GroundAmbientOcclusion.jpg");
const groundNormalTexture = textureLoader.load("textures/ground/GroundNormal.jpg");
const groundRoughnessTexture = textureLoader.load("textures/ground/GroundRoughness.jpg");

// Texture for walkway
const walkwayColourTexture = textureLoader.load("textures/cobblestone/CobblestoneColour.jpg");
const walkwayAmbientOcclusionTexture = textureLoader.load("textures/cobblestone/CobblestoneAmbientOcclusion.jpg");
const walkwayNormalTexture = textureLoader.load("textures/cobblestone/CobblestoneNormal.jpg");
const walkwayRoughnessTexture = textureLoader.load("textures/cobblestone/CobblestoneRoughness.jpg");

// Texture for Mountain
const mountainAmbientOcclusionTexture = textureLoader.load("textures/rock/MountainAmbientOcclusion.jpg");
const mountainColourTexture = textureLoader.load("textures/rock/MountainColour.jpg");
const mountainNormalTexture = textureLoader.load("textures/rock/MountainNormal.jpg");
const mountainRoughnessTexture = textureLoader.load("textures/rock/MountainRoughness.jpg");

// Textures for Tree
const treeAmbientOcclusionTexture = textureLoader.load("textures/tree/TreeAmbientOcclusion.jpg");
const treeColourTexture = textureLoader.load("textures/tree/TreeColour.jpg");
const treeNormalTexture = textureLoader.load("textures/tree/TreeNormal.jpg");
const treeRoughnessTexture = textureLoader.load("textures/tree/TreeRoughness.jpg");

// Textures for Bark
const barkAmbientOcclusionTexture = textureLoader.load("textures/bark/BarkAmbientOcclusion.jpg");
const barkColourTexture = textureLoader.load("textures/bark/BarkColour.jpg");
const barkNormalTexture = textureLoader.load("textures/bark/BarkNormal.jpg");
const barkRoughnessTexture = textureLoader.load("textures/bark/BarkRoughness.jpg");

// Textures for Bush
const bushAmbientOcclusionTexture = textureLoader.load("textures/bush/bushAmbientOcclusion.jpg");
const bushColourTexture = textureLoader.load("textures/bush/bushColour.jpg");
const bushNormalTexture = textureLoader.load("textures/bush/bushNormal.jpg");
const bushRoughnessTexture = textureLoader.load("textures/bush/bushRoughness.jpg");

/**
 * Repeat and wrap for the floor
 */
// Repeat texture
groundColourTexture.repeat.set(8, 8);
groundAmbientOcclusionTexture.repeat.set(8, 8);
groundNormalTexture.repeat.set(8, 8);
groundRoughnessTexture.repeat.set(8, 8);

// Texture wrapping for horizontal
groundColourTexture.wrapS = THREE.RepeatWrapping;
groundAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
groundNormalTexture.wrapS = THREE.RepeatWrapping;
groundRoughnessTexture.wrapS = THREE.RepeatWrapping;

// Texture wrapping for vertical
groundColourTexture.wrapT = THREE.RepeatWrapping;
groundAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
groundNormalTexture.wrapT = THREE.RepeatWrapping;
groundRoughnessTexture.wrapT = THREE.RepeatWrapping;

/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 30),
  new THREE.MeshStandardMaterial({
    map: groundColourTexture,
    aoMap: groundAmbientOcclusionTexture,
    normalMap: groundNormalTexture,
    roughnessMap: groundRoughnessTexture,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Uploading a model from Blender
 */
// Model 1 - Red Guy
const loader = new GLTFLoader();

loader.load(
  "model/redguy.glb",
  function (gltf)
  {
    gltf.scene.position.set(5, 0.9, 10);
    gltf.scene.scale.set(0.5, 0.5, 0.5);
    scene.add(gltf.scene);
  }
);

/**
 * House
 */
// House container
const house = new THREE.Group();
scene.add(house);

/**
 * House Walls
 */
// Wall 1 - middle
const wall1 = new THREE.Mesh(
  new THREE.BoxGeometry(3, 5, 4),
  new THREE.MeshStandardMaterial({
    map: stoneColourTexture,
    aoMap: stoneAmbientOcclusionTexture,
    normalMap: stoneNormalTexture,
    roughnessMap: stoneRoughnessTexture,
  })
);
wall1.castShadow = true;
wall1.receiveShadow = true;
wall1.position.y = 2.5;
house.add(wall1);

// Wall 2 - left
const wall2 = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 4),
  new THREE.MeshStandardMaterial({
    map: stoneColourTexture,
    aoMap: stoneAmbientOcclusionTexture,
    normalMap: stoneNormalTexture,
    roughnessMap: stoneRoughnessTexture,
  })
);
wall2.castShadow = true;
wall2.receiveShadow =true;
wall2.position.y = 1.5;
wall2.position.x = -3;
house.add(wall2);

// Wall 3 - right
const wall3 = new THREE.Mesh(
  new THREE.BoxGeometry(3, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: stoneColourTexture,
    aoMap: stoneAmbientOcclusionTexture,
    normalMap: stoneNormalTexture,
    roughnessMap: stoneRoughnessTexture,
  })
);
wall3.castShadow = true;
wall3.receiveShadow = true;
wall3.position.y = 1.25;
wall3.position.x = 3;
house.add(wall3);

/**
 * House Door
 */
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: woodColourTexture,
    aoMap: woodAmbientOcclusionTexture,
    displacementMap: woodHeightTexture,
    displacementScale: 0.1,
    normalMap: woodNormalTexture,
    roughnessMap: woodRoughnessTexture,
  })
);
door.receiveShadow = true;
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

/**
 * House Windows
 */
// window - left
const stonewindow1 = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 5, 5),
  new THREE.MeshStandardMaterial({
    map: woodColourTexture,
    aoMap: woodAmbientOcclusionTexture,
    displacementMap: woodHeightTexture,
    displacementScale: 0.1,
    normalMap: woodNormalTexture,
    roughnessMap: woodRoughnessTexture,
  })
);
stonewindow1. receiveShadow = true;
stonewindow1.position.y = 2;
stonewindow1.position.x = -3;
stonewindow1.position.z = 2 + 0.01;
house.add(stonewindow1);

// windows - right
const stonewindow2 = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 5, 5),
  new THREE.MeshStandardMaterial({
    map: woodColourTexture,
    aoMap: woodAmbientOcclusionTexture,
    displacementMap: woodHeightTexture,
    displacementScale: 0.1,
    normalMap: woodNormalTexture,
    roughnessMap: woodRoughnessTexture,
  })
);
stonewindow2. receiveShadow = true;
stonewindow2.position.y = 1.5;
stonewindow2.position.x = 3;
stonewindow2.position.z = 2 + 0.01;
house.add(stonewindow2);

// windows - top
const stonewindow3 = new THREE.Mesh(
  new THREE.PlaneGeometry(1.1, 1.1, 5, 5),
  new THREE.MeshStandardMaterial({
    map: woodColourTexture,
    aoMap: woodAmbientOcclusionTexture,
    displacementMap: woodHeightTexture,
    displacementScale: 0.1,
    normalMap: woodNormalTexture,
    roughnessMap: woodRoughnessTexture,
  })
);
stonewindow3. receiveShadow = true;
stonewindow3.position.y = 3.75;
stonewindow3.position.z = 2 + 0.01;
house.add(stonewindow3);

/**
 * Walkway
 */
const walkwayGeometry = new THREE.CircleGeometry(0.3, 32);
const walkwayMaterial = new THREE.MeshStandardMaterial({
  map: walkwayColourTexture,
  aoMap: walkwayAmbientOcclusionTexture,
  normalMap: walkwayNormalTexture,
  roughnessMap: walkwayRoughnessTexture,
});

// Walk 1
const walkway1 = new THREE.Mesh(walkwayGeometry, walkwayMaterial);
walkway1.receiveShadow = true;
walkway1.rotation.x = -Math.PI * 0.5;
walkway1.position.y = 0.03;
walkway1.position.z = 3;
scene.add(walkway1);

// Walk 2
const walkway2 = new THREE.Mesh(walkwayGeometry, walkwayMaterial);
walkway2.receiveShadow = true;
walkway2.rotation.x = -Math.PI * 0.5;
walkway2.position.y = 0.03;
walkway2.position.z = 3.7;
scene.add(walkway2);

// Walk 3
const walkway3 = new THREE.Mesh(walkwayGeometry, walkwayMaterial);
walkway3.receiveShadow = true;
walkway3.rotation.x = -Math.PI * 0.5;
walkway3.position.y = 0.03;
walkway3.position.z = 4.4;
scene.add(walkway3);

// Walk 4
const walkway4 = new THREE.Mesh(walkwayGeometry, walkwayMaterial);
walkway4.receiveShadow = true;
walkway4.rotation.x = -Math.PI * 0.5;
walkway4.position.y = 0.03;
walkway4.position.z = 5.1;
scene.add(walkway4);

// Walk 5
const walkway5 = new THREE.Mesh(walkwayGeometry, walkwayMaterial);
walkway5.receiveShadow = true;
walkway5.rotation.x = -Math.PI * 0.5;
walkway5.position.y = 0.03;
walkway5.position.z = 5.8;
scene.add(walkway5);

// Walk 6
const walkway6 = new THREE.Mesh(walkwayGeometry, walkwayMaterial);
walkway6.receiveShadow = true;
walkway6.rotation.x = -Math.PI * 0.5;
walkway6.position.y = 0.03;
walkway6.position.z = 6.5;
scene.add(walkway6);

/**
 * Tree 1
 */
// Create bark 1
const treeBark1 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 2, 30),
  new THREE.MeshStandardMaterial({
    map: barkColourTexture,
    aoMap: barkAmbientOcclusionTexture,
    normalMap: barkNormalTexture,
    roughnessMap: barkRoughnessTexture,
  })
);
treeBark1.castShadow = true;
treeBark1.position.x = 12;
treeBark1.position.y = 1;
treeBark1.position.z = 7;
scene.add(treeBark1);

// Create tree 1
const tree1 = new THREE.Mesh(
  new THREE.SphereGeometry(1.1, 15, 15),
  new THREE.MeshStandardMaterial({
    map: treeColourTexture,
    aoMap: treeAmbientOcclusionTexture,
    normalMap: treeNormalTexture,
    roughnessMap: treeRoughnessTexture,
  })
);
tree1.castShadow = true;
tree1.position.x = 12;
tree1.position.y = 3;
tree1.position.z = 7;
scene.add(tree1);

/**
 * Tree 2
 */
//  Create bark 2
const treeBark2 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 2, 30),
  new THREE.MeshStandardMaterial({
    map: barkColourTexture,
    aoMap: barkAmbientOcclusionTexture,
    normalMap: barkNormalTexture,
    roughnessMap: barkRoughnessTexture,
  })
);
treeBark2.castShadow = true;
treeBark2.position.x = -12;
treeBark2.position.y = 1;
treeBark2.position.z = 7;
scene.add(treeBark2);

// Create tree 2
const tree2 = new THREE.Mesh(
  new THREE.SphereGeometry(1.1, 15, 15),
  new THREE.MeshStandardMaterial({
    map: treeColourTexture,
    aoMap: treeAmbientOcclusionTexture,
    normalMap: treeNormalTexture,
    roughnessMap: treeRoughnessTexture,
  })
);
tree2.castShadow = true;
tree2.position.x = -12;
tree2.position.y = 3;
tree2.position.z = 7;
scene.add(tree2);

/**
 * Tree 3
 */
//  Create bark 3
const treeBark3 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 2, 30),
  new THREE.MeshStandardMaterial({
    map: barkColourTexture,
    aoMap: barkAmbientOcclusionTexture,
    normalMap: barkNormalTexture,
    roughnessMap: barkRoughnessTexture,
  })
);
treeBark3.castShadow = true;
treeBark3.position.x = 10;
treeBark3.position.y = 1;
treeBark3.position.z = -4;
scene.add(treeBark3);

// Create tree 3
const tree3 = new THREE.Mesh(
  new THREE.SphereGeometry(1.1, 15, 15),
  new THREE.MeshStandardMaterial({
    map: treeColourTexture,
    aoMap: treeAmbientOcclusionTexture,
    normalMap: treeNormalTexture,
    roughnessMap: treeRoughnessTexture,
  })
);
tree3.castShadow = true;
tree3.position.x = 10;
tree3.position.y = 3;
tree3.position.z = -4;
scene.add(tree3);

/**
 * Tree 4
 */
//  Create bark 4
const treeBark4 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 2, 30),
  new THREE.MeshStandardMaterial({
    map: barkColourTexture,
    aoMap: barkAmbientOcclusionTexture,
    normalMap: barkNormalTexture,
    roughnessMap: barkRoughnessTexture,
  })
);
treeBark4.castShadow = true;
treeBark4.position.x = -10;
treeBark4.position.y = 1;
treeBark4.position.z = -4;
scene.add(treeBark4);

// Create tree 4
const tree4 = new THREE.Mesh(
  new THREE.SphereGeometry(1.1, 15, 15),
  new THREE.MeshStandardMaterial({
    map: treeColourTexture,
    aoMap: treeAmbientOcclusionTexture,
    normalMap: treeNormalTexture,
    roughnessMap: treeRoughnessTexture,
  })
);
tree4.castShadow = true;
tree4.position.x = -10;
tree4.position.y = 3;
tree4.position.z = -4;
scene.add(tree4);

/**
 * Tree 5
 */
//  Create bark 5
const treeBark5 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 2, 30),
  new THREE.MeshStandardMaterial({
    map: barkColourTexture,
    aoMap: barkAmbientOcclusionTexture,
    normalMap: barkNormalTexture,
    roughnessMap: barkRoughnessTexture,
  })
);
treeBark5.castShadow = true;
treeBark5.position.x = 18;
treeBark5.position.y = 1;
treeBark5.position.z = 2;
scene.add(treeBark5);

// Create tree 5
const tree5 = new THREE.Mesh(
  new THREE.SphereGeometry(1.1, 15, 15),
  new THREE.MeshStandardMaterial({
    map: treeColourTexture,
    aoMap: treeAmbientOcclusionTexture,
    normalMap: treeNormalTexture,
    roughnessMap: treeRoughnessTexture,
  })
);
tree5.castShadow = true;
tree5.position.x = 18;
tree5.position.y = 3;
tree5.position.z = 2;
scene.add(tree5);

/**
 * Tree 6
 */
//  Create bark 6
const treeBark6 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 2, 30),
  new THREE.MeshStandardMaterial({
    map: barkColourTexture,
    aoMap: barkAmbientOcclusionTexture,
    normalMap: barkNormalTexture,
    roughnessMap: barkRoughnessTexture,
  })
);
treeBark6.castShadow = true;
treeBark6.position.x = 8;
treeBark6.position.y = 1;
treeBark6.position.z = 13;
scene.add(treeBark6);

// Create tree 6
const tree6 = new THREE.Mesh(
  new THREE.SphereGeometry(1.1, 15, 15),
  new THREE.MeshStandardMaterial({
    map: treeColourTexture,
    aoMap: treeAmbientOcclusionTexture,
    normalMap: treeNormalTexture,
    roughnessMap: treeRoughnessTexture,
  })
);
tree6.castShadow = true;
tree6.position.x = 8;
tree6.position.y = 3;
tree6.position.z = 13;
scene.add(tree6);

/**
 * Tree 7
 */
//  Create bark 7
const treeBark7 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 2, 30),
  new THREE.MeshStandardMaterial({
    map: barkColourTexture,
    aoMap: barkAmbientOcclusionTexture,
    normalMap: barkNormalTexture,
    roughnessMap: barkRoughnessTexture,
  })
);
treeBark7.castShadow = true;
treeBark7.position.x = -17;
treeBark7.position.y = 1;
treeBark7.position.z = 1;
scene.add(treeBark7);

// Create tree 7
const tree7 = new THREE.Mesh(
  new THREE.SphereGeometry(1.1, 15, 15),
  new THREE.MeshStandardMaterial({
    map: treeColourTexture,
    aoMap: treeAmbientOcclusionTexture,
    normalMap: treeNormalTexture,
    roughnessMap: treeRoughnessTexture,
  })
);
tree7.castShadow = true;
tree7.position.x = -17;
tree7.position.y = 3;
tree7.position.z = 1;
scene.add(tree7);

/**
 * Tree 8
 */
//  Create bark 8
const treeBark8 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 2, 30),
  new THREE.MeshStandardMaterial({
    map: barkColourTexture,
    aoMap: barkAmbientOcclusionTexture,
    normalMap: barkNormalTexture,
    roughnessMap: barkRoughnessTexture,
  })
);
treeBark8.castShadow = true;
treeBark8.position.x = -15;
treeBark8.position.y = 1;
treeBark8.position.z = 13;
scene.add(treeBark8);

// Create tree 8
const tree8 = new THREE.Mesh(
  new THREE.SphereGeometry(1.1, 15, 15),
  new THREE.MeshStandardMaterial({
    map: treeColourTexture,
    aoMap: treeAmbientOcclusionTexture,
    normalMap: treeNormalTexture,
    roughnessMap: treeRoughnessTexture,
  })
);
tree8.castShadow = true;
tree8.position.x = -15;
tree8.position.y = 3;
tree8.position.z = 13;
scene.add(tree8);

/**
 * Tree 9
 */
//  Create bark 9
const treeBark9 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 2, 30),
  new THREE.MeshStandardMaterial({
    map: barkColourTexture,
    aoMap: barkAmbientOcclusionTexture,
    normalMap: barkNormalTexture,
    roughnessMap: barkRoughnessTexture,
  })
);
treeBark9.castShadow = true;
treeBark9.position.x = -5;
treeBark9.position.y = 1;
treeBark9.position.z = 10;
scene.add(treeBark9);

// Create tree 9
const tree9 = new THREE.Mesh(
  new THREE.SphereGeometry(1.1, 15, 15),
  new THREE.MeshStandardMaterial({
    map: treeColourTexture,
    aoMap: treeAmbientOcclusionTexture,
    normalMap: treeNormalTexture,
    roughnessMap: treeRoughnessTexture,
  })
);
tree9.castShadow = true;
tree9.position.x = -5;
tree9.position.y = 3;
tree9.position.z = 10;
scene.add(tree9);

/**
 * Create bushes
 */
const bushGeometry = new THREE.SphereGeometry(1, 10, 10);
const bushMaterial = new THREE.MeshStandardMaterial({
  map: bushColourTexture,
  aoMap: bushAmbientOcclusionTexture,
  normalMap: bushNormalTexture,
  roughnessMap: bushRoughnessTexture,
});

// Bush 1
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.castShadow = true;
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(3, 0.1, 8);
scene.add(bush1);

// Bush 2
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.castShadow = true;
bush2.scale.set(0.4, 0.4, 0.4);
bush2.position.set(4, 0.1, 8);
scene.add(bush2);

// Bush 3
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.castShadow = true;
bush3.scale.set(0.5, 0.5, 0.5);
bush3.position.set(7, 0.1, 4);
scene.add(bush3);

// Bush 4
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.castShadow = true;
bush4.scale.set(0.4, 0.4, 0.4);
bush4.position.set(2, 0.1, 2.2);
scene.add(bush4);

// Bush 5
const bush5 = new THREE.Mesh(bushGeometry, bushMaterial);
bush5.castShadow = true;
bush5.scale.set(0.15, 0.15, 0.15);
bush5.position.set(4, 0.05, 8.5);
scene.add(bush5);

// Bush 6
const bush6 = new THREE.Mesh(bushGeometry, bushMaterial);
bush6.castShadow = true;
bush6.scale.set(0.6, 0.6, 0.6);
bush6.position.set(10, 0.07, 8);
scene.add(bush6);

// Bush 7
const bush7 = new THREE.Mesh(bushGeometry, bushMaterial);
bush7.castShadow = true;
bush7.scale.set(0.8, 0.8, 0.8);
bush7.position.set(-10, 0.1, 2);
scene.add(bush7);

// Bush 8
const bush8 = new THREE.Mesh(bushGeometry, bushMaterial);
bush8.castShadow = true;
bush8.scale.set(0.4, 0.4, 0.4);
bush8.position.set(-10, 0.05, 3);
scene.add(bush8);

// Bush 9
const bush9 = new THREE.Mesh(bushGeometry, bushMaterial);
bush9.castShadow = true;
bush9.scale.set(0.8, 0.8, 0.8);
bush9.position.set(-12, 0.05, 11);
scene.add(bush9);

// Bush 10
const bush10 = new THREE.Mesh(bushGeometry, bushMaterial);
bush10.castShadow = true;
bush10.scale.set(0.2, 0.2, 0.2);
bush10.position.set(-12, 0.05, 12);
scene.add(bush10);

// Bush 11
const bush11 = new THREE.Mesh(bushGeometry, bushMaterial);
bush11.castShadow = true;
bush11.scale.set(0.4, 0.4, 0.4);
bush11.position.set(-11, 0.05, 12);
scene.add(bush11);

/**
 * Create mountains
 */
// Mountain 1
const mountain1 = new THREE.Mesh(
  new THREE.ConeGeometry(5, 8, 64, 32),
  new THREE.MeshStandardMaterial({
    map: mountainColourTexture,
    aoMap: mountainAmbientOcclusionTexture,
    normalMap: mountainNormalTexture,
    roughnessMap: mountainRoughnessTexture,
  })
);
mountain1.castShadow = true;
mountain1.receiveShadow = true;
mountain1.position.x = 15;
mountain1.position.y = 4;
mountain1.position.z = -10;
scene.add(mountain1);

// Mountain 2
const mountain2 = new THREE.Mesh(
  new THREE.ConeGeometry(5, 8, 64, 32),
  new THREE.MeshStandardMaterial({
    map: mountainColourTexture,
    aoMap: mountainAmbientOcclusionTexture,
    normalMap: mountainNormalTexture,
    roughnessMap: mountainRoughnessTexture,
  })
);
mountain2.castShadow = true;
mountain2.receiveShadow = true;
mountain2.position.x = -15;
mountain2.position.y = 4;
mountain2.position.z = -10;
scene.add(mountain2);

// Mountain 3
const mountain3 = new THREE.Mesh(
  new THREE.ConeGeometry(5, 8, 64, 32),
  new THREE.MeshStandardMaterial({
    map: mountainColourTexture,
    aoMap: mountainAmbientOcclusionTexture,
    normalMap: mountainNormalTexture,
    roughnessMap: mountainRoughnessTexture,
  })
);
mountain3.castShadow = true;
mountain3.receiveShadow = true;
mountain3.position.x = -6;
mountain3.position.y = 4;
mountain3.position.z = -10;
scene.add(mountain3);

// Mountain 4
const mountain4 = new THREE.Mesh(
  new THREE.ConeGeometry(5, 8, 64, 32),
  new THREE.MeshStandardMaterial({
    map: mountainColourTexture,
    aoMap: mountainAmbientOcclusionTexture,
    normalMap: mountainNormalTexture,
    roughnessMap: mountainRoughnessTexture,
  })
);
mountain4.castShadow = true;
mountain4.receiveShadow = true;
mountain4.position.x = 2;
mountain4.position.y = 4;
mountain4.position.z = -10;
scene.add(mountain4);

// Mountain 5
const mountain5 = new THREE.Mesh(
  new THREE.ConeGeometry(3, 6, 64, 32),
  new THREE.MeshStandardMaterial({
    map: mountainColourTexture,
    aoMap: mountainAmbientOcclusionTexture,
    normalMap: mountainNormalTexture,
    roughnessMap: mountainRoughnessTexture,
  })
);
mountain5.castShadow = true;
mountain5.receiveShadow = true;
mountain5.position.x = 9;
mountain5.position.y = 3;
mountain5.position.z = -10;
scene.add(mountain5);

/**
 * Create moving clouds (boxes)
 */
const changeColour = {color: 0xff00ff};
const cloudGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const cloudColour = new THREE.MeshStandardMaterial({
  color: changeColour.color
});

// Box 1
const cloud1 = new THREE.Mesh(cloudGeometry, cloudColour);
cloud1.position.x = 12;
cloud1.position.y = 13;
cloud1.position.z = -10;
cloud1.scale.set(3, 3, 3);
cloud1.castShadow = true;
scene.add(cloud1);

// Box 2
const cloud2 = new THREE.Mesh(cloudGeometry, cloudColour);
cloud2.position.x = 15;
cloud2.position.y = 13;
cloud2.position.z = 2;
cloud2.scale.set(3, 3, 3);
cloud2.castShadow = true;
scene.add(cloud2);

// Box 3
const cloud3 = new THREE.Mesh(cloudGeometry, cloudColour);
cloud3.position.x = -10;
cloud3.position.y = 13;
cloud3.position.z = -8;
cloud3.scale.set(3, 3, 3);
cloud3.castShadow = true;
scene.add(cloud3);

// Box 4
const cloud4 = new THREE.Mesh(cloudGeometry, cloudColour);
cloud4.position.x = -13;
cloud4.position.y = 13;
cloud4.position.z = 10;
cloud4.scale.set(3, 3, 3);
cloud4.castShadow = true;
scene.add(cloud4);

// Box 5
const cloud5 = new THREE.Mesh(cloudGeometry, cloudColour);
cloud5.position.x = -2;
cloud5.position.y = 13;
cloud5.position.z = 2;
cloud5.scale.set(3, 3, 3);
cloud5.castShadow = true;
scene.add(cloud5);

/**
 * Create lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#D9F0FB", 0.2);
scene.add(ambientLight);

// Directional light
const directionaLight = new THREE.DirectionalLight("#b9d5ff", 0.19);
directionaLight.castShadow = true;
directionaLight.position.set(4, 5, -2);
directionaLight.shadow.mapSize.width = 512;
directionaLight.shadow.mapSize.height = 512;
directionaLight.shadow.camera.near = 0.5;
directionaLight.shadow.camera.far = 300;
scene.add(directionaLight);

//Add second point light
var pointLight1 = new THREE.PointLight("#9415FD");
pointLight1.castShadow = true;
pointLight1.position.set(-5, 2, 7);
pointLight1.intensity = 0.2;
pointLight1.shadow.mapSize.width = 512;
pointLight1.shadow.mapSize.height = 512;
pointLight1.shadow.camera.near = 0.5;
pointLight1.shadow.camera.far = 300;
pointLight1.shadow.radius = 10;
scene.add(pointLight1);

//Add second point light
var pointLight2 = new THREE.PointLight("#D9F0FB");
pointLight2.castShadow = true;
pointLight2.position.set(5, 10, 12);
pointLight2.intensity = 0.2;
pointLight2.shadow.mapSize.width = 512;
pointLight2.shadow.mapSize.height = 512;
pointLight2.shadow.camera.near = 0.5;
pointLight2.shadow.camera.far = 300;
pointLight2.shadow.radius = 10;
scene.add(pointLight2);

/**
 * Camera Controller
 */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.75;
controls.screenSpacePanning = false;

/**
 * Initialising GUI debug window 
 */
const gui = new GUI();

// GUI for directional light
const directionaLightFolder = gui.addFolder('Directional Light');
directionaLightFolder.add(directionaLight, "intensity").min(0).max(1).step(0.001);
directionaLightFolder.add(directionaLight.position, "x").min(-5).max(5).step(0.001);
directionaLightFolder.add(directionaLight.position, "y").min(-5).max(5).step(0.001);
directionaLightFolder.add(directionaLight.position, "z").min(-5).max(5).step(0.001);

// GUI for ambient light
const ambientLightFolder = gui.addFolder('Ambient Light');
ambientLightFolder.add(ambientLight, "intensity").min(0).max(1).step(0.001);
ambientLightFolder.add(ambientLight.position, "x").min(-5).max(5).step(0.001);
ambientLightFolder.add(ambientLight.position, "y").min(-5).max(5).step(0.001);
ambientLightFolder.add(ambientLight.position, "z").min(-5).max(5).step(0.001);

// GUI for point light 1
const pointLight1Folder = gui.addFolder('Point Light 1');
pointLight1Folder.add(pointLight1, "intensity").min(0).max(1).step(0.001);
pointLight1Folder.add(pointLight1.position, "x").min(-5).max(5).step(0.001);
pointLight1Folder.add(pointLight1.position, "y").min(-5).max(5).step(0.001);
pointLight1Folder.add(pointLight1.position, "z").min(-5).max(5).step(0.001);

// GUI for point light 2
const pointLight2Folder = gui.addFolder('Point Light 2');
pointLight2Folder.add(pointLight2, "intensity").min(0).max(1).step(0.001);
pointLight2Folder.add(pointLight2.position, "x").min(-5).max(5).step(0.001);
pointLight2Folder.add(pointLight2.position, "y").min(-5).max(5).step(0.001);
pointLight2Folder.add(pointLight2.position, "z").min(-5).max(5).step(0.001);

// GUI for changing colour of box clouds
const cloudFolder = gui.addFolder('Box Clouds');
cloudFolder
  .addColor(changeColour, 'color')
  .onChange(() =>
  {
    cloudColour.color.set(changeColour.color)
  });

/**
 * Animate
 */
const clock = new THREE.Clock()

const animate = () =>
{

  // Animate moving boxes using Three.js 'clock' function
  const time = clock.getElapsedTime()

  cloud1.rotation.y = time
  cloud2.rotation.y = time
  cloud3.rotation.y = time
  cloud4.rotation.y = time
  cloud5.rotation.y = time

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(animate);

};
animate();
