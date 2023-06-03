import { To } from "react-router-dom";
import { ReturnLink } from "./ReturnLink";

export type NotFoundViewProps = {
  to: To;
};

export function NotFoundView({ to }: NotFoundViewProps) {
  return (
    <div>
      <ReturnLink to={to}>Go back</ReturnLink>

      <p>
        <span className="font-bold">404</span>! Content not found.
      </p>
    </div>
  );
}
