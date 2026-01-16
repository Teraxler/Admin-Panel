import { createBrowserRouter } from "react-router";
import { lazy } from "react";

const OrderList = lazy(() => import("./pages/Orders/OrderList"));

const MainLayout = lazy(() => import("./layout/DashboardLayout.jsx"));

const ProductList = lazy(() => import("./pages/Products/ProductList"));
const ProductEdit = lazy(() => import("./pages/Products/ProductEdit"));
const ProductCreate = lazy(() => import("./pages/Products/ProductCreate"));

const CustomerList = lazy(() => import("./pages/Customers/CustomerList"));
const CustomerEdit = lazy(() => import("./pages/Customers/CustomerEdit"));
const CustomerCreate = lazy(() => import("./pages/Customers/CustomerCreate"));

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
        path: "customers",
        handle: { breadcrumb: "Customers" },
        children: [
          { index: true, element: <CustomerList /> },
          {
            path: "create",
            element: <CustomerCreate />,
            handle: {
              breadcrumb: "New Customer",
            },
          },
          {
            path: ":customerId",
            element: <CustomerEdit />,
            handle: {
              breadcrumb: "Customer Edit",
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
