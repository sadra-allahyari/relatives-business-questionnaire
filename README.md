# Relatives Business Questionnare

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## Table of Contents

- [About](#about)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [License](#license)
- [Contact](#contact)

---

## About

This repository contains a modern React application built using Next.js with TypeScript, React Hook Form, Zod for validation, and styled with Tailwind CSS along with [shadcn/ui](https://ui.shadcn.com/) components.

The main purpose of this repo is to provide a flexible, accessible, and scalable form handling architecture with rich UI components, integrated with custom validation schemas and theming support.

---

## Technologies

- **[Next.js](https://nextjs.org/)** – React framework for server-side rendering and static site generation.
- **[React](https://reactjs.org/)** – JavaScript library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)** – Typed JavaScript superset for better developer experience.
- **[React Hook Form](https://react-hook-form.com/)** – Simple and performant form management library.
- **[Zod](https://zod.dev/)** – Type-safe schema validation with great TypeScript integration.
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework.
- **[Tailwind Merge (twMerge)](https://github.com/dcastil/tailwind-merge)** – To intelligently merge Tailwind CSS classes.
- **[clsx](https://github.com/lukeed/clsx)** – ClassName utility for conditional class joining.
- **[shadcn/ui](https://ui.shadcn.com/)** – Accessible and customizable React UI components built on Radix UI and Tailwind CSS.
- **[Next Themes](https://github.com/pacocoursey/next-themes)** – Theme management for Next.js (dark mode support).
- **[Lucide React](https://lucide.dev/)** – Icon library for React.

_Additional integrations and custom utilities are included for smooth development and scalability._

---

## Getting Started

### Prerequisites

- Node.js v18+ recommended
- [pnpm](https://pnpm.io/) package manager installed globally

### Installation

Clone the repository:

```bash
git clone git@github.com:sadra-allahyari/relatives-business-questionnaire.git

cd relatives-business-questionnaire
```

Install dependencies using pnpm:

```bash
pnpm install
```

### Running the Project

To run the development server:

```bash
pnpm dev
```

Open http://localhost:3000 in your browser to view the app.

### Building for Production

To build the project for production:

```bash
pnpm build
```

To start the production server locally:

```bash
pnpm start
```

## Folder Structure

```bash
/src
  /app              # Next.js page components
  /components       # Reusable UI components
  /lib              # Utility functions and hooks
```

## Data Storage

The submitted form data is stored directly in a **Google Sheet** using a **Google Apps Script webhook**. When the form is submitted, the data is sent via a POST request to a Google Apps Script web app URL. This script handles appending the received data to the designated Google Sheet, enabling easy data collection and management without the need for a dedicated backend database.

This approach offers a simple, scalable, and serverless solution for storing form submissions securely and efficiently.

## License

This project is licensed under the MIT License. See the [LICENSE](https://mit-license.org/) file for details.

## Contact

Created by Your Sadra Allahyari – feel free to reach out!

## Acknowledgments

- Thanks to the [shadcn/ui](https://ui.shadcn.com/) team for amazing UI components.

- Inspired by [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html) for clean, maintainable code.

- Utilizes [Zod](https://zod.dev/) for robust runtime validation.
