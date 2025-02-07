import { JSX } from "react";

export const SkeletonLoader = ({
  className,
}: {
  className?: string;
}): JSX.Element => (
  <div className={`flex animate-pulse bg-gray-300 ${className}`} />
);
