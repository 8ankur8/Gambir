import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Neon(props) {
  const { nodes, materials } = useGLTF("/models/neon.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[-14.52, 18.49, -4.23]}
            rotation={[2.76, 0, 0]}
            scale={6.36}
          >
            <mesh
              geometry={nodes.Object_8.geometry}
              material={materials.Material}
            />
          </group>
          <group
            position={[-51.02, 19.33, 4.26]}
            rotation={[-2.75, 0, 0]}
            scale={6.31}
          >
            <mesh
              geometry={nodes.Object_10.geometry}
              material={materials.Material}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/neon.glb");