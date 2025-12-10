# Deployment Troubleshooting Guide

## The Blank Page Issue - Permanent Fix

This guide helps you avoid and fix the blank page issue that occurs after deployment.

## ✅ What We've Fixed

1. **Build Verification in GitHub Actions** - The workflow now automatically checks if the build is correct before deploying
2. **Build Check Script** - Run `npm run build:verify` locally before pushing
3. **Better Error Messages** - Clear errors if something goes wrong

## 🔍 Why Blank Pages Happen

The blank page issue occurs when:
- The built `index.html` contains `/src/main.tsx` (development script) instead of `/assets/index-*.js` (production script)
- The build process fails silently
- The wrong files get deployed

## ✅ Before Pushing - Always Do This

### Option 1: Quick Check (Recommended)
```bash
npm run build:verify
```

This will:
1. Build your project
2. Verify the build is correct
3. Show you any errors before you push

### Option 2: Manual Check
```bash
npm run build
# Then check dist/index.html
grep "script" dist/index.html
```

**What to look for:**
- ✅ **GOOD**: `<script type="module" crossorigin src="/assets/index-XXXXX.js"></script>`
- ❌ **BAD**: `<script type="module" src="/src/main.tsx"></script>`

## 🚨 If You See a Blank Page After Deployment

### Step 1: Check GitHub Actions
1. Go to: https://github.com/fara-nak/happyvisithomehealth/actions
2. Click on the latest workflow run
3. Check if it passed or failed
4. If it failed, read the error message

### Step 2: Check Browser Console
1. Open your website
2. Press F12 (or Cmd+Option+I on Mac)
3. Go to Console tab
4. Look for red errors

**Common errors:**
- `Failed to load module script` - Wrong script path
- `404 Not Found` - Assets missing
- `CORS error` - Server configuration issue

### Step 3: Check Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh the page
4. Look for failed requests (red)

**What to check:**
- Is `index.html` loading? (should be 200)
- Is the JavaScript file loading? (should be `/assets/index-XXXXX.js`)
- Is the CSS file loading? (should be `/assets/index-XXXXX.css`)

### Step 4: Verify Build Locally
```bash
# Build locally
npm run build

# Check the output
cat dist/index.html | grep script

# Should see: /assets/index-XXXXX.js
# Should NOT see: /src/main.tsx
```

### Step 5: Force Rebuild
If the build looks wrong:
```bash
# Clean and rebuild
rm -rf dist node_modules/.vite
npm run build
npm run build:verify
```

## 🔧 Common Issues & Fixes

### Issue: "Build contains dev script"
**Cause:** Build process didn't complete correctly

**Fix:**
```bash
rm -rf dist
npm run build
npm run build:verify
```

### Issue: "sitemap.xml not found"
**Cause:** File missing from public folder

**Fix:**
```bash
# Make sure public/sitemap.xml exists
ls public/sitemap.xml

# If missing, check git
git status
```

### Issue: GitHub Actions Fails
**Cause:** Build verification failed

**Fix:**
1. Check the error message in GitHub Actions
2. Run `npm run build:verify` locally
3. Fix any issues shown
4. Push again

### Issue: Page Works Locally But Blank in Production
**Cause:** Caching or deployment issue

**Fix:**
1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Check if GitHub Actions completed successfully
3. Wait 2-3 minutes for GitHub Pages to update
4. Clear browser cache completely

## 📋 Deployment Checklist

Before pushing to main:
- [ ] Run `npm run build:verify` - should pass
- [ ] Check `dist/index.html` has `/assets/index-*.js` (not `/src/main.tsx`)
- [ ] Verify `dist/sitemap.xml` exists
- [ ] Test locally with `npm run preview`
- [ ] Check for any console errors

After pushing:
- [ ] Check GitHub Actions status (should be green ✅)
- [ ] Wait 2-3 minutes for deployment
- [ ] Visit your site and hard refresh
- [ ] Check browser console for errors
- [ ] Verify assets are loading in Network tab

## 🛠️ Manual Fixes

### If GitHub Actions Keeps Failing

1. **Check the workflow file:**
   ```bash
   cat .github/workflows/deploy.yml
   ```

2. **Run build locally:**
   ```bash
   npm run build:verify
   ```

3. **If it passes locally but fails in CI:**
   - Check environment variables in GitHub Secrets
   - Make sure all dependencies are in package.json
   - Check Node.js version matches (should be 20)

### If You Need to Revert

```bash
# Find the last working commit
git log --oneline

# Revert to it
git revert <commit-hash>
git push
```

## 💡 Prevention Tips

1. **Always run `npm run build:verify` before pushing**
2. **Don't manually edit `dist/index.html`** - it's auto-generated
3. **Don't commit the `dist` folder** - it's in .gitignore for a reason
4. **Let GitHub Actions handle deployment** - don't manually upload files
5. **Check GitHub Actions status after every push**

## 📞 Still Having Issues?

If you've tried everything and still see a blank page:

1. **Check the exact error:**
   - Browser console
   - GitHub Actions logs
   - Network tab

2. **Verify your setup:**
   ```bash
   node --version  # Should be 20.x
   npm --version
   npm run build:verify
   ```

3. **Check file structure:**
   ```bash
   ls -la dist/
   ls -la public/
   ```

4. **Review recent changes:**
   ```bash
   git log --oneline -5
   git diff HEAD~1
   ```

---

**Remember:** The build verification will catch most issues before they reach production. Always run `npm run build:verify` before pushing!

