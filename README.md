# 📱 Mock Messenger - Film Production App

Eine vollständig offline-fähige Mock-Messenger-App speziell für Filmaufnahmen. Sieht aus wie WhatsApp/iMessage, läuft aber komplett eigenständig ohne echte Nachrichten zu senden.

## ✨ Features

- 🎬 **Film-Modus** - Optimiert für professionelle Aufnahmen
- 📱 **Vollständig offline** - Keine Internet-Verbindung nötig
- 🌓 **Dark/Light Mode** - Wechsle zwischen hellen und dunklen Themes
- ⏱️ **Timer-basierte Nachrichten** - Automatisch erscheinende Fake-Nachrichten
- 🔧 **Anpassbare Statusleiste** - Uhrzeit, Akku, WLAN individuell einstellbar
- 🕵️ **Debug-Panel** - Verstecktes 3-Finger-Tap Panel für Einstellungen
- 💬 **Realistische Chat-UI** - Sieht aus wie echte Messenger-Apps
- 🔒 **100% privat** - Keine Daten werden gesendet oder gespeichert
- 📲 **PWA-fähig** - Als App installierbar für echten Fullscreen

## 🎥 Perfekt für:

- Film- und Videoaufnahmen
- Social Media Content
- Tutorials und Demos
- Mockups und Präsentationen
- Theater und Bühnenproduktionen

## 🚀 Quick Start

### Lokal ausführen:

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Im Browser öffnen
# → http://localhost:5173
```

### Für Produktion bauen:

```bash
npm run build
```

## 📦 Deployment

Siehe **[DEPLOYMENT.md](./DEPLOYMENT.md)** für detaillierte Anleitungen zum Hosten auf:

- ✅ **Vercel** (empfohlen - am einfachsten)
- ✅ **Netlify** (ebenfalls sehr einfach)
- ✅ **GitHub Pages** (kostenlos)

**Nach Deployment**: Als PWA auf dem Smartphone installieren für **echten Fullscreen** ohne Browser-UI!

## 🎬 Nutzung für Filmaufnahmen

### 1. Film-Modus aktivieren
- Tippe auf den **grünen Kamera-Button** rechts unten
- App optimiert sich für Aufnahmen
- Button wird rot und pulsiert

### 2. Einstellungen anpassen
- **3-Finger-Tap** öffnet Debug-Panel
- Passe Statusleiste an (Uhrzeit, Akku, etc.)
- Füge Kontakte hinzu
- Erstelle getimte Nachrichten

### 3. Aufnahme starten
- Nach PWA-Installation: **Echter Fullscreen**
- Ohne Installation: Scrolle runter, Chrome-Leiste minimiert sich
- "FILM-MODUS AKTIV" Indikator zeigt aktiven Aufnahme-Modus

## 🎛️ Features im Detail

### Debug-Panel (3-Finger-Tap)
- **Kontakte verwalten**: Namen, Profilbilder, Status
- **Nachrichten erstellen**: Mit Timer und Trigger-Bedingungen
- **Statusleiste anpassen**: Uhrzeit, Akku, WLAN, Mobilnetz
- **Dark/Light Mode**: Zwischen Themes wechseln
- **System-Status**: Vollständige Kontrolle über Mock-Daten

### Timer-basierte Nachrichten
- Nachrichten erscheinen nach X Sekunden
- Trigger-Bedingungen (z.B. nach anderen Nachrichten)
- Realistische Typing-Indikatoren
- Lesebestätigungen

### Anpassbare Statusleiste
- Uhrzeit (frei wählbar oder Echtzeit)
- Akku-Level mit Lade-Icon
- WLAN-Stärke
- Mobilfunk-Anbieter
- Flugmodus, Stumm, etc.

## 🛠️ Technologie-Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS 4** - Styling
- **Vite** - Build Tool
- **PWA** - Progressive Web App Funktionalität
- **Service Worker** - Offline-Funktionalität

## 📱 Kompatibilität

- ✅ iOS Safari (PWA-Installation möglich)
- ✅ Android Chrome (PWA-Installation möglich)
- ✅ Desktop Browser (alle modernen Browser)

## ⚠️ Wichtige Hinweise

- **Keine echten Nachrichten**: App sendet NICHTS ins Internet
- **100% offline**: Funktioniert ohne Internetverbindung
- **Nur für Film/Theater**: Nicht als täglicher Messenger gedacht
- **MOCKUP / DREHARBEIT**: Deutlich sichtbar markiert

## 🎯 Roadmap

- [x] Basis Chat-Funktionalität
- [x] Timer-basierte Nachrichten
- [x] Debug-Panel
- [x] Film-Modus
- [x] PWA-Support
- [ ] Video/Audio-Nachrichten (Mock)
- [ ] Gruppen-Chats
- [ ] Story-Feature (Mock)
- [ ] Export als Video

## 📄 Lizenz

Dieses Projekt ist für Film- und Theater-Produktionen gedacht. Bitte respektiere die Markenrechte echter Messenger-Apps und kennzeichne deine Aufnahmen entsprechend.

## 🆘 Support

Probleme oder Fragen? Öffne ein Issue oder kontaktiere mich direkt.

---

**Viel Erfolg bei deinen Dreharbeiten! 🎬📱**
