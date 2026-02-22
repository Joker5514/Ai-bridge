# AI Bridge - Uncle Vito's Casino Guide

Uncle Vito's Casino Guide is an AI-powered gambling coach application that helps users learn Blackjack and Roulette strategies in a risk-free environment.

Built with **Vite**, **React**, **TypeScript**, and **Google Gemini AI**.

## Features

- **Interactive Games:** Practice Blackjack and Roulette with realistic game logic.
- **AI Coach (Uncle Vito):** Get personalized, real-time advice and commentary from "Uncle Vito" (powered by Google Gemini AI).
- **Responsive Design:** Works on desktop and mobile.
- **Tutor Mode:** Learn while you play with instant feedback on your moves.

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS
- **AI Integration:** Google Generative AI (Gemini)
- **State Management:** Zustand (included in dependencies, though mainly React State is used)
- **Testing:** Vitest, React Testing Library

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd ai-bridge
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    - Copy `.env.example` to `.env`:
      ```bash
      cp .env.example .env
      ```
    - Add your Google Gemini API Key to `VITE_GEMINI_API_KEY`.
    - (Optional) Update `VITE_AFFILIATE_LINK` if needed.

### Running the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

Run the test suite:

```bash
npm test
```

### Linting

Check for code quality issues:

```bash
npm run lint
```

## Contributing

1.  Fork the repository.
2.  Create a feature branch.
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.

## License

This project is licensed under the MIT License.
