import { useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { useRef } from "react"

export function CameraRig() {
  const { camera, scene, gl } = useThree()

  const controlsRef = useRef()
  const targetPos = useRef(new THREE.Vector3())
  const desiredCamPos = useRef(new THREE.Vector3())
  const camBackward = useRef(new THREE.Vector3())

  // 🔧 CAMERA TUNING
  const HEIGHT = 3
  const DISTANCE = 6
  const SMOOTHNESS = 0.12

  useFrame(() => {
    const avatar = scene.getObjectByName("avatar")
    if (!avatar || !controlsRef.current) return

    // avatar world position
    avatar.getWorldPosition(targetPos.current)

    /**
     * 🔑 KEY FIX
     * Camera always stays BEHIND the camera's current forward direction,
     * not avatar rotation (prevents side view on A/D)
     */
    camera.getWorldDirection(camBackward.current)
    camBackward.current.normalize().multiplyScalar(-DISTANCE)

    desiredCamPos.current.set(
      targetPos.current.x + camBackward.current.x,
      targetPos.current.y + HEIGHT,
      targetPos.current.z + camBackward.current.z
    )

    // smooth camera follow
    camera.position.lerp(desiredCamPos.current, SMOOTHNESS)

    // orbit target locked to avatar (chest height)
    controlsRef.current.target.lerp(
      new THREE.Vector3(
        targetPos.current.x,
        targetPos.current.y + 1.5,
        targetPos.current.z
      ),
      0.2
    )

    controlsRef.current.update()
  })

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enablePan={false}
      enableZoom={false}
      enableDamping
      dampingFactor={0.08}
      minPolarAngle={Math.PI / 2 - 0.15}
      maxPolarAngle={Math.PI / 2 - 0.15}
      rotateSpeed={0.6}
    />
  )
}
