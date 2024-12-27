# SOLVY Landing Page Setup Guide

## Logo Management

### Required Logo Files
1. `assets/images/logo/fulllogo.png`
   - Full SOLVY logo with text
   - Used in navigation bar
   - Recommended size: 200x50 px
   - Format: PNG with transparency

2. `assets/images/logo/SolvyLogo-1024.png`
   - Square "S" logo variant
   - Used in ecosystem section
   - Size: 1024x1024 px
   - Format: PNG with transparency

### Logo Upload Instructions
1. Ensure your logo files follow the naming convention exactly
2. Place the files in the `solvy-landing/assets/images/logo/` directory
3. The existing SVG files can serve as templates for the design
4. Verify image paths in `index.html` match the uploaded files

## GitHub Repository Export Process

### Prerequisites
1. GitHub account with access to SA-Nathan organization
2. The repository "solvy-landing-page" created at github.com/SA-Nathan/solvy-landing-page
3. Git URL of your Replit project (find in Replit's Version Control tab)

### Import Steps
1. Go to GitHub.com and log in
2. Visit: https://github.com/new/import
3. For "Your old repository's clone URL", use your Replit project's Git URL
4. For "Your new repository details":
   - Owner: SA-Nathan
   - Repository Name: solvy-landing-page
5. Set repository visibility as specified
6. Click "Begin Import"
7. Wait for the import to complete

### Post-Import Actions
1. Upload Logo Files:
   - Use the "Add file" button in GitHub
   - Upload to `solvy-landing/assets/images/logo/`
   - Ensure exact filenames: `fulllogo.png` and `SolvyLogo-1024.png`
   - Copy from attached_assets directory:
     * `fulllogo copy.png` → rename to `fulllogo.png`
     * `SolvyLogo-1024 copy.png` → rename to `SolvyLogo-1024.png`

2. Verify Repository:
   - Check all files are imported correctly
   - Verify the directory structure matches README.md
   - Test the landing page through GitHub Pages

## DNS Configuration (Post-Import)
Once GitHub export is complete:
1. Log in to Freename.io
2. Navigate to solvy.chain domain management
3. Update DNS settings to point to GitHub Pages
4. Configure any required CNAME records

## Next Steps
1. Upload logo files as specified above
2. Configure GitHub Pages for hosting
3. Set up branch protection rules
4. Add repository documentation

Remember to test the landing page after completing each step to ensure everything works as expected.