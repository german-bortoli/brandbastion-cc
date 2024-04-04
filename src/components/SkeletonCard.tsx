import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3 mb-6">
      <Skeleton className="h-4 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-[150px] w-full" />
      </div>
    </div>
  );
};

export default SkeletonCard;
