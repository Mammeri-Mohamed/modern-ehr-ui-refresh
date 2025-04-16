
import React, { useState } from 'react';
import { Bell, Heart, Menu, Search, Settings, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger, 
  navigationMenuTriggerStyle 
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col h-full">
                <div className="flex items-center space-x-2 py-4">
                  <Heart className="w-6 h-6 text-primary" />
                  <span className="text-xl font-semibold font-display text-primary">EHR Share System</span>
                </div>
                <div className="flex flex-col space-y-1 mt-4">
                  <Link 
                    to="/"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                  >
                    Tableau de bord
                  </Link>
                  <Link 
                    to="/first"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                  >
                    Système Autorité
                  </Link>
                  <Link 
                    to="/second"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                  >
                    Système Médical
                  </Link>
                  <Link 
                    to="/third"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                  >
                    Espace Patient
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          
          <a href="/" className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold font-display text-primary">EHR Share System</span>
          </a>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Systèmes</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="mb-2 text-lg font-medium">
                        Systèmes Disponibles
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Accédez aux différents systèmes du dossier médical électronique partagé.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 p-4">
                      <Link to="/first" className="block p-3 space-y-1 rounded-md hover:bg-muted">
                        <div className="font-medium">Système Autorité</div>
                        <div className="text-sm text-muted-foreground">
                          Système dédié aux autorités sanitaires
                        </div>
                      </Link>
                      <Link to="/second" className="block p-3 space-y-1 rounded-md hover:bg-muted">
                        <div className="font-medium">Système Médical</div>
                        <div className="text-sm text-muted-foreground">
                          Plateforme pour les professionnels de santé
                        </div>
                      </Link>
                      <Link to="/third" className="block p-3 space-y-1 rounded-md hover:bg-muted">
                        <div className="font-medium">Espace Patient</div>
                        <div className="text-sm text-muted-foreground">
                          Interface pour les patients
                        </div>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Documentation
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Support
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center space-x-4">
          {showSearch ? (
            <div className="flex items-center relative">
              <Input 
                placeholder="Rechercher..." 
                className="w-full h-9 pr-8"
                autoFocus
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 h-9 w-9"
                onClick={() => setShowSearch(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex"
              onClick={() => setShowSearch(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                  12
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                {[1, 2, 3].map((i) => (
                  <DropdownMenuItem key={i} className="cursor-pointer py-2">
                    <div className="flex flex-col gap-1">
                      <div className="font-medium">Nouvelle demande d'accès</div>
                      <div className="text-xs text-muted-foreground">Il y a 20 minutes</div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/notifications" className="justify-center font-medium">
                  Voir toutes les notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Paramètres</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Se déconnecter</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
