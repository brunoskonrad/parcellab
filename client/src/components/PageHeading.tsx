import React from "react";

type PageHeadingProps = {
  children: React.ReactNode;
};

export function PageHeading({ children }: PageHeadingProps) {
  return <h2 className="font-bold text-2xl mb-4">{children}</h2>;
}
