# 🌐 fluffy-mantine-pos

**fluffy-mantine-pos** is a web-based Point of Sale (POS) application built using Next.js and Mantine. Designed for a sleek and intuitive user experience, Fluffy Web POS helps businesses manage sales, customers, and inventory all from the convenience of the web.

## 🎯 Key Features

- 💻 **Web-Based POS**: Seamless management of sales from any browser.
- 🛒 **Inventory & Sales Tracking**: Efficiently track stock and sales.
- 📦 **Modular Components**: Built with Mantine's powerful and flexible component library.
- 🌈 **Dark Mode Support**: Integrated dark mode with Storybook for component development.
- 🔄 **Infinite Scrolling**: Easily browse through large data sets with infinite scroll.

## 🛠️ Technologies Used

- **Next.js**: Framework for React with server-side rendering and static site generation.
- **Mantine**: Component library for React with fully responsive and customizable UI elements.
- **Apollo Client**: For managing GraphQL data and queries.
- **Firebase**: Backend service for real-time data synchronization and authentication.

## 🚀 Getting Started

Follow these steps to get the Fluffy Web POS app up and running.

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/fluffy-web-pos.git
cd fluffy-web-pos
```

### 2. Install Dependencies

Install all the project dependencies using:

```bash
npm install
```

### 3. Run the App in Development Mode

To start the development server, run:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### 4. Build the App for Production

To build the app for production:

```bash
npm run build
```

### 5. Run Tests

Make sure all tests are passing:

```bash
npm run test
```

## ⚙️ Environment Variables

To configure your environment variables, create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_API_URL=https://api.example.com
FIREBASE_API_KEY=your-firebase-api-key
```

## 🧩 Project Structure

```bash
├── components     # Reusable UI components
├── pages          # Next.js page routes
├── styles         # Global and component-specific styles
├── hooks          # Custom React hooks
└── lib            # Utilities and API calls
```

## 🛠️ Available Scripts

- **Development**: `npm run dev` – Start the development server.
- **Build**: `npm run build` – Build the app for production.
- **Start**: `npm run start` – Start the production server.
- **Lint**: `npm run lint` – Check for code quality issues.
- **Test**: `npm run test` – Run all test cases.
- **Storybook**: `npm run storybook` – Launch Storybook to visualize components.

## 🧪 Storybook

Fluffy Web POS is integrated with Storybook for UI development. You can launch Storybook using:

```bash
npm run storybook
```

Storybook provides a live preview of your components and supports **dark mode**.

## 📄 License

This project is licensed under the MIT License.
