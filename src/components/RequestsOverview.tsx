
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { BarChart2, PieChart, Maximize2 } from 'lucide-react';

const data = [
  { name: 'Lun', pending: 12, accepted: 18, rejected: 5 },
  { name: 'Mar', pending: 19, accepted: 25, rejected: 8 },
  { name: 'Mer', pending: 15, accepted: 20, rejected: 6 },
  { name: 'Jeu', pending: 22, accepted: 15, rejected: 10 },
  { name: 'Ven', pending: 18, accepted: 22, rejected: 7 },
  { name: 'Sam', pending: 9, accepted: 12, rejected: 3 },
  { name: 'Dim', pending: 6, accepted: 8, rejected: 2 },
];

const config = {
  pending: {
    label: 'En attente',
    theme: {
      light: 'hsl(40, 95%, 60%)',
      dark: 'hsl(40, 95%, 55%)',
    },
  },
  accepted: {
    label: 'Acceptées',
    theme: {
      light: 'hsl(142, 72%, 50%)',
      dark: 'hsl(142, 72%, 45%)',
    },
  },
  rejected: {
    label: 'Refusées',
    theme: {
      light: 'hsl(346, 87%, 55%)',
      dark: 'hsl(346, 87%, 50%)',
    },
  },
};

const RequestsOverview = () => {
  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Aperçu des requêtes</CardTitle>
          <CardDescription>
            Statistiques des 7 derniers jours
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <BarChart2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <PieChart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-[4/3] sm:aspect-[2/1] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="name"
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <ChartTooltipContent
                        payload={payload}
                        active={active}
                        nameKey="dataKey"
                        labelKey="name"
                      />
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar 
                dataKey="pending" 
                name="En attente" 
                fill="var(--color-pending)" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="accepted" 
                name="Acceptées" 
                fill="var(--color-accepted)" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="rejected" 
                name="Refusées" 
                fill="var(--color-rejected)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RequestsOverview;
