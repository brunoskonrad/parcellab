import { Link, LinkProps } from "react-router-dom";

export function ReturnLink({ children, className, ...props }: LinkProps) {
  return (
    <Link
      {...props}
      className={`underline text-blue-600 hover:cursor-pointer ${className}`}
    >
      ← {children}
    </Link>
  );
}
