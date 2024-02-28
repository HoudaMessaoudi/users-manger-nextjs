import AddButton from "@/components/Buttons/AddButton";
import UsersList from "@/components/UsersList";
import Footer from "@/components/Footer";
import { Text } from "@radix-ui/themes";
import Nav from "@/components/Navbr";
import { prisma } from "@/lib/prisma";

/**
 * page file are rendered on the server and can access prisma directly
 * @returns
 */

export default async function Home() {
  const users = await getUsers();

  return (
    <main className="w-full my-2 space-y-4 ">
      <Nav />
      <div className="mx-4 flex justify-between" >
        <Text size="3" weight="bold" data-testid="usersListTest">
          Users
        </Text>
        <AddButton />
      </div>
      <div className="bg-white drop-shadow-lg p-4">
        <UsersList users={users} />
      </div>
      <Footer />
    </main>
  );
}

const getUsers = async () => {
  return await prisma.user.findMany();
};
