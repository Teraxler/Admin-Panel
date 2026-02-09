import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { API_URL, ITEMS_PER_PAGE } from "@/constants";
import { removeItemFromList, searchCustomer } from "@/utils/array.util";
import useFetch from "@/hooks/useFetch";
import { useTitle } from "@/hooks/useTitle";
import { useToastMessage } from "@/hooks/useToastMessage";
import Table from "@/components/Table/Table";
import SearchBar from "@/components/SearchBar";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination/Pagination";
import TableRowCustomer from "@/components/Table/TableRowCustomer";

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
  useToastMessage();

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [currentPageCustomers, setCurrentPageCustomers] = useState([]);

  const { data: customers, isLoaded: isCustomersLoaded } = useFetch(
    `${API_URL}/customers`,
  );

  const calcItemNumber = (index) =>
    (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

  async function deleteCustomerHandler(customerId) {
    try {
      const response = await fetch(`${API_URL}/customers/${customerId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setFilteredCustomers((prevCustomers) =>
        removeCustomerById(prevCustomers, customerId),
      );

      toast.success("Customer delete successfully");
    } catch (error) {
      toast.error("Something is wrong please try again");
    }
  }

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
            setFilteredItems={setFilteredCustomers}
          />
        </div>
        <div className="p-2 sm:p-4 bg-white rounded-lg">
          {isCustomersLoaded && filteredCustomers?.length ? (
            <Table columns={tableColumns}>
              {currentPageCustomers.map((customer, i) => (
                <TableRowCustomer
                  key={customer.customerId}
                  number={calcItemNumber(i)}
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
          {filteredCustomers?.length ? (
            <Pagination
              items={filteredCustomers}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCurrentPageItems={setCurrentPageCustomers}
            />
          ) : null}
        </div>
      </section>
    </>
  );
}

export default CustomerList;
