import { useThree } from '@react-three/fiber';

export default function HeroBackground() {
  const { viewport } = useThree();
  
  return (
    <mesh position={[0, 0, -10]} scale={[viewport.width * 2, viewport.height * 2, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="#050816" />
    </mesh>
  );
} 