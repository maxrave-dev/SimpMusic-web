# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SimpMusic Web is the official landing page for SimpMusic - a music app using YouTube Music for backend. Built with Next.js 14 using the App Router pattern.

## Package Manager

**Use npm** instead of other package managers.

## Common Commands

```bash
# Development
npm dev                # Start development server
npm build              # Build for production (includes ads.txt generation)
npm start              # Start production server
npm lint               # Run ESLint

# Utility scripts
npm run generate-ads   # Generate ads.txt file (requires NEXT_PUBLIC_ADSENSE_PUBLISHER_ID)
```

## Architecture

### Directory Structure

- **src/app/** - Next.js App Router pages and layouts
  - Route structure: `/`, `/about`, `/blogs`, `/blogs/[...slug]`, `/download`, `/nightly-download`, `/donate`, `/privacy-policy`
  - `layout.jsx` - Root layout with AdSense and Adblock detection
  - `providers.jsx` - NextUI and theme provider wrapper
  - `sitemap.js` - Dynamic sitemap generation

- **src/components/custom/** - Application-specific components
  - Header components: `Header.jsx`, `Navbar.jsx`, `Logo.jsx`, `ThemeToggle.jsx`
  - Footer: `Footer.jsx`
  - Section components: `IntroSection.jsx`, `FeatureSection.jsx`, `ScreenshotSection.jsx`, `DownloadSection.jsx`, etc.
  - Specialized: `AdblockDetector.jsx`, `AdSense.jsx`, `BlogCard.jsx`, `BlogsFilter.jsx`

- **src/components/ui/** - Reusable UI primitives (shadcn/ui style)

- **src/lib/** - Utility functions and configurations
  - `appwrite.js` - Appwrite client configuration for blog database
  - `utils.js` - Utility functions (likely clsx/tailwind-merge helpers)

### Key Integrations

**Appwrite (Blog System)**: The blog functionality is powered by Appwrite. Configuration requires:
- `NEXT_PUBLIC_APPWRITE_ENDPOINT`
- `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
- `NEXT_PUBLIC_APPWRITE_DATABASE_ID`
- `NEXT_PUBLIC_APPWRITE_COLLECTION_ID`
- `NEXT_PUBLIC_APPWRITE_IMAGE_ENDPOINT`

Blog routes use dynamic routing with catch-all segments (`/blogs/[...slug]`).

**Google AdSense**: The build process includes an automated ads.txt generator (`scripts/generate-ads-txt.js`) that runs before each build. Requires `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` environment variable.

**Adblock Detection**: The site includes adblock detection functionality using `@scthakuri/adblock-detector` and `fuckadblock` packages, implemented in `AdblockDetector.jsx` component.

**Nightly Downloads**: Multi-platform download support with separate environment variables for each platform:
- Android, Windows, Linux (DEB, RPM, AppImage), macOS

### Styling

- **Tailwind CSS** with custom configuration (`tailwind.config.js`)
- **NextUI** components (@nextui-org/react)
- **Radix UI** primitives for accessible components
- **Framer Motion** for animations
- **next-themes** for dark mode support

### Special Files

- **scripts/generate-ads-txt.js**: Generates `public/ads.txt` from environment variable. Fails build if `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` is not set.
- **components.json**: shadcn/ui configuration for component generation

## Environment Setup

Copy `.env.example` to `.env` and configure all required variables before running the project. The application requires Appwrite credentials for blog functionality and AdSense publisher ID for ads.

## Important Notes

- Before coding or building, please make a plan before build. Using Context7 MCP for finding any docs about frameworks and libraries, use Grep MCP for finding sample code or best practice from other open-source in GitHub.
- Build process will fail without proper `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` configuration
- Blog pages are dynamically generated from Appwrite database
- The site is sponsored by Vercel, DigitalOcean, Crowdin, and Sentry (see README.md for details)