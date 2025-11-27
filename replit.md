# Couple's Memory-Keeping Website

## Overview

A romantic, photo-centric web application designed for couples to capture, organize, and beautifully present their precious memories together. The application features an elegant interface inspired by Instagram's visual layouts and Airbnb's warm aesthetic, allowing couples to store memories with photos, descriptions, dates, and categories. Users can browse memories in grid or timeline views, search and filter by category, and toggle between light and dark themes.

## Recent Changes

- **November 27, 2025**: Completed full-stack implementation
  - Created memory schema with categories (first-dates, anniversaries, travels, everyday, milestones, special)
  - Implemented in-memory storage with full CRUD operations for memories
  - Built RESTful API endpoints for memories (GET, POST, PATCH, DELETE)
  - Connected frontend to backend using React Query with cache invalidation
  - Added toast notifications for user feedback
  - E2E tested all functionality including creation, viewing, favoriting, filtering, and search

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript
- **Routing:** Wouter (lightweight client-side routing)
- **State Management:** TanStack React Query for server state
- **Styling:** Tailwind CSS with shadcn/ui component library
- **Build Tool:** Vite
- **Animation:** Framer Motion for smooth transitions

**Design System:**
- Custom typography using Playfair Display (serif, for romantic headlines) and Inter (sans-serif, for body text)
- Comprehensive Tailwind configuration with custom color scheme supporting light/dark themes
- shadcn/ui components with "new-york" style variant
- Romantic, elegant color palette with primary rose/pink tones

**Component Structure:**
- Modular, reusable components following atomic design principles
- Key components: Header, HeroSection, MemoryCard, MemoryGrid, TimelineView, MemoryDetail dialog, AddMemoryDialog, CategoryFilter, ViewToggle, Footer, ThemeToggle
- All components are type-safe with TypeScript interfaces
- Example components provided in `/client/src/components/examples/` for development reference

**State Management Pattern:**
- React Query handles all server state (fetching, caching, mutations)
- Local component state for UI interactions (modals, filters, search)
- No global state management library needed due to React Query's cache

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database ORM:** Drizzle ORM
- **Database:** PostgreSQL (via Neon serverless)
- **Build:** ESBuild for production bundling

**API Design:**
- RESTful API with JSON responses
- Routes defined in `/server/routes.ts`
- Endpoints follow `/api/*` pattern
- Error handling with appropriate HTTP status codes
- Request validation using Zod schemas

**Storage Layer:**
- Abstract `IStorage` interface defined in `/server/storage.ts`
- In-memory implementation (`MemStorage`) for development
- Database implementation can be swapped by implementing same interface
- Memory and User entities with full CRUD operations

**Development vs Production:**
- Development: Vite dev server with HMR via `/server/vite.ts`
- Production: Pre-built static files served from `/dist/public`
- Conditional middleware based on `NODE_ENV`

### Data Storage Solutions

**Database Schema (Drizzle ORM):**

**Users Table:**
- `id`: UUID primary key (auto-generated)
- `username`: Unique text field
- `password`: Hashed text field

**Memories Table:**
- `id`: UUID primary key (auto-generated)
- `title`: Text field for memory title
- `description`: Text field for detailed description
- `date`: Timestamp when memory occurred
- `category`: Enum type (first-dates, anniversaries, travels, everyday, milestones, special)
- `imageUrl`: Text field storing image URL/path
- `isFavorite`: Boolean flag for favorited memories

**Schema Validation:**
- Drizzle-Zod integration for runtime validation
- Type-safe insert/select schemas exported from shared schema
- Shared types between frontend and backend via `/shared/schema.ts`

**Migration Strategy:**
- Drizzle Kit for schema migrations
- Migration files stored in `/migrations` directory
- `db:push` script for pushing schema changes to database

### Authentication and Authorization

**Current Implementation:**
- User schema defined but authentication not yet implemented
- Password field prepared for future hashing implementation
- Session management dependencies installed (express-session, connect-pg-simple, passport, passport-local)

**Planned Approach:**
- Session-based authentication using Passport.js with local strategy
- PostgreSQL session store via connect-pg-simple
- Password hashing (bcrypt/argon2 to be implemented)
- Protected routes for memory CRUD operations

### External Dependencies

**Third-Party UI Libraries:**
- Radix UI primitives for accessible, unstyled components (dialogs, popovers, dropdowns, etc.)
- Embla Carousel for image carousels
- React Day Picker for calendar/date selection
- Lucide React for consistent iconography

**Development Tools:**
- Replit-specific plugins for development environment integration
- TypeScript for type safety across entire stack
- ESBuild for fast production builds
- Date-fns for date formatting and manipulation

**Asset Management:**
- Static images stored in `/attached_assets/generated_images/`
- Vite alias `@assets` for easy image imports
- No external CDN or image hosting currently configured

**Font Loading:**
- Google Fonts (Playfair Display, Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono)
- Preconnect optimization in HTML head

**Production Dependencies:**
- Express middleware: cors, express-rate-limit, body-parser
- UUID generation via nanoid and crypto
- Form validation via react-hook-form and @hookform/resolvers
- Extensive shadcn/ui component library with Radix UI primitives