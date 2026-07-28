import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/routes/ProtectedRoute";

const DashboardLayout = lazy(
  () => import("@/components/layout/DashboardLayout/DashboardLayout"),
);

const DashboardPage = lazy(() => import("@/pages/Dashboard/DashboardPage"));

const NotFoundPage = lazy(() => import("@/pages/NotFound/NotFoundPage"));

const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));

const OrderListPage = lazy(
  () => import("@/features/order/pages/OrderListPage"),
);
const OrderDetailPage = lazy(
  () => import("@/features/order/pages/OrderDetailPage"),
);

const ProductListPage = lazy(
  () => import("@/features/product/pages/ProductListPage"),
);
const ProductEditPage = lazy(
  () => import("@/features/product/pages/ProductEditPage"),
);
const ProductCreatePage = lazy(
  () => import("@/features/product/pages/ProductCreatePage"),
);

const UserListPage = lazy(() => import("@/features/user/pages/UserListPage"));
const UserEditPage = lazy(() => import("@/features/user/pages/UserEditPage"));
const UserCreatePage = lazy(
  () => import("@/features/user/pages/UserCreatePage"),
);
const UserProfilePage = lazy(
  () => import("@/features/user/pages/UserProfilePage"),
);

const CategoryListPage = lazy(
  () => import("@/features/category/pages/CategoryListPage"),
);
const CategoryEditPage = lazy(
  () => import("@/features/category/pages/CategoryEditPage"),
);
const CategoryCreatePage = lazy(
  () => import("@/features/category/pages/CategoryCreatePage"),
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      </AuthProvider>
    ),
    handle: { breadcrumb: "Dashboard" },
    children: [
      { path: "/", element: <DashboardPage /> },
      {
        path: "myprofile",
        element: <UserProfilePage />,
        handle: { breadcrumb: "My Profile" },
      },
      {
        path: "users",
        handle: { breadcrumb: "Users" },
        children: [
          { index: true, element: <UserListPage /> },
          {
            path: "create",
            element: <UserCreatePage />,
            handle: {
              breadcrumb: "New User",
            },
          },
          {
            path: ":userId",
            element: <UserEditPage />,
            handle: {
              breadcrumb: "User Edit",
            },
          },
        ],
      },
      {
        path: "products",
        handle: { breadcrumb: "Products" },
        children: [
          { index: true, element: <ProductListPage /> },
          {
            path: "create",
            element: <ProductCreatePage />,
            handle: { breadcrumb: "Create Product" },
          },
          {
            path: ":productId",
            element: <ProductEditPage />,
            handle: { breadcrumb: "Edit Product" },
          },
        ],
      },
      {
        path: "orders",
        handle: { breadcrumb: "Orders" },
        children: [
          { index: true, element: <OrderListPage /> },
          {
            path: ":orderId",
            element: <OrderDetailPage />,
            handle: { breadcrumb: "Order Details" },
          },
        ],
      },
      {
        path: "categories",
        handle: { breadcrumb: "Categories" },
        children: [
          { index: true, element: <CategoryListPage /> },
          {
            path: "create",
            element: <CategoryCreatePage />,
            handle: { breadcrumb: "Create Category" },
          },
          {
            path: ":categoryId",
            element: <CategoryEditPage />,
            handle: { breadcrumb: "Edit Category" },
          },
        ],
      },
    ],
  },
  {
    path: "auth",
    children: [
      { index: true, element: <LoginPage /> },
      { path: "login", index: true, element: <LoginPage /> },
    ],
  },

  { path: "*", element: <NotFoundPage /> },
]);
