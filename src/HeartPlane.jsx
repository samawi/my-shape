import React from 'react'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Select } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Edges } from '@react-three/drei'


const HeartPlane = ({ position, name, color }) => {
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

  const shape = new THREE.Shape()
  const x = -2.5
  const y = -5
  shape.moveTo(0, 0)
  shape.lineTo(0, 1)
  shape.lineTo(1, 1)
  shape.lineTo(1, 0)
  shape.lineTo(0, 0)

  const extrudeSettings = {
    depth: 2,
    bevelEnabled: false
  }
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

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

export default HeartPlane
