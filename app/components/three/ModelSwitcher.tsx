"use client";

import { Group, Object3D, Mesh, Material } from "three";
import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import MacbookModel16 from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ModelSwitcherProps {
  scale: number;
  isMobile: boolean;
}

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

// Fade mesh materials
const fadeMeshs = (group: Group | null, opacity: number) => {
  if (!group) return;

  group.traverse((child: Object3D) => {
    if ((child as Mesh).isMesh) {
      const mesh = child as Mesh;
      const material = mesh.material as Material;

      material.transparent = true;

      gsap.to(material, {
        opacity,
        duration: ANIMATION_DURATION,
      });
    }
  });
};

// Move group in the X axis
const moveGroup = (group: Group | null, x: number) => {
  if (!group) return;

  gsap.to(group.position, {
    x,
    duration: ANIMATION_DURATION,
  });
};

const ModelSwitcher = ({ scale, isMobile }: ModelSwitcherProps) => {
  const smallMacbookRef = useRef<Group>(null);
  const largeMacbookRef = useRef<Group>(null);

  const showLargeMacbook = scale === 0.08 || scale === 0.05;

  useGSAP(
    () => {
      if (showLargeMacbook) {
        moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
        moveGroup(largeMacbookRef.current, 0);

        fadeMeshs(smallMacbookRef.current, 0);
        fadeMeshs(largeMacbookRef.current, 1);
      } else {
        moveGroup(smallMacbookRef.current, 0);
        moveGroup(largeMacbookRef.current, -OFFSET_DISTANCE);

        fadeMeshs(smallMacbookRef.current, 1);
        fadeMeshs(largeMacbookRef.current, 0);
      }
    },
    { dependencies: [scale] }
  );

  const controlsConfig = {
    snap: true,
    speed: 3,
    zoom: 1,
    azimuth: [-Infinity, Infinity] as [number, number],
    config: { mass: 1, tension: 0, friction: 26 },
  };

  return (
    <>
      <PresentationControls {...controlsConfig}>
        <group ref={largeMacbookRef}>
          <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>

      <PresentationControls {...controlsConfig}>
        <group ref={smallMacbookRef}>
          <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  );
};

export default ModelSwitcher;
