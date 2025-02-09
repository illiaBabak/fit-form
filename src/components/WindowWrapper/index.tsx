import { JSX, ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClose: () => void;
};

export const WindowWrapper = ({ children, onClose }: Props): JSX.Element => (
  <div
    className="fixed flex justify-center items-center overflow-hidden w-screen h-screen left-0 right-[50%] translate-[-50%, -50%] z-20 cursor-pointer bg-gray-600/50"
    onClick={onClose}
  >
    {children}
  </div>
);
