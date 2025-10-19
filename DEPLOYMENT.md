# 🚀 Mock Messenger App - Deployment Anleitung

Diese Anleitung zeigt dir, wie du die App kostenlos hostest, damit du **echten Fullscreen** (ohne Browser-UI) bekommst.

---

## 📦 Option 1: Vercel (EMPFOHLEN - am einfachsten)

### Vorbereitung:
1. **GitHub Account erstellen** (falls nicht vorhanden): https://github.com/signup
2. **Vercel Account erstellen**: https://vercel.com/signup
   - Mit GitHub anmelden

### Deployment Schritte:

#### A) Via Vercel CLI (Schnellste Methode):

1. **Node.js installieren** (falls nicht vorhanden): https://nodejs.org/

2. **Terminal/CMD öffnen** und alle Dateien in einen Ordner kopieren

3. **Vercel CLI installieren**:
```bash
npm install -g vercel
```

4. **In deinen Projekt-Ordner navigieren**:
```bash
cd pfad/zu/deinem/projekt
```

5. **Bei Vercel anmelden**:
```bash
vercel login
```

6. **App deployen**:
```bash
vercel
```
   - Fragen mit Enter bestätigen
   - Framework: "Vite" auswählen
   - Build Command: `npm run build`
   - Output Directory: `dist`

7. **Fertig!** Du bekommst eine URL wie: `https://dein-projekt.vercel.app`

#### B) Via Vercel Dashboard (Mit Git):

1. **GitHub Repository erstellen**:
   - Gehe zu https://github.com/new
   - Name: z.B. "mock-messenger"
   - Public oder Private
   - "Create repository"

2. **Code zu GitHub pushen**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/dein-username/mock-messenger.git
git push -u origin main
```

3. **Vercel mit GitHub verbinden**:
   - Gehe zu https://vercel.com/new
   - "Import Git Repository"
   - Wähle dein Repository
   - Framework Preset: "Vite"
   - Deploy klicken

4. **Fertig!** Automatische Deployments bei jedem Git Push!

---

## 📦 Option 2: Netlify

### Via Netlify Drop (Drag & Drop):

1. **Account erstellen**: https://app.netlify.com/signup

2. **Build erstellen** (lokal):
```bash
npm install
npm run build
```

3. **Zu Netlify gehen**: https://app.netlify.com/drop

4. **`dist` Ordner per Drag & Drop** auf die Seite ziehen

5. **Fertig!** URL wie: `https://random-name.netlify.app`

### Via Netlify CLI:

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

---

## 📦 Option 3: GitHub Pages (Kostenlos, aber etwas komplizierter)

1. **GitHub Repository erstellen** (siehe oben)

2. **`vite.config.ts` erstellen** (falls nicht vorhanden):
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mock-messenger/', // Dein Repository-Name
})
```

3. **GitHub Actions Workflow erstellen** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

4. **Repository Settings**:
   - Settings → Pages
   - Source: "gh-pages" branch
   - Save

5. **URL**: `https://dein-username.github.io/mock-messenger/`

---

## 📱 Nach dem Deployment: PWA Installation

### Android:

1. **App-URL öffnen** in Chrome
2. **Chrome Menü (⋮)** → "App installieren" oder "Zum Startbildschirm hinzufügen"
3. **Vom Home-Screen öffnen** → **ECHTER FULLSCREEN! 🎉**

### iOS:

1. **App-URL öffnen** in Safari
2. **Teilen-Button** → "Zum Home-Bildschirm"
3. **Vom Home-Screen öffnen** → Fullscreen ohne Browser-UI

---

## 🔧 Benötigte Dateien (bereits vorhanden)

✅ `manifest.json` - PWA Konfiguration  
✅ `sw.js` - Service Worker für Offline-Funktionalität  
✅ `index.html` - Entry Point  
✅ Alle React-Komponenten  

---

## ⚡ Quick Start (Schnellste Methode):

### 1-Minuten Deployment mit Vercel:

```bash
# 1. Vercel installieren
npm install -g vercel

# 2. In Projekt-Ordner gehen
cd dein-projekt

# 3. Deployen
vercel --prod
```

**Das war's!** Du bekommst sofort eine URL! 🚀

---

## 🎬 Nutzung für Filmaufnahmen:

Nach Deployment + PWA Installation:

1. ✅ **Keine Browser-UI** (Adressleiste, Buttons, etc.)
2. ✅ **Echter Fullscreen** auf iOS & Android
3. ✅ **Offline funktionsfähig** (Service Worker)
4. ✅ **Sieht aus wie echte App**
5. ✅ **Perfekt für Dreharbeiten** 🎥

---

## 💡 Tipps:

- **Custom Domain**: Bei Vercel/Netlify kannst du kostenlos eine eigene Domain verbinden
- **HTTPS**: Automatisch aktiviert (notwendig für PWA)
- **Updates**: Einfach neu deployen, PWA aktualisiert sich automatisch
- **Analytics**: Vercel/Netlify bieten kostenloses Analytics

---

## 🆘 Hilfe benötigt?

Probleme beim Deployment? Sag mir:
- Welche Methode du nutzt
- Welche Fehlermeldung du bekommst
- Dein Betriebssystem

Ich helfe dir Schritt für Schritt! 🚀
