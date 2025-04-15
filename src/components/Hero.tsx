
import React from 'react';

const Hero = () => {
  return (
    <div className="py-12 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 mx-auto text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl font-display">
          Système de Partage de Dossiers Médicaux Électroniques
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground">
          Une plateforme sécurisée et moderne pour la gestion et le partage de dossiers médicaux entre les différents acteurs du système de santé.
        </p>
        <div className="inline-flex items-center justify-center w-full max-w-sm p-1 mt-8 overflow-hidden rounded-full bg-muted">
          <div className="flex items-center w-1/3 h-8 px-4 text-xs font-medium text-white rounded-full bg-primary">
            Version Beta
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
