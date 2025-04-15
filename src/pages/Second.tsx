
import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

const Second = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-16 mx-auto">
        <div className="flex flex-col items-center max-w-3xl mx-auto text-center">
          <User className="w-16 h-16 mb-6 text-secondary" />
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-display text-foreground">
            Système Acteur de Santé
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Bienvenue sur la plateforme dédiée aux professionnels de santé pour accéder et mettre à jour les dossiers médicaux des patients.
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

export default Second;
