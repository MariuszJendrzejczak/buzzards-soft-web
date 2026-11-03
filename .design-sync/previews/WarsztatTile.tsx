import { Icons, WarsztatTile } from "buzzards-soft-ui";

// Ported from components/portfolio/WarsztatToolkit.tsx (ENABLERS).
const ENABLERS = [
  { id: "sessions", icon: Icons.Users },
  { id: "tools", icon: Icons.Plug },
  { id: "commands", icon: Icons.Command },
  { id: "git", icon: Icons.GitBranch },
] as const;

const key = (id: string, f: "title" | "desc") => `portfolio.warsztat.toolkit.enabler.${id}.${f}`;

export function Sessions() {
  return (
    <div className="p-6" style={{ width: 320 }}>
      <WarsztatTile
        titleKey={key("sessions", "title")}
        descriptionKey={key("sessions", "desc")}
        icon={Icons.Users}
      />
    </div>
  );
}

export function WithExample() {
  return (
    <div className="p-6" style={{ width: 320 }}>
      <WarsztatTile
        titleKey={key("commands", "title")}
        descriptionKey={key("commands", "desc")}
        icon={Icons.Command}
        example="/run-slice"
      />
    </div>
  );
}

export function EnablerGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 p-6" style={{ width: 560 }}>
      {ENABLERS.map((e) => (
        <WarsztatTile
          key={e.id}
          titleKey={key(e.id, "title")}
          descriptionKey={key(e.id, "desc")}
          icon={e.icon}
        />
      ))}
    </div>
  );
}
