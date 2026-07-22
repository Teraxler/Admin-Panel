import { useState } from "react";
import { Link } from "react-router";
import { API_URL } from "@/constants";
import { searchUser } from "@/utils/array.util";
import { useFetch } from "@/hooks/useFetch";
import { useToastMessage } from "@/hooks/useToastMessage";
import { Head, SearchBar, Breadcrumb } from "@/components/ui";
import { UserTable } from "@/features/user";

function UserList() {
  useToastMessage();
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { data: users, isLoaded: isUsersLoaded } = useFetch(`${API_URL}/users`);

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
          <Link to={"/users/create"} className="btn btn--small btn--primary">
            <svg className="size-4">
              <use href="#plus"></use>
            </svg>
            <span className="hidden sm:inline">New User</span>
          </Link>
          <SearchBar
            items={users}
            placeholder="Search (name, username)"
            handleSearch={searchUser}
            isItemsLoaded={isUsersLoaded}
            setFilteredItems={setFilteredUsers}
          />
        </div>
        <UserTable
          users={filteredUsers}
          setUsers={setFilteredUsers}
          isUsersLoaded={isUsersLoaded}
        />
      </section>
    </>
  );
}

export default UserList;
