"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";

function Orb() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.6} roughness={0.2} />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="h-[420px] w-full rounded-2xl border border-white/10 bg-black/30">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3Body type="fixed">
            <Orb />
          </RigidBody>
        </Physics>
        <Environment preset="city" />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}