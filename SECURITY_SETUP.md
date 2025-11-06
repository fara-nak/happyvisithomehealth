# Security Setup for EmailJS Credentials

## Local Development (Safe ✅)

Your `.env` file is already in `.gitignore`, so it **will NOT** be pushed to GitHub. This is safe for local development.

Create a `.env` file in your project root:
```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Production Deployment

### For GitHub Pages (Recommended Method)

Use **GitHub Secrets** to securely store your credentials:

1. **Go to your GitHub repository**
2. **Click on "Settings"** → **"Secrets and variables"** → **"Actions"**
3. **Click "New repository secret"** and add these three secrets:
   - Name: `VITE_EMAILJS_SERVICE_ID` → Value: (your service ID)
   - Name: `VITE_EMAILJS_TEMPLATE_ID` → Value: (your template ID)
   - Name: `VITE_EMAILJS_PUBLIC_KEY` → Value: (your public key)

4. The GitHub Actions workflow will automatically use these secrets during build

✅ **Your credentials will NEVER appear in the code or be exposed publicly**

### For GoDaddy Hosting

If you're deploying directly to GoDaddy (not through GitHub Pages):

1. **Option 1: Use environment variables** (if GoDaddy supports them)
   - Set environment variables in your GoDaddy hosting control panel
   - Same variable names: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`

2. **Option 2: Create a config file** (less secure, but works)
   - Create a file `src/config.ts` (DON'T commit this file)
   - Add it to `.gitignore`: `src/config.ts`
   - Import it in your App.tsx

   **Note:** This approach is less secure because the values will be in your built JavaScript files. Anyone viewing the website source can see them. Use GitHub Secrets for GitHub Pages instead.

## Best Practice

✅ **DO:**
- Use `.env` for local development (already safe)
- Use GitHub Secrets for GitHub Pages deployment
- Never commit `.env` files to Git

❌ **DON'T:**
- Hardcode credentials in source files
- Commit `.env` files
- Share credentials publicly

## Current Status

- ✅ `.env` is in `.gitignore` (safe)
- ✅ GitHub Actions workflow uses secrets (safe)
- ✅ Local development uses `.env` (safe)

