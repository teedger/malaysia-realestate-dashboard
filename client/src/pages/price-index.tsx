import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mhpiData } from "@/data/malaysiaRealEstate";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from "recharts";

const chartData = mhpiData.map((d) => ({
  period: `${d.year} ${d.quarter}`,
  index: d.indexPoints,
  yoy: d.yoyChange,
}));

export default function PriceIndexPage() {
  return (
    <div className="p-4 space-y-4 max-w-[1400px]">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Malaysia House Price Index (MHPI)</h2>
        <p className="text-xs text-muted-foreground">Quarterly index data from NAPIC/JPPH. Base year: 2000 = 100.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="border border-border">
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground">Latest Index (Q3 2025)</div>
            <div className="text-xl font-bold text-foreground">228.8</div>
            <Badge variant="outline" className="text-[10px] mt-1">+0.1% YoY</Badge>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground">2024 Full Year</div>
            <div className="text-xl font-bold text-foreground">225.6</div>
            <Badge variant="outline" className="text-[10px] mt-1 text-green-600">+3.3% annual growth</Badge>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground">Peak YoY Growth</div>
            <div className="text-xl font-bold text-green-600 dark:text-green-400">+4.43%</div>
            <Badge variant="outline" className="text-[10px] mt-1">Q4 2024</Badge>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground">Cumulative 2019–Q3 2025</div>
            <div className="text-xl font-bold text-foreground">+15.2%</div>
            <Badge variant="outline" className="text-[10px] mt-1">+4.2% inflation-adj.</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Index Chart */}
      <Card className="border border-border">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-semibold">MHPI Index Points (Q1 2019 – Q3 2025)</CardTitle>
          <p className="text-[10px] text-muted-foreground">Source: NAPIC, JPPH — Valuation and Property Services Department</p>
        </CardHeader>
        <CardContent className="px-2 pb-3">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="indexGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="period" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" interval={2} angle={-30} textAnchor="end" height={50} />
              <YAxis domain={[195, 240]} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ fontSize: 11, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, color: "hsl(var(--foreground))" }} />
              <ReferenceLine y={206.0} stroke="hsl(var(--destructive))" strokeDasharray="4 4" label={{ value: "COVID-19 2020", position: "insideTopRight", fontSize: 9, fill: "hsl(var(--destructive))" }} />
              <Area type="monotone" dataKey="index" stroke="hsl(var(--chart-1))" fill="url(#indexGrad)" strokeWidth={2} name="Index Points" dot={{ r: 3, fill: "hsl(var(--chart-1))" }} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* YoY Change Chart */}
      <Card className="border border-border">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-semibold">Year-on-Year Price Growth (%)</CardTitle>
          <p className="text-[10px] text-muted-foreground">Quarterly YoY change in house prices — note deceleration in Q3 2025 to +0.1%</p>
        </CardHeader>
        <CardContent className="px-2 pb-3">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="yoyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="period" tick={{ fontSize: 9 }} stroke="hsl(var(--muted-foreground))" interval={2} angle={-30} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ fontSize: 11, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, color: "hsl(var(--foreground))" }} formatter={(v: number) => [`${v}%`, "YoY Change"]} />
              <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="2 2" />
              <Area type="monotone" dataKey="yoy" stroke="hsl(var(--chart-2))" fill="url(#yoyGrad)" strokeWidth={2} name="YoY %" dot={{ r: 3, fill: "hsl(var(--chart-2))" }} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Analysis */}
      <Card className="border border-border bg-primary/5">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold mb-2">Index Analysis</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">2019–2021 (Pre/COVID):</span> Growth moderated to 1.2–1.9% annually due to market cooling measures and pandemic. House prices fell by 1.39% in real terms in Q3 2025.
            </div>
            <div>
              <span className="font-medium text-foreground">2022–2024 (Recovery):</span> Strong rebound with 3.9–4.43% growth driven by pent-up demand, MM2H relaxation, and Budget 2025 housing incentives.
            </div>
            <div>
              <span className="font-medium text-foreground">Q3 2025 (Deceleration):</span> Growth decelerated sharply to just +0.1% YoY, with -1.46% QoQ — first quarterly decline since Q3 2021.
            </div>
            <div>
              <span className="font-medium text-foreground">By Type (2024):</span> Semi-detached led at +4.1%, followed by terraced (+3.6%), detached (+2.6%), and high-rise (+2.3%).
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
