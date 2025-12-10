#!/usr/bin/env node

/**
 * Build verification script
 * Ensures the built index.html has the correct script reference
 * and doesn't contain the development script tag
 */

import { readFileSync } from 'fs'
import { join } from 'path'

const distIndexPath = join(process.cwd(), 'dist', 'index.html')

try {
  const content = readFileSync(distIndexPath, 'utf-8')
  
  // Check for development script (should NOT be present)
  if (content.includes('/src/main.tsx')) {
    console.error('❌ ERROR: Built index.html contains development script (/src/main.tsx)')
    console.error('   This will cause a blank page in production!')
    console.error('   The build process may have failed.')
    process.exit(1)
  }
  
  // Check for production script (should be present)
  if (!content.includes('/assets/index-') && !content.includes('src="/assets/')) {
    console.error('❌ ERROR: Built index.html missing production script reference')
    console.error('   The build may be incomplete.')
    process.exit(1)
  }
  
  // Check for sitemap.xml in dist
  const { existsSync } = await import('fs')
  const sitemapPath = join(process.cwd(), 'dist', 'sitemap.xml')
  if (!existsSync(sitemapPath)) {
    console.warn('⚠️  WARNING: sitemap.xml not found in dist folder')
    console.warn('   Make sure public/sitemap.xml exists')
  }
  
  console.log('✅ Build verification passed!')
  console.log('   - index.html has correct production script')
  console.log('   - No development scripts found')
  process.exit(0)
} catch (error) {
  console.error('❌ ERROR: Could not verify build:', error.message)
  console.error('   Make sure you run "npm run build" first')
  process.exit(1)
}

