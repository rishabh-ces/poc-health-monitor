# IoT Device Health Monitor POC

This project is a Proof of Concept for a Senior UI Engineer role, demonstrating a production-quality web application using Next.js, React, TypeScript, and Tailwind CSS.

## Features

-   **Real-time Dashboard**: Displays a list of IoT devices with live-updating telemetry.
-   **Server & Client Components**: Uses Next.js App Router best practices with Server Components for the initial page load and Client Components for dynamic data.
-   **Health Alerts**: Device cards highlight when telemetry data (battery, temperature) exceeds predefined thresholds.
-   **Responsive Design**: A clean, responsive UI built with Tailwind CSS.
-   **Mock API**: A mock API route simulates fetching device and telemetry data.

## Tech Stack

-   **Framework**: Next.js 14 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Testing**: Jest & React Testing Library
-   **Linting/Formatting**: ESLint & Prettier

## Architecture & Design Decisions

-   **Hybrid Component Model**: The main dashboard `page.tsx` is a Server Component to fetch the initial device list, providing a fast, non-interactive shell. The `DeviceCard.tsx` is a Client Component, allowing it to use hooks (`useState`, `useEffect`) to fetch and manage its own real-time telemetry data. This separation is key to leveraging the App Router effectively.
-   **Centralized Typing**: All data structures (`Device`, `DeviceTelemetry`) are defined in `src/lib/types.ts` to ensure type safety across the application.
-   **Scalable File Structure**: The project is organized into `components/`, `lib/`, and `app/` directories to maintain a clear separation of concerns.

---

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone [your-repo-url]
    ```
2.  Navigate to the project directory:
    ```bash
    cd iot-health-monitor
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To run the app in development mode:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Running Tests

To run the unit tests:
```bash
npm run test
```# iot-health-monitor-poc
