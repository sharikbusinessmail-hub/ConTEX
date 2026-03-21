import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] bg-black overflow-hidden">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1659377794321-6282f859bdae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBibGFjayUyMHdoaXRlJTIwc3RyZWV0d2VhcnxlbnwxfHx8fDE3NzI4OTU3OTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Hero Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-start px-8 md:px-16 bg-black/30">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider">
          1% BETTER
        </h1>
      </div>
    </section>
  );
};