# Publishing Your Component Library to npm

## Step 1: Prepare Your Package

### 1.1 Update package.json

Open `package.json` and update these fields:

```json
{
  "name": "@your-username/ui-library",  // Change this to your npm username or organization
  "version": "0.1.0",
  "description": "A React component library with DataTable and UI components",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/your-repo.git"
  },
  "keywords": [
    "react",
    "components",
    "ui",
    "datatable",
    "tailwind"
  ]
}
```

### 1.2 Create/Update README.md

Create a comprehensive README with:
- Installation instructions
- Usage examples
- Component documentation
- Screenshots or demos

## Step 2: Build Your Library

Run the build command:

```bash
npm run build
```

This will create the `dist` folder with:
- `my-ui-library.js` (ES module)
- `my-ui-library.cjs` (CommonJS)
- `my-ui-library.umd.cjs` (UMD)
- `style.css` (Tailwind styles)
- Type definitions (`.d.ts` files)

## Step 3: Test Locally (Optional but Recommended)

Before publishing, test your package locally:

```bash
# In your library directory
npm link

# In a test project
npm link @your-username/ui-library
```

Or use `npm pack` to create a tarball:

```bash
npm pack
# This creates a .tgz file you can install in test projects
```

## Step 4: Create an npm Account

If you don't have an npm account:

1. Go to https://www.npmjs.com/signup
2. Create an account
3. Verify your email

## Step 5: Login to npm

In your terminal:

```bash
npm login
```

Enter your:
- Username
- Password
- Email
- One-time password (if 2FA is enabled)

Verify you're logged in:

```bash
npm whoami
```

## Step 6: Publish Your Package

### For Public Packages

```bash
npm publish --access public
```

### For Scoped Packages (@your-org/package-name)

```bash
npm publish --access public
```

## Step 7: Verify Publication

1. Check on npm: https://www.npmjs.com/package/@your-username/ui-library
2. Try installing in a test project:

```bash
npm install @your-username/ui-library
```

## Updating Your Package

When you make changes:

1. **Update the version** in package.json:
   ```bash
   npm version patch  # 0.1.0 -> 0.1.1 (bug fixes)
   npm version minor  # 0.1.0 -> 0.2.0 (new features)
   npm version major  # 0.1.0 -> 1.0.0 (breaking changes)
   ```

2. **Rebuild**:
   ```bash
   npm run build
   ```

3. **Publish again**:
   ```bash
   npm publish
   ```

## Important Files Checklist

Make sure these files exist:

- ✅ `package.json` - Package configuration
- ✅ `README.md` - Documentation
- ✅ `LICENSE` - License file (MIT, Apache, etc.)
- ✅ `.npmignore` or `files` field in package.json - Control what gets published
- ✅ `dist/` folder - Built files

## What Gets Published?

By default, npm publishes everything except:
- `node_modules/`
- `.git/`
- Files in `.npmignore`

Your current `package.json` uses the `files` field which includes:
- `dist/`

## Common Issues

### Issue: Package name already taken
**Solution**: Choose a different name or use a scoped package (@username/package-name)

### Issue: Permission denied
**Solution**: 
- Make sure you're logged in: `npm whoami`
- For scoped packages, use: `npm publish --access public`

### Issue: Version already published
**Solution**: Update version number in package.json

### Issue: Missing peer dependencies warning
**Solution**: Users need to install react, react-dom, and other peer dependencies separately

## Best Practices

1. **Semantic Versioning**: Follow semver (major.minor.patch)
2. **Changelog**: Keep a CHANGELOG.md file
3. **Git Tags**: Tag releases in git
4. **Documentation**: Keep README updated with examples
5. **Testing**: Test before publishing
6. **TypeScript**: Include type definitions (already configured)

## Example Workflow

```bash
# 1. Make changes to your components
# 2. Test locally
npm run dev

# 3. Update version
npm version patch

# 4. Build
npm run build

# 5. Publish
npm publish --access public

# 6. Tag in git
git add .
git commit -m "Release v0.1.1"
git tag v0.1.1
git push && git push --tags
```

## After Publishing

Users can install your library:

```bash
npm install @your-username/ui-library
```

And use it:

```tsx
import { DataTable, Button, Input } from '@your-username/ui-library'
import '@your-username/ui-library/dist/style.css'
```

## Unpublishing (If Needed)

**Warning**: Only unpublish within 72 hours of publishing!

```bash
npm unpublish @your-username/ui-library@version --force
```

## Resources

- npm Documentation: https://docs.npmjs.com/
- Semantic Versioning: https://semver.org/
- Package.json Guide: https://docs.npmjs.com/cli/v9/configuring-npm/package-json
