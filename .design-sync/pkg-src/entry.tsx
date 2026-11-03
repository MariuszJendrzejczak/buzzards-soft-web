// design-sync package barrel: the components synced to claude.ai/design.
// Scope = ui primitives + shared + portfolio building blocks (no page sections).
// Built by .design-sync/build-pkg.mjs.

export * from "./buzzards-root";

// ui (shadcn on Base UI)
export * from "../../components/ui/accordion";
export * from "../../components/ui/badge";
export * from "../../components/ui/button";
export * from "../../components/ui/card";
export * from "../../components/ui/form";
export * from "../../components/ui/input";
export * from "../../components/ui/label";
export * from "../../components/ui/select";
export * from "../../components/ui/separator";
export * from "../../components/ui/sheet";
export * from "../../components/ui/sonner";
export * from "../../components/ui/textarea";

// shared
export * from "../../components/shared/certificate-lightbox";
export * from "../../components/shared/chip-cloud";
export * from "../../components/shared/photo-band";
export * from "../../components/shared/scroll-reveal";
export * from "../../components/shared/tech-chip";

// theme
export * from "../../components/theme/theme-toggle";

// portfolio building blocks
export * from "../../components/portfolio/AgentCardLink";
export * from "../../components/portfolio/AgentProjectCard";
export * from "../../components/portfolio/AppCard";
export * from "../../components/portfolio/AppCardGroup";
export * from "../../components/portfolio/CardDeviceLink";
export * from "../../components/portfolio/HeroAppMiniCard";
export * from "../../components/portfolio/PortfolioSeriesTile";
export * from "../../components/portfolio/project-link";
export * from "../../components/portfolio/role-badge";
export * from "../../components/portfolio/stack-chip";
export * from "../../components/portfolio/store-link";
export * from "../../components/portfolio/tech-badge";
export * from "../../components/portfolio/tech-tag";
export * from "../../components/portfolio/WarsztatHeroTile";
export * from "../../components/portfolio/WarsztatTile";

// real portfolio data (props for the portfolio cards)
export * from "../../lib/portfolio/types";
export * from "../../lib/portfolio/honeti-apps";
export * from "../../lib/portfolio/agent-projects";

// utilities
export { cn } from "../../lib/utils";
export { toast } from "sonner";

// The lucide-react icons the site uses, as one namespace: <Icons.ArrowRight />.
import {
  ArrowLeft, ArrowRight, Atom, BadgeCheck, Blocks, Bot, Braces, Briefcase,
  CalendarClock, CalendarDays, Check, CheckCircle2, ChevronDown, ChevronUp,
  CircleCheck, ClipboardList, Code, Command, Copy, Database, ExternalLink,
  FileBadge, FileDown, FileText, Flame, FlaskConical, GitBranch, GitMerge, Globe,
  Info, Languages, Layers, LayoutTemplate, LifeBuoy, ListChecks, ListTodo,
  Loader2, Mail, Menu, MessageSquare, Monitor, Moon, OctagonX, PenTool, Phone,
  Play, Plug, RefreshCw, Rocket, RotateCcw, Scale, ScrollText, SearchCheck, Send,
  ShieldCheck, Smartphone, Sparkles, Sun, TimerReset, Triangle, TriangleAlert,
  User, Users, Workflow, Wrench, X,
} from "lucide-react";

export const Icons = {
  ArrowLeft, ArrowRight, Atom, BadgeCheck, Blocks, Bot, Braces, Briefcase,
  CalendarClock, CalendarDays, Check, CheckCircle2, ChevronDown, ChevronUp,
  CircleCheck, ClipboardList, Code, Command, Copy, Database, ExternalLink,
  FileBadge, FileDown, FileText, Flame, FlaskConical, GitBranch, GitMerge, Globe,
  Info, Languages, Layers, LayoutTemplate, LifeBuoy, ListChecks, ListTodo,
  Loader2, Mail, Menu, MessageSquare, Monitor, Moon, OctagonX, PenTool, Phone,
  Play, Plug, RefreshCw, Rocket, RotateCcw, Scale, ScrollText, SearchCheck, Send,
  ShieldCheck, Smartphone, Sparkles, Sun, TimerReset, Triangle, TriangleAlert,
  User, Users, Workflow, Wrench, X,
};
