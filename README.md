# 🧠 Porto-Jim

**Interactive developer portfolio interface ⚡**  
Built with `React + Vite + Tailwind CSS + Framer Motion` — fast, modern, and responsive.

<p align="center">
  <a href="https://goemay.github.io/porto-" target="_blank">🚀 Live Demo</a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/deployments/Goemay/porto-/github-pages?label=deployment&logo=github" />
  <img src="https://img.shields.io/github/package-json/v/Goemay/porto-?color=blue" />
  <img src="https://img.shields.io/github/license/Goemay/porto-?color=success" />
  <img src="https://img.shields.io/badge/built_with-React_|_Vite_|_Tailwind-blueviolet?logo=react" />
</p>

---

## 🧩 Features

- 🎨 **Dual Portfolio Versions** — v2.0.7 (Modern) & v1.0.4 (CLI Terminal)
- 🔄 **Version Switcher** — Toggle between versions seamlessly
- 📱 **Responsive Design** — Works perfectly on desktop and mobile
- 🎯 **Horizontal Scroll Mode** — Enable/disable side-by-side section scrolling
- ✨ **Smooth Animations** — Framer Motion for fluid transitions
- 🖥️ Terminal-style interface with commands (`help`, `about`, `skills`, etc.)
- 🌗 Light/Dark theme toggle
- ⌨️ Autocomplete & command history
- 💾 LocalStorage persistence
- 📊 Interactive CV & project showcase
- 🚀 Fast deployment to GitHub Pages  

---

## 🛠️ Tech Stack

| Category   | Tool / Library         |
|------------|------------------------|
| Framework  | React + Vite           |
| Styling    | Tailwind CSS           |
| Animation  | Framer Motion          |
| Hosting    | GitHub Pages / Vercel  |
| Language   | JavaScript (ES6+)      |

---

## 📁 Folder Structure

```
porto-/
├─ public/
│  └─ CNAME
├─ src/
│  ├─ pages/
│  │  └─ App.jsx (v1.0.4 - CLI Terminal)
│  ├─ v2/
│  │  └─ AppV2.jsx (v2.0.7 - Modern Portfolio)
│  ├─ components/
│  │  ├─ TerminalShell.jsx
│  │  ├─ MatrixBackground.jsx
│  │  └─ BlinkingCursor.jsx
│  ├─ core/
│  │  └─ CommandParser.js
│  ├─ PortfolioSelector.jsx (Version Router)
│  ├─ main.jsx
│  ├─ index.css
│  └─ App.css
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
├─ vite.config.js
├─ eslint.config.js
└─ README.md
```

---

## ⚙️ Setup & Run

```bash
# 1️⃣ Clone the repo
git clone https://github.com/Goemay/porto-jim.git
cd porto-jim

# 2️⃣ Install dependencies
npm install

# 3️⃣ Start dev server
npm run dev
# Visit http://localhost:5173

# 4️⃣ Build for production
npm run build
# Output in /dist
```

---

## 🚀 Deployment

You can deploy using:

- `npm run deploy` *(if using gh-pages)*
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

---

## 💻 Available Commands (v1.0.4)

| Command                    | Description                               |
|----------------------------|-------------------------------------------|
| `help`                     | Show all available commands               |
| `about`                    | About the developer                       |
| `projects`                 | List portfolio projects                   |
| `skills`                   | Show skills & tech stack                  |
| `education`                | Show education info                       |
| `theme dark / theme light` | Toggle between dark & light mode          |
| `clear`                    | Clear the console                         |
| `stack`                    | View tech stack                           |
| `shutdown`                 | Exit console and return to portfolio      |

---

## 🎛️ Controls (v2.0.7)

- **Enable/Disable Horizontal** — Toggle side-by-side section scrolling
- **Version Button (Top-Right)** — Switch between v2.0.7 (Modern) and v1.0.4 (CLI)
- Responsive layout that adapts to all screen sizes
---

## 🖼️ Preview

> ![Porto-Jim Preview](https://raw.githubusercontent.com/Goemay/porto-jim/main/public/preview.png)

---

## 👨‍💻 Author

**Jim Raihan Gumay**  
💼 Full-Stack Developer | AI Enthusiast  
📧 [raihangumay02@gmail.com](mailto:raihangumay02@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/jim-raihan)  
🐙 [GitHub](https://github.com/Goemay)  
🌐 [Portfolio](https://jimraihan.my.id)

---

## 📜 License

Licensed under the **MIT License**.  
Feel free to fork, remix, and build your own version — credit appreciated 💚

---

<p align="center">
  <i>“Sometimes a simple terminal says more than a thousand animations.”</i>
</p>