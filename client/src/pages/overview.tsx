import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Home, DollarSign, BarChart3, AlertTriangle, HardHat, Building2, ShoppingBag } from "lucide-react";
import { nationalMetrics, stateData, formatRM, formatNumber, propertyTypePrices, transactionData } from "@/data/malaysiaRealEstate";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const kpiCards = [
  { label: "Avg. House Price", value: formatRM(nationalMetrics.avgHousePrice), sub: "Q3 2025", icon: Home, change: 0.1, unit: "% YoY" },
  { label: "MHPI Index", value: nationalMetrics.mhpiIndex.toString(), sub: "2024 Full Year", icon: TrendingUp, change: nationalMetrics.mhpiGrowth, unit: "% growth" },
  { label: "Transactions", value: formatNumber(nationalMetrics.totalTransactions2024), sub: "2024 Total", icon: BarChart3, change: 5.4, unit: "% YoY" },
  { label: "Transaction Value", value: `RM ${nationalMetrics.totalValue2024}B`, sub: "2024 Total", icon: DollarSign, change: 18.0, unit: "% YoY" },
  { label: "Overhang Units", value: formatNumber(nationalMetrics.overhangUnits2024), sub: "2024", icon: AlertTriangle, change: -10.3, unit: "% YoY" },
  { label: "New Launches", value: formatNumber(nationalMetrics.newLaunches2024), sub: "2024", icon: HardHat, change: 34.1, unit: "% YoY" },
  { label: "Shopping Occ. Rate", value: `${nationalMetrics.occupancyRateShopping}%`, sub: "2024", icon: ShoppingBag, change: 1.4, unit: "pp YoY" },
];

const COLORS = [
  "hsl(199, 78%, 30%)", "hsl(160, 55%, 38%)", "hsl(35, 85%, 52%)",
  "hsl(280, 55%, 48%)", "hsl(15, 75%, 55%)", "hsl(45, 70%, 50%)",
  "hsl(210, 60%, 50%)",
];

const regionData = (() => {
  const regions: Record<string, number> = {};
  stateData.forEach((s) => {
    regions[s.region] = (regions[s.region] || 0) + s.transactionShare;
  });
  return Object.entries(regions).map(([name, value]) => ({ name, value: +value.toFixed(1) }));
})();

export default function OverviewPage() {
  return (
    <div className="p-4 space-y-4 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Market Overview</h2>
          <p className="text-xs text-muted-foreground">Malaysian property market performance based on NAPIC/JPPH official data</p>
        </div>
        <Badge variant="outline" className="text-xs">
          Decade-high in 2024
        </Badge>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="border border-border" data-testid={`kpi-${kpi.label.toLowerCase().replace(/[. ]/g, "-")}`}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <Icon size={14} className="text-primary" />
                  {kpi.change !== undefined && (
                    <span className={`flex items-center gap-0.5 text-[10px] font-medium ${kpi.change > 0 ? "text-green-600 dark:text-green-400" : kpi.change < 0 ? "text-red-500" : "text-muted-foreground"}`}>
                      {kpi.change > 0 ? <TrendingUp size={10} /> : kpi.change < 0 ? <TrendingDown size={10} /> : <Minus size={10} />}
                      {kpi.change > 0 ? "+" : ""}{kpi.change}{kpi.unit}
                    </span>
                  )}
                </div>
                <div className="text-base font-bold text-foreground leading-tight">{kpi.value}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{kpi.label} · {kpi.sub}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Transaction Volume & Value */}
        <Card className="border border-border">
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-sm font-semibold">Transaction Volume & Value (2018–2024)</CardTitle>
            <p className="text-[10px] text-muted-foreground">Source: NAPIC Property Market Report 2024</p>
          </CardHeader>
          <CardContent className="px-2 pb-3">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={transactionData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="left" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `RM${v}B`} />
                <Tooltip
                  contentStyle={{ fontSize: 11, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, color: "hsl(var(--foreground))" }}
                  formatter={(value: number, name: string) => {
                    if (name === "volume") return [formatNumber(value), "Volume"];
                    return [`RM ${value}B`, "Value"];
                  }}
                />
                <Bar yAxisId="left" dataKey="volume" fill="hsl(var(--chart-1))" radius={[3, 3, 0, 0]} name="volume" />
                <Bar yAxisId="right" dataKey="valueBillion" fill="hsl(var(--chart-2))" radius={[3, 3, 0, 0]} name="value" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Region Share */}
        <Card className="border border-border">
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-sm font-semibold">Transaction Share by Region</CardTitle>
            <p className="text-[10px] text-muted-foreground">Percentage of national residential transactions (2024)</p>
          </CardHeader>
          <CardContent className="px-2 pb-3">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                  style={{ fontSize: 10 }}
                >
                  {regionData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, color: "hsl(var(--foreground))" }} formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Property Type Prices */}
      <Card className="border border-border">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-semibold">Average Price by Property Type (Q3 2025)</CardTitle>
          <p className="text-[10px] text-muted-foreground">Source: JPPH Valuation and Property Services Department</p>
        </CardHeader>
        <CardContent className="px-4 pb-3">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-testid="property-type-table">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-xs font-medium text-muted-foreground">Type</th>
                  <th className="text-right py-2 text-xs font-medium text-muted-foreground">Avg. Price</th>
                  <th className="text-right py-2 text-xs font-medium text-muted-foreground">YoY Change</th>
                  <th className="text-right py-2 text-xs font-medium text-muted-foreground">QoQ Change</th>
                </tr>
              </thead>
              <tbody>
                {propertyTypePrices.map((p) => (
                  <tr key={p.type} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                    <td className="py-2 text-xs font-medium flex items-center gap-2">
                      <Building2 size={12} className="text-primary" />
                      {p.type}
                    </td>
                    <td className="py-2 text-xs text-right font-semibold">{formatRM(p.avgPrice)}</td>
                    <td className={`py-2 text-xs text-right font-medium ${p.yoyChange > 0 ? "text-green-600 dark:text-green-400" : p.yoyChange < 0 ? "text-red-500" : ""}`}>
                      {p.yoyChange > 0 ? "+" : ""}{p.yoyChange}%
                    </td>
                    <td className={`py-2 text-xs text-right font-medium ${p.qoqChange > 0 ? "text-green-600 dark:text-green-400" : p.qoqChange < 0 ? "text-red-500" : ""}`}>
                      {p.qoqChange > 0 ? "+" : ""}{p.qoqChange}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Key Highlights */}
      <Card className="border border-border bg-primary/5">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">Key Highlights — 2024 Property Market</h3>
          <ul className="grid sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
            <li className="flex items-start gap-2"><span className="text-primary font-bold">1.</span> Transaction volume & value hit highest levels in a decade.</li>
            <li className="flex items-start gap-2"><span className="text-primary font-bold">2.</span> New residential launches rose 34.1% to 75,784 units with 37.3% sales performance.</li>
            <li className="flex items-start gap-2"><span className="text-primary font-bold">3.</span> Overhang improved — unsold completed units fell 10.3% to 23,149 units.</li>
            <li className="flex items-start gap-2"><span className="text-primary font-bold">4.</span> MHPI recorded moderate 3.3% annual growth; avg. price RM486,678.</li>
            <li className="flex items-start gap-2"><span className="text-primary font-bold">5.</span> Semi-detached houses led price growth at 4.1% YoY.</li>
            <li className="flex items-start gap-2"><span className="text-primary font-bold">6.</span> Central region contributed 44.5% of total transaction value despite 23.7% of volume.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
