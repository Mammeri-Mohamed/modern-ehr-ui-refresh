
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Clock, X, Bell, Filter } from 'lucide-react';

// Données factices pour les notifications
const mockNotifications = [
  {
    id: 1,
    title: "Nouvelle demande d'accès au dossier",
    patient: "Jean Dupont",
    from: "Dr. Marie Laurent",
    time: "Il y a 25 minutes",
    read: false,
    status: "pending"
  },
  {
    id: 2,
    title: "Résultats de laboratoire disponibles",
    patient: "Sophie Martin",
    from: "Laboratoire Central",
    time: "Il y a 2 heures",
    read: false,
    status: "pending"
  },
  {
    id: 3,
    title: "Rendez-vous de suivi confirmé",
    patient: "Thomas Bernard",
    from: "Centre Hospitalier",
    time: "Il y a 3 heures",
    read: true,
    status: "accepted"
  },
  {
    id: 4,
    title: "Mise à jour des informations médicales",
    patient: "Claire Petit",
    from: "Dr. Philippe Dubois",
    time: "Il y a 1 jour",
    read: true,
    status: "accepted"
  },
  {
    id: 5,
    title: "Demande d'accès refusée",
    patient: "Michel Leroy",
    from: "Clinique Saint-Jean",
    time: "Il y a 1 jour",
    read: true,
    status: "rejected"
  },
  {
    id: 6,
    title: "Nouvelle prescription ajoutée",
    patient: "Émilie Roux",
    from: "Dr. Laurent Blanc",
    time: "Il y a 2 jours",
    read: true,
    status: "pending"
  }
];

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState("all");

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = filter === "all" 
    ? notifications 
    : notifications.filter(notif => notif.status === filter);

  const unreadCount = notifications.filter(n => !n.read).length;
  const pendingCount = notifications.filter(n => n.status === "pending").length;
  const acceptedCount = notifications.filter(n => n.status === "accepted").length;
  const rejectedCount = notifications.filter(n => n.status === "rejected").length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Notifications</h2>
          <p className="text-sm text-muted-foreground">
            Gérez vos notifications et requêtes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtrer
          </Button>
          <Button variant="outline" size="sm">
            Marquer tout comme lu
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
            <p className="text-xs text-muted-foreground">
              {unreadCount} non lues
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              En attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">
              À traiter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Acceptées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{acceptedCount}</div>
            <p className="text-xs text-muted-foreground">
              Requêtes approuvées
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Refusées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount}</div>
            <p className="text-xs text-muted-foreground">
              Requêtes rejetées
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" onClick={() => setFilter("all")}>
            Toutes ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="pending" onClick={() => setFilter("pending")}>
            En attente ({pendingCount})
          </TabsTrigger>
          <TabsTrigger value="accepted" onClick={() => setFilter("accepted")}>
            Acceptées ({acceptedCount})
          </TabsTrigger>
          <TabsTrigger value="rejected" onClick={() => setFilter("rejected")}>
            Refusées ({rejectedCount})
          </TabsTrigger>
        </TabsList>

        <div className="mt-4 space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8">
              <Bell className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Aucune notification disponible</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <Card key={notification.id} className={`transition-colors ${!notification.read ? 'bg-muted/30' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-3">
                      {notification.status === "pending" ? (
                        <Clock className="h-5 w-5 text-amber-500 flex-shrink-0 mt-1" />
                      ) : notification.status === "accepted" ? (
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{notification.title}</h4>
                          {!notification.read && (
                            <Badge variant="secondary" className="text-xs">Nouveau</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Patient: <span className="font-medium">{notification.patient}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          De: {notification.from}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => markAsRead(notification.id)}
                          className="h-8 px-2"
                        >
                          Marquer comme lu
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => dismissNotification(notification.id)}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default NotificationPanel;
