import { Canvas } from '@react-three/fiber'
import Box from './Box'
import { EffectComposer, Outline, Selection } from '@react-three/postprocessing'
import HeartPlane from './HeartPlane'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { useControls } from 'leva'
import * as THREE from 'three'

function Lights() {
  const ambientRef = useRef()
  const directionalRef = useRef()
  const pointRef = useRef()
  const spotRef = useRef()

  useControls('Ambient Light', {
    visible: {
      value: false,
      onChange: (v) => {
        ambientRef.current.visible = v
      }
    },
    color: {
      value: 'white',
      onChange: (v) => {
        ambientRef.current.color = new THREE.Color(v)
      }
    }
  })

  useControls('Directional Light', {
    visible: {
      value: true,
      onChange: (v) => {
        directionalRef.current.visible = v
      }
    },
    position: {
      x: 3,
      y: 3,
      z: 3,
      onChange: (v) => {
        directionalRef.current.position.copy(v)
      }
    },
    color: {
      value: 'white',
      onChange: (v) => {
        directionalRef.current.color = new THREE.Color(v)
      }
    },
    intensity: {
      value: 1,
      onChange: (v) => {
        directionalRef.current.intensity = v
      }
    },
  })

  useControls('Point Light', {
    visible: {
      value: false,
      onChange: (v) => {
        pointRef.current.visible = v
      }
    },
    position: {
      x: 2,
      y: 0,
      z: 0,
      onChange: (v) => {
        pointRef.current.position.copy(v)
      }
    },
    color: {
      value: 'white',
      onChange: (v) => {
        pointRef.current.color = new THREE.Color(v)
      }
    },
    intensity: {
      value: 1,
      onChange: (v) => {
        pointRef.current.intensity = v
      }
    },
  })

  useControls('Spot Light', {
    visible: {
      value: false,
      onChange: (v) => {
        spotRef.current.visible = v
      }
    },
    position: {
      x: 3,
      y: 2.5,
      z: 1,
      onChange: (v) => {
        spotRef.current.position.copy(v)
      }
    },
    color: {
      value: 'white',
      onChange: (v) => {
        spotRef.current.color = new THREE.Color(v)
      }
    },
    intensity: {
      value: 1,
      onChange: (v) => {
        spotRef.current.intensity = v
      }
    },
  })

  return (
    <>
      <ambientLight ref={ambientRef} />
      <directionalLight ref={directionalRef} />
      <pointLight ref={pointRef} />
      <spotLight ref={spotRef} />
    </>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <Lights />
      <Selection>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline
            blur
            visibleEdgeColor="white"
            edgeStrength={100}
            width={1000}
          />
        </EffectComposer>
        <HeartPlane position={[-0.75, 0, 0]} name="A" color={"green"} />
        <HeartPlane position={[0.75, 0, 0]} name="B" color={"blue"}/>
        {/* <Box position={[0.75, 0, 0]} name="B" /> */}
      </Selection>
      <OrbitControls />
      <axesHelper args={[5]} />
    </Canvas>
  )
}
