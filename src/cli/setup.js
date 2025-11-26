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

// 3. Check for CSS import
const possibleEntryPoints = [
  'src/main.tsx',
  'src/main.ts',
  'src/main.jsx',
  'src/main.js',
  'src/index.tsx',
  'src/index.ts',
  'src/index.jsx',
  'src/index.js',
  'src/App.tsx',
  'src/App.ts',
  'src/App.jsx',
  'src/App.js',
];

let entryPoint = null;
for (const file of possibleEntryPoints) {
  if (existsSync(join(cwd, file))) {
    entryPoint = file;
    break;
  }
}

console.log('\n📝 Next Steps:\n');

if (entryPoint) {
  const entryContent = readFileSync(join(cwd, entryPoint), 'utf-8');
  
  if (entryContent.includes("@ttianqii/takaui/styles.css")) {
    console.log(`✅ CSS already imported in ${entryPoint}`);
  } else {
    console.log(`Add this import to your ${entryPoint}:`);
    console.log(`  import '@ttianqii/takaui/styles.css'`);
    
    // Auto-add if it's a simple case
    if (entryContent.includes('import')) {
      const lines = entryContent.split('\n');
      const lastImportIndex = lines.findLastIndex(line => line.trim().startsWith('import'));
      
      if (lastImportIndex !== -1) {
        lines.splice(lastImportIndex + 1, 0, "import '@ttianqii/takaui/styles.css'");
        writeFileSync(join(cwd, entryPoint), lines.join('\n'), 'utf-8');
        console.log(`  ✅ Auto-added CSS import to ${entryPoint}`);
      }
    }
  }
} else {
  console.log('Add this import to your main entry file (e.g., main.tsx or App.tsx):');
  console.log("  import '@ttianqii/takaui/styles.css'");
}

console.log('\n✨ Setup Complete!\n');
console.log('You can now use TakaUI components:');
console.log("  import { DatePicker, DataTable, Calendar } from '@ttianqii/takaui'\n");
console.log('📚 Documentation: https://github.com/ttianqii/takaui\n');
