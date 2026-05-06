import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

// Read git log at build/dev-server start time and inject as global constants.
// Every `npm run dev` or `npm run build` auto-refreshes these values.
function buildGitLog() {
  try {
    const raw = execSync('git log --pretty=format:"%ad|%s" --date=short', { encoding: 'utf-8' })
    const log = {}
    raw.split('\n').forEach(line => {
      const sep = line.indexOf('|')
      if (sep === -1) return
      const date = line.slice(0, sep).trim()
      const msg  = line.slice(sep + 1).trim()
      if (!date || !msg) return
      if (!log[date]) log[date] = []
      log[date].push(msg)
    })
    return log
  } catch {
    return {}
  }
}

function buildLastDate() {
  try {
    return execSync(
      'git log -1 --pretty=format:"%ad" --date=format:"%B %d, %Y"',
      { encoding: 'utf-8' }
    ).trim()
  } catch {
    return 'Unknown'
  }
}

export default defineConfig({
  plugins: [react()],
  base: '/',
  define: {
    // These are replaced with real values at build/dev time — no runtime cost
    __GIT_LOG__:       JSON.stringify(buildGitLog()),
    __GIT_LAST_DATE__: JSON.stringify(buildLastDate()),
  },
})