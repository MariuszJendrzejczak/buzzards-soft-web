import { WarsztatHeroTile } from "buzzards-soft-ui";

export function Default() {
  return (
    <div className="p-6" style={{ width: 560 }}>
      <WarsztatHeroTile />
    </div>
  );
}

export function Narrow() {
  return (
    <div className="p-6" style={{ width: 380 }}>
      <WarsztatHeroTile />
    </div>
  );
}
