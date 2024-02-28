const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createRoles() {
  let roles = [];

  const admin = await prisma.role.upsert({
    where: { slug: "admin" },
    update: {},
    create: {
      slug: "admin",
      label: "Admin",
      permissions: {
        set: ["create_user", "read_user", "update_user", "delete_user"],
      },
    },
  });
  roles.push(admin);

  const accountManager = await prisma.role.upsert({
    where: { slug: "account_manager" },
    update: {},
    create: {
      slug: "account_manager",
      label: "Account Manager",
      permissions: {
        set: ["read_user"],
      },
    },
  });
  roles.push(accountManager);

  const operations = await prisma.role.upsert({
    where: { slug: "operations" },
    update: {},
    create: {
      slug: "operations",
      label: "Operations",
      permissions: {
        set: ["create_user", "read_user", "update_user"],
      },
    },
  });
  roles.push(operations);

  const product = await prisma.role.upsert({
    where: { slug: "product" },
    update: {},
    create: {
      slug: "product",
      label: "Product",
      permissions: {
        set: ["read_user"],
      },
    },
  });
  roles.push(product);

  return roles;
}

async function createUsers() {
  let users = [];

  const cedric = await prisma.user.upsert({
    where: { email: "cedric.bailly@email.com" },
    update: {},
    create: {
      email: "cedric.bailly@email.com",
      firstName: "Cédric",
      lastName: "Bailly",
      status: "active",
      role: {
        connect: {
          slug: "admin",
        },
      },
    },
  });
  users.push(cedric);

  const leon = await prisma.user.upsert({
    where: { email: "leon.bertin@gmail.com" },
    update: {},
    create: {
      email: "leon.bertin@gmail.com",
      firstName: "Léon",
      lastName: "Bertin",
      status: "active",
      role: {
        connect: {
          slug: "operations",
        },
      },
    },
  });
  users.push(leon);

  const tom = await prisma.user.upsert({
    where: { email: "tom.bourgeois@caramail.fr" },
    update: {},
    create: {
      email: "tom.bourgeois@caramail.fr",
      firstName: "Tom",
      lastName: "Bourgeois",
      role: {
        connect: {
          slug: "product",
        },
      },
    },
  });
  users.push(tom);

  const elisa = await prisma.user.upsert({
    where: { email: "elisa.guerin@email.com" },
    update: {},
    create: {
      email: "elisa.guerin@email.com",
      firstName: "Élisa",
      lastName: "Guerin",
      role: {
        connect: {
          slug: "account_manager",
        },
      },
    },
  });
  users.push(elisa);

  return users;
}

async function main() {
  const roles = await createRoles();
  const users = await createUsers();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
