"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { cn } from "~~/utils/cn";

type Coin3DProps = {
  coinName: "base" | "usdc";
  className?: string;
  appearanceRight?: boolean;
};

export const Coin3d: React.FC<Coin3DProps> = ({ coinName, className, appearanceRight = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  //states
  const [coinScale, setCoinScale] = useState({ x: 1.4, y: 1.4, z: 1.4 });

  //functions
  const handleResize = (renderer: THREE.WebGLRenderer) => {
    if (innerWidth < 640) {
      renderer.setSize(180, 180);
    } else if (innerWidth >= 640 && innerWidth <= 768) {
      renderer.setSize(200, 200);
    } else if (innerWidth > 768 && innerWidth <= 1024) {
      renderer.setSize(250, 250);
    } else if (innerWidth > 1024 && innerWidth <= 1536) {
      setCoinScale({ x: 1.1, y: 1.1, z: 1.1 });
      renderer.setSize(300, 300);
    } else {
      setCoinScale({ x: 1.5, y: 1.5, z: 1.5 });
      renderer.setSize(300, 300);
    }
  };

  //effects
  useEffect(() => {
    const container = mountRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 350 / 350, 0.1, 1000);
    camera.position.z = 3;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(devicePixelRatio);

    handleResize(renderer);

    renderer.setClearColor(0x000000, 0);
    container?.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1).normalize();
    scene.add(directionalLight);

    //mouse control
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const loader = new GLTFLoader();
    loader.load(
      `models/${coinName}.glb`,
      function (gltf) {
        gltf.scene.scale.set(coinScale.x, coinScale.y, coinScale.z);
        gltf.scene.rotation.set(Math.PI / 2, THREE.MathUtils.degToRad(270), 0);
        gltf.scene.position.y = -3;
        gltf.scene.position.x = appearanceRight ? -3 : 3;

        gltf.scene.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material.side = THREE.DoubleSide;
          }
        });

        scene.add(gltf.scene);

        //Timeline
        const tl = gsap.timeline();

        tl.to(gltf.scene.position, {
          y: 0,
          x: 0,
          duration: 1.2,
          ease: "power2.out",
        });

        tl.to(
          gltf.scene.rotation,
          {
            x: "+=" + Math.PI * 2 * 5, // 5 rounds
            duration: 2,
            // ease: "power4.out",
            ease: "slow(0.7, 0.7, false)",
          },
          "-=0.4",
        );
      },
      undefined,
      function (err) {
        console.error(err);
      },
    );

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animate);

    addEventListener("resize", () => handleResize(renderer));

    return () => {
      renderer.dispose();
      container?.removeChild(renderer.domElement);
      removeEventListener("resize", () => handleResize(renderer));
    };
  }, [appearanceRight, coinName, coinScale.x, coinScale.y, coinScale.z]);

  return <div ref={mountRef} className={cn("absolute bg-transparent top-0", className)} />;
};
