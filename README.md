# Feefty admin test

[Github Repository](https://github.com/Feefty/feefty-admin-test)

## Intro

A crud user manager app with nextJS prisma focusing on server actions

## Outcome




![Users](docs/outcome/list.PNG)

![Users Edit](docs/outcome/edit.png)
![toast](docs/outcome/toast.png)

## Stack

### Architecture

I structured my Next.js application using a **Ports and Adapters Architecture** (Known also as hexagonal) with three distinct layers:

  1. **Adapters:** This layer encapsulates integrations with external systems and databases. It handles data communication and provides interfaces for accessing external resources.
  2. **Ports (APIs):** This layer defines the contracts between the core application and the adapters. It acts as a boundary, ensuring loose coupling and allowing for easy switching of underlying implementations.
  3. **Use Cases (Core):** This layer contains the heart of the application logic, independent of external infrastructure. It orchestrates business rules and processes data received through the ports.

I effectively utilized Next.js's app router new features to handle client-side navigation and data fetching within the application.

The objective was to enhance code modularity by adhering to the Dependency Inversion Principle, specifically for operations like adding, creating, and deleting users. To achieve this, we introduced an adapters file dedicated to interacting with external APIs.  


#### Project Tree 
```
📦 Feefty-admin-test
├─ prisma
└─ src
   ├─ app
   │  ├─ (adapters)
   │  │  └─ userAdapter.js
   │  ├─ (ports)
   │  │  └─ (ports)
   │  │     └─ api
   │  │        ├─ activestatus
   │  │        │  └─ route.js
   │  │        ├─ user
   │  │        │  └─ route.js
   │  │        └─ users
   │  │           └─ route.js
   │  └─ (useCase)
   │     ├─ editUser
   │     │  └─ page.js
   │     └─ createUser
   │        └─ page.js
   ├─ Components
   │  ├─ Buttons
   │  │  ├─ AddButton
   │  │  └─ ...
   │  └─ icon
   │     └─ ...
   └─ lib
      └─ prisma
```


### Libraries:

  - radix-ui/themes
  - daisyui
  - react-hot-toast for toasts
  - react hook form
  - heroicons for icons

## Getting Started

First, install dependencies :

```bash
yarn
#or
yarn install
```

Create a database for your project, either locally or on a cloud provider.

> **_⚠️_** On cloud provider, you will need to create a [shadow database](https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database) manually

Create a `.env` file and setup your database connection :

```env
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

Run the prisma migration to create the database schema :

```bash
yarn prisma migrate dev
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
