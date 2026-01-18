import React, { forwardRef } from "react"
import { useGLTF } from "@react-three/drei"

export const Model = forwardRef((props, ref) => {
  const { scene } = useGLTF("/models/avatar.glb")

  return (
    <group ref={ref} {...props} dispose={null} name="avatar">
      <primitive object={scene} />
    </group>
  )
})

useGLTF.preload("/models/avatar.glb")
