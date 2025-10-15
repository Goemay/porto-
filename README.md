# 🧠 Porto-Jim — Interactive Portfolio Console

**Interactive developer portfolio styled as a command-line interface ⚡**  
Built with `React + Vite + Tailwind CSS` — fast, minimal, and fun.

<p align="center">
  <a href="https://goemay.github.io/porto-jim" target="_blank">🚀 Live Demo</a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/deployments/Goemay/porto-jim/github-pages?label=deployment&logo=github" />
  <img src="https://img.shields.io/github/package-json/v/Goemay/porto-jim?color=blue" />
  <img src="https://img.shields.io/github/license/Goemay/porto-jim?color=success" />
  <img src="https://img.shields.io/badge/built_with-React_|_Vite_|_Tailwind-blueviolet?logo=react" />
</p>

---

## 🧩 Features

- 🖥️ Terminal-style interface (`help`, `about`, `skills`, `shutdown`, etc.)
- 🌗 Light/Dark theme toggle via command
- ⌨️ Autocomplete & command history
- 💾 LocalStorage persistence
- 📱 Responsive design
- 🎨 Tailwind-based minimal styling
- 🚀 Easy deploy to GitHub Pages or Vercel

---

## 🛠️ Tech Stack

| Category   | Tool / Library         |
|------------|------------------------|
| Framework  | React + Vite           |
| Styling    | Tailwind CSS           |
| Animation  | Framer Motion *(optional)* |
| Hosting    | GitHub Pages / Vercel  |
| Language   | JavaScript (ES6+)      |

---

## 📁 Folder Structure

```
porto-jim/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ TerminalShell.jsx
│  │  ├─ CommandParser.js
│  │  └─ BlinkingCursor.jsx
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ vite.config.js
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

## 💻 Available Commands

| Command                    | Description                               |
|----------------------------|-------------------------------------------|
| `help`                     | Show all available commands               |
| `about`                    | About the developer                       |
| `projects`                 | List portfolio projects                   |
| `skills`                   | Show skills & tech stack                  |
| `education`                | Show education info                       |
| `theme dark / theme light`| Toggle between dark & light mode          |
| `clear`                    | Clear the console                         |
| `shutdown`                 | Exit console and return to main portfolio |

---

## 🖼️ Preview

> ![Porto-Jim Preview](https://raw.githubusercontent.com/Goemay/porto-jim/main/public/preview.png)

---

## 👨‍💻 Author

**Jim Raihan Gumay**  
💼 IT Enthusiast | Full-Stack Developer  
📧 [raihangumay02@gmail.com](mailto:raihangumay02@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/jim-raihan)  
🐙 [GitHub](https://github.com/Goemay)

---

## 📜 License

Licensed under the **MIT License**.  
Feel free to fork, remix, and build your own version — credit appreciated 💚

---

<p align="center">
  <i>“Sometimes a simple terminal says more than a thousand animations.”</i>
</p>