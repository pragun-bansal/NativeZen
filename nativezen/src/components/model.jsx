"use client";
import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import ModelView from "./model-view";
import { useEffect, useRef, useState } from "react";
import { markdownImg } from "../utils";

import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "@/lib/constants";
import { animateWithGsapTimeline } from "../utils/animations";

const Model = () => {
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: markdownImg,
  })

  // camera control for the model view
  const cameraControl = useRef();

  // model
  const modelRef = useRef(new THREE.Group());
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.PI;
    }
  }, []);

  // rotation
  const [rotation, setRotation] = useState(2.27);

  const tl = gsap.timeline();

  const [rotationSpeed] = useState(0.00);

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (modelRef.current) {
        modelRef.current.rotation.y = Math.PI;
        console.log(modelRef.current.rotation.y)
        setRotation(modelRef.current.rotation.y);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [rotationSpeed]);

  useGSAP(() => {
    gsap.to('#heading', { y: 0, opacity: 1 })
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center mt-5">
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
              className=""
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden'
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
                  <li key={i} className="w-6 h-6 rounded-full mx-2 cursor-pointer" style={{ backgroundColor: item.color[0] }} onClick={() => setModel(item)} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Model