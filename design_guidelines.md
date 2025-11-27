# Design Guidelines: Couple's Memory-Keeping Website

## Design Approach

**Reference-Based Approach**: Drawing inspiration from Instagram's photo-centric layouts, Pinterest's visual discovery patterns, and Airbnb's warm, inviting aesthetic. This creates an emotionally resonant, visually-rich experience perfect for showcasing intimate memories.

**Core Principles**: Romantic elegance, photo-first presentation, effortless browsing, emotional connection through thoughtful details.

---

## Typography System

**Primary Font**: Playfair Display (Google Fonts) - Elegant serif for headlines and romantic moments
**Secondary Font**: Inter (Google Fonts) - Clean sans-serif for body text and UI elements

**Hierarchy**:
- Hero Headlines: Playfair Display, 3xl-5xl, font-bold
- Memory Titles: Playfair Display, 2xl-3xl, font-semibold
- Section Headers: Playfair Display, xl-2xl, font-semibold
- Dates/Metadata: Inter, sm-base, font-medium, italic for dates
- Body Text: Inter, base, font-normal
- UI Labels/Buttons: Inter, sm-base, font-medium

---

## Layout & Spacing System

**Tailwind Units**: Use 4, 6, 8, 12, 16, 20 for consistent rhythm
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24
- Card gaps: gap-6 to gap-8
- Content max-width: max-w-7xl for galleries, max-w-4xl for forms

**Grid Patterns**:
- Memory Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Timeline View: Single column with alternating left/right cards (max-w-3xl)
- Photo Galleries: Masonry-style grid or 2-4 column responsive grid

---

## Component Library

### Navigation
Clean header with logo/couple names on left, navigation links centered, "Add Memory" CTA button on right. Sticky on scroll with subtle backdrop blur.

### Hero Section
Full-width hero (h-screen or 80vh) with romantic background image (couple's photo with soft overlay). Centered content with elegant headline in Playfair Display, romantic tagline, and primary CTA. Background image should be slightly dimmed for text readability.

### Memory Cards
Elegant cards with rounded corners (rounded-xl), subtle shadow (shadow-lg), and hover lift effect. Structure: Featured image at top (aspect-video or aspect-square), date badge positioned over image (top-right), title below, short excerpt, category tag, and "View Details" link. Card hover: slight scale and shadow increase.

### Timeline View
Vertical timeline with decorative center line, alternating memory cards on left/right. Each card connects to timeline with small decorative element (heart icon or dot). Dates displayed prominently along timeline.

### Memory Detail Modal/Page
Lightbox-style overlay with dark backdrop, centered content area showing large image, full memory details, photo gallery thumbnails below, navigation arrows for previous/next memory. Close button with backdrop blur.

### Category Filters
Pill-style filter buttons (rounded-full) in horizontal scroll/wrap layout. Active state with filled background, inactive with outline only. Categories: First Dates, Anniversaries, Travels, Everyday Moments, Milestones, Special Occasions.

### Add Memory Form
Clean, spacious form layout with labeled inputs. Photo upload area with drag-and-drop zone, preview thumbnails. Date picker, category selector, title and description fields. Large "Save Memory" button at bottom.

### Photo Gallery Grid
Masonry or uniform grid showing all uploaded photos. Lightbox view on click with smooth transitions. Image captions with dates overlay on hover.

### Search Bar
Prominent search with icon, subtle border, rounded corners (rounded-lg). Placeholder text: "Search your memories..."

### Footer
Simple footer with couple's initials or logo, memory count ("250 Beautiful Moments"), subtle decorative elements.

---

## Images

**Hero Image**: Romantic couple photo (intimate moment, soft lighting) - full width background with subtle gradient overlay for text contrast. Blur background slightly if buttons overlay.

**Memory Card Images**: Varied couple photos showing different moments - landscapes, close-ups, candid shots. Each should have aspect-video (16:9) or aspect-square ratio for consistency.

**Category Icons**: Small decorative hearts, calendar, location pins, camera icons to accompany category labels.

**Empty States**: Elegant illustration or icon when no memories exist yet, encouraging first upload.

**Background Patterns**: Subtle decorative elements (soft hearts, stars, or floral patterns) in section backgrounds - very light opacity, never distracting.

---

## Animations

Minimal, romantic touches only:
- Card hover: smooth scale (scale-105) and shadow transition
- Page transitions: gentle fade-in for memory details
- Image loading: soft fade-in reveal
- Heart/favorite icon: gentle pulse on interaction
- Timeline scroll: subtle reveal animations as items enter viewport