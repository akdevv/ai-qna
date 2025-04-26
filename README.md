# AI Quiz App

A modern quiz application powered by Groq's AI model that generates questions based on user-selected topics and difficulty levels. Users can choose from various topics like science, technology, history, Marvel, Harry Potter, and more.

## Features

- Dynamic quiz generation using Groq's AI model
- Multiple topic selection
- Adjustable difficulty levels
- Real-time question generation
- Modern and responsive UI

## Tools and Technologies

- **Framework**: Next.js
- **Language**: TypeScript
- **Package Manager**: pnpm
- **UI Components**: Shadcn
- **Styling**: Tailwind CSS
- **AI Model**: Groq (gemma2-9b-it)

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- pnpm package manager
- Groq API key

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a Groq account and get your API key:
   - Visit [Groq](https://groq.com/)
   - Sign up for an account
   - Get your API key from the dashboard

4. Create a `.env.local` file in the root directory and add your API key:
```bash
GROQ_API_KEY=<your-api-key>
```

5. Run the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

The project uses Next.js App Router and follows the standard Next.js project structure. The main application code is in the `app` directory.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [Groq Documentation](https://groq.com/)

## License

This project is licensed under the MIT License.
