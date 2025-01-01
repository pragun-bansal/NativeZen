"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./model-view";
import { useEffect, useRef, useState } from "react";
import { markdownImg } from "../utils";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

interface ModelProps {
  model?: {
    title: string;
    color: string[];
    img: string;
  };
}

const Model: React.FC<ModelProps> = ({
  model = {
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: markdownImg,
  },
}) => {
  const cameraControl = useRef<any>();
  const modelRef = useRef(new THREE.Group());

  // Rotation state for both axes
  const [rotation, setRotation] = useState({
    horizontal: Math.PI, // Y-axis (horizontal)
    vertical: 0, // X-axis (vertical)
  });

  // Drag state
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentHorizontal: Math.PI,
    currentVertical: 0,
  });

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = rotation.horizontal;
      modelRef.current.rotation.x = rotation.vertical;
    }
  }, [rotation]);

  const handlePointerDown = (event: React.MouseEvent | React.TouchEvent) => {
    const startX =
      "clientX" in event ? event.clientX : event.touches[0].clientX;
    const startY =
      "clientY" in event ? event.clientY : event.touches[0].clientY;
    dragState.current = {
      ...dragState.current,
      isDragging: true,
      startX,
      startY,
      currentHorizontal: rotation.horizontal,
      currentVertical: rotation.vertical,
    };
  };

  const handlePointerMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!dragState.current.isDragging) return;

    const currentX =
      "clientX" in event ? event.clientX : event.touches[0].clientX;
    const currentY =
      "clientY" in event ? event.clientY : event.touches[0].clientY;

    // Calculate deltas for both axes
    const deltaX = (currentX - dragState.current.startX) * 0.01; // Horizontal rotation sensitivity
    const deltaY = (currentY - dragState.current.startY) * 0.01; // Vertical rotation sensitivity

    // Update rotations
    const newHorizontal = dragState.current.currentHorizontal + deltaX;
    const newVertical = Math.min(
      Math.max(dragState.current.currentVertical - deltaY, -Math.PI / 2), // Limit vertical rotation
      Math.PI / 2
    );

    setRotation({ horizontal: newHorizontal, vertical: newVertical });

    if (modelRef.current) {
      modelRef.current.rotation.y = newHorizontal;
      modelRef.current.rotation.x = newVertical;
    }
  };

  const handlePointerUp = () => {
    dragState.current.isDragging = false;
  };

  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);

  return (
    <section className="">
      <div className="screen-max-width">
        <div
          className="flex flex-col items-center mt-5"
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          style={{ cursor: dragState.current.isDragging ? "grabbing" : "grab" }}
        >
          <div className="w-full h-[40vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={modelRef}
              gsapType="view1"
              controlRef={cameraControl}
              setRotationState={setRotation}
              item={model}
            />

            <Canvas
              style={{
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root") || undefined}
            >
              <View.Port />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
