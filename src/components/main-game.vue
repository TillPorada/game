<template>
  <div id="gameCanvas"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import * as BABYLON from 'babylonjs';

onMounted(() => {
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  const engine = new BABYLON.Engine(canvas, true);

  // Erstelle eine Szene
  const scene = createScene(engine, canvas);

  // Erstelle den Hund
  const dog = createDog(scene);

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener('resize', () => {
    engine.resize();
  });
});

function createScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
  const scene = new BABYLON.Scene(engine);

  // Erstelle eine Kamera
  const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);

  // Erstelle ein Licht
  const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

  // Erstelle eine Bodenfläche (Wiese)
  const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, scene);
  const groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
  groundMaterial.diffuseTexture = new BABYLON.Texture('/path/to/grass-texture.jpg', scene);
  ground.material = groundMaterial;

  return scene;
}

function createDog(scene: BABYLON.Scene) {
  // Erstelle ein Mesh für den Hund
  const dogMesh = BABYLON.MeshBuilder.CreateSphere('dogMesh', { diameter: 0.5 }, scene);
  const dogMaterial = new BABYLON.StandardMaterial('dogMaterial', scene);
  dogMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.6, 0.4);
  dogMesh.material = dogMaterial;

  // Positioniere den Hund auf der Wiese
  dogMesh.position.y = 0.25;

  return dogMesh;
}
</script>

<style scoped>
#gameCanvas {
  width: 100%;
  height: 100%;
}
</style>