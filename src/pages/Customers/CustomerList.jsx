import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Table from "../../components/Table/Table";
import useFetch from "../../hooks/useFetch";
import { API_URL, ITEMS_PER_PAGE } from "../../constants";
import TableRowCustomer from "../../components/Table/TableRowCustomer";
import { toast } from "sonner";
import { removeItemFromList, searchCustomer } from "../../utils/array.util";
import Breadcrumb from "../../components/Breadcrumb";
import SearchBar from "../../components/Searchbar";
import Pagination from "../../components/Pagination/Pagination";
import { useTitle } from "../../hooks/useTitle";

const tableColumns = [
  "#",
  "Full Name",
  "Username",
  "Email",
  "Phone",
  "Birthday",
  "",
];

const removeCustomerById = (customers, id) =>
  removeItemFromList(customers, "customerId", id);

function CustomerList() {
    useTitle("Admin Panel - Customers");

  const location = useLocation();
  const navigate = useNavigate();
  const [filteredCustomers, setFilteredCategories] = useState([]);
  const [currentPageCustomers, setCurrentPageCustomers] = useState([]);
  const [customers, isCustomersLoaded, error, setCustomers] = useFetch(
    `${API_URL}/customers`
  );

  async function deleteCustomerHandler(customerId) {
    try {
      const response = await fetch(`${API_URL}/customers/${customerId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setCustomers((prevCustomers) =>
        removeCustomerById(prevCustomers, customerId)
      );

      toast.success("Customer delete successfully");
    } catch (error) {
      toast.error("Something is wrong please try again");
    }
  }

  useEffect(() => {
    if (location.state) {
      toast.success(location.state.message);

      navigate(location.pathname, { replace: true, state: null });
    }
  }, []);

  return (
    <>
      <div>
        <h1 className="title">Customers</h1>
        <Breadcrumb />
      </div>
      <section className="mt-8">
        <div className="flex justify-between mb-4">
          <Link
            to={"create"}
            className="flex items-center justify-center gap-x-1 lg:gap-x-2 size-9.5 sm:w-auto p-2 lg:p-2.5 bg-white hover:bg-full-spectrum-blue text-full-spectrum-blue hover:text-white text-sm font-medium uppercase border border-full-spectrum-blue rounded-lg transition"
          >
            <svg className="size-4">
              <use href="#plus"></use>
            </svg>
            <span className="text-sm lg:text-base hidden sm:inline">
              New Customer
            </span>
          </Link>
          <SearchBar
            items={customers}
            placeholder="Search (name, username)"
            searchHandler={searchCustomer}
            isItemsLoaded={isCustomersLoaded}
            setFilteredItems={setFilteredCategories}
          />
        </div>
        <div className="p-2 sm:p-4 bg-white rounded-lg">
          {isCustomersLoaded && filteredCustomers?.length ? (
            <Table columns={tableColumns}>
              {currentPageCustomers.map((customer, i) => (
                <TableRowCustomer
                  key={customer.customerId}
                  number={i + 1}
                  onDelete={() => deleteCustomerHandler(customer.customerId)}
                  {...customer}
                />
              ))}
            </Table>
          ) : (
            <span className="block h-20 leading-20 text-center">
              No Customer Found :{"("}
            </span>
          )}
        </div>
        {filteredCustomers?.length ? (
          <Pagination
            items={filteredCustomers}
            itemsPerPage={ITEMS_PER_PAGE}
            setCurrentPageItems={setCurrentPageCustomers}
          />
        ) : null}
      </section>
    </>
  );
}

export default CustomerList;
