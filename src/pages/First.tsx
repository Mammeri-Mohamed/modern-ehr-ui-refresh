import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Building, Plus, BarChart2, Users, UserPlus, Heart, Stethoscope, Pill, Building2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';

const API_CONFIG = {
  BASE_URL: 'http://192.168.56.101:4000',
  CHANNEL: 'mychannel',
  CHAINCODE_HEALTH_AUTHORITY: 'healthactor',
  CHAINCODE_HEALTH_PATIENT: 'patient'
};

interface PatientRequest {
  request_id: string;
  patient_id: string;
  name: string;
  matricule: string;
  ehr_id: string;
  numero_organisation: string;
  etat_request: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

interface HealthActorRequest {
  RequestID: string;
  Name: string;
  prenom: string;
  Matricule: string;
  EHRID: string;
  NumeroOrganisation: string;
  EtatRequest: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

interface Organization {
  name: string;
  patients: number;
  doctors: number;
  pharmacies: number;
  imagingCenters: number;
  laboratories: number;
}

interface StatData {
  name: string;
  value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const First = () => {
  const { toast } = useToast();
  const [adminName, setAdminName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [healthAuthorityName, setHealthAuthorityName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [patientRequests, setPatientRequests] = useState<PatientRequest[]>([]);
  const [healthActorRequests, setHealthActorRequests] = useState<HealthActorRequest[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      name: 'Hospital Central',
      patients: 427,
      doctors: 42,
      pharmacies: 5,
      imagingCenters: 3,
      laboratories: 4
    },
    {
      name: 'Clinique Saint-Antoine',
      patients: 256,
      doctors: 28,
      pharmacies: 2,
      imagingCenters: 1,
      laboratories: 2
    },
    {
      name: 'Centre Médical Pasteur',
      patients: 183,
      doctors: 15,
      pharmacies: 3,
      imagingCenters: 2,
      laboratories: 1
    }
  ]);

  const getAdminToken = async () => {
    try {
      console.log("🔹 Connexion de l'admin en cours...");
      const authLoginResponse = await axios.post(`${API_CONFIG.BASE_URL}/users/login`, {
        username: "admin",
        orgName: "Org1"
      });

      if (!authLoginResponse.data.success || !authLoginResponse.data.message?.token) {
        console.error("❌ Échec de la connexion:", authLoginResponse.data);
        throw new Error("Échec de la connexion à l'admin");
      }

      console.log("✅ Connexion réussie, token JWT récupéré");
      return authLoginResponse.data.message.token;
    } catch (error: any) {
      console.error("❌ Erreur lors de la connexion de l'admin:", error.response?.data || error.message);
      toast({
        title: "Erreur d'authentification",
        description: "Impossible de se connecter au serveur.",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleAddAdmin = async () => {
    if (!adminName.trim() || !orgName.trim()) {
      toast({
        title: "Champs incomplets",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const authToken = await getAdminToken();
      if (!authToken) {
        setIsLoading(false);
        return;
      }

      toast({
        title: "Succès",
        description: `L'administrateur ${adminName} a été ajouté à l'organisation ${orgName}`,
        variant: "default",
      });

      setAdminName('');
      setOrgName('');
    } catch (error: any) {
      console.error("❌ Erreur lors de l'ajout de l'administrateur:", error.response?.data || error.message);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'administrateur",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddHealthAuthority = async () => {
    if (!healthAuthorityName.trim()) {
      toast({
        title: "Champ incomplet",
        description: "Veuillez remplir le nom de l'autorité de santé",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const authToken = await getAdminToken();
      if (!authToken) {
        setIsLoading(false);
        return;
      }

      toast({
        title: "Succès",
        description: `L'autorité de santé ${healthAuthorityName} a été ajoutée`,
        variant: "default",
      });

      setHealthAuthorityName('');
    } catch (error: any) {
      console.error("❌ Erreur lors de l'ajout de l'autorité de santé:", error.response?.data || error.message);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'autorité de santé",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const responsePatients = await fetch('/third');
      if (responsePatients.ok) {
        const patientData = await responsePatients.json();
        setPatientRequests(patientData);
      }

      const responseHealthActors = await fetch('/second');
      if (responseHealthActors.ok) {
        const healthActorData = await responseHealthActors.json();
        setHealthActorRequests(healthActorData);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRequestStats = () => {
    const totalPatientRequests = patientRequests.length || 5;
    const pendingPatientRequests = patientRequests.filter(req => req.etat_request === 'PENDING').length || 2;
    const acceptedPatientRequests = patientRequests.filter(req => req.etat_request === 'ACCEPTED').length || 2;
    const rejectedPatientRequests = patientRequests.filter(req => req.etat_request === 'REJECTED').length || 1;

    const totalHealthActorRequests = healthActorRequests.length || 8;
    const pendingHealthActorRequests = healthActorRequests.filter(req => req.EtatRequest === 'PENDING').length || 3;
    const acceptedHealthActorRequests = healthActorRequests.filter(req => req.EtatRequest === 'ACCEPTED').length || 4;
    const rejectedHealthActorRequests = healthActorRequests.filter(req => req.EtatRequest === 'REJECTED').length || 1;

    const requestStats = [
      { name: 'Patients', total: totalPatientRequests, pending: pendingPatientRequests },
      { name: 'Acteurs de Santé', total: totalHealthActorRequests, pending: pendingHealthActorRequests },
    ];

    const patientStatusData: StatData[] = [
      { name: 'En attente', value: pendingPatientRequests },
      { name: 'Acceptées', value: acceptedPatientRequests },
      { name: 'Refusées', value: rejectedPatientRequests },
    ];

    const healthActorStatusData: StatData[] = [
      { name: 'En attente', value: pendingHealthActorRequests },
      { name: 'Acceptées', value: acceptedHealthActorRequests },
      { name: 'Refusées', value: rejectedHealthActorRequests },
    ];

    return { requestStats, patientStatusData, healthActorStatusData };
  };

  const getOrganizationStats = () => {
    const orgStats = organizations.map(org => ({
      name: org.name,
      patients: org.patients,
      médecins: org.doctors,
      pharmacies: org.pharmacies,
      imagerie: org.imagingCenters,
      laboratoires: org.laboratories,
    }));

    const totalStats = {
      patients: organizations.reduce((sum, org) => sum + org.patients, 0),
      doctors: organizations.reduce((sum, org) => sum + org.doctors, 0),
      pharmacies: organizations.reduce((sum, org) => sum + org.pharmacies, 0),
      imagingCenters: organizations.reduce((sum, org) => sum + org.imagingCenters, 0),
      laboratories: organizations.reduce((sum, org) => sum + org.laboratories, 0),
    };

    const entityTypeData: StatData[] = [
      { name: 'Patients', value: totalStats.patients },
      { name: 'Médecins', value: totalStats.doctors },
      { name: 'Pharmacies', value: totalStats.pharmacies },
      { name: 'Centres d\'imagerie', value: totalStats.imagingCenters },
      { name: 'Laboratoires', value: totalStats.laboratories },
    ];

    return { orgStats, totalStats, entityTypeData };
  };

  const { requestStats, patientStatusData, healthActorStatusData } = getRequestStats();
  const { orgStats, totalStats, entityTypeData } = getOrganizationStats();

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-center max-w-5xl mx-auto mb-8">
          <Building className="w-16 h-16 mb-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-display text-foreground">
            Tableau de Bord - Autorité de Santé
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Gestion et supervision des organisations, acteurs de santé et patients.
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dashboard">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="admin">Gestion Administrateurs</TabsTrigger>
            <TabsTrigger value="stats">Statistiques Détaillées</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalStats.patients}</div>
                  <p className="text-xs text-muted-foreground">
                    {patientRequests.length || 5} demandes en cours
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Médecins</CardTitle>
                  <Stethoscope className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalStats.doctors}</div>
                  <p className="text-xs text-muted-foreground">
                    Répartis dans {organizations.length} organisations
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Pharmacies</CardTitle>
                  <Pill className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalStats.pharmacies}</div>
                  <p className="text-xs text-muted-foreground">
                    En collaboration avec le réseau de santé
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Laboratoires</CardTitle>
                  <Stethoscope className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalStats.laboratories}</div>
                  <p className="text-xs text-muted-foreground">
                    Et {totalStats.imagingCenters} centres d'imagerie
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Demandes par Type</CardTitle>
                  <CardDescription>
                    Répartition des demandes patients et acteurs de santé
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={requestStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" fill="#8884d8" name="Total" />
                        <Bar dataKey="pending" fill="#82ca9d" name="En attente" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Répartition des Entités</CardTitle>
                  <CardDescription>
                    Distribution des différents types d'entités
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={entityTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {entityTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}`, 'Nombre']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Organisations</CardTitle>
                <CardDescription>
                  Vue d'ensemble des organisations de santé
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {organizations.map((org, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{org.name}</h3>
                        <Badge variant="outline">{org.patients} patients</Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Médecins:</span> {org.doctors}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Pharmacies:</span> {org.pharmacies}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Imagerie:</span> {org.imagingCenters}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Laboratoires:</span> {org.laboratories}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="admin">
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Ajouter un Administrateur</CardTitle>
                  <CardDescription>
                    Créer un nouvel administrateur pour une organisation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Nom de l'administrateur
                      </label>
                      <Input
                        type="text"
                        placeholder="Entrez le nom"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Nom de l'organisation
                      </label>
                      <Input
                        type="text"
                        placeholder="Entrez l'organisation"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddAdmin} disabled={isLoading} className="w-full">
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-t-transparent animate-spin mr-2"></div>
                          Traitement...
                        </div>
                      ) : (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" /> Ajouter l'administrateur
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Ajouter une Autorité de Santé</CardTitle>
                  <CardDescription>
                    Enregistrer une nouvelle autorité de santé
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Nom de l'autorité de santé
                      </label>
                      <Input
                        type="text"
                        placeholder="Entrez le nom"
                        value={healthAuthorityName}
                        onChange={(e) => setHealthAuthorityName(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddHealthAuthority} disabled={isLoading} className="w-full">
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-t-transparent animate-spin mr-2"></div>
                          Traitement...
                        </div>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" /> Ajouter l'autorité de santé
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="grid gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Statut des Demandes de Patients</CardTitle>
                  <CardDescription>
                    Répartition des demandes par statut
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={patientStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {patientStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}`, 'Demandes']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Statut des Demandes d'Acteurs de Santé</CardTitle>
                  <CardDescription>
                    Répartition des demandes par statut
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={healthActorStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {healthActorStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}`, 'Demandes']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques par Organisation</CardTitle>
                  <CardDescription>
                    Comparaison des entités par organisation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={orgStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="patients" fill="#8884d8" name="Patients" />
                        <Bar dataKey="médecins" fill="#82ca9d" name="Médecins" />
                        <Bar dataKey="pharmacies" fill="#ffc658" name="Pharmacies" />
                        <Bar dataKey="imagerie" fill="#ff8042" name="Centres d'imagerie" />
                        <Bar dataKey="laboratoires" fill="#0088fe" name="Laboratoires" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <a href="/">Retour à l'accueil</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default First;
