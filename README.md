# Portfolio — Taoufiq Maroub

A single-page, animated developer/infrastructure portfolio built with plain **HTML, CSS and JavaScript** — no framework, no build step, no npm dependencies required.

## Project structure

```
portfolio/
├── index.html              # Main page (all content + structure)
├── css/
│   └── style.css           # All styling, layout and animations
├── js/
│   └── main.js             # Scroll reveal, logo/network animations, contact modal logic
├── assets/
│   └── images/
│       └── avatar.jpg      # Profile photo used in the hero section
└── README.md                # This file
```

Everything is self-contained in these five items — there is nothing else to fetch or install locally.

## Requirements

- Any modern web browser (Chrome, Firefox, Safari, Edge — all fully support the CSS 3D transforms and animations used here).
- An internet connection **only** to load the two Google Fonts families (Fraunces, Inter, JetBrains Mono) referenced in `index.html`. If you're fully offline, the page still works, it just falls back to system fonts.
- No Node.js, no npm packages, no build tools are required to run the site.

## How to open it in VS Code

1. Unzip the project folder anywhere on your machine.
2. Open VS Code → `File > Open Folder…` → select the `portfolio` folder.
3. You'll see the structure above in the Explorer sidebar.

## How to run it locally

You have two options:

### Option A — Just open the file (simplest)
Double-click `index.html`, or right-click it in VS Code's Explorer and choose **"Reveal in File Explorer / Finder"** then open it, or drag it into your browser. Everything works directly from the filesystem (`file://`), no server needed.

### Option B — Run a local dev server (recommended)
Some browsers restrict certain behaviors on `file://` pages, and a local server also gives you auto-reload. Pick whichever is easiest:

**Using VS Code's Live Server extension (easiest inside VS Code):**
1. Install the **"Live Server"** extension by Ritwick Dey from the VS Code Extensions marketplace.
2. Right-click `index.html` → **"Open with Live Server"**.
3. Your browser opens automatically at `http://127.0.0.1:5500` (or similar).

**Using Python (if you have Python installed):**
```bash
cd portfolio
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Using Node.js (if you have Node installed):**
```bash
cd portfolio
npx serve .
```
Then open the URL it prints (usually `http://localhost:3000`).

None of these require installing project dependencies — they're just simple static file servers.

## Editing the content

- **Text, sections, links:** edit `index.html` directly — it's organized top to bottom in the same order as the page (Nav → Hero → About → Skills → Experience → Projects → Formation/Certifications → Contact → Footer).
- **Colors, spacing, fonts, animations:** edit `css/style.css`. All the theme colors are defined as CSS variables at the very top of the file (`:root { ... }`), so changing the green accent everywhere is a one-line change.
- **Profile photo:** replace `assets/images/avatar.jpg` with a new image of the same name (or update the `src` in `index.html` if you rename it).
- **Contact form behavior:** the form submits asynchronously to the configured Google Apps Script Web App and forwards messages directly to `taoufiq.maroub25@gmail.com` without redirecting visitors to Gmail. It displays an in-page confirmation only when Gmail accepts the message. No third-party FormSubmit fallback is used.

### Direct Gmail delivery

For direct delivery through your own Gmail account, deploy `google-apps-script/Code.gs` as a Google Apps Script web app:

1. Open [script.google.com](https://script.google.com), create a project, and paste in `google-apps-script/Code.gs`.
2. Choose **Deploy → New deployment → Web app**.
3. Set **Execute as** to your account and **Who has access** to **Anyone**, then authorize Gmail access.
4. Copy the `/exec` deployment URL into the empty `data-endpoint` attribute on the `contactForm` in `index.html`.
5. Push the change and test the form from the hosted site.

The Apps Script sends the submitted name, email, subject, and message with `GmailApp.sendEmail`, and the form displays success only after the endpoint confirms that Gmail accepted the message. The form uses a simple URL-encoded POST so Google Apps Script does not receive a browser preflight request. The endpoint URL cannot be generated from this repository because Google requires authorization in your account. The previous FormSubmit action and hidden fields have been removed, so there is no competing delivery service. If the endpoint redirects visitors to Google sign-in, edit the deployment and set **Who has access** to **Anyone**.

## Notes on the animations

- The rotating logo, glowing network lines, and AI orb use standard CSS 3D transforms and `@keyframes` animations — no JavaScript animation libraries involved.
- All animations respect `prefers-reduced-motion`, so they're automatically disabled for visitors who have that OS/browser setting turned on.

## Deploying it publicly

Since it's fully static, you can host it for free on any of these without changes:
- GitHub Pages
- Netlify (drag-and-drop the folder)
- Vercel
- Cloudflare Pages

Just upload/point them at this folder — `index.html` is the entry point.
