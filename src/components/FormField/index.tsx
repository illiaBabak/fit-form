import { ChangeEvent, JSX, useState } from "react";

type Props = {
  label: string;
  type: "text" | "password";
  value: string;
  onChange: ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => void;
};

export const FormField = ({
  label,
  type,
  value,
  onChange,
}: Props): JSX.Element => {
  const [shouldShowPassword, setShouldShowPassword] = useState(false);

  return (
    <div className="my-4">
      <p className="mb-1 text-gray-400">{label}</p>
      <div className="flex flex-row items-center relative">
        <input
          type={shouldShowPassword || type === "text" ? "text" : "password"}
          className="shadow-md outline outline-black/10 w-full h-[48px] px-4 py-6 rounded-lg"
          value={value}
          onChange={onChange}
          data-testid={label}
        />
        {type === "password" && (
          <img
            onClick={() => setShouldShowPassword((prev) => !prev)}
            className="object-contain w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] ms-1 sm:ms-4 absolute right-[-48px] cursor-pointer hover:scale-115 duration-300"
            src={shouldShowPassword ? "/show.png" : "/hide.png"}
            alt="eye-icon"
          />
        )}
      </div>
    </div>
  );
};
