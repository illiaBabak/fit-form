import { JSX } from "react";
import { Header } from "src/components/Header";

export const MainPage = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full h-screen bg-zinc-800">
      <Header />
    </div>
  );
};
