
import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const Third = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-16 mx-auto">
        <div className="flex flex-col items-center max-w-3xl mx-auto text-center">
          <Heart className="w-16 h-16 mb-6 text-destructive" />
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-display text-foreground">
            Système Patient
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Bienvenue sur l'interface dédiée aux patients pour consulter et gérer leurs propres dossiers médicaux électroniques en toute sécurité.
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

export default Third;
