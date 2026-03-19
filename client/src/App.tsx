import { Switch, Route, Router, Link, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { useState } from "react";
import { BarChart3, Home, MapPin, TrendingUp, Building2, AlertTriangle, HardHat, Sun, Moon, ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PerplexityAttribution } from "@/components/PerplexityAttribution";
import OverviewPage from "@/pages/overview";
import PriceIndexPage from "@/pages/price-index";
import StatePricesPage from "@/pages/state-prices";
import TransactionsPage from "@/pages/transactions";
import OverhangPage from "@/pages/overhang";
import ConstructionPage from "@/pages/construction";
import NotFound from "@/pages/not-found";

function AppContent() {
  const [location] = useLocation();
  const [dark, setDark] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  // Set initial dark class
  if (dark && !document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.add("dark");
  }

  const navItems = [
    { path: "/", label: "Overview", icon: Home },
    { path: "/price-index", label: "Price Index", icon: TrendingUp },
    { path: "/states", label: "State Prices", icon: MapPin },
    { path: "/transactions", label: "Transactions", icon: BarChart3 },
    { path: "/overhang", label: "Overhang", icon: AlertTriangle },
    { path: "/construction", label: "Construction", icon: HardHat },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 border-r border-border bg-card flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="MY Property logo">
              <rect x="2" y="6" width="28" height="20" rx="3" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
              <path d="M8 20V14L12 10L16 14V20" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M16 20V16L19 13L22 16V20" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <line x1="8" y1="20" x2="24" y2="20" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div>
              <span className="font-semibold text-sm text-foreground tracking-tight">MY Property</span>
              <span className="block text-[10px] text-muted-foreground leading-tight">Market Intelligence</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path || (item.path !== "/" && location.startsWith(item.path));
            const isHome = item.path === "/" && location === "/";
            const active = isActive || isHome;
            return (
              <Link key={item.path} href={item.path}>
                <span
                  data-testid={`nav-${item.label.toLowerCase().replace(/ /g, "-")}`}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                    active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Info size={12} />
            <span>Source: NAPIC/JPPH, DOSM, BNM</span>
          </div>
          <a
            href="https://napic.jpph.gov.my"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] text-primary hover:underline"
          >
            NAPIC Portal <ExternalLink size={10} />
          </a>
          <PerplexityAttribution />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-12 border-b border-border flex items-center justify-between px-4 flex-shrink-0 bg-card">
          <div className="flex items-center gap-2">
            <Building2 size={16} className="text-primary" />
            <h1 className="text-sm font-semibold text-foreground">Malaysian Real Estate Dashboard</h1>
            <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
              2024–Q3 2025
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            data-testid="theme-toggle"
            className="h-8 w-8 p-0"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto overscroll-contain">
          <Switch>
            <Route path="/" component={OverviewPage} />
            <Route path="/price-index" component={PriceIndexPage} />
            <Route path="/states" component={StatePricesPage} />
            <Route path="/transactions" component={TransactionsPage} />
            <Route path="/overhang" component={OverhangPage} />
            <Route path="/construction" component={ConstructionPage} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router hook={useHashLocation}>
      <AppContent />
    </Router>
  );
}

export default App;
