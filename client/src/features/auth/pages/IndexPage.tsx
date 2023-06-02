import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/useAuth";

export function IndexPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <main>{isAuthenticated ? <AuthenticatedView /> : <SignInView />}</main>
    </div>
  );
}

function AuthenticatedView() {
  const { email, signOff } = useAuth();

  return (
    <>
      <p>
        You've signed in as <strong>{email}</strong>
      </p>
      <Link to={"orders"}>View orders</Link>

      <button onClick={signOff}>Sign off</button>
    </>
  );
}

function SignInView() {
  const { authenticate } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    authenticate(formData.get("email")?.toString()!);

    navigate("orders");
  };

  return (
    <>
      <p>Please enter your email address to see your recent orders</p>

      <form onSubmit={onSubmit}>
        <label>
          <span>Email</span>

          <input type="email" name="email" />
        </label>

        <input type="submit" value="Send" />
      </form>
    </>
  );
}
