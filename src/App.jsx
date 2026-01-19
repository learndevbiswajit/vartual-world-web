import { Canvas } from '@react-three/fiber'
import { Experience } from './canvas/Experience'
import { City } from './canvas/City'
import { Sky } from '@react-three/drei'

export default function App() {
  return (
    <Canvas style={{width:"100vw", height:"100vh"}}
      shadows
      camera={{ position: [0, 3, 6], fov: 50 }}
    >
      <Sky/>
    <City/>
      <Experience />
    </Canvas>
  )
}






