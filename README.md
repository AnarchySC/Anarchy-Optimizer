<div align="center">

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║    ████  █   █  ████  ████   ████ █   █ █   █                ║
║   █    █ ██  █ █    █ █   █ █     █   █  █ █                 ║
║   ██████ █ █ █ ██████ ████  █     █████   █                  ║
║   █    █ █  ██ █    █ █  █  █     █   █   █                  ║
║   █    █ █   █ █    █ █   █  ████ █   █   █                  ║
║                                                               ║
║    ████  ████  █████ █ █   █ █ █████ ███████ ████             ║
║   █    █ █   █   █   █ ██ ██ █   █   █       █   █           ║
║   █    █ ████    █   █ █ █ █ █   █   ████    ████            ║
║   █    █ █       █   █ █   █ █   █   █       █  █            ║
║    ████  █       █   █ █   █ █ █████ ███████ █   █           ║
║   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ║
║   AI-powered Enterprise IT infrastructure analyzer            ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

[![MIT](https://img.shields.io/badge/license-MIT-E85D04?style=flat-square)](LICENSE)
[![Web](https://img.shields.io/badge/platform-Web-00d4ff?style=flat-square)]()
[![React](https://img.shields.io/badge/built_with-React-FAA307?style=flat-square)]()
[![AnarchyGames](https://img.shields.io/badge/by-AnarchyGames.org-E85D04?style=flat-square)](https://anarchygames.org)

*Building things that should exist.*

</div>

---

## What It Does

Enter your enterprise IT environment details and get:
- **Overall Health Score** (0-100)
- **Quick Wins** — Low-hanging fruit you can implement fast
- **Category Analysis** — Infrastructure, Security, UX, Cost, Disaster Recovery
- **Detailed Recommendations** — Each tagged with impact & effort levels
- **Strategic Initiatives** — Long-term improvement roadmap

## Quick Start

### Option 1: Use with Vite (Recommended)

```bash
git clone https://github.com/AnarchySC/Anarchy-Optimizer.git
cd Anarchy-Optimizer
npm install
npm run dev
```

### Option 2: CodeSandbox / StackBlitz

1. Go to [codesandbox.io](https://codesandbox.io) or [stackblitz.com](https://stackblitz.com)
2. Create a new React project
3. Replace `App.jsx` with the contents of `src/App.jsx`

## How It Works

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

## Project Structure

```
Anarchy-Optimizer/
├── src/
│   └── App.jsx          # Main application component
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

<div align="center">

## Support

If Anarchy Optimizer helps your team, consider buying me a coffee.

[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support_Anarchy_Optimizer-FF5E5B?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/cassettefuture)

---

MIT License.

An [AnarchyGames.org](https://anarchygames.org) project.

</div>
