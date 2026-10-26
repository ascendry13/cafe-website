# ☕ Brew & Bloom — 3D Animated Single-Page Experience

A production-grade, immersive 3D single-page website for **Brew & Bloom**, an artisanal specialty coffee sanctuary and micro-roastery. Built with React 19, TypeScript, Vite, Tailwind CSS v4, Three.js (`@react-three/fiber` & `@react-three/drei`), GSAP ScrollTrigger, Lenis smooth scrolling, and Framer Motion.

---

## 🌟 Key Features

1. **100% Procedural 3D Experience (Zero External 3D Models)**:
   - **Stylized Porcelain Cup & Saucer**: High-poly `LatheGeometry` porcelain cup with dual-lip contour and curved `TubeGeometry` handle.
   - **Procedural Latte Art Canvas**: Dynamically generated 1024x1024 canvas texture depicting an artisanal multi-tier rosette with golden crema foam marbling.
   - **Rising Steam Particle Simulation**: Soft additive-blended particle system drifting upward with realistic sinusoidal turbulence.
   - **Procedural Roasted Coffee Beans**: Custom-deformed geometries featuring the iconic deep longitudinal roast crease orbiting the cup.
   - **Ambient Dust Motes**: Golden sunlight particles floating in volumetric warm lighting.
   - **Interactive Mouse Parallax**: Camera and cup react dynamically to cursor movement with dampened physics.
2. **Scroll-Driven Camera Choreography**:
   - Synchronized via GSAP `ScrollTrigger` and `Lenis` smooth inertial scrolling.
   - Progresses smoothly: Hero front view → About elevated top-isometric latte art view → Signature Menu side accent → Reservation warm dusk rest.
3. **Interactive Signature Menu**:
   - Tabbed categories: *Specialty Coffee*, *Botanical & Tea*, *Artisanal Bakery*, *All-Day Brunch*.
   - **3D Tilt Cards**: Perspective-projected interactive cards that tilt towards the mouse with dynamic specular light glare.
4. **Interactive Media & Form Features**:
   - **Coffee Preloader**: 0% → 100% liquid-filling animation with animated steam wisps.
   - **Custom Magnetic Cursor**: Dual-layer desktop cursor with smooth spring lagging and expansion over interactive elements.
   - **Lightbox Gallery**: Fullscreen modal with keyboard navigation (Esc, Left/Right arrows).
   - **Animated Stat Counters**: Scroll-triggered numeric counters.
   - **Interactive Reservation Form**: Client-side field validation, atmosphere picker, and celebratory confetti burst confirmation modal.
   - **Location Card**: Interactive vector-styled map preview with direct Google Maps navigation.
   - **Accessible & Responsive**: Contrast AA, responsive DPR clamping, and `prefers-reduced-motion` detection with graceful static fallback.

---

## 🎨 Design Tokens & Palette

| Token | Hex | Usage |
| :--- | :--- | :--- |
| **Espresso Brown** | `#2B1B12` | Primary background, deep warmth |
| **Espresso Dark** | `#150D08` | Footers, card bases |
| **Cream** | `#F5EBDD` | Primary typography, porcelain accents |
| **Cream Light** | `#FAF5EE` | Foam highlights, clean surfaces |
| **Caramel** | `#C98B4B` | Primary accents, buttons, gold rim trim |
| **Caramel Light**| `#DBA366` | Hover states, glowing embers |
| **Sage Accent** | `#7A8B69` | Organic badges, botanical accents |

- **Headings Font**: `"Playfair Display"` (Google Fonts)
- **Body Font**: `"Inter"` (Google Fonts)

---

## 🚀 Quick Start

### Prerequisites
- Node.js `v18+` (Tested on Node `v24` and `npm v11`)

### Installation & Development
```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 💡 Decisions & Architectural Choices

1. **Pure Procedural 3D Geometry**:
   - Rather than relying on heavy `.gltf` / `.obj` files that cause slow network waterfalls and loading failures, the entire 3D scene (cup, saucer, handle, coffee disk, latte art, steam, coffee beans, and dust) is synthesized procedurally in code.
   - This keeps initial bundle transfers lightweight and ensures guaranteed rendering across any deployment environment.
2. **Dynamic Canvas-Generated Latte Art**:
   - The latte art is painted directly onto an HTML5 canvas using multi-pass radial gradients and bezier curves to achieve authentic espresso crema with a delicate feather-leaf rosette.
3. **Lenis + GSAP ScrollTrigger Synergy**:
   - Lenis smooth inertial scrolling is synchronized directly into GSAP's ticker (`lenis.raf(time * 1000)`), avoiding scroll stutter and providing 60fps tracking.
4. **Mobile Performance Optimization**:
   - On screens under 768px, device pixel ratio is clamped (`[1, 1.3]`), particle counts are halved, and camera distances are scaled to preserve full frame rates on lower-powered devices.
5. **Session Preloader Caching**:
   - The preloader animation is recorded in `sessionStorage` so returning navigations within the session load instantaneously without replaying the 0–100% sequence.

---

## 🛠️ How to Replace Images and Content

All business data and content live in **ONE single configuration file**:
👉 [`src/config/cafe.ts`](file:///c:/Users/amitb/Desktop/Projects/A1/src/config/cafe.ts)

### 1. Renaming the Cafe or Editing Contact Info
Open [`src/config/cafe.ts`](file:///c:/Users/amitb/Desktop/Projects/A1/src/config/cafe.ts) and modify the `brand` and `contact` blocks:
```typescript
export const CAFE_CONFIG = {
  brand: {
    name: "Your Cafe Name",
    tagline: "Your Catchy Tagline",
    subTagline: "Artisanal Specialty Coffee & Roastery",
    shortBio: "Describe your cafe here...",
  },
  contact: {
    address: "123 Coffee Lane, Seattle, WA",
    phone: "+1 (555) 012-3456",
    email: "contact@yourcafe.com",
    hours: {
      weekday: "Mon – Fri: 6:00 AM – 6:00 PM",
      weekend: "Sat – Sun: 7:00 AM – 7:00 PM",
      holidayNote: "Open on holidays with seasonal specials.",
    },
  },
  // ...
};
```

### 2. Updating Menu Items & Prices
In [`src/config/cafe.ts`](file:///c:/Users/amitb/Desktop/Projects/A1/src/config/cafe.ts), edit the `menuCategories` array:
```typescript
{
  id: "coffee",
  name: "Specialty Coffee",
  items: [
    {
      id: "c-1",
      name: "Honey Lavender Latte",
      description: "Double ristretto, organic lavender blossom, mountain honey...",
      price: "$6.50",
      tag: "House Favorite",
      image: "/images/menu-latte.jpg",
      imageAlt: "Ceramic cup with lavender latte",
      calories: "190 kcal",
      notes: "Hot or iced",
    },
    // Add or modify items here
  ]
}
```

### 3. Replacing Images
All photography lives in `/public/images/`. To replace any image:
1. Drop your new image file into `/public/images/` using the exact corresponding file name:
   - `hero.jpg` — Hero section fallback image (used when WebGL is unsupported)
   - `about-1.jpg` — About section interior atmosphere
   - `about-2.jpg` — Roasting tray & coffee beans
   - `menu-latte.jpg`, `menu-pour-over.jpg`, `menu-espresso.jpg`, `menu-cold-brew.jpg`, `menu-cappuccino.jpg`, `menu-cortado.jpg`
   - `menu-matcha.jpg`, `menu-chai.jpg`, `menu-earl-grey.jpg`, `menu-jasmine.jpg`
   - `menu-croissant.jpg`, `menu-cinnamon.jpg`, `menu-sourdough.jpg`
   - `menu-avocado.jpg`, `menu-shakshuka.jpg`, `menu-pancakes.jpg`
   - `gallery-1.jpg` through `gallery-8.jpg` — Photo stories grid
   - `avatar-1.jpg`, `avatar-2.jpg`, `avatar-3.jpg` — Customer review portraits
2. Update the corresponding `alt` text in [`src/config/cafe.ts`](file:///c:/Users/amitb/Desktop/Projects/A1/src/config/cafe.ts) for SEO and accessibility.

### 4. Customizing Colors and Fonts
Colors and typography tokens are configured in [`src/index.css`](file:///c:/Users/amitb/Desktop/Projects/A1/src/index.css):
```css
@theme {
  --color-espresso: #2B1B12;
  --color-cream: #F5EBDD;
  --color-caramel: #C98B4B;
  --color-sage: #7A8B69;
  --font-serif: "Playfair Display", Georgia, serif;
  --font-sans: "Inter", system-ui, sans-serif;
}
```

---

## 🚢 Deployment Steps

### Deploying to Vercel
1. Push this repository to GitHub or GitLab.
2. In the [Vercel Dashboard](https://vercel.com/new), select **Import Project**.
3. Vercel automatically detects Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Your site will be live on an SSL-secured URL in under a minute.

### Deploying to Netlify
1. Log in to [Netlify](https://app.netlify.com/) and choose **Add new site** > **Import an existing project**.
2. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Click **Deploy Brew & Bloom**.

---

## 📁 Project Directory Structure

```
A1/
├── public/
│   ├── favicon.svg             # Custom coffee cup SVG favicon
│   └── images/                 # All cafe photography & demo assets
├── scripts/
│   ├── setup-images.mjs        # Image asset synchronization script
│   └── verify-site.mjs         # Headless browser verification suite
├── src/
│   ├── config/
│   │   └── cafe.ts             # MASTER CONFIG: all text, prices, menu, hours, socials
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── three/
│   │   ├── Scene.tsx           # Canvas container & lighting environment
│   │   ├── CoffeeCup.tsx       # Procedural LatheGeometry cup, handle & saucer
│   │   ├── LatteArt.ts         # Procedural canvas latte art texture generator
│   │   ├── SteamParticles.tsx  # Rising animated steam particle system
│   │   ├── CoffeeBeans.tsx     # Orbiting procedural roasted beans with roast crease
│   │   ├── AmbientDust.tsx     # Volumetric sunlight dust particles
│   │   └── CameraRig.tsx       # GSAP ScrollTrigger camera choreography & mouse parallax
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky glass blur navbar + mobile drawer
│   │   ├── Preloader.tsx       # 0-100% coffee filling animation
│   │   ├── CustomCursor.tsx    # Interactive magnetic dot + ring
│   │   ├── TiltCard.tsx        # 3D interactive tilt card with cursor glare
│   │   ├── Lightbox.tsx        # Fullscreen modal image viewer
│   │   ├── StatCounter.tsx     # Animated numeric counter on scroll
│   │   └── WebGLFallback.tsx   # Graceful fallback when WebGL is unavailable
│   ├── sections/
│   │   ├── Hero.tsx            # 3D backdrop, editorial title, CTAs, live badge
│   │   ├── About.tsx           # Story, craft pillars, animated stats counters
│   │   ├── Menu.tsx            # Tabbed categorized menu (Coffee/Tea/Bakery/Brunch)
│   │   ├── Gallery.tsx         # Masonry photo grid with lightbox zoom
│   │   ├── Testimonials.tsx    # Auto-sliding customer reviews carousel
│   │   ├── Reservation.tsx     # Booking form with validation + confetti success modal
│   │   ├── Contact.tsx         # Hours, location details, interactive map preview
│   │   └── Footer.tsx          # Socials, newsletter signup, back to top
│   ├── hooks/
│   │   ├── useLenis.ts         # Smooth scroll initialization & GSAP sync
│   │   └── usePrefersReducedMotion.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css               # Tailwind v4 theme & custom design tokens
├── screenshot-hero.png         # Desktop Hero proof screenshot
├── screenshot-menu.png         # Desktop Menu with 3D TiltCards proof screenshot
├── screenshot-mobile.png       # Mobile Viewport proof screenshot
├── package.json
└── README.md
```
