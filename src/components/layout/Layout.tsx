import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#050607] text-[#F3F3F0] relative overflow-x-hidden">
      {/* Cinematic Film Grain Overlay */}
      <div className="fixed inset-0 bg-grain pointer-events-none z-30 opacity-40" />

      {/* Global Ambient Gradient Vignette */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.015] via-transparent to-transparent pointer-events-none z-0" />

      {/* Sticky / Scrolled Navbar */}
      <Navbar />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Main Content Area */}
      <main className="flex-grow z-10">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
