import * as THREE from 'three'
import Image from 'next/image'
import Link from 'next/link'
import Underlay from './world/Underley'
import Web3 from './web3'
import styles from '../styles/Home.module.css'
import { useState, useRef, Suspense, useMemo,useEffect } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { Trail,Reflector, CameraShake, OrbitControls, useTexture,Preload ,Html, useProgress  } from '@react-three/drei'
import { KernelSize } from 'postprocessing'
import { SSR,EffectComposer, Bloom } from '@react-three/postprocessing'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { Hall } from './world/Hall'
import { Neon } from './world/Neon'
import { DoubleSide } from 'three'
import { useRoute, useLocation } from 'wouter'
import AnimatedR from './animatedR'
import { AnimatePresence } from 'framer-motion'


function Loader() {
  const { progress } = useProgress()
  return <Html center>Transforming {progress} % Reality</Html>
}



function Nocap({ color, ...props }) {
  const ref = useRef()
  useFrame((_) => (ref.current.position.y = Math.sin(_.clock.elapsedTime) / 10))
  const { paths: [path] } = useLoader(SVGLoader,'/nocapmeta.svg') 
  const geom = useMemo(() => SVGLoader.pointsToStroke(path.currentPath.getPoints(), path.userData.style), [])
  return (
    <group scale={1} ref={ref}>
      <mesh  geometry={geom} {...props}>
        <meshBasicMaterial color={ color } toneMapped={false} side={DoubleSide} />
      </mesh>
    </group>
  )
}


function Rig({ children }) {
  const ref = useRef()
  const vec = new THREE.Vector3()
  const { camera, mouse } = useThree()
   useFrame((state, delta) => {
    camera.position.lerp(vec.set(mouse.x*2, mouse.y * 0.5, 10), 0.03)
  //  // ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1)
  //   //ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) /1, 0.1)
   })
  return <group ref={ref}>{children}</group>
}

function Triangle({url, color, ...props }) {
  const ref = useRef()
  const [r] = useState(() => Math.random() * 10000)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((_) => (ref.current.position.y = Math.sin(_.clock.elapsedTime - r) / 10))
  const { paths: [path] } = useLoader(SVGLoader, '/triangle.svg') 
  const geom = useMemo(() => SVGLoader.pointsToStroke(path.subPaths[0].getPoints(), path.userData.style), [])
  return (
    <group  ref={ref} onPointerOver={(event) => setHover(true)} onPointerOut={(event) => setHover(false)}>
      <mesh name={url} geometry={geom} {...props}>
        <meshBasicMaterial color={hovered ? 'cyan' : color } toneMapped={false} />
      </mesh>
    </group>
  )
}

function Portals({ q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const [, params] = useRoute('/:id')
  const [, setLocation] = useLocation()
  const clicked = useRef()
  const { mouse } = useThree()
  const vec = new THREE.Vector3()

  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id)
    console.log(clicked.current)
    if (clicked.current) {
      clicked.current.parent.localToWorld(p.set(clicked.current.position.x -0.75,clicked.current.position.y + 2.0,clicked.current.position.z - 1.0))
      //window.open("/web3")
      //window.open("https://92xlxi.csb.app/")
    } else {
      p.set(0, 0, 6)
      q.identity()
    }
  })
  useFrame((state, delta) => {
    state.camera.position.lerp(p.add(vec.set(mouse.x*0.025, mouse.y * 0.012)), 0.04)
    //state.camera.position.lerp(mouse.x,0.01)
    state.camera.quaternion.slerp(q, delta * 0.8)
  })
  return (
    <AnimatePresence>
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation()
        setLocation(clicked.current === e.object ? '/' : '/' + e.object.name)
      }}
      onPointerMissed={(e) => setLocation('/')}>
      <Triangle url={"web3"} color="#ff2060" scale={0.009} rotation={[0, 0, Math.PI / 3]} position={[0,-2,0]}/>
      <Triangle url={"metaverse"} color="white" scale={0.009} rotation={[0, 0, Math.PI / 3]} position={[3, -2, -2]}/>
      <Triangle url={"tokenization"} color="white" scale={0.009} rotation={[0, 0, Math.PI / 3]} position={[-3, -2, -2]}/>
    </group>
    </AnimatePresence>
  )
}


export default function Home() {
  return (
    <div className={styles.main} >
      <Canvas className={styles.scene} camera={{ position: [0, 0, 20]}}>
      <Suspense fallback={<Loader />}> 
      <color attach="background" args={['black']} />
      <ambientLight intensity={0.1} />
      {/* <OrbitControls /> */}
      {/* <Rig />  */}
      <Hall position={[0, 0.1, 0]} /> 
       <Portals /> 
      <Triangle url={"about"} color="orange" scale={0.005} rotation={[0, 0, 0]} position={[-3, 1.0, -3]}/>
      <Triangle url={"team"} color="orange" scale={0.005} rotation={[0, 0, 0]} position={[-0.25, 1.0, -3]}/>
      <EffectComposer multisampling={10}>
      <SSR 
      intensity={0.2} 
      power={0.5} 
      roughnessFadeOut={0.5} 
      thickness={7} 
      ior={1.25} 
      jitter={0.2}
      jitterspread={0.2}
      rayStep={0.1}
      maxDepthDifference={1.5}
      MAX_STEPS={1}
      NUM_BINARY_SEARCH_STEPS={7}
      blurKernelSize={3}
      maxDepth={1}/>
      <Bloom kernelSize={2} luminanceThreshold={0} luminanceSmoothing={0.4} intensity={0.05} />
      </EffectComposer>
      <Preload all />
      </Suspense> 
      </Canvas>
     
      <Underlay />
    </div>
  )
}
