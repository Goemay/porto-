# 🧠 Porto-Jim

**Interactive developer portfolio interface ⚡**  
Built with `React + Vite + Tailwind CSS + Framer Motion` — fast, modern, and responsive.

<p align="center">
  <a href="https://jimraihan.my.id" target="_blank">🚀 Live Demo</a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/deployments/Goemay/porto-/github-pages?label=deployment&logo=github" />
  <img src="https://img.shields.io/badge/version-2.1.0-blue" />
  <img src="https://img.shields.io/github/license/Goemay/porto-?color=success" />
  <img src="https://img.shields.io/badge/built_with-React_|_Vite_|_Tailwind-blueviolet?logo=react" />
</p>

---

## 🧩 Features

### v2.1.0 — Modern Portfolio
- 🎨 **Warm minimal aesthetic** — cream/beige palette with IBM Plex Sans typography
- 📜 **Horizontal scroll layout** — drag, wheel, or keyboard arrow keys to navigate sections
- 🖱️ **Drag-to-scroll** — click-and-drag on desktop; touch swipe on mobile
- 🗂️ **Section navigation dots** — click any dot in the footer to jump to a section
- 🌐 **Social header bar** — GitHub, LinkedIn, Email with spring-animated hover effects
- 🏝️ **Dynamic Island social button** — cycling icon (Instagram → YouTube → Twitch → Discord) that expands into a pill on hover with a liquid "oily" entrance animation and 1-second hover-out delay
- 📅 **Commit calendar widget** — hover the "Updated [date]" footer text to reveal a popup calendar showing git commit history by day/month
- 📱 **Responsive layout** — full horizontal mode on desktop (≥ 1024 px); vertical stack on mobile/tablet
- ✨ **Framer Motion animations** — spring-based card reveals, staggered icon entrances

### v1.0.4 — CLI Terminal
- 🖥️ **Matrix rain background** — animated green code waterfall
- ⌨️ **Interactive terminal shell** — full command parser with typed output effect
- 📖 **Command history** — ↑/↓ arrow key navigation through previous commands
- 🔁 **Tab autocomplete** — complete commands with a single keypress
- 💾 **LocalStorage persistence** — history saved across sessions
- 🌗 **Light/Dark theme toggle** — `theme dark` / `theme light`
- 📄 **CV download link** — `cv` command opens Jim's CV as a PDF
- 🤣 **Random programmer jokes** — `joke` command

### Both Versions
- 🔄 **Version Switcher** — dropdown in the top-right corner to toggle between v2.1.0 and v1.0.4 seamlessly
- 🚀 **GitHub Pages deployment** — `npm run deploy` auto-builds and publishes

---

## 🛠️ Tech Stack

| Category   | Tool / Library              |
|------------|-----------------------------|
| Framework  | React 18 + Vite 7           |
| Styling    | Tailwind CSS 3              |
| Animation  | Framer Motion 12            |
| Icons      | React Icons 5               |
| Scroll     | react-scroll                |
| Font       | IBM Plex Sans (Google Fonts)|
| Hosting    | GitHub Pages / jimraihan.my.id |
| Language   | JavaScript (ES6+)           |

---

## 📁 Folder Structure

```
porto-/
├─ public/
│  ├─ CNAME
│  └─ favicon.png
├─ src/
│  ├─ pages/
│  │  └─ App.jsx              ← v1.0.4 CLI Terminal
│  ├─ v2/
│  │  └─ AppV2.jsx            ← v2.1.0 Modern Portfolio
│  ├─ components/
│  │  ├─ TerminalShell.jsx    ← Interactive shell with typed output
│  │  ├─ MatrixBackground.jsx ← Animated matrix rain canvas
│  │  └─ BlinkingCursor.jsx   ← Blinking caret component
│  ├─ core/
│  │  └─ CommandParser.js     ← Command routing & output builder
│  ├─ assets/                 ← Static image assets
│  ├─ PortfolioSelector.jsx   ← Version router + switcher UI
│  ├─ main.jsx
│  ├─ index.css
│  └─ App.css
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
├─ vite.config.js             ← Git log injected at build time via define()
├─ eslint.config.js
└─ README.md
```

---

## ⚙️ Setup & Run

```bash
# 1️⃣ Clone the repo
git clone https://github.com/Goemay/porto-.git
cd porto-

# 2️⃣ Install dependencies
npm install

# 3️⃣ Start dev server
npm run dev
# Visit http://localhost:5173

# 4️⃣ Build for production
npm run build
# Output in /dist

# 5️⃣ Deploy to GitHub Pages
npm run deploy
```

---

## 🚀 Deployment

- `npm run deploy` — builds, copies `index.html` → `404.html`, and pushes to `gh-pages` branch
- [GitHub Pages](https://pages.github.com/) — live at `https://jimraihan.my.id`
- [Vercel](https://vercel.com/) / [Netlify](https://www.netlify.com/) — standard Vite SPA deploy

> **Note:** The commit calendar widget in v2.1.0 reads real git history injected by `vite.config.js` at build/dev time using `__GIT_LOG__` and `__GIT_LAST_DATE__` globals — no manual updates needed.

---

## 💻 Available Commands (v1.0.4 — CLI)

| Command                     | Description                                 |
|-----------------------------|---------------------------------------------|
| `help`                      | Show all available commands                 |
| `about`                     | Personal bio                                |
| `projects`                  | List portfolio projects                     |
| `skills`                    | Show skills & tech stack                    |
| `education`                 | Show education history                      |
| `contact`                   | Show contact links                          |
| `cv`                        | Download CV as PDF                          |
| `joke`                      | Get a random programmer joke                |
| `stack`                     | View tech stack of this project             |
| `jim`                       | Display Jim ASCII art                       |
| `theme dark / theme light`  | Toggle between dark & light mode            |
| `clear`                     | Clear the console                           |
| `shutdown`                  | Exit terminal and return to portfolio       |

---

## 🎛️ Controls (v2.1.0 — Modern)

| Interaction                    | Action                                         |
|-------------------------------|------------------------------------------------|
| Scroll wheel (desktop)        | Navigate horizontally between sections         |
| Click & drag (desktop)        | Drag the scroll area left/right                |
| Arrow keys ← →                | Scroll left/right (when canvas is focused)     |
| Touch swipe (mobile)          | Scroll vertically through stacked sections     |
| Footer navigation dots        | Jump directly to any section                   |
| Hover rotating social icon    | Expand Dynamic Island pill with all socials    |
| Hover "Updated [date]"        | Open commit calendar popup                     |
| Version button (top-right)    | Switch between v2.1.0 (Modern) & v1.0.4 (CLI) |

---

## 🖼️ Preview

> ![Porto-Jim v2.1.0](https://raw.githubusercontent.com/Goemay/porto-/main/public/preview.png)

---

## 📋 Changelog

### v2.1.0 — May 2026
- 🏝️ Added **Dynamic Island** rotating social button (Instagram, YouTube, Twitch, Discord) with liquid expand/collapse animation
- 📅 Added **commit calendar widget** — shows real git history from build-time injection
- 🔧 Optimised wheel→horizontal scroll via `requestAnimationFrame` batching
- 📱 Improved **mobile responsive layout** — fully vertical stacked mode on < 1024 px

### v2.0.7 — Earlier 2026
- Initial modern portfolio release with warm beige theme
- Horizontal drag/scroll multi-section layout
- Spring-animated cards, social header, section dot navigation

### v1.0.4
- CLI Terminal portfolio with Matrix rain background
- Full command parser, history, autocomplete, theme toggle

---

## 👨‍💻 Author

**Jim Raihan Gumay**  
💼 Junior Software Engineer | IT Support | Full-Stack Developer  
📧 [raihangumay02@gmail.com](mailto:raihangumay02@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/jim-raihan/)  
🐙 [GitHub](https://github.com/Goemay)  
🌐 [Portfolio](https://jimraihan.my.id)

---

## 📜 License

Licensed under the **MIT License**.  
Feel free to fork, remix, and build your own version — credit appreciated 💚

---

<p align="center">
  <i>"Sometimes a simple terminal says more than a thousand animations."</i>
</p>