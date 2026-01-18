export function City() {
  return (
    <group>
      {/* Ground */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>

      {/* Simple buildings */}
      {[...Array(20)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.random() * 40 - 20,
            1,
            Math.random() * 40 - 20
          ]}
          castShadow
        >
          <boxGeometry args={[2, Math.random() * 4 + 2, 2]} />
          <meshStandardMaterial color="#555" />
        </mesh>
      ))}
    </group>
  )
}
