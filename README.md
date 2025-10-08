# Next.js + Tailwind CSS + shadcn/ui Project

This is a modern web application built with Next.js, Tailwind CSS, and shadcn/ui components.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **ESLint** - Code linting and formatting

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
addy-web/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Home page
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── components/
│   │   └── ui/           # shadcn/ui components
│   └── lib/
│       └── utils.ts      # Utility functions
├── public/               # Static assets
└── package.json
```

## Adding shadcn/ui Components

To add more components from shadcn/ui:

```bash
npx shadcn@latest add [component-name]
```

For example:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add form
```

Browse all available components at [ui.shadcn.com](https://ui.shadcn.com).

## Customization

### Tailwind Configuration

Edit `tailwind.config.ts` to customize your design system.

### Component Styling

shadcn/ui components use CSS variables defined in `src/app/globals.css`. Modify these to change your theme colors.

### Theme Colors

The base color scheme is set to **Stone**. You can modify the CSS variables in `globals.css` to change the theme.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [React Documentation](https://react.dev)

## Deployment

Deploy your Next.js app easily with [Vercel](https://vercel.com):

```bash
npm run build
```

Then follow Vercel's deployment instructions or check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
