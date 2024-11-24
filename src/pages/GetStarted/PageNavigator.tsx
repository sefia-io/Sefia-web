import { useInitStore } from "@/store/initStore";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa"; // Importing icons

const PageNavigator = () => {
  const { currentPage, prevPage } = useInitStore();

  return (
    <div className="flex justify-center items-center w-full h-16 max-w-md mx-auto">
      {/* Previous Icon Button */}
      <Button
        variant="outline"
        onClick={prevPage}
        disabled={currentPage === 1}
        className="p-2 disabled:opacity-50"
        title="Previous" // Tooltip for accessibility
      >
        <FaArrowLeft size={20} />
      </Button>
    </div>
  );
};

export default PageNavigator;
