#!/usr/bin/env node

/**
 * Script to check metadata in Next.js pages
 * Run: node scripts/check-metadata.js
 */

const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'src/app/page.jsx', name: 'Home Page' },
  { file: 'src/app/about/page.jsx', name: 'About Page' },
  { file: 'src/app/donate/page.jsx', name: 'Donate Page' },
  { file: 'src/app/download/page.jsx', name: 'Download Page' },
  { file: 'src/app/privacy-policy/page.jsx', name: 'Privacy Policy Page' },
  { file: 'src/app/blogs/page.jsx', name: 'Blogs Page' },
  { file: 'src/app/blogs/[...slug]/page.jsx', name: 'Blog Detail Page (Dynamic)' },
  { file: 'src/app/layout.jsx', name: 'Root Layout' },
];

console.log('\n🔍 Checking metadata in Next.js pages...\n');
console.log('='.repeat(80));

let hasMetadata = 0;
let missingMetadata = 0;

pages.forEach(({ file, name }) => {
  const filePath = path.join(process.cwd(), file);
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const hasExportMetadata = content.includes('export const metadata');
    const hasGenerateMetadata = content.includes('export async function generateMetadata');
    const hasOpenGraph = content.includes('openGraph:');
    const hasTwitter = content.includes('twitter:');
    const hasImage = content.includes('/images/blog/feature.jpg');
    
    console.log(`\n📄 ${name}`);
    console.log(`   File: ${file}`);
    console.log(`   ✅ Export metadata: ${hasExportMetadata ? '✓' : '✗'}`);
    console.log(`   ✅ Generate metadata: ${hasGenerateMetadata ? '✓' : '✗'}`);
    console.log(`   ✅ OpenGraph tags: ${hasOpenGraph ? '✓' : '✗'}`);
    console.log(`   ✅ Twitter tags: ${hasTwitter ? '✓' : '✗'}`);
    console.log(`   ✅ Feature image: ${hasImage ? '✓' : '✗'}`);
    
    if ((hasExportMetadata || hasGenerateMetadata) && hasOpenGraph && hasTwitter && hasImage) {
      console.log(`   Status: ✅ PASS`);
      hasMetadata++;
    } else if (file.includes('layout.jsx')) {
      // Layout có thể có cấu trúc khác một chút
      if (hasExportMetadata && hasOpenGraph) {
        console.log(`   Status: ✅ PASS (Layout)`);
        hasMetadata++;
      } else {
        console.log(`   Status: ⚠️  INCOMPLETE`);
        missingMetadata++;
      }
    } else {
      console.log(`   Status: ⚠️  INCOMPLETE`);
      missingMetadata++;
    }
    
  } catch (error) {
    console.log(`\n📄 ${name}`);
    console.log(`   File: ${file}`);
    console.log(`   Status: ❌ ERROR - ${error.message}`);
    missingMetadata++;
  }
});

console.log('\n' + '='.repeat(80));
console.log(`\n📊 Summary:`);
console.log(`   ✅ Pages with metadata: ${hasMetadata}/${pages.length}`);
console.log(`   ⚠️  Pages missing/incomplete: ${missingMetadata}/${pages.length}`);

if (missingMetadata === 0) {
  console.log('\n🎉 All pages have metadata configured correctly!\n');
} else {
  console.log('\n⚠️  Some pages need attention.\n');
}

console.log('📝 Next steps:');
console.log('   1. Run: npm run dev');
console.log('   2. Open browser and visit: http://localhost:3000');
console.log('   3. Press Ctrl+U to view page source');
console.log('   4. Check for <meta property="og:image"> tags');
console.log('   5. After deploy, test with:');
console.log('      • https://developers.facebook.com/tools/debug/');
console.log('      • https://cards-dev.twitter.com/validator');
console.log('      • https://metatags.io/');
console.log('');

