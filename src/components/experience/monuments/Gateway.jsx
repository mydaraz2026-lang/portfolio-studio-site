import { GEO, MAT } from '../sharedResources';

/** Intro: a stepped plinth and gateway the camera flies through to start the journey. */
export default function Gateway({ accent }) {
  const plinth = [
    { w: 7.4, d: 3.8, y: 0.1 },
    { w: 6.6, d: 3.0, y: 0.3 },
    { w: 5.8, d: 2.2, y: 0.5 },
  ];
  return (
    <group>
      {plinth.map((s) => (
        <mesh key={s.y} geometry={GEO.box} material={MAT.concreteDark} position={[0, s.y, 0]} scale={[s.w, 0.2, s.d]} />
      ))}
      {[-2.3, 2.3].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh geometry={GEO.box} material={MAT.concrete} position={[0, 3.6, 0]} scale={[0.9, 6, 0.9]} />
          {/* accent strip on the inner front edge */}
          <mesh
            geometry={GEO.box}
            material={accent}
            position={[x < 0 ? 0.47 : -0.47, 3.6, 0.47]}
            scale={[0.05, 5.2, 0.05]}
          />
        </group>
      ))}
      <mesh geometry={GEO.box} material={MAT.concrete} position={[0, 6.9, 0]} scale={[5.6, 0.6, 1.1]} />
    </group>
  );
}
