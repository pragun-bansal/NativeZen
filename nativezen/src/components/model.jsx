"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./model-view";
import { useEffect, useRef, useState } from "react";
import { markdownImg } from "../utils";

import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models } from "@/lib/constants";

const Model = () => {
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: markdownImg,
  });

  const cameraControl = useRef();
  const modelRef = useRef(new THREE.Group());

  // Rotation state for both axes
  const [rotation, setRotation] = useState({
    horizontal: Math.PI, // Y-axis (horizontal)
    vertical: 0,         // X-axis (vertical)
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

  const handlePointerDown = (event) => {
    const startX = event.clientX || event.touches[0].clientX;
    const startY = event.clientY || event.touches[0].clientY;
    dragState.current = {
      ...dragState.current,
      isDragging: true,
      startX,
      startY,
      currentHorizontal: rotation.horizontal,
      currentVertical: rotation.vertical,
    };
  };

  const handlePointerMove = (event) => {
    if (!dragState.current.isDragging) return;

    const currentX = event.clientX || event.touches[0].clientX;
    const currentY = event.clientY || event.touches[0].clientY;

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
    gsap.to('#heading', { y: 0, opacity: 1 });
  }, []);

  return (
      <section className="py-14">
        <div className="screen-max-width">
          <h1 id="heading" className="section-heading">
            Take a closer look.
          </h1>

          <div
              className="flex flex-col items-center mt-5"
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
              style={{ cursor: dragState.current.isDragging ? 'grabbing' : 'grab' }}
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
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    overflow: 'hidden',
                  }}
                  eventSource={document.getElementById('root')}
              >
                <View.Port />
              </Canvas>
            </div>

            <div className="mx-auto w-full">
              <p className="text-sm font-light text-center mb-5">{model.title}</p>

              <div className="flex-center">
                <ul className="color-container">
                  {models.map((item, i) => (
                      <li
                          key={i}
                          className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                          style={{ backgroundColor: item.color[0] }}
                          onClick={() => setModel(item)}
                      />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Model;
