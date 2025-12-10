#!/bin/bash

# Build verification script
# Run this before pushing to catch issues early

set -e

echo "🔨 Building project..."
npm run build

echo ""
echo "🔍 Verifying build output..."

# Check if dist/index.html exists
if [ ! -f dist/index.html ]; then
    echo "❌ ERROR: dist/index.html not found!"
    exit 1
fi

# Check for development script (should NOT exist)
if grep -q "/src/main.tsx" dist/index.html; then
    echo "❌ CRITICAL ERROR: Built index.html contains development script (/src/main.tsx)"
    echo "This will cause a blank page in production!"
    echo ""
    echo "The build process may have failed. Check the build output above."
    exit 1
fi

# Check for production script (should exist)
if ! grep -q "/assets/index-" dist/index.html; then
    echo "❌ ERROR: Built index.html missing production script reference"
    echo "The build may be incomplete."
    exit 1
fi

# Verify sitemap.xml exists
if [ ! -f dist/sitemap.xml ]; then
    echo "⚠️  WARNING: sitemap.xml not found in dist folder"
    echo "   Make sure public/sitemap.xml exists"
else
    echo "✅ sitemap.xml found in dist"
fi

# Check sitemap.xml syntax
if command -v xmllint &> /dev/null; then
    if xmllint --noout dist/sitemap.xml 2>/dev/null; then
        echo "✅ sitemap.xml syntax is valid"
    else
        echo "⚠️  WARNING: sitemap.xml may have syntax issues"
    fi
fi

echo ""
echo "✅ Build verification passed!"
echo "   - index.html has correct production script"
echo "   - No development scripts found"
echo "   - Build is ready for deployment"
echo ""
echo "💡 Tip: If you see a blank page after deployment, check:"
echo "   1. Browser console for errors"
echo "   2. Network tab to see if assets are loading"
echo "   3. GitHub Actions workflow status"

