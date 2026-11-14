"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type SignupPoint = {
  date: string;
  signups: number;
};

export default function SignupsChart({ data }: { data: SignupPoint[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer height="100%" width="100%">
        <LineChart
          data={data}
          margin={{ top: 12, right: 12, bottom: 0, left: -20 }}
        >
          <CartesianGrid stroke="#e5e5e5" strokeDasharray="3 3" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="date"
            tick={{ fill: "#737373", fontSize: 11 }}
            tickLine={false}
            tickMargin={12}
            minTickGap={24}
          />
          <YAxis
            allowDecimals={false}
            axisLine={false}
            tick={{ fill: "#737373", fontSize: 11 }}
            tickLine={false}
            width={36}
          />
          <Tooltip
            contentStyle={{
              border: "1px solid #d4d4d4",
              borderRadius: 0,
              fontSize: 12,
            }}
            labelStyle={{ color: "#171717", marginBottom: 4 }}
          />
          <Line
            activeDot={{ fill: "#171717", r: 4 }}
            dataKey="signups"
            dot={false}
            name="Signups"
            stroke="#171717"
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
