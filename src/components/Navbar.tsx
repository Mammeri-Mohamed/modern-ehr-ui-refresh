
import React from 'react';
import { Heart, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <a href="/" className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold font-display text-primary">EHR Share System</span>
          </a>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex md:items-center md:space-x-4">
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Documentation</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Support</a>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
