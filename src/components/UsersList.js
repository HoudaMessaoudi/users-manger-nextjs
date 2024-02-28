// We are retrieving data directly from the server.
// We don't user useEffect / useState
// we can remove use client to use this component as a server component

import UserCard from "@/components/UserCard"; // Make sure the path is correct
const UsersList = ({ users }) => {
  if (!users || users.length === 0)
    return (
      <div className="bg-white drop-shadow-lg py-6 px-4 xs:rounded-xl">
        <p className="text-center text-gray-600 font-medium">Oh well...</p>
        <p className="text-center text-gray-600 font-normal">
          Looks like there are no users here yet.
          <br />
          Add a new user to see it here!
        </p>
      </div>
    );

  return (
    <div className="w-full p-0 m-0">
      {users.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
};

export default UsersList;
