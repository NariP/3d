import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styled from '@emotion/styled';

const SimpleCube = () => {
  const viewerRef = useRef(null);
  useEffect(() => {
    //
    const width = window.innerWidth - 1;
    const height = window.innerHeight - 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    viewerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      renderer.render(scene, camera);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      requestAnimationFrame(animate);
    };

    animate();
  });

  return <Canvas3D ref={viewerRef} />;
};

const Canvas3D = styled.div({
  width: '100%',
});

export default SimpleCube;
