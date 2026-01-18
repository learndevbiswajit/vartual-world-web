import { Suspense } from "react"
import { Environment } from "@react-three/drei"
import Player from "./Player"
import { CameraRig } from "./CameraRig"

export function Experience() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      <Suspense fallback={null}>
        <Player />
      </Suspense>

      <CameraRig />
      <Environment preset="city" />
    </>
  )
}
