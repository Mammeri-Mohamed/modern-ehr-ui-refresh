
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { User, CheckCircle, XCircle, Clock } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Type pour les demandes d'acteurs de santé
interface HealthActorRequest {
  request_id: string;
  health_actor_id: string;
  nom: string;
  prenom: string;
  matricule_actor: string;
  numero_org: string;
  role: string;
  etat_request: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

const Second = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState<HealthActorRequest[]>([
    // Données de démonstration, à remplacer par des données réelles
    {
      request_id: "REQ001",
      health_actor_id: "HA001",
      nom: "Dubois",
      prenom: "Marie",
      matricule_actor: "MD12345",
      numero_org: "ORG789",
      role: "Médecin",
      etat_request: "PENDING"
    },
    {
      request_id: "REQ002",
      health_actor_id: "HA002",
      nom: "Martin",
      prenom: "Pierre",
      matricule_actor: "PM67890",
      numero_org: "ORG456",
      role: "Infirmier",
      etat_request: "ACCEPTED"
    },
    {
      request_id: "REQ003",
      health_actor_id: "HA003",
      nom: "Leclerc",
      prenom: "Sophie",
      matricule_actor: "SL54321",
      numero_org: "ORG123",
      role: "Pharmacien",
      etat_request: "REJECTED"
    }
  ]);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour accepter une demande
  const handleAccept = (requestId: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir accepter la demande ${requestId} ?`)) {
      // Implémenter la logique d'acceptation ici
      console.log(`Demande ${requestId} acceptée`);
      
      // Mise à jour locale pour la démonstration
      setRequests(requests.map(req => 
        req.request_id === requestId ? {...req, etat_request: 'ACCEPTED'} : req
      ));
    }
  };

  // Fonction pour refuser une demande
  const handleReject = (requestId: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir refuser la demande ${requestId} ?`)) {
      // Implémenter la logique de refus ici
      console.log(`Demande ${requestId} refusée`);
      
      // Mise à jour locale pour la démonstration
      setRequests(requests.map(req => 
        req.request_id === requestId ? {...req, etat_request: 'REJECTED'} : req
      ));
    }
  };

  // Fonction pour obtenir la couleur du badge selon le statut
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACCEPTED':
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle className="w-3 h-3 mr-1" /> Acceptée</Badge>;
      case 'REJECTED':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Refusée</Badge>;
      default:
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-300"><Clock className="w-3 h-3 mr-1" /> En attente</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-center max-w-6xl mx-auto mb-8">
          <User className="w-16 h-16 mb-6 text-secondary" />
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-display text-foreground">
            Système Acteur de Santé
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Gestion des demandes d'acteurs de santé pour accéder aux dossiers médicaux électroniques.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-4 rounded-full border-secondary border-t-transparent animate-spin"></div>
              <p className="mt-4 text-muted-foreground">Chargement des données...</p>
            </div>
          </div>
        ) : (
          <div className="card-hover rounded-lg border bg-card text-card-foreground shadow-sm p-6 transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Demandes d'Acteurs de Santé</h3>
              <Button onClick={() => window.location.reload()} variant="outline" size="sm">
                Actualiser
              </Button>
            </div>
            
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {requests.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableCaption>Liste des demandes d'acteurs de santé</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Prénom</TableHead>
                      <TableHead>Matricule</TableHead>
                      <TableHead>N° Org</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.request_id} className="fade-in">
                        <TableCell className="font-medium">{request.request_id}</TableCell>
                        <TableCell>{request.nom}</TableCell>
                        <TableCell>{request.prenom}</TableCell>
                        <TableCell>{request.matricule_actor}</TableCell>
                        <TableCell>{request.numero_org}</TableCell>
                        <TableCell>{request.role}</TableCell>
                        <TableCell>{getStatusBadge(request.etat_request)}</TableCell>
                        <TableCell>
                          {request.etat_request === 'PENDING' && (
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                                onClick={() => handleAccept(request.request_id)}
                              >
                                Accepter
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                                onClick={() => handleReject(request.request_id)}
                              >
                                Refuser
                              </Button>
                            </div>
                          )}
                          {request.etat_request === 'ACCEPTED' && (
                            <span className="text-green-600 text-sm font-medium">Demande acceptée</span>
                          )}
                          {request.etat_request === 'REJECTED' && (
                            <span className="text-red-600 text-sm font-medium">Demande refusée</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <Alert className="bg-blue-50 text-blue-800 border-blue-200">
                <AlertDescription>Aucune demande d'acteur de santé en attente.</AlertDescription>
              </Alert>
            )}
          </div>
        )}
        
        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <a href="/">Retour à l'accueil</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Second;
