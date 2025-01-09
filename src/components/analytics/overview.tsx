import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  {
    revenue: 400,
    subscription: 240,
    sales: 300,
  },
  {
    revenue: 300,
    subscription: 139,
    sales: 200,
  },
  {
    revenue: 200,
    subscription: 980,
    sales: 600,
  },
  {
    revenue: 278,
    subscription: 390,
    sales: 308,
  },
  {
    revenue: 189,
    subscription: 480,
    sales: 400,
  },
  {
    revenue: 239,
    subscription: 380,
    sales: 411,
  },
  {
    revenue: 349,
    subscription: 430,
    sales: 509,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Revenue
                      </span>
                      <span className="font-bold text-muted-foreground">
                        ${payload[0].value}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Subscription
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[1].value}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Sales
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[2].value}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          strokeWidth={2}
          activeDot={{
            r: 8,
          }}
          style={{"stroke": "hsl(var(--primary))"}}
        />
        <Line
          type="monotone"
          dataKey="subscription"
          strokeWidth={2}
          style={{"stroke": "hsl(var(--secondary))"}}
        />
        <Line
          type="monotone"
          dataKey="sales"
          strokeWidth={2}
          style={{"stroke": "hsl(var(--muted))"}}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
