import { useAuthStore } from "@/store/authStore";
import HeroButtons from "./HeroButtons";

const HeroSection = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="relative flex items-center justify-center min-h-screen">
      <div className="text-center px-6 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Sefia</h1>
        <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300">
          A file and image hosting service
        </p>
        <div className="space-x-4">
          <HeroButtons isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;