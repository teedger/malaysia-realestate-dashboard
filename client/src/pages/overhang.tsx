import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { overhangData, stateData, formatNumber } from "@/data/malaysiaRealEstate";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ComposedChart, Line, PieChart, Pie } from "recharts";

const overhangChart = overhangData.map((d) => ({
  year: d.year,
  units: d.units,
  value: d.valueBillion,
  change: d.yoyChange,
}));

const stateOverhang = [...stateData]
  .filter((s) => s.overhangUnits > 200)
  .sort((a, b) => b.overhangUnits - a.overhangUnits)
  .map((s) => ({
    state: s.code,
    units: s.overhangUnits,
    value: s.overhangValueBillion,
  }));

const typeBreakdown = [
  { name: "Condo/Apartment", value: 51.2 },
  { name: "Terraced", value: 27.1 },
  { name: "Detached", value: 8.5 },
  { name: "Semi-Detached", value: 7.2 },
  { name: "Other", value: 6.0 },
];

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

export default function OverhangPage() {
  return (
    <div className="p-4 space-y-4 max-w-[1400px]">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Residential Overhang</h2>
        <p className="text-xs text-muted-foreground">Unsold completed residential units — data from NAPIC/JPPH quarterly reports</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="border border-border">
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground">2024 Overhang</div>
            <div className="text-xl font-bold text-foreground">23,149</div>
            <Badge variant="outline" className="text-[10px] mt-1 text-green-600">-10.3% YoY (improving)</Badge>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground">2024 Value</div>
            <div className="text-xl font-bold text-foreground">RM 13.94B</div>
            <Badge variant="outline" className="text-[10px] mt-1 text-green-600">-21.2% YoY</Badge>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground">Q3 2025 Overhang</div>
            <div className="text-xl font-bold text-foreground">28,672</div>
            <Badge variant="outline" className="text-[10px] mt-1 text-red-500">+30.5% YoY (rising)</Badge>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground">Total Housing Stock</div>
            <div className="text-xl font-bold text-foreground">6.48M</div>
            <Badge variant="outline" className="text-[10px] mt-1">+2.8% YoY</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Overhang Trend */}
      <Card className="border border-border">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-semibold">Overhang Trend (2019–2024)</CardTitle>
          <p className="text-[10px] text-muted-foreground">Unsold completed residential units and their total value</p>
        </CardHeader>
        <CardContent className="px-2 pb-3">
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={overhangChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis yAxisId="units" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis yAxisId="value" orientation="right" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `RM${v}B`} />
              <Tooltip contentStyle={{ fontSize: 11, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, color: "hsl(var(--foreground))" }} formatter={(v: number, name: string) => {
                if (name === "Units") return [formatNumber(v), "Unsold Units"];
                return [`RM ${v}B`, "Total Value"];
              }} />
              <Bar yAxisId="units" dataKey="units" fill="hsl(var(--chart-5))" radius={[4, 4, 0, 0]} name="Units" opacity={0.8} />
              <Line yAxisId="value" type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(var(--chart-1))" }} name="Value" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* By State */}
        <Card className="border border-border">
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-sm font-semibold">Overhang by State (Q3 2025)</CardTitle>
            <p className="text-[10px] text-muted-foreground">States with over 200 unsold units</p>
          </CardHeader>
          <CardContent className="px-2 pb-3">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stateOverhang} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis type="category" dataKey="state" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" width={36} />
                <Tooltip contentStyle={{ fontSize: 11, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, color: "hsl(var(--foreground))" }} formatter={(v: number) => [formatNumber(v), "Units"]} />
                <Bar dataKey="units" fill="hsl(var(--chart-5))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* By Type */}
        <Card className="border border-border">
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-sm font-semibold">Overhang by Property Type</CardTitle>
            <p className="text-[10px] text-muted-foreground">Condos/apartments dominate at 51.2%</p>
          </CardHeader>
          <CardContent className="px-2 pb-3 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={typeBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                  style={{ fontSize: 9 }}
                >
                  {typeBreakdown.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, color: "hsl(var(--foreground))" }} formatter={(v: number) => [`${v}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* State Detail Table */}
      <Card className="border border-border">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-semibold">State Overhang Detail (Q3 2025)</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-3">
          <div className="overflow-x-auto">
            <table className="w-full text-xs" data-testid="overhang-table">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 text-left font-medium text-muted-foreground">State</th>
                  <th className="py-2 text-right font-medium text-muted-foreground">Units</th>
                  <th className="py-2 text-right font-medium text-muted-foreground">Value (RM B)</th>
                  <th className="py-2 text-right font-medium text-muted-foreground">Avg. Price</th>
                  <th className="py-2 text-left font-medium text-muted-foreground">Severity</th>
                </tr>
              </thead>
              <tbody>
                {stateOverhang.map((s) => {
                  const full = stateData.find((sd) => sd.code === s.state);
                  const severity = s.units > 3000 ? "High" : s.units > 2000 ? "Medium" : "Low";
                  const sevColor = severity === "High" ? "text-red-500" : severity === "Medium" ? "text-yellow-600 dark:text-yellow-400" : "text-green-600 dark:text-green-400";
                  return (
                    <tr key={s.state} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                      <td className="py-2 font-medium">{full?.state || s.state}</td>
                      <td className="py-2 text-right">{formatNumber(s.units)}</td>
                      <td className="py-2 text-right">RM {s.value.toFixed(2)}B</td>
                      <td className="py-2 text-right">{full ? `RM ${Math.round(full.avgPrice).toLocaleString()}` : "—"}</td>
                      <td className="py-2">
                        <span className={`text-[10px] font-medium ${sevColor}`}>{severity}</span>
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
          <h3 className="text-sm font-semibold mb-2">Overhang Analysis</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">Improving Trend (2024):</span> Overhang fell to 23,149 units (-10.3%) valued at RM13.94B (-21.2%), the lowest since 2018.
            </div>
            <div>
              <span className="font-medium text-foreground">Reversal (Q3 2025):</span> Overhang rose 30.5% to 28,672 units, driven by completion surges outpacing absorption.
            </div>
            <div>
              <span className="font-medium text-foreground">Type Concentration:</span> Condos/apartments account for 51.2% of all overhang — mismatch between supply and buyer preference for landed homes.
            </div>
            <div>
              <span className="font-medium text-foreground">Hotspot States:</span> Perak (3,300), Johor (3,293), Sabah (2,771), and Selangor (2,757) lead nationally in unsold units.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
