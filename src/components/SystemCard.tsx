
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, User, Building } from 'lucide-react';

interface SystemCardProps {
  title: string;
  subtitle: string;
  description: string;
  link: string;
  icon: 'health' | 'actor' | 'patient';
}

const SystemCard: React.FC<SystemCardProps> = ({ title, subtitle, description, link, icon }) => {
  const getIcon = () => {
    switch (icon) {
      case 'health':
        return <Building className="w-10 h-10 text-primary" />;
      case 'actor':
        return <User className="w-10 h-10 text-secondary" />;
      case 'patient':
        return <Heart className="w-10 h-10 text-destructive" />;
      default:
        return <Building className="w-10 h-10 text-primary" />;
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {getIcon()}
        </div>
        <CardDescription className="text-base font-medium text-primary">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="pt-2 border-t bg-muted/20">
        <Button className="w-full" asChild>
          <a href={link} target="_blank" rel="noopener noreferrer">
            Accéder
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SystemCard;
