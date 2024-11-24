import { useInitStore } from "@/store/initStore";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";
import PageNavigator from "./PageNavigator";
import ShootingStar from "@/components/Backgrounds/ShootingStar";
import ParticleBackground from "@/components/Backgrounds/ParticleBackground";

const NAVIGATOR_HEIGHT = 64; // Navigator height in pixels

const GetStarted = () => {
  const { currentPage } = useInitStore();

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <FirstPage />;
      case 2:
        return <SecondPage />;
      case 3:
        return <ThirdPage />;
      default:
        return <FirstPage />;
    }
  };

  return (
    <>
      <ParticleBackground />
      <ShootingStar />
      <div
        className="flex flex-col items-center justify-center p-4"
        style={{ minHeight: `calc(100vh - ${NAVIGATOR_HEIGHT}px)` }}
      >
        {renderPage()}
      </div>
      {currentPage !== 1 && <PageNavigator />}
    </>
  );
};

export default GetStarted;
