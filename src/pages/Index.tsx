
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import {
  Bell,
  User,
  Users,
  Building,
  BarChart2,
  ArrowRight,
  Calendar,
  Clipboard,
  Stethoscope,
  FileCheck,
  AlertCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import SystemCard from '@/components/SystemCard';
import DashboardStats from '@/components/DashboardStats';
import NotificationPanel from '@/components/NotificationPanel';
import RequestsOverview from '@/components/RequestsOverview';
import Hero from '@/components/Hero';

const systemsData = [
  {
    title: "Système Autorité",
    subtitle: "Autorité de Santé",
    description: "Système dédié aux autorités sanitaires pour gérer et superviser les dossiers médicaux électroniques à l'échelle nationale.",
    link: "/first",
    icon: "health"
  },
  {
    title: "Système Médical",
    subtitle: "Acteur de Santé",
    description: "Plateforme pour les professionnels de santé permettant d'accéder et de mettre à jour les dossiers médicaux des patients.",
    link: "/second",
    icon: "actor"
  },
  {
    title: "Espace Patient",
    subtitle: "Patient",
    description: "Interface permettant aux patients de consulter et de gérer leurs propres dossiers médicaux électroniques en toute sécurité.",
    link: "/third",
    icon: "patient"
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 mx-auto py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-3">
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
                  <p className="text-muted-foreground">
                    Bienvenue au système de partage de dossiers médicaux électroniques.
                  </p>
                </div>
                <TabsList className="mt-4 sm:mt-0">
                  <TabsTrigger value="overview">Vue générale</TabsTrigger>
                  <TabsTrigger value="systems">Systèmes</TabsTrigger>
                  <TabsTrigger value="notifications">
                    Notifications
                    <span className="ml-2 bg-primary/20 text-primary text-xs rounded-full px-2 py-0.5">
                      12
                    </span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="space-y-8">
                <DashboardStats />
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Requêtes en attente</h3>
                  <RequestsOverview />
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-medium">Requêtes non acceptées</CardTitle>
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24</div>
                      <p className="text-xs text-muted-foreground">+8% par rapport à la semaine dernière</p>
                      <Progress value={68} className="h-2 mt-3" />
                    </CardContent>
                    <CardFooter className="pt-1">
                      <Button variant="ghost" size="sm" asChild className="w-full">
                        <Link to="/notifications">
                          Voir toutes les requêtes
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-medium">Patients actifs</CardTitle>
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,248</div>
                      <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
                      <Progress value={82} className="h-2 mt-3" />
                    </CardContent>
                    <CardFooter className="pt-1">
                      <Button variant="ghost" size="sm" asChild className="w-full">
                        <Link to="/patients">
                          Gestion des patients
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-medium">Acteurs de santé</CardTitle>
                        <Stethoscope className="h-4 w-4 text-secondary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">486</div>
                      <p className="text-xs text-muted-foreground">+3% depuis le dernier trimestre</p>
                      <Progress value={52} className="h-2 mt-3" />
                    </CardContent>
                    <CardFooter className="pt-1">
                      <Button variant="ghost" size="sm" asChild className="w-full">
                        <Link to="/healthcare">
                          Gérer les acteurs de santé
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="systems">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {systemsData.map((system, index) => (
                    <div key={index} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <SystemCard
                        title={system.title}
                        subtitle={system.subtitle}
                        description={system.description}
                        link={system.link}
                        icon={system.icon as 'health' | 'actor' | 'patient'}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="notifications">
                <NotificationPanel />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <footer className="py-8 mt-16 text-center bg-muted/50">
        <div className="container">
          <p className="text-sm text-muted-foreground">
            © 2025 EHR Share System. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
