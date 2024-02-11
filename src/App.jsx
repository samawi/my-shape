import { Canvas } from '@react-three/fiber'
import { EffectComposer, Outline, Selection } from '@react-three/postprocessing'
import { OrbitControls } from '@react-three/drei'
import React from 'react'
import Lights from './Lights'
import Shape from './Shape'
import Shape2 from './Shape2'

const App = () => {
  const shapes = [
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 }
    ], // Square
    [
      { x: 0, y: 0 },
      { x: 0.5, y: 1 },
      { x: 1, y: 0 }
    ] // Triangle
  ]

  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <Lights />
      <Selection>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline
            blur
            visibleEdgeColor="white"
            edgeStrength={1}
            width={1000}
          />
        </EffectComposer>
        <Shape2
          shape={shapes[0]}
          position={[0, 0, 0]}
          name="A"
          color={'green'}
        />
        <Shape2
          shape={shapes[1]}
          position={[0, 1, 0]}
          name="B"
          color={'blue'}
        />
      </Selection>
      <OrbitControls />
      <axesHelper args={[5]} />
    </Canvas>
  )
}

export default App
