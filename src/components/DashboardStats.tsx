
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Building, 
  FileCheck, 
  Clock, 
  BarChart2, 
  Stethoscope, 
  Calendar 
} from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      title: "Patients",
      value: "12,486",
      icon: Users,
      description: "+2.1% ce mois",
      iconColor: "text-primary"
    },
    {
      title: "Médecins",
      value: "2,345",
      icon: Stethoscope,
      description: "+5.4% ce mois",
      iconColor: "text-secondary"
    },
    {
      title: "Hôpitaux",
      value: "124",
      icon: Building,
      description: "+0.2% ce mois",
      iconColor: "text-yellow-600"
    },
    {
      title: "Requêtes",
      value: "6,254",
      icon: FileCheck,
      description: "+12.5% ce mois",
      iconColor: "text-blue-500"
    },
    {
      title: "En attente",
      value: "248",
      icon: Clock,
      description: "-3.2% ce mois",
      iconColor: "text-amber-500"
    },
    {
      title: "RDV prévus",
      value: "894",
      icon: Calendar,
      description: "+7.1% ce mois",
      iconColor: "text-green-600"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index} className="fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
