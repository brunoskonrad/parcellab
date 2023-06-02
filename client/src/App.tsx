import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
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
