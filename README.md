IoT Device Health Monitor (POC)

A production-quality dashboard for monitoring IoT devices, built with Next.js, TypeScript, and Tailwind CSS. This project serves as a Proof of Concept to demonstrate best practices in modern front-end development, architecture, and testing.

📸 Preview

A snapshot of the main dashboard, showcasing the device cards, real-time telemetry updates, and alert states.

✨ Key Features

    Real-time Telemetry: Each device card independently polls for and displays live data (battery, temperature, connectivity) from a mock API.

    Dynamic Health Alerts: The UI provides immediate visual feedback (a red ring alert) when a device's telemetry crosses critical thresholds.

    Server-Side Rendering (SSR) & Suspense: The initial page shell is rendered on the server for a fast first-load experience, with skeleton loaders providing an elegant loading state.

    Dynamic Routing: A dedicated detail page for each device, accessible via a unique URL (/devices/[id]).

    Responsive & Themed Design: A mobile-first, responsive interface with a clean aesthetic and full support for dark mode.

    Component-Driven UI: Built with reusable and isolated components, documented and tested with Storybook.

🛠️ Tech Stack & Rationale

Technology Rationale
Next.js (App Router) Chosen for its hybrid rendering capabilities (Server & Client Components), file-based routing, and performance optimizations (font, image). The App Router is the modern standard for building scalable React applications.
React & TypeScript React's component model is ideal for building a modular UI. TypeScript ensures type safety, reducing bugs and improving maintainability, which is critical for a production-quality application.
Tailwind CSS A utility-first CSS framework that allows for rapid, consistent styling directly in the markup. The design system is formalized in tailwind.config.ts for consistency.
Jest & RTL Jest provides a robust testing framework, while React Testing Library (RTL) encourages testing components based on user interaction rather than implementation details, leading to more resilient tests.
Cypress Used for End-to-End (E2E) testing to simulate real user flows, such as page loading and navigation, ensuring the application works as a whole.
Storybook Essential for component-driven development. It allows for building, viewing, and testing UI components in isolation, improving reusability and speeding up development.
ESLint & Prettier Enforces a consistent code style and catches potential errors early, ensuring high code quality and readability across the project.

🏛️ Architecture and Design Decisions

This project was architected to be modular, scalable, and easy to maintain, reflecting best practices for a senior-level engineer.

Project Structure

The project uses a feature-oriented file structure for clear separation of concerns:

src/
├── app/ # Next.js App Router (Pages & API routes)
│ ├── devices/
│ │ └── [id]/ # Dynamic route for device details
│ └── api/ # API routes for mock data
├── components/ # Reusable React components (e.g., DeviceCard)
├── hooks/ # Custom React hooks (e.g., useTelemetry)
├── lib/ # Shared utilities, types, and constants
├── services/ # Centralized API logic (e.g., deviceAPI.ts)
└── stories/ # Storybook files for component documentation

Component Model: Server vs. Client

    The core architectural decision was to leverage Next.js's hybrid component model.

    Server Components (/app/page.tsx, /app/devices/[id]/page.tsx): Used for pages that fetch initial data and don't require user interactivity. This results in a faster initial page load and better SEO, as the page is pre-rendered on the server.

    Client Components (DeviceCard.tsx): Used for components that require state, lifecycle effects (useEffect), and user interaction. The DeviceCard is a perfect example, as each card manages its own real-time data polling and interactive hover states.

State Management

For this POC, global state management libraries like Redux or Zustand were intentionally avoided.

    Local State via Custom Hooks: The real-time telemetry is local to each DeviceCard. A custom useTelemetry hook was created to encapsulate the logic for fetching, loading, and error states for a single device. This avoids unnecessary complexity and keeps state co-located with the component that uses it.

Data Flow

    The main page (page.tsx) is a Server Component that uses Suspense to show a skeleton UI.

    It renders the DeviceGrid Server Component, which fetches the initial list of all devices.

    The DeviceGrid maps over the list and renders multiple DeviceCard Client Components.

    Each DeviceCard then uses the useTelemetry hook on the client-side to poll its own unique telemetry data from a Next.js API route.

🧪 Testing Strategy

The testing strategy is designed to provide confidence at multiple levels:

    Unit Tests (Jest & RTL):

        Hooks: The useTelemetry hook is tested in isolation to verify its logic for handling loading, success, and error states.

        Utilities: Any utility functions are tested to ensure they are reliable.

        Components: Simple, presentational components like StatusBadge are tested to ensure they render correctly based on their props.

    End-to-End Tests (Cypress):

        Critical User Flows: Cypress tests simulate a user's entire journey.

        Loading State: Verifies that skeleton loaders are shown on initial page load.

        Navigation: Ensures that clicking on a device card correctly navigates the user to the corresponding detail page.

🚀 Local Development

Follow these steps to get the project running on your local machine.

Prerequisites

    Node.js (v18 or later)

    npm or yarn

Installation & Setup

    Clone the Repository
    Bash

git clone [your-repo-url]
cd iot-health-monitor-poc

Install Dependencies
Bash

    npm install

    Set Up Environment Variables
    Create a .env.local file in the root of the project and add the following:

    NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

Running the Application

    Run the Development Server:
    Bash

npm run dev

Open http://localhost:3000 to view the application.

Run Unit Tests:
Bash

npm run test

Run E2E Tests:
Bash

npm run cypress:open

Run Storybook:
Bash

npm run storybook

Open http://localhost:6006 to view the component library.
