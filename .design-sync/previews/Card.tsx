import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Icons,
} from "buzzards-soft-ui";

export function Default() {
  return (
    <div className="w-[420px] p-6">
      <Card>
        <CardHeader>
          <CardTitle>Mobile development — Flutter / Dart</CardTitle>
          <CardDescription>Programowanie produkcyjne</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-muted-foreground">
            Aplikacje mobilne Android + iOS od zera i rozwój istniejących. Architektura: Clean
            Architecture, Riverpod, Dependency Injection, SOLID.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function WithActionAndFooter() {
  return (
    <div className="w-[420px] p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Full</CardTitle>
          <CardDescription>firma, która chce być widoczna i pozyskiwać kontakt</CardDescription>
          <CardAction>
            <Badge className="bg-cta text-white">cena promocyjna</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-semibold text-foreground">2499 zł</span>
            <span className="text-sm text-muted-foreground line-through">2999 zł</span>
            <span className="font-mono text-[11px] tracking-wider text-text-subtle uppercase">netto</span>
          </div>
          <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Icons.Check className="size-4 text-brand" aria-hidden />
              Do 8 sekcji + 2 podstrony
            </li>
            <li className="flex items-center gap-2">
              <Icons.Check className="size-4 text-brand" aria-hidden />
              Widoczność lokalna (Google Business)
            </li>
            <li className="flex items-center gap-2">
              <Icons.Check className="size-4 text-brand" aria-hidden />
              Dopracowanie: 4 rundy / 14 dni
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="h-11 w-full bg-cta text-white hover:bg-cta-hover">Zamów Full</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export function Small() {
  return (
    <div className="p-6" style={{ width: 360 }}>
      <Card size="sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icons.ShieldCheck className="size-4 text-brand" aria-hidden />
            Bezpieczeństwo
          </CardTitle>
          <CardDescription>
            Szyfrowane połączenie HTTPS i hosting na infrastrukturze Google.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export function Grid() {
  const items = [
    { icon: Icons.Smartphone, title: "Aplikacje mobilne", body: "Android i iOS we Flutterze, prowadzone end-to-end." },
    { icon: Icons.Globe, title: "Strony internetowe", body: "Frontend w Next.js (TypeScript), backend w Firebase." },
    { icon: Icons.Workflow, title: "CI/CD", body: "Zautomatyzowane procesy: GitHub Actions, Codemagic." },
    { icon: Icons.Bot, title: "Programowanie agentowe", body: "Plan jako kontrakt, skille, hooki, MCP." },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 p-6" style={{ width: 560 }}>
      {items.map((item) => (
        <Card key={item.title} size="sm">
          <CardHeader>
            <item.icon className="mb-1 size-5 text-brand" aria-hidden />
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.body}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
