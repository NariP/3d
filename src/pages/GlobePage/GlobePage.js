import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

    // orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = true;
    controls.minDistance = 700;
    controls.maxDistance = 1500;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const onWindowResize = () => {
      camera.aspect = width / height;

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    animate();
    window.addEventListener('resize', onWindowResize, false);
    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  return <div ref={viewerRef} />;
};
export default GlobePage;
