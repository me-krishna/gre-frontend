import { FC } from "react";

interface Props {
  name: string;
  className?: string;
  onClick?: () => void;
  icon: JSX.Element;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const ExamButton: FC<Props> = ({
  name,
  className,
  disabled = false,
  onClick,
  icon,
  style,
}) => {
  return (
    <button
      disabled={disabled}
      className={`border py-1 px-2 rounded text-[14px] text-white border-white h-[45px] min-w-[62px] flex flex-col justify-center items-center hover:border-slate-200 hover:text-slate-200 ${className}

      `}
      onClick={onClick && onClick}
      style={{
        ...style,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {name}
      {icon}
    </button>
  );
};

export default ExamButton;
