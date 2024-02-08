import React from 'react'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Select } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Edges } from '@react-three/drei'


const Shape = ({ shape, position, name, color }) => {
  const ref = useRef()

  const [hovered, setHover] = useState(false)
  const [rotate, setRotate] = useState(false)
  console.log('Hover : ', hovered)

  useEffect(() => {
    console.log('Box created', ref.current.name)
  }, [])

  useFrame((state, delta) => {
    if (rotate) {
      ref.current.rotation.x += 1 * delta
      ref.current.rotation.y += 0.5 * delta
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
          console.log('Hovered', name)
        }}
        onPointerOut={() => setHover(false)}
        onPointerDown={() => {
          setRotate(!rotate)
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