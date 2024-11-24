import React from "react";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <section className={`relative flex items-center justify-center min-h-screen`}>

      <div className="text-center px-6 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Sefia</h1>
        <p className="text-lg md:text-xl mb-8 text-gray-300">
          A free file and image hosting service
        </p>
        <div className="space-x-4">
          <Button
            variant="default"
            size="lg"
            onClick={() => window.location.href = "/get-started"}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.href = "/learn-more"}
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
