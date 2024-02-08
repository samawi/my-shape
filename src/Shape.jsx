import React from 'react'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Select } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Edges } from '@react-three/drei'


const Shape = ({ shape, position, name, color }) => {
  const ref = useRef()

  const [hovered, setHover] = useState(false)
  const [goingAway, setGoingAway] = useState(false)
  const [goingHome, setGoingHome] = useState(false)
  const [deltaZ, setDeltaZ] = useState(0)
  const [home, setHome] = useState(true)

  // console.log('Hover : ', hovered)

  useEffect(() => {
    console.log('Box created', ref.current.name)
  }, [])

  useFrame((state, delta) => {
    // if home then move away and rotate in z axis until 90 degree
    if (goingAway) {
      console.log('Going away')
      if (deltaZ < 3) {
          ref.current.position.z += 0.1
          setDeltaZ(deltaZ + 0.1)
      }
      
      // if home then rotate in z axis 90 degree
      if (ref.current.rotation.z < Math.PI / 2) {
        ref.current.rotation.z += 0.05
      }
      if ((deltaZ === 3) && (ref.current.rotation.z > Math.PI / 2)) {
        setGoingAway(false)
        setHome(false)
      }
    }

    // if away then move home and rotate in z axis until 0 degree
    if (goingHome) {
      console.log('Going home')
      if (deltaZ > 0) {
        ref.current.position.z -= 0.1
        setDeltaZ(deltaZ - 0.1)
      }
      // if home then rotate in z axis 90 degree
      if (ref.current.rotation.z > 0) {
        ref.current.rotation.z -= 0.05
      }
      if ((deltaZ === 0) && (ref.current.rotation.z < 0)) {
        setGoingHome(false)
        setHome(true)
      }
    }

  })

  const myShape = new THREE.Shape()
  shape.forEach((point, index) => {
    if (index === 0) {
      myShape.moveTo(point.x, point.y)
    } else if (index < shape.length) {
      myShape.lineTo(point.x, point.y)
    } else if (index === shape.length){
      myShape.lineTo(shape[0].x, shape[0].y)
    }
  });

  const shapeOld = new THREE.Shape()
  shapeOld.moveTo(0, 0)
  shapeOld.lineTo(0, 1)
  shapeOld.lineTo(1, 1)
  shapeOld.lineTo(1, 0)
  shapeOld.lineTo(0, 0)

  const extrudeSettings = {
    depth: 2,
    bevelEnabled: false
  }
  const geometry = new THREE.ExtrudeGeometry(myShape, extrudeSettings)

  return (
    <Select enabled={hovered}>
      <mesh
        position={position}
        name={name}
        ref={ref}
        onPointerOver={() => {
          setHover(true)
        }}
        onPointerOut={() => setHover(false)}
        onPointerDown={() => {
          if (!home) {
            setGoingHome(true)
          }
          if (home) {
            setGoingAway(true)
          }
        }}
        geometry={geometry}>
        <meshStandardMaterial
          color={color}
          wireframe={false}
          flatShading
          opacity={0.5}
          transparent
        />
        <Edges color={'white'} />
      </mesh>
    </Select>
  )
}

export default Shape
