# 🔥 Anarchy Optimizer

AI-powered Enterprise IT infrastructure analyzer that provides actionable optimization recommendations.

![Anarchy Optimizer](https://img.shields.io/badge/AI-Powered-ff0064) ![React](https://img.shields.io/badge/React-18-61dafb) ![Claude](https://img.shields.io/badge/Claude-API-orange)

## What it does

Enter your enterprise IT environment details and get:
- **Overall Health Score** (0-100)
- **Quick Wins** — Low-hanging fruit you can implement fast
- **Category Analysis** — Infrastructure, Security, UX, Cost, Disaster Recovery
- **Detailed Recommendations** — Each tagged with impact & effort levels
- **Strategic Initiatives** — Long-term improvement roadmap

## Quick Start

### Option 1: Use with Vite (Recommended)

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/anarchy-optimizer.git
cd anarchy-optimizer

# Install dependencies
npm install

# Run dev server
npm run dev
```

### Option 2: CodeSandbox / StackBlitz

1. Go to [codesandbox.io](https://codesandbox.io) or [stackblitz.com](https://stackblitz.com)
2. Create a new React project
3. Replace `App.jsx` with the contents of `src/App.jsx`
4. Done!

## Project Structure

```
anarchy-optimizer/
├── src/
│   └── App.jsx          # Main application component
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## How it Works

The app collects information about your IT environment across four categories:
1. **Infrastructure** — Server count, types, versions
2. **Users** — User count, locations, distribution
3. **Applications** — Apps in use, tech stack
4. **Security** — Auth methods, security posture

This data is sent to the Claude API, which analyzes the environment and returns structured recommendations based on industry best practices.

## Requirements

- The app uses the Anthropic Claude API
- Works in Claude.ai artifacts (no API key needed)
- For standalone deployment, you'll need to add API key handling

## Customization

- **Colors**: Edit the gradient values in the header section
- **Categories**: Modify the analysis prompt to add/remove evaluation categories
- **Branding**: Update the title and tagline in the header

## License

MIT

---

Built with 🔥 and Claude AI
