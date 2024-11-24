import { cn } from "@/lib/utils";

type LoadingProps = {
  className?: string;
};

const Loading = ({ className }: LoadingProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-transparent border-gray-400"></div>
    </div>
  );
};

export default Loading;
