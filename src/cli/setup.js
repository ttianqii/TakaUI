#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('\n🎨 TakaUI Setup Wizard\n');

const cwd = process.cwd();

// 1. Check for Tailwind config
const tailwindConfigFiles = [
  'tailwind.config.js',
  'tailwind.config.ts',
  'tailwind.config.mjs',
  'tailwind.config.cjs'
];

let tailwindConfigPath = null;
for (const file of tailwindConfigFiles) {
  if (existsSync(join(cwd, file))) {
    tailwindConfigPath = file;
    break;
  }
}

if (!tailwindConfigPath) {
  console.log('⚠️  No Tailwind config found!');
  console.log('\nPlease install Tailwind CSS first:');
  console.log('  npm install -D tailwindcss postcss autoprefixer');
  console.log('  npx tailwindcss init');
  console.log('\nThen run this setup again: npx takaui-setup\n');
  process.exit(1);
}

console.log(`✅ Found Tailwind config: ${tailwindConfigPath}`);

// 2. Update Tailwind config
try {
  let configContent = readFileSync(join(cwd, tailwindConfigPath), 'utf-8');
  
  const takaUIPath = './node_modules/@ttianqii/takaui/dist/**/*.{js,mjs,cjs}';
  
  if (configContent.includes(takaUIPath)) {
    console.log('✅ TakaUI already configured in Tailwind');
  } else {
    // Add TakaUI to content array
    const contentRegex = /content:\s*\[([\s\S]*?)\]/;
    const match = configContent.match(contentRegex);
    
    if (match) {
      const currentContent = match[1];
      const updatedContent = currentContent.trim() 
        ? `${currentContent.trim()},\n    "${takaUIPath}"`
        : `"${takaUIPath}"`;
      
      configContent = configContent.replace(
        contentRegex,
        `content: [\n    ${updatedContent}\n  ]`
      );
      
      writeFileSync(join(cwd, tailwindConfigPath), configContent, 'utf-8');
      console.log('✅ Updated Tailwind config with TakaUI paths');
    } else {
      console.log('⚠️  Could not auto-update Tailwind config');
      console.log(`\nPlease manually add to ${tailwindConfigPath}:`);
      console.log(`  content: [`);
      console.log(`    "${takaUIPath}"`);
      console.log(`  ]`);
    }
  }
} catch (error) {
  console.log('⚠️  Could not update Tailwind config:', error.message);
}

// 3. Check for Tailwind directives in CSS
const possibleCssFiles = [
  'src/index.css',
  'src/styles.css',
  'src/App.css',
  'src/global.css',
];

let cssFile = null;
for (const file of possibleCssFiles) {
  if (existsSync(join(cwd, file))) {
    cssFile = file;
    break;
  }
}

console.log('\n📝 Final Steps:\n');

if (cssFile) {
  const cssContent = readFileSync(join(cwd, cssFile), 'utf-8');
  
  if (cssContent.includes('@tailwind base') && 
      cssContent.includes('@tailwind components') && 
      cssContent.includes('@tailwind utilities')) {
    console.log(`✅ Tailwind directives found in ${cssFile}`);
  } else {
    console.log(`⚠️  Add Tailwind directives to ${cssFile}:`);
    console.log(`  @tailwind base;`);
    console.log(`  @tailwind components;`);
    console.log(`  @tailwind utilities;`);
  }
} else {
  console.log('⚠️  Create a CSS file (e.g., src/index.css) with:');
  console.log('  @tailwind base;');
  console.log('  @tailwind components;');
  console.log('  @tailwind utilities;');
}

console.log('\n✨ Setup Complete!\n');
console.log('🎉 TakaUI works like shadcn/ui - no CSS imports needed!');
console.log('   Just use the components and Tailwind handles the styling.\n');
console.log('You can now use TakaUI components:');
console.log("  import { DatePicker, DataTable, Calendar } from '@ttianqii/takaui'\n");
console.log('📚 Documentation: https://github.com/ttianqii/takaui\n');
