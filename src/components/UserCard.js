import EditIcon from "@/components/icons/EditIcon";
import Link from "next/link";
import { Box } from "@radix-ui/themes";
import UserStatusSwitch from "./UserStatusSwitch";

const UserCard = ({ user }) => {
  return (
    <Box className="w-full flex space-x-4 border-b border-custom-border justify-center items-center p-2 relative ">
      <UserStatusSwitch user={user} />

      <div className="flex-grow justify-start">
        <h4 className="gray-900-color block mt-4 font-medium">
          {user.firstName} {user.lastName}
        </h4>{" "}
        <h4 className="text-gray-500 block">{user.email}</h4>
      </div>

      <Box className="items-center">
        <Link href={`/editUser/${user.id}`}>
          <div className="badge badge-outline badge-lg w-11 h-11 rounded-full border-blue-700">
            {" "}
            <EditIcon />
          </div>
        </Link>
      </Box>
    </Box>
  );
};

export default UserCard;
