import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { stateData, formatRM, StateData } from "@/data/malaysiaRealEstate";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ArrowUpDown, TrendingUp, TrendingDown, Minus, MapPin } from "lucide-react";

type SortKey = "avgPrice" | "medianCondo" | "medianTerrace" | "transactionShare" | "overhangUnits";
type RegionFilter = "all" | "Central" | "Northern" | "Southern" | "East Coast" | "East Malaysia" | "Federal Territory";

export default function StatePricesPage() {
  const [sortKey, setSortKey] = useState<SortKey>("avgPrice");
  const [sortAsc, setSortAsc] = useState(false);
  const [regionFilter, setRegionFilter] = useState<RegionFilter>("all");

  const filteredData = useMemo(() => {
    let data = [...stateData];
    if (regionFilter !== "all") {
      data = data.filter((s) => s.region === regionFilter);
    }
    data.sort((a, b) => sortAsc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]);
    return data;
  }, [sortKey, sortAsc, regionFilter]);

  const chartData = useMemo(() => {
    return [...filteredData]
      .sort((a, b) => b.avgPrice - a.avgPrice)
      .map((s) => ({ name: s.code, avgPrice: s.avgPrice, condo: s.medianCondo, terrace: s.medianTerrace }));
  }, [filteredData]);

  const barColor = (entry: { avgPrice: number }) => {
    if (entry.avgPrice > 600000) return "hsl(var(--chart-5))";
    if (entry.avgPrice > 400000) return "hsl(var(--chart-1))";
    if (entry.avgPrice > 300000) return "hsl(var(--chart-3))";
    return "hsl(var(--chart-2))";
  };

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === "up") return <TrendingUp size={12} className="text-green-600 dark:text-green-400" />;
    if (trend === "down") return <TrendingDown size={12} className="text-red-500" />;
    return <Minus size={12} className="text-muted-foreground" />;
  };

  return (
    <div className="p-4 space-y-4 max-w-[1400px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Property Prices by State</h2>
          <p className="text-xs text-muted-foreground">Average house prices based on NAPIC/JPPH transacted data (Q3 2025)</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={regionFilter} onValueChange={(v) => setRegionFilter(v as RegionFilter)}>
            <SelectTrigger className="h-8 text-xs w-[140px]" data-testid="region-filter">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="Central">Central</SelectItem>
              <SelectItem value="Northern">Northern</SelectItem>
              <SelectItem value="Southern">Southern</SelectItem>
              <SelectItem value="East Coast">East Coast</SelectItem>
              <SelectItem value="East Malaysia">East Malaysia</SelectItem>
              <SelectItem value="Federal Territory">Federal Territory</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chart */}
      <Card className="border border-border">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-semibold">Average House Price by State</CardTitle>
          <p className="text-[10px] text-muted-foreground">
            Color: <span className="text-[hsl(var(--chart-5))]">RM600k+</span> · <span className="text-[hsl(var(--chart-1))]">RM400–600k</span> · <span className="text-[hsl(var(--chart-3))]">RM300–400k</span> · <span className="text-[hsl(var(--chart-2))]">Below RM300k</span>
          </p>
        </CardHeader>
        <CardContent className="px-2 pb-3">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `RM${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" width={40} />
              <Tooltip contentStyle={{ fontSize: 11, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, color: "hsl(var(--foreground))" }} formatter={(v: number) => [formatRM(v), "Avg. Price"]} />
              <Bar dataKey="avgPrice" radius={[0, 4, 4, 0]} name="Avg Price">
                {chartData.map((entry, idx) => (
                  <Cell key={idx} fill={barColor(entry)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card className="border border-border">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-semibold">State-Level Detail</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-3">
          <div className="overflow-x-auto">
            <table className="w-full text-xs" data-testid="state-table">
              <thead>
                <tr className="border-b border-border">
                  {[
                    { key: "state" as const, label: "State" },
                    { key: "avgPrice" as SortKey, label: "Avg. Price" },
                    { key: "medianCondo" as SortKey, label: "Median Condo" },
                    { key: "medianTerrace" as SortKey, label: "Median Terrace" },
                    { key: "transactionShare" as SortKey, label: "Txn Share %" },
                    { key: "overhangUnits" as SortKey, label: "Overhang" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      className={`py-2 text-left font-medium text-muted-foreground cursor-pointer hover:text-foreground ${col.key !== "state" ? "text-right" : ""}`}
                      onClick={() => {
                        if (col.key !== "state") {
                          if (sortKey === col.key) setSortAsc(!sortAsc);
                          else { setSortKey(col.key as SortKey); setSortAsc(false); }
                        }
                      }}
                    >
                      <span className="inline-flex items-center gap-1">
                        {col.label}
                        {col.key !== "state" && <ArrowUpDown size={10} />}
                      </span>
                    </th>
                  ))}
                  <th className="py-2 text-center font-medium text-muted-foreground">Trend</th>
                  <th className="py-2 text-left font-medium text-muted-foreground">Region</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((s) => (
                  <tr key={s.code} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                    <td className="py-2 font-medium flex items-center gap-1.5">
                      <MapPin size={11} className="text-primary" />
                      {s.state}
                    </td>
                    <td className="py-2 text-right font-semibold">{formatRM(s.avgPrice)}</td>
                    <td className="py-2 text-right">{formatRM(s.medianCondo)}</td>
                    <td className="py-2 text-right">{formatRM(s.medianTerrace)}</td>
                    <td className="py-2 text-right">{s.transactionShare}%</td>
                    <td className="py-2 text-right">{s.overhangUnits.toLocaleString()}</td>
                    <td className="py-2 text-center"><TrendIcon trend={s.trend} /></td>
                    <td className="py-2">
                      <Badge variant="outline" className="text-[9px] py-0 px-1">{s.region}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card className="border border-border bg-primary/5">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold mb-2">State-Level Insights</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">Most Expensive:</span> Kuala Lumpur leads at RM804,642 avg — 63% above the national average.
            </div>
            <div>
              <span className="font-medium text-foreground">Most Affordable:</span> Perlis at RM246,254 and Melaka at RM250,311 offer the cheapest housing.
            </div>
            <div>
              <span className="font-medium text-foreground">Highest Volume:</span> Selangor dominates with 21.6% market share, followed by Johor (16.3%) and Perak (11.4%).
            </div>
            <div>
              <span className="font-medium text-foreground">Growth Hotspots:</span> Kelantan saw 98% YoY transaction growth; Melaka rose 30%. Driven by affordable landed homes.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
