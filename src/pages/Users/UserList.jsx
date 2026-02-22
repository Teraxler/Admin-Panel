import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { API_URL, ITEMS_PER_PAGE } from "@/constants";
import { removeItemFromList, searchUser } from "@/utils/array.util";
import { useFetch } from "@/hooks/useFetch";
import { useToastMessage } from "@/hooks/useToastMessage";
import Head from "@/components/common/Head";
import Table from "@/components/Table/Table";
import SearchBar from "@/components/SearchBar";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination/Pagination";
import TableRowUser from "@/components/Table/TableRowUser";

const tableColumns = [
  "#",
  "Full Name",
  "Username",
  "Email",
  "Phone",
  "Birthday",
  "",
];

const removeUserById = (users, id) => removeItemFromList(users, "userId", id);

function UserList() {
  useToastMessage();

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPageUsers, setCurrentPageUsers] = useState([]);

  const { data: users, isLoaded: isUsersLoaded } = useFetch(`${API_URL}/users`);

  const calcItemNumber = (index) =>
    (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

  async function deleteUserHandler(userId) {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setFilteredUsers((prevUsers) => removeUserById(prevUsers, userId));

      toast.success("User delete successfully");
    } catch (error) {
      toast.error("Something is wrong please try again");
    }
  }

  return (
    <>
      <Head>
        <title>Admin Panel - Users</title>
      </Head>
      <div>
        <h1 className="title">Users</h1>
        <Breadcrumb />
      </div>
      <section className="mt-8">
        <div className="flex justify-between mb-4">
          <Link to={"create"} className="btn btn--small btn--primary">
            <svg className="size-4">
              <use href="#plus"></use>
            </svg>
            <span className="hidden sm:inline">New User</span>
          </Link>
          <SearchBar
            items={users}
            placeholder="Search (name, username)"
            searchHandler={searchUser}
            isItemsLoaded={isUsersLoaded}
            setFilteredItems={setFilteredUsers}
          />
        </div>
        <div className="p-2 sm:p-4 bg-white rounded-lg">
          {isUsersLoaded && filteredUsers?.length ? (
            <Table columns={tableColumns}>
              {currentPageUsers.map((user, i) => (
                <TableRowUser
                  key={user.userId}
                  number={calcItemNumber(i)}
                  onDelete={() => deleteUserHandler(user.userId)}
                  {...user}
                />
              ))}
            </Table>
          ) : (
            <span className="block h-20 leading-20 text-center">
              No User Found :{"("}
            </span>
          )}
          {filteredUsers?.length ? (
            <Pagination
              items={filteredUsers}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCurrentPageItems={setCurrentPageUsers}
            />
          ) : null}
        </div>
      </section>
    </>
  );
}

export default UserList;
