import { useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { AVATARS } from "./avatars"
import { Html } from "@react-three/drei"

// keys
const W = "w", A = "a", S = "s", D = "d", SHIFT = "shift"
const DIRECTIONS = [W, A, S, D]

export default function Player() {
  const playerRef = useRef()
  const modelRef = useRef()

  const { camera } = useThree()

  // 🔁 CURRENT AVATAR (change this or via UI)
  const [avatarKey, setAvatarKey] = useState("avatar1")
  const avatar = AVATARS[avatarKey]

  const { scene, animations } = useGLTF(avatar.url)

  const mixer = useRef()
  const actions = useRef({})
  const currentAction = useRef("idle")

  const keys = useRef({})
  const walkDirection = new THREE.Vector3()
  const rotateAngle = new THREE.Vector3(0, 1, 0)
  const rotateQuaternion = new THREE.Quaternion()

  // tuning
  const WALK_SPEED = 2.2
  const RUN_SPEED = 5
  const ROTATE_SPEED = 0.15
  const FADE = 0.2

  // ---------------- keyboard ----------------
  useEffect(() => {
    const down = e => (keys.current[e.key.toLowerCase()] = true)
    const up = e => (keys.current[e.key.toLowerCase()] = false)
    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)
    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("keyup", up)
    }
  }, [])

  // ---------------- animation helper ----------------
  const findClip = (names) =>
    animations.find(a =>
      names.some(n =>
        a.name.toLowerCase().includes(n.toLowerCase())
      )
    )

  // ---------------- setup avatar ----------------
  useEffect(() => {
    if (!scene) return

    modelRef.current = scene
    mixer.current = new THREE.AnimationMixer(scene)
    actions.current = {}

    const idleClip = findClip(avatar.animations.idle)
    const walkClip = findClip(avatar.animations.walk)
    const runClip  = findClip(avatar.animations.run)

    if (idleClip) actions.current.idle = mixer.current.clipAction(idleClip)
    if (walkClip) actions.current.walk = mixer.current.clipAction(walkClip)
    if (runClip)  actions.current.run  = mixer.current.clipAction(runClip)

    actions.current.idle?.play()
    currentAction.current = "idle"
  }, [scene, animations, avatarKey])

  // ---------------- fade helper ----------------
  const fadeTo = (name) => {
    if (currentAction.current === name) return
    actions.current[currentAction.current]?.fadeOut(FADE)
    actions.current[name]?.reset().fadeIn(FADE).play()
    currentAction.current = name
  }

  // ---------------- frame loop ----------------
  useFrame((_, delta) => {
    if (!mixer.current || !playerRef.current) return

    const moving = DIRECTIONS.some(k => keys.current[k])
    const running = keys.current[SHIFT]

    if (moving && running && actions.current.run) fadeTo("run")
    else if (moving && actions.current.walk) fadeTo("walk")
    else fadeTo("idle")

    mixer.current.update(delta)

    if (currentAction.current === "walk" || currentAction.current === "run") {
      const angleYCameraDirection = Math.atan2(
        camera.position.x - playerRef.current.position.x,
        camera.position.z - playerRef.current.position.z
      )

      const offset =
        keys.current[A] ? Math.PI / 2 :
        keys.current[D] ? -Math.PI / 2 :
        keys.current[S] ? Math.PI :
        0

      rotateQuaternion.setFromAxisAngle(
        rotateAngle,
        angleYCameraDirection + offset
      )
      playerRef.current.quaternion.rotateTowards(
        rotateQuaternion,
        ROTATE_SPEED
      )

      camera.getWorldDirection(walkDirection)
      walkDirection.y = 0
      walkDirection.normalize()
      walkDirection.applyAxisAngle(rotateAngle, offset)

      const speed = currentAction.current === "run" ? RUN_SPEED : WALK_SPEED
      playerRef.current.position.addScaledVector(walkDirection, speed * delta)
    }
  })

  return (
    <>
      {/* 🔁 AVATAR SWITCH UI (TEMP) */}
      <Html position={[0, 2, 0]}>
        <select
          value={avatarKey}
          onChange={(e) => setAvatarKey(e.target.value)}
        >
          {Object.entries(AVATARS).map(([key, a]) => (
            <option key={key} value={key}>{a.label}</option>
          ))}
        </select>
      </Html>

      <group
        ref={playerRef}
        name="avatar"
        scale={avatar.scale}
        rotation={avatar.rotation}
      >
        <primitive object={scene} />
      </group>
    </>
  )
}
