import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GlobePage = () => {
  const viewerRef = useRef(null);
  const createPathStrings = filename => {
    const basePath = '/assets/skybox/';
    const baseFilename = basePath + filename;
    const fileType = '.png';
    const sides = ['ft', 'bk', 'up', 'dn', 'rt', 'lf'];
    const pathString = sides.map(side => {
      return baseFilename + '_' + side + fileType;
    });
    return pathString;
  };
  const createMaterialArray = filename => {
    const skyboxImagePaths = createPathStrings(filename);
    const materialArray = skyboxImagePaths.map(image => {
      const texture = new THREE.TextureLoader().load(image);
      return new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide,
      });
    });
    return materialArray;
  };
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 45, 30000);
    camera.position.set(1200, -250, 2000);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);

    viewerRef.current.appendChild(renderer.domElement);

    const skyboxImage = 'corona';
    const materialArray = createMaterialArray(skyboxImage);
    const skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    const skybox = new THREE.Mesh(skyboxGeo, materialArray);
    scene.add(skybox);

    const animate = () => {
      skybox.rotation.x += 0.005;
      skybox.rotation.y += 0.005;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
  });

  return <div ref={viewerRef} />;
};
const ft = new THREE.TextureLoader().load('/assets/skybox/corona_ft.png');
const bk = new THREE.TextureLoader().load('/assets/skybox/corona_bk.png');
const up = new THREE.TextureLoader().load('/assets/skybox/corona_up.png');
const dn = new THREE.TextureLoader().load('/assets/skybox/corona_dn.png');
const rt = new THREE.TextureLoader().load('/assets/skybox/corona_rt.png');
const lt = new THREE.TextureLoader().load('/assets/skybox/corona_lt.png');
export default GlobePage;
