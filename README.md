# NestJS Prisma SaaS Boilerplate

A professional, enterprise-grade **Multi-tenant SaaS Boilerplate** built with **NestJS**, **Prisma**, and **PostgreSQL**. Designed specifically for complex systems like IATA accounting, focusing on scalability, security, and clean architecture.

## Features

- **Multi-tenancy**: Shared database with row-level isolation using `tenantId`.
- **RBAC (Role-Based Access Control)**: Built-in Roles and Permissions management.
- **Subscription Management**: Pre-configured plans and billing logic.
- **Prisma 7 Ready**: Professional database setup with custom directory (`src/database`).
- **JWT Authentication**: Secure login/registration with `bcrypt` password hashing.
- **Swagger UI**: Automated API documentation available at `/docs`.
- **Modular Architecture**: Clean separation of concerns with a dedicated `CoreModule`.
- **Docker Support**: Ready for containerized development.

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com)
- **ORM**: [Prisma](https://prisma.io)
- **Database**: [PostgreSQL](https://postgresql.org)
- **Validation**: [Class-validator](https://github.com)
- **Security**: Passport-JWT, Bcrypt
- **Package Manager**: [pnpm](https://pnpm.io)

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com
cd nest-prisma-boilerplate
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add your configuration (see `.env.example`):
```bash
cp .env.example .env
```

### 4. Database Setup (Prisma)
Generate the Prisma Client, run migrations, and seed the initial data:
```bash
pnpm db:setup
```

### 5. Run the application
```bash
# Development mode
pnpm start:dev

# Production mode
pnpm start:prod
```

---

## 📁 Project Structure

```text
src/
├── config/             # Configuration service & env validation
├── database/           # Prisma schema, migrations, and seeds
│   ├── seeds/          # Modular seed files
│   └── schema.prisma   # Single source of truth for DB
├── modules/
│   └── core/           # Auth, User, Tenant & Subscription logic
├── main.ts             # Entry point with CORS & Swagger setup
└── app.module.ts       # Root module
```

---

## 📜 Available Scripts


| Script | Description |
| :--- | :--- |
| `pnpm start:dev` | Runs the app in watch mode for development |
| `pnpm prisma:generate` | Generates the Prisma Client |
| `pnpm prisma:migrate` | Runs database migrations |
| `pnpm prisma:seed` | Seeds the database with initial data |
| `pnpm db:setup` | One-click Generate + Migrate + Seed |
| `pnpm prisma:studio` | Opens Prisma GUI to view your data |

---

## 🛡️ Security
This boilerplate uses **Bcrypt** for hashing sensitive data and **Passport-JWT** for securing API endpoints. To protect a route, simply use the `@UseGuards(JwtAuthGuard)` decorator.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com).

## 📄 License
This project is [MIT](LICENSE) licensed.
