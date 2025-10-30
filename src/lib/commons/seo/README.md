# SEO Components

Modular and reusable SEO components for your Next.js application.

## Components

### 1. SEOHead
Main component for all meta tags, Open Graph, Twitter Cards, and favicon.

**Location**: `src/lib/commons/seo/seo_head.tsx`

#### Default Usage (in layout.tsx)
```tsx
import SEOHead from "@/lib/commons/seo/seo_head";

<head>
  <SEOHead />
</head>
```

#### Custom Usage (for specific pages)
```tsx
import SEOHead from "@/lib/commons/seo/seo_head";

<head>
  <SEOHead 
    title="About Me | Daniel Alvarez"
    description="Learn more about Daniel Alvarez, a full-stack developer passionate about web and mobile development."
    keywords="about, Daniel Alvarez, developer, software engineer"
    ogImage="/about-og-image.png"
    canonicalUrl="https://yourdomain.com/about"
  />
</head>
```

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | "Daniel Alvarez - Web and Mobile..." | Page title |
| `description` | string | "Personal tech blog..." | Meta description |
| `keywords` | string | "Daniel Alvarez, software..." | SEO keywords |
| `ogTitle` | string | Same as title | Open Graph title |
| `ogDescription` | string | Same as description | Open Graph description |
| `ogImage` | string | "/profile.png" | Open Graph image |
| `twitterTitle` | string | Same as title | Twitter Card title |
| `twitterDescription` | string | Same as description | Twitter Card description |
| `twitterImage` | string | "/profile.png" | Twitter Card image |
| `twitterCreator` | string | "@djag_dev" | Twitter handle |
| `canonicalUrl` | string | undefined | Canonical URL for the page |

---

### 2. StructuredData
Component for JSON-LD structured data (Schema.org markup).

**Location**: `src/lib/commons/seo/structured_data.tsx`

#### Usage
```tsx
import { StructuredData } from "@/lib/commons/seo/structured_data";

// Person schema (for about page)
<StructuredData type="Person" />

// WebSite schema (for home page)
<StructuredData type="WebSite" />

// BlogPosting schema (for blog posts)
<StructuredData 
  type="BlogPosting" 
  data={{
    title: "How to Build a Blog with Next.js",
    description: "A comprehensive guide...",
    datePublished: "2025-01-15",
    dateModified: "2025-01-20",
  }}
/>
```

#### Available Types
- `Person` - For personal/about pages
- `WebSite` - For the main website
- `BlogPosting` - For individual blog posts

---

## Benefits of This Modular Approach

✅ **Reusable**: Use the same component across all pages  
✅ **Customizable**: Override defaults for specific pages  
✅ **Maintainable**: Update SEO in one place  
✅ **Type-safe**: TypeScript interfaces ensure correctness  
✅ **Atomic Design**: Each component has a single responsibility  

---

## Example: Custom Page SEO

```tsx
// src/app/about/page.tsx
"use client";

import SEOHead from "@/lib/commons/seo/seo_head";
import { StructuredData } from "@/lib/commons/seo/structured_data";

export default function AboutPage() {
  return (
    <>
      {/* Override default SEO for this page */}
      <SEOHead
        title="About Daniel Alvarez | Full Stack Developer"
        description="Full-stack developer with expertise in React, Next.js, Flutter, and Node.js. Building modern web and mobile applications."
        ogImage="/about-preview.png"
        canonicalUrl="https://yourdomain.com/about"
      />
      
      {/* Add structured data */}
      <StructuredData type="Person" />
      
      <main>
        {/* Your about page content */}
      </main>
    </>
  );
}
```

---

## Import from Index

You can also import both components from the index:

```tsx
import { SEOHead, StructuredData } from "@/lib/commons/seo";
```

---

## Testing Your SEO

1. **Local Development**:
   - Run `npm run dev`
   - View page source (right-click → View Page Source)
   - Verify meta tags are present

2. **Production**:
   - Use [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Use [Open Graph Debugger](https://www.opengraph.xyz/)
   - Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)
