import { createBrowserRouter } from "react-router";
import { lazy } from "react";

const OrderList = lazy(() => import("./pages/Orders/OrderList"));

const MainLayout = lazy(() => import("./layout/DashboardLayout.jsx"));

const ProductList = lazy(() => import("./pages/Products/ProductList"));
const ProductEdit = lazy(() => import("./pages/Products/ProductEdit"));
const ProductCreate = lazy(() => import("./pages/Products/ProductCreate"));

const UserList = lazy(() => import("./pages/Users/UserList"));
const UserEdit = lazy(() => import("./pages/Users/UserEdit"));
const UserCreate = lazy(() => import("./pages/Users/UserCreate"));

const CategoryList = lazy(() => import("./pages/Categories/CategoryList"));
const CategoryEdit = lazy(() => import("./pages/Categories/CategoryEdit"));
const CategoryCreate = lazy(() => import("./pages/Categories/CategoryCreate"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    handle: { breadcrumb: "Dashboard" },
    children: [
      // { path: "/", element: <Dashboard /> },
      {
        path: "users",
        handle: { breadcrumb: "Users" },
        children: [
          { index: true, element: <UserList /> },
          {
            path: "create",
            element: <UserCreate />,
            handle: {
              breadcrumb: "New User",
            },
          },
          {
            path: ":userId",
            element: <UserEdit />,
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
          { index: true, element: <ProductList /> },
          {
            path: "create",
            element: <ProductCreate />,
            handle: { breadcrumb: "Create Product" },
          },
          {
            path: ":productId",
            element: <ProductEdit />,
            handle: { breadcrumb: "Edit Product" },
          },
        ],
      },
      {
        path: "orders",
        element: <OrderList />,
        handle: { breadcrumb: "Orders" },
      },
      {
        path: "categories",
        handle: { breadcrumb: "Categories" },
        children: [
          { index: true, element: <CategoryList /> },
          {
            path: "create",
            element: <CategoryCreate />,
            handle: { breadcrumb: "Create Category" },
          },
          {
            path: ":categoryId",
            element: <CategoryEdit />,
            handle: { breadcrumb: "Edit Category" },
          },
        ],
      },
    ],
  },

  // { path: "*", element: <NotFound /> },
]);
