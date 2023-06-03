import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/useAuth";
import { useEffect } from "react";

export function IndexPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("orders");
    }
  }, [navigate, isAuthenticated]);

  return (
    <main className="flex h-full place-items-center">
      {isAuthenticated ? <Loading /> : <SignInView />}
    </main>
  );
}

function Loading() {
  return <p>Loading...</p>;
}

function SignInView() {
  const { authenticate } = useAuth();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("*** onSubmit");

    const formData = new FormData(event.target as HTMLFormElement);
    authenticate(formData.get("email")?.toString()!);

    console.log("*** onSubmit 2");
  };

  return (
    <div className="flex flex-row flex-wrap h-fit shadow-xl rounded p-4 bg-white">
      <p className="font-bold mb-4">
        Please enter your email address to see your recent orders
      </p>

      <form className="grid w-full" onSubmit={onSubmit}>
        <label className="text-left mb-4">
          <span>Email</span>

          <input
            className="block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem]
            leading-[2.15] outline-none transition-all duration-200 ease-linear
            focus:placeholder:opacity-100 border-gray-600 border"
            type="email"
            name="email"
            placeholder="Email address"
          />
        </label>

        <div className="w-full place-items-center">
          <input
            className="bg-orange-300 p-2 px-6 rounded w-fit hover:cursor-pointer hover:bg-orange-400"
            type="submit"
            value="Send"
          />
        </div>
      </form>
    </div>
  );
}
