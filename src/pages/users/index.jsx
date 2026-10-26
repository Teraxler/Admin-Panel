import Link from "next/link";
import { useState } from "react";
import { searchUser } from "@/utils/searchUtil";
import { SearchBar } from "@/components";
import { Head, Breadcrumb } from "@/components/ui";
import { UserTable } from "@/features/user/components";
import { getAllUsers } from "@/features/user/userService";
import { useFetch } from "@/hooks/useFetch";
import { useStorageContext } from "@/context/StorageContext";

function UserListPage() {
  const storageContext = useStorageContext();

  const { data: users, status } = useFetch({
    fn: async () => await getAllUsers(storageContext),
    dependencies: [],
  });

  const [filteredUsers, setFilteredUsers] = useState([]);

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
          <Link
            aria-label="New User"
            href={"/users/create"}
            className="btn btn--small btn--primary"
          >
            <svg className="size-4">
              <use href="#plus"></use>
            </svg>
            <span className="hidden sm:inline">New User</span>
          </Link>
          <SearchBar
            items={users}
            placeholder="Search (name, username)"
            handleSearch={searchUser}
            isItemsLoaded={status === "success"}
            setFilteredItems={setFilteredUsers}
          />
        </div>
        <UserTable
          users={filteredUsers}
          setUsers={setFilteredUsers}
          isUsersLoaded={status === "success"}
        />
      </section>
    </>
  );
}

export default UserListPage;
