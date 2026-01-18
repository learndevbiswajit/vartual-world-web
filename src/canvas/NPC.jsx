import { useRef } from "react"

export function NPC({ position = [5, 0, 5] }) {
  const ref = useRef()

  return (
    <mesh ref={ref} position={position} castShadow>
      <capsuleGeometry args={[0.4, 1.2, 4, 8]} />
      <meshStandardMaterial color="#4aa3ff" />
    </mesh>
  )
}
