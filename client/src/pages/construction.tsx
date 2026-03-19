import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { constructionData, stateData, formatNumber } from "@/data/malaysiaRealEstate";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line, Cell } from "recharts";

const annualChart = constructionData.map((d) => ({
  year: d.year,
  launches: d.newLaunches,
  starts: d.housingStarts,
  completions: d.completions,
  sales: d.salesPerformance,
}));

const stateConstruction = [...stateData]
  .filter((s) => s.housingStartsQ1Q3_2025 > 100 || s.housingCompletionsQ1Q3_2025 > 100)
  .sort((a, b) => b.housingCompletionsQ1Q3_2025 - a.housingCompletionsQ1Q3_2025)
  .map((s) => ({
    state: s.code,
    fullName: s.state,
    starts: s.housingStartsQ1Q3_2025,
    startsYoY: s.housingStartsYoY,
    completions: s.housingCompletionsQ1Q3_2025,
    completionsYoY: s.housingCompletionsYoY,
  }));

export default function ConstructionPage() {
  return (
    <div className="p-4 space-y-4 max-w-[1400px]">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Construction Activity</h2>
        <p className="text-xs text-muted-foreground">New launches, housing starts, and completions — NAPIC/JPPH data</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="border border-border">
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground">2024 New Launches</div>
            <div className="text-xl font-bold text-foreground">75,784</div>
            <Badge variant="outline" className="text-[10px] mt-1 text-green-600">+34.1% YoY</Badge>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground">Sales Performance</div>
            <div className="text-xl font-bold text-foreground">37.3%</div>
            <Badge variant="outline" className="text-[10px] mt-1">of launched units sold</Badge>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground">Starts Q1–Q3 2025</div>
            <div className="text-xl font-bold text-foreground">64,843</div>
            <Badge variant="outline" className="text-[10px] mt-1 text-red-500">-12.1% YoY</Badge>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground">Completions Q1–Q3 2025</div>
            <div className="text-xl font-bold text-foreground">69,303</div>
            <Badge variant="outline" className="text-[10px] mt-1 text-green-600">+25.3% YoY</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Annual Trends */}
      <Card className="border border-border">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-semibold">Annual Construction Pipeline (2019–2024)</CardTitle>
          <p className="text-[10px] text-muted-foreground">New launches, housing starts, completions, and sales performance rate</p>
        </CardHeader>
        <CardContent className="px-2 pb-3">
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={annualChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis yAxisId="units" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis yAxisId="pct" orientation="right" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v}%`} domain={[25, 45]} />
              <Tooltip contentStyle={{ fontSize: 11, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, color: "hsl(var(--foreground))" }} formatter={(v: number, name: string) => {
                if (name === "Sales %") return [`${v}%`, name];
                return [formatNumber(v), name];
              }} />
              <Bar yAxisId="units" dataKey="launches" fill="hsl(var(--chart-1))" radius={[3, 3, 0, 0]} name="Launches" opacity={0.7} />
              <Bar yAxisId="units" dataKey="starts" fill="hsl(var(--chart-2))" radius={[3, 3, 0, 0]} name="Starts" opacity={0.7} />
              <Bar yAxisId="units" dataKey="completions" fill="hsl(var(--chart-3))" radius={[3, 3, 0, 0]} name="Completions" opacity={0.7} />
              <Line yAxisId="pct" type="monotone" dataKey="sales" stroke="hsl(var(--chart-4))" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(var(--chart-4))" }} name="Sales %" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* State Level */}
      <Card className="border border-border">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-semibold">State Construction Activity (Q1–Q3 2025)</CardTitle>
          <p className="text-[10px] text-muted-foreground">Housing starts vs. completions by state</p>
        </CardHeader>
        <CardContent className="px-2 pb-3">
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={stateConstruction} layout="vertical" barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="state" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" width={36} />
              <Tooltip contentStyle={{ fontSize: 11, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, color: "hsl(var(--foreground))" }} formatter={(v: number, name: string) => [formatNumber(v) + " units", name]} />
              <Bar dataKey="starts" fill="hsl(var(--chart-1))" radius={[0, 3, 3, 0]} name="Starts" opacity={0.8} />
              <Bar dataKey="completions" fill="hsl(var(--chart-2))" radius={[0, 3, 3, 0]} name="Completions" opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* State Detail Table */}
      <Card className="border border-border">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-semibold">State Construction Detail (Q1–Q3 2025)</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-3">
          <div className="overflow-x-auto">
            <table className="w-full text-xs" data-testid="construction-table">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 text-left font-medium text-muted-foreground">State</th>
                  <th className="py-2 text-right font-medium text-muted-foreground">Starts</th>
                  <th className="py-2 text-right font-medium text-muted-foreground">Starts YoY</th>
                  <th className="py-2 text-right font-medium text-muted-foreground">Completions</th>
                  <th className="py-2 text-right font-medium text-muted-foreground">Completions YoY</th>
                  <th className="py-2 text-right font-medium text-muted-foreground">Net Balance</th>
                </tr>
              </thead>
              <tbody>
                {stateConstruction.map((s) => {
                  const net = s.completions - s.starts;
                  return (
                    <tr key={s.state} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                      <td className="py-2 font-medium">{s.fullName}</td>
                      <td className="py-2 text-right">{formatNumber(s.starts)}</td>
                      <td className={`py-2 text-right font-medium ${s.startsYoY > 0 ? "text-green-600 dark:text-green-400" : s.startsYoY < 0 ? "text-red-500" : ""}`}>
                        {s.startsYoY > 0 ? "+" : ""}{s.startsYoY}%
                      </td>
                      <td className="py-2 text-right">{formatNumber(s.completions)}</td>
                      <td className={`py-2 text-right font-medium ${s.completionsYoY > 0 ? "text-green-600 dark:text-green-400" : s.completionsYoY < 0 ? "text-red-500" : ""}`}>
                        {s.completionsYoY > 0 ? "+" : ""}{s.completionsYoY}%
                      </td>
                      <td className={`py-2 text-right font-medium ${net > 0 ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
                        {net > 0 ? "+" : ""}{formatNumber(net)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="border border-border bg-primary/5">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold mb-2">Construction Insights</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">Completions Surge:</span> +25.3% YoY as 2022–2023 started projects reach completion. Selangor leads with 15,910 units.
            </div>
            <div>
              <span className="font-medium text-foreground">Starts Cooling:</span> Housing starts fell 12.1% to 64,843 units — developers adjusting supply to prevent further overhang.
            </div>
            <div>
              <span className="font-medium text-foreground">Melaka Anomaly:</span> Completions surged 682% YoY while starts dropped 19.4% — a backlog clearing cycle.
            </div>
            <div>
              <span className="font-medium text-foreground">Perak Growth:</span> Both starts (+29.3%) and completions (+40.9%) rose strongly — one of the most active construction markets.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
