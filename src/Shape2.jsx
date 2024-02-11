import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Select } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Edges } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'

const Shape2 = (props) => {
  const ref = useRef()

  const [hovered, setHover] = useState(false)
  const [clicked, setClicked] = useState(false)

  const { position, rotation } = useSpring({
    position: clicked ? 2 : 0,
    rotation: clicked ? [0, Math.PI / 2, 0] : [0, 0, 0],
    config: { mass: 1, tension: 170, friction: 20 }
  })

  useEffect(() => {
    console.log('Box created', ref.current.name)
  }, [])

  const myShape = new THREE.Shape()
  props.shape.forEach((point, index) => {
    if (index === 0) {
      myShape.moveTo(point.x, point.y)
    } else if (index < props.shape.length) {
      myShape.lineTo(point.x, point.y)
    } else if (index === props.shape.length) {
      myShape.lineTo(props.shape[0].x, shape[0].y)
    }
  })

  const extrudeSettings = {
    depth: 1,
    bevelEnabled: false
  }
  const geometry = new THREE.ExtrudeGeometry(myShape, extrudeSettings).rotateX(
    -Math.PI / 2
  )

  return (
    <Select enabled={hovered}>
      <a.mesh
        position-z={position}
        rotation={rotation}
        {...props}
        name={name}
        ref={ref}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => {
          setHover(true)
        }}
        onPointerOut={() => setHover(false)}
        geometry={geometry}>
        <meshStandardMaterial
          color={props.color}
          wireframe={false}
          flatShading
          opacity={0.5}
          transparent
        />
        <Edges color={'white'} />
      </a.mesh>
    </Select>
  )
}

export default Shape2
