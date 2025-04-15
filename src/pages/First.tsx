
import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Building } from 'lucide-react';

const First = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-16 mx-auto">
        <div className="flex flex-col items-center max-w-3xl mx-auto text-center">
          <Building className="w-16 h-16 mb-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-display text-foreground">
            Système Autorité de Santé
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Bienvenue sur le système dédié aux autorités sanitaires pour la gestion et la supervision des dossiers médicaux électroniques.
          </p>
          
          <div className="mt-10">
            <Button variant="outline" asChild>
              <a href="/">Retour à l'accueil</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default First;
