import "./App.css";
import {
  Route,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  useNavigate,
} from "react-router-dom";
import { IndexPage } from "./features/auth/pages/IndexPage";
import {
  OrdersPage,
  ordersPageLoader,
} from "./features/orders/pages/OrdersPage";
import {
  OrderDetailsPage,
  orderDetailPageLoader,
} from "./features/orders/pages/OrderDetailsPage";
import { AuthProvider } from "./features/auth/provider/AuthProvider";
import { useAuth } from "./features/auth/provider/useAuth";
import { NotFoundView } from "./components/404";
import { ParcelLabLogo } from "./components/ParcelLabLogo";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route
          path="/orders"
          element={<OrdersPage />}
          loader={ordersPageLoader}
        />
        <Route
          path="/orders/:orderNumber"
          element={<OrderDetailsPage />}
          loader={orderDetailPageLoader}
        />

        <Route path="*" element={<NotFoundView to="/" />} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

function Layout() {
  const { email, signOff } = useAuth();
  const navigate = useNavigate();

  const signOffHandler = async () => {
    await signOff();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <header className="p-4 bg-orange-100 flex flex-row justify-between items-center shadow-lg shadow-orange-100">
        <Link to="/">
          <ParcelLabLogo />
        </Link>

        {email ? (
          <div>
            <span className="font-bold pr-2">{email}</span>{" "}
            <span
              className="underline hover:cursor-pointer"
              onClick={signOffHandler}
            >
              Sign off
            </span>
          </div>
        ) : null}
      </header>

      <div className="p-4 flex-1 max-w-5xl w-full self-center">
        <Outlet />
      </div>
    </div>
  );
}
