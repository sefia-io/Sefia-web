import { useInitStore } from "@/store/initStore";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";
import PageNavigator from "./PageNavigator";
import ConstellationBackground from "@/components/Backgrounds/ConstellationBackground";
import { useTheme } from "@/components/theme-provider";

const NAVIGATOR_HEIGHT = 64; // Navigator height in pixels

const GetStarted = () => {
  const { theme } = useTheme();
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
      <ConstellationBackground />
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
