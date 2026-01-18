// =================== src/canvas/Interaction.jsx ===================
import { useEffect, useState } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"

export function Interaction() {
  const { scene } = useThree()
  const [canInteract, setCanInteract] = useState(false)
  const [open, setOpen] = useState(false)

  useFrame(() => {
    const avatar = scene.getObjectByName("avatar")
    const npc = scene.getObjectByName("npc")
    if (!avatar || !npc) return

    const dist = avatar.position.distanceTo(npc.position)
    setCanInteract(dist < 2)
    if (dist > 2) setOpen(false)
  })

  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === "e" && canInteract) {
        setOpen(true)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [canInteract])

  return (
    <>
      {canInteract && !open && (
        <Html center>
          <div style={hintStyle}>Press <b>E</b> to interact</div>
        </Html>
      )}

      {open && (
        <Html center>
          <div style={panelStyle}>
            <b>NPC</b>
            <p>Hello 👋 I am an AI guide.</p>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </Html>
      )}
    </>
  )
}

const hintStyle = {
  padding: "8px 14px",
  background: "rgba(0,0,0,0.75)",
  color: "#fff",
  borderRadius: "6px",
  fontFamily: "sans-serif",
}

const panelStyle = {
  width: 220,
  padding: 12,
  background: "#111",
  color: "#fff",
  borderRadius: 8,
  fontFamily: "sans-serif",
}
