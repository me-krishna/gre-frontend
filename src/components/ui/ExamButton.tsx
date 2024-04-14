import { FC } from "react";

interface Props {
  name: string;
  className?: string;
  onClick?: () => void;
  icon: JSX.Element;
  disabled?: boolean;
}

const ExamButton: FC<Props> = ({
  name,
  className,
  disabled = false,
  onClick,
  icon,
}) => {
  return (
    <button
      disabled={disabled}
      className={`border py-1 px-2 rounded text-[12px] text-white border-white flex flex-col justify-center items-center font-semibold hover:border-slate-200 hover:text-slate-200 ${className}`}
      onClick={onClick && onClick}
    >
      {name}
      {icon}
    </button>
  );
};

export default ExamButton;
