# Happy Visit Home Health

A modern, responsive website for Happy Visit Home Health - a professional home health care service.

## Features

- 🏠 Modern, clean design
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast and optimized with Vite
- 🎨 Beautiful UI with smooth animations
- 📋 Sections: Home, Services, About, Contact

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Modern styling with custom properties

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Building for Production

To build the website for production (for GoDaddy hosting):

```bash
npm run build
```

This will create a `dist` folder with all the static files ready to upload to GoDaddy.

## Deployment to GoDaddy

### Step 1: Build the Website

```bash
npm run build
```

### Step 2: Upload to GoDaddy

1. Log in to your GoDaddy account
2. Go to your hosting dashboard
3. Open File Manager
4. Navigate to the `public_html` folder (or your domain's root folder)
5. Upload all files from the `dist` folder to your domain's root
6. Make sure `index.html` is in the root directory

### Step 3: Verify

Visit your website at `https://happyvisithomehealth.com` to verify it's working.

## Project Structure

```
happyvisithome/
├── src/
│   ├── App.tsx          # Main application component
│   ├── App.css          # App-specific styles
│   ├── index.css        # Global styles
│   └── main.tsx         # Entry point
├── public/              # Static assets
├── dist/                # Build output (generated)
├── index.html           # HTML template
└── package.json         # Dependencies
```

## Customization

### Update Contact Information

Edit `src/App.tsx` and update:
- Phone numbers
- Email addresses
- Office hours
- Any other contact details

### Update Services

Modify the services section in `src/App.tsx` to match your actual services.

### Change Colors

Edit CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #4a90e2;
  --secondary-color: #50c878;
  /* ... */
}
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

Copyright © 2024 Happy Visit Home Health. All rights reserved.
