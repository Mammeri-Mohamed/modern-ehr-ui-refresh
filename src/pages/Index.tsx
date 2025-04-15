
import React from 'react';
import Navbar from '@/components/Navbar';
import SystemCard from '@/components/SystemCard';
import Hero from '@/components/Hero';

const systemsData = [
  {
    title: "Premier système",
    subtitle: "Autorité de Santé",
    description: "Système dédié aux autorités sanitaires pour gérer et superviser les dossiers médicaux électroniques à l'échelle nationale.",
    link: "/first",
    icon: "health"
  },
  {
    title: "Deuxième système",
    subtitle: "Acteur de Santé",
    description: "Plateforme pour les professionnels de santé permettant d'accéder et de mettre à jour les dossiers médicaux des patients.",
    link: "/second",
    icon: "actor"
  },
  {
    title: "Troisième système",
    subtitle: "Patient",
    description: "Interface permettant aux patients de consulter et de gérer leurs propres dossiers médicaux électroniques en toute sécurité.",
    link: "/third",
    icon: "patient"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      <div className="container px-4 py-16 mx-auto">
        <h2 className="mb-12 text-2xl font-bold text-center font-display text-foreground">
          Nos Systèmes Disponibles
        </h2>
        
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
