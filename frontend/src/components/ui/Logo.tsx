import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "icon" | "horizontal" | "full";
}

export default function Logo({
  variant = "horizontal",
}: LogoProps) {
  const logos = {
    icon: {
      src: "/icon.svg",
      className: "h-10 w-auto",
    },

    horizontal: {
      src: "/logo-horizontal.svg",
      className: "h-18 w-auto",
    },

    full: {
      src: "/logo-full.svg",
      className: "h-48 w-auto",
    },
  };

  return (
    <Link
      to="/"
      className="inline-flex items-center"
    >
      <img
        src={logos[variant].src}
        alt="CareerForge"
        className={logos[variant].className}
        draggable={false}
      />
    </Link>
  );
}