import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { transactionData, stateData, formatNumber } from "@/data/malaysiaRealEstate";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ComposedChart, Line } from "recharts";

const volumeValueChart = transactionData.map((d) => ({
  year: d.year,
  volume: d.volume,
  value: d.valueBillion,
  volChange: d.yoyVolumeChange,
  valChange: d.yoyValueChange,
}));

const stateTransactions = [...stateData]
  .filter((s) => s.transactionShare > 1)
  .sort((a, b) => b.transactionShare - a.transactionShare)
  .map((s) => ({
    state: s.code,
    share: s.transactionShare,
    yoyChange: s.transactionYoYChange,
  }));

export default function TransactionsPage() {
  return (
    <div className="p-4 space-y-4 max-w-[1400px]">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Property Transactions</h2>
        <p className="text-xs text-muted-foreground">National and state-level transaction data from NAPIC Property Market Reports</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="border border-border">
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground">2024 Volume</div>
            <div className="text-xl font-bold text-foreground">420,525</div>
            <Badge variant="outline" className="text-[10px] mt-1 text-green-600">+5.4% YoY — Decade High</Badge>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground">2024 Value</div>
            <div className="text-xl font-bold text-foreground">RM 232.3B</div>
            <Badge variant="outline" className="text-[10px] mt-1 text-green-600">+18% YoY — Decade High</Badge>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground">Q3 2025 Quarterly</div>
            <div className="text-xl font-bold text-foreground">66,766</div>
            <Badge variant="outline" className="text-[10px] mt-1">+9.3% QoQ · -5.2% YoY</Badge>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-3">
            <div className="text-[10px] text-muted-foreground">Residential Share</div>
            <div className="text-xl font-bold text-foreground">62%</div>
            <Badge variant="outline" className="text-[10px] mt-1">46% of total value</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Volume & Value Trend */}
      <Card className="border border-border">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-semibold">Annual Transaction Volume & Value (2018–2024)</CardTitle>
          <p className="text-[10px] text-muted-foreground">Source: NAPIC Property Market Report</p>
        </CardHeader>
        <CardContent className="px-2 pb-3">
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={volumeValueChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis yAxisId="vol" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis yAxisId="val" orientation="right" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `RM${v}B`} />
              <Tooltip contentStyle={{ fontSize: 11, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, color: "hsl(var(--foreground))" }} formatter={(v: number, name: string) => {
                if (name === "Volume") return [formatNumber(v), "Volume"];
                return [`RM ${v}B`, "Value"];
              }} />
              <Bar yAxisId="vol" dataKey="volume" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Volume" opacity={0.7} />
              <Line yAxisId="val" type="monotone" dataKey="value" stroke="hsl(var(--chart-3))" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(var(--chart-3))" }} name="Value" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* YoY Changes */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="border border-border">
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-sm font-semibold">YoY Volume Change (%)</CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-3">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={volumeValueChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={{ fontSize: 11, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, color: "hsl(var(--foreground))" }} formatter={(v: number) => [`${v}%`, "Volume Change"]} />
                <Bar dataKey="volChange" radius={[3, 3, 0, 0]}>
                  {volumeValueChart.map((d, i) => (
                    <Cell key={i} fill={d.volChange >= 0 ? "hsl(var(--chart-2))" : "hsl(var(--destructive))"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-sm font-semibold">YoY Value Change (%)</CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-3">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={volumeValueChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={{ fontSize: 11, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, color: "hsl(var(--foreground))" }} formatter={(v: number) => [`${v}%`, "Value Change"]} />
                <Bar dataKey="valChange" radius={[3, 3, 0, 0]}>
                  {volumeValueChart.map((d, i) => (
                    <Cell key={i} fill={d.valChange >= 0 ? "hsl(var(--chart-1))" : "hsl(var(--destructive))"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* State Transaction Share */}
      <Card className="border border-border">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-semibold">Transaction Share by State (2024)</CardTitle>
          <p className="text-[10px] text-muted-foreground">States with over 1% national share — YoY change labels shown</p>
        </CardHeader>
        <CardContent className="px-2 pb-3">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stateTransactions} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="state" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" width={36} />
              <Tooltip contentStyle={{ fontSize: 11, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, color: "hsl(var(--foreground))" }} formatter={(v: number, name: string) => {
                if (name === "Share") return [`${v}%`, "Market Share"];
                return [`${v > 0 ? "+" : ""}${v}%`, "YoY Change"];
              }} />
              <Bar dataKey="share" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} name="Share" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Analysis */}
      <Card className="border border-border bg-primary/5">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold mb-2">Transaction Analysis</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">Decade Record:</span> 2024 transaction volume (420,525) and value (RM232.3B) are the highest since 2014 (384,060 transactions; RM162.97B).
            </div>
            <div>
              <span className="font-medium text-foreground">Regional Value:</span> Central region contributes 44.5% of total value but only 23.7% of volume — higher-value properties in KL/Selangor.
            </div>
            <div>
              <span className="font-medium text-foreground">Subsector:</span> Residential makes up 62% of volume but only 46% of value. Commercial properties (10.9% volume) contribute 25% of value.
            </div>
            <div>
              <span className="font-medium text-foreground">Growth Drivers:</span> MM2H relaxation, Budget 2025 tax relief on RM500k–RM750k housing, and RTS Link project in Johor.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
