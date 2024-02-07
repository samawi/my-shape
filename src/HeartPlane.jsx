import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Select } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Edges } from '@react-three/drei'

export default function HeartPlane({position, name, color}) {
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
    // steps: 2,
    depth: 2,
    bevelEnabled: false
    // bevelThickness: 1,
    // bevelSize: 1,
    // bevelOffset: 0,
    // bevelSegments: 1,
  }
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  const edge = new THREE.EdgesGeometry(geometry)
  const line = new THREE.LineSegments(
    edge,
    new THREE.LineBasicMaterial({ color: 0x000000 })
  )

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
          // side={THREE.DoubleSide}
        />
        <Edges color={"white"} />
      </mesh>
    </Select>
  )
}
