import { Button } from "@/components/ui/button";

const HeroButtons = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const handleNavigation = (url: string) => {
    window.location.href = url;
  };

  return (
    <>
      {!isAuthenticated ? (
        <Button
          variant="default"
          size="lg"
          onClick={() => handleNavigation("/signin")}
        >
          Sign In
        </Button>
      ) : (
        <Button
          variant="default"
          size="lg"
          onClick={() => handleNavigation("/docs")}
        >
          Docs
        </Button>
      )}
      <Button
        variant="outline"
        size="lg"
        onClick={() => handleNavigation("/learn-more")}
      >
        Learn More
      </Button>
    </>
  );
};

export default HeroButtons;