# NextShop 🚀

NextShop is a premium, localized e-commerce mini-application built with high performance and accessibility in mind. It features a cinematic user experience, full multi-language support (English & Arabic), and professional-grade SEO implementation.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.1.6](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (Persisted)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/) (RTL Support)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Tradeoffs & Decisions

- **Zustand over Redux**: Chosen for its minimal boilerplate and ease of persistence in a containerized environment.
- **Server Components by Default**: Leveraged Next.js App Router to reduce client-side JS and improve FCP (First Contentful Paint).
- **Client-Side State for Logic**: Used `useWishlistStore` and `useCartStore` with `mounted` checks to prevent hydration mismatches while maintaining persistent user data.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd NextCommerceMini
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📈 SEO & Performance Checklist

- [x] **Semantic HTML**: Proper use of `<header>`, `<main>`, `<footer>`, and heading hierarchy (`h1`-`h4`).
- [x] **Localized Meta Tags**: Dynamic `title` and `description` for every page in English and Arabic.
- [x] **Social Previews**: Full OpenGraph and Twitter card support.
- [x] **Structured Data (JSON-LD)**:
  - [x] `Product` schema for rich search results.
  - [x] `BreadcrumbList` for enhanced site navigation in search engines.
- [x] **Image Optimization**: Fully utilized `next/image` for lazy loading and modern formats.
- [x] **RTL Support**: Native Arabic support with fluid layout transitions.
- [x] **Performance**: Optimized for high Lighthouse scores using Turbopack and Server Components.
- [x] **Mobile First**: 100% responsive design across all viewports.

## ✨ Key Features

- **Wishlist**: Save favorite products with persistent storage.
- **Shopping Cart**: Real-time cart management with local persistence.
- **Categories Gallery**: High-impact visual discovery of product collections.
- **Localized UI**: Complete translation of every component and validation message.
- **Interactive Checkouts**: Seamless and intuitive checkout flow.


## 📊 Lighthouse Results
We take performance seriously. Here are our latest Lighthouse scores for the mobile experience:
| Category | Score |
| :--- | :--- |
| **Performance** | 86 |
| **Accessibility** | 94 |
| **Best Practices** | 96 |
| **SEO** | 100 |

![Lighthouse Desktop Results](/public/docs/screenshots/Screenshot-desktop.png)
![Lighthouse Mobile Results](/public/docs/screenshots/Screenshot-mobile.png)
> [!NOTE]
> Performance scores are based on the latest build using Turbopack and Image Optimization.