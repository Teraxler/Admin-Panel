import { useState } from "react";
import { toast } from "sonner";
import { ITEMS_PER_PAGE } from "@/constants";
import { generateNumbers, removeItemFromList } from "@/utils/arrayUtil";
import { Pagination } from "@/components";
import { Table } from "@/components/ui";
import UserTableRow from "./UserTableRow";
import UserTableRowSkeleton from "./UserTableRowSkeleton";
import { deleteUser } from "@/features/user/userService";

const tableColumns = [
  "#",
  "Full Name",
  "Username",
  "Email",
  "Phone",
  "Birthday",
];

const removeUserById = (users, id) => removeItemFromList(users, "userId", id);

function UserTable({ users, setUsers, isUsersLoaded }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageUsers, setCurrentPageUsers] = useState([]);

  const calculateItemNumber = (index) =>
    (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

  async function handleDeleteUser(userId) {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => removeUserById(prevUsers, userId));

      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="p-2 sm:p-4 bg-white rounded-lg">
      <Table columns={tableColumns}>
        {isUsersLoaded
          ? currentPageUsers.map((user, i) => (
              <UserTableRow
                key={user.userId}
                number={calculateItemNumber(i)}
                onDelete={() => handleDeleteUser(user.userId)}
                {...user}
              />
            ))
          : generateNumbers(5, 1).map((number) => (
              <UserTableRowSkeleton key={number} />
            ))}
      </Table>
      <Pagination
        items={users}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setCurrentPageItems={setCurrentPageUsers}
      />

      {isUsersLoaded && !currentPageUsers?.length ? (
        <span className="block h-20 leading-20 text-center">
          No User Found :{"("}
        </span>
      ) : null}
    </div>
  );
}

export default UserTable;
