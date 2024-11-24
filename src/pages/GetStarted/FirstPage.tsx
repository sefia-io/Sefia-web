import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useInitStore } from "@/store/initStore";

const FirstPage = () => {
  const { nextPage } = useInitStore();

  return (
    <>
      <h1 className="text-5xl font-extrabold mb-4 flex items-center">
        <span className="mr-2"> Welcome to Sefia!</span>
      </h1>
      <p className="text-lg text-center mb-8">
        Follow the instructions below to complete the initialization process.{" "}
      </p>
      <div className="flex space-x-4">
        <Button onClick={() => nextPage()}>
          🚀 Start Initialization
        </Button>
        <Button variant="outline" onClick={() => console.log("Learn more")}>
          📖 Learn More
        </Button>
        <ModeToggle />
      </div>
      <footer className="mt-10 text-sm">
        <span>🌟 Powered by Sefia.io 🌟</span>
      </footer>
    </>
  );
};

export default FirstPage;
