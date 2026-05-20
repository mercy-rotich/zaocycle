# ZaoCycle API Integration Workflows

This document tracks the phased plan for connecting the frontend to the backend API.
All API endpoints are documented in `api.md`. All page/component patterns are in `frontend.md`.

---

## Current State (as of 2026-05-20)

- UI pages exist across 5 portals: Buyer (`/buy/*`), Farmer (`/farmer/*`), Rider (`/rider/*`), Staff Dashboard (`/dashboard/*`), and a landing page
- All pages run on **hardcoded mock data** (`lib/*-mock-data.ts`)
- **No API infrastructure exists** — no Axios, no TanStack Query, no Zustand, no auth, no `.env`
- Dependencies installed: Next.js, React, Lucide, Tailwind only

---

## Phase Order

```
Phase 0 → Foundation        (Axios, Zustand, QueryClient, middleware)
Phase 1 → Authentication    (login, register, logout — all roles)
Phase 2 → Public Pages      (products listing, certificate verify)
Phase 3 → Buyer Portal      (replace mock data in /buy/*)
Phase 4 → Farmer Portal     (replace mock data in /farmer/*)
Phase 5 → Rider Portal      (replace mock data in /rider/*)
Phase 6 → Staff Dashboard   (replace mock data in /dashboard/*)
Phase 7 → Admin Panel       (new pages — staff & rider management)
```

Phases 0 and 1 are **strict blockers** — nothing else works without them.
Phases 2–7 can proceed in any order after Phase 1 is done.

---

## Phase 0 — Foundation

**Goal:** Create all shared infrastructure that every portal depends on.

### Install dependencies
```bash
npm install @tanstack/react-query axios zustand react-hook-form zod @hookform/resolvers date-fns sonner
```

### Files to create

| File | Purpose |
|---|---|
| `.env.local` | Environment variables |
| `lib/api/client.ts` | Axios instance + interceptors |
| `lib/api/auth.ts` | Auth API calls (login, register, refresh, logout) |
| `store/authStore.ts` | Zustand auth store |
| `components/auth/AuthHydrator.tsx` | Silent token refresh on page load |
| `components/Providers.tsx` | QueryClientProvider + AuthHydrator + Toaster |
| `app/layout.tsx` | Update to mount Providers |
| `middleware.ts` | Edge route guard — redirect by role cookie |

### `.env.local` content
```bash
# Server-only (Server Components)
API_BASE_URL=http://localhost:8080/api/v1

# Exposed to browser (Axios / Client Components)
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1

NEXT_PUBLIC_APP_NAME=ZaoCycle
```

### Role → Route mapping (used in middleware + post-login redirect)
```
BUYER        → /buy
FARMER       → /farmer
RIDER        → /rider
COOP_MANAGER → /dashboard
ADMIN        → /dashboard
```

### Middleware protected paths
```
/buy/*        → BUYER only
/portal/*     → BUYER only
/farmer/*     → FARMER only
/rider/*      → RIDER only
/dashboard/*  → COOP_MANAGER or ADMIN
/admin/*      → ADMIN only
```

### APIs touched
- `POST /api/v1/auth/refresh` — via Axios response interceptor (silent re-auth)

### Done when
- [ ] All deps installed
- [ ] `.env.local` exists
- [ ] `lib/api/client.ts` created with request + response interceptors
- [ ] `store/authStore.ts` created (accessToken in-memory, refreshToken + user in localStorage)
- [ ] `Providers.tsx` wraps the root layout
- [ ] `middleware.ts` redirects unauthenticated users to `/login`

---

## Phase 1 — Authentication

**Goal:** All 5 user types can log in and be redirected to their portal. Logout works.

**Depends on:** Phase 0

### Pages to build / update

| Page | What it does | APIs |
|---|---|---|
| `/login` | Single form with role toggle (Buyer vs Staff) and separate fields for Farmer (phone+PIN) and Rider (phone+password) | `POST /auth/buyer/login`, `POST /auth/staff/login`, `POST /auth/farmer/login`, `POST /auth/rider/login` |
| `/register` | Buyer sign-up form | `POST /auth/buyer/register` |

### Files to create

| File | Purpose |
|---|---|
| `app/login/page.tsx` | Login page shell |
| `components/auth/LoginForm.tsx` | `'use client'` — form with role toggle |
| `app/register/page.tsx` | Register page shell |
| `components/auth/RegisterForm.tsx` | `'use client'` — buyer registration form |
| `lib/api/auth.ts` | `authApi.login()`, `authApi.register()`, `authApi.refresh()`, `authApi.logout()` |

### Login form fields by role
- **Buyer / Staff / Admin:** email + password
- **Farmer:** phone + PIN
- **Rider:** phone + password

### Post-login behaviour
1. Call the correct login endpoint based on role toggle
2. Store tokens in Zustand (`login(tokenResponse)`)
3. Write role cookie: `document.cookie = \`zao-role=\${role}; path=/; SameSite=Strict\``
4. Redirect: `router.push(ROLE_REDIRECT[role])`

### Logout behaviour
1. `POST /auth/logout` with refreshToken
2. `useAuthStore.getState().logout()`
3. `document.cookie = 'zao-role=; Max-Age=0; path=/'`
4. `queryClient.clear()`
5. `router.push('/login')`

### Zod schemas needed
```ts
// lib/validators.ts
loginBuyerSchema    — email, password
loginStaffSchema    — email, password
loginFarmerSchema   — phone, pin
loginRiderSchema    — phone, password
registerBuyerSchema — email, password, phone, buyerType, displayName, contactPerson?, address?, ward?
```

### Done when
- [ ] Buyer can register and land on `/buy`
- [ ] Buyer can log in and land on `/buy`
- [ ] Staff/Admin can log in and land on `/dashboard`
- [ ] Farmer can log in (phone+PIN) and land on `/farmer`
- [ ] Rider can log in (phone+password) and land on `/rider`
- [ ] Logout clears all state and redirects to `/login`
- [ ] Middleware blocks access to protected routes

---

## Phase 2 — Public Pages

**Goal:** Public pages show real data without requiring login.

**Depends on:** Phase 0 (for Server Component fetch pattern)

### Pages to update

| Page | Change | API |
|---|---|---|
| `app/page.tsx` (landing) | Replace mock product preview with real top 3 products | `GET /products` |
| `app/products/page.tsx` (if exists, else create) | Server Component product grid | `GET /products` |
| `app/verify/[token]/page.tsx` (or current scan page) | Server Component — fetch cert by token | `GET /certificates/verify/:token` |

### Note on verify page
The current project has `/buyer/verify/[batchCode]` and `/scan/demo` pages with mock data.
These should be consolidated into `app/verify/[token]/page.tsx` as a Server Component.

### Fetch pattern (no Axios — Server Components only)
```ts
const res = await fetch(`${process.env.API_BASE_URL}/products`, {
  next: { revalidate: 60 },
});
```

### Done when
- [ ] Landing page shows real products (or gracefully handles empty/error)
- [ ] `/verify/:token` shows real certificate data or a not-found state

---

## Phase 3 — Buyer Portal

**Goal:** Replace all mock data in `/buy/*` with real API data.

**Depends on:** Phase 1

### Files to create

| File | Purpose | API |
|---|---|---|
| `lib/api/products.ts` | `productsApi.list()`, `productsApi.get(id)` | `GET /products`, `GET /products/:id` |
| `lib/api/orders.ts` | `ordersApi.place()`, `ordersApi.list()`, `ordersApi.get()`, `ordersApi.cancel()` | Buyer orders endpoints |
| `lib/api/buyer.ts` | `buyerApi.getMe()`, `buyerApi.updateMe()` | `GET /buyer/me`, `PATCH /buyer/me` |
| `lib/api/profile.ts` | `profileApi.uploadImage()`, `profileApi.getImage()` | `POST /profile/image`, `GET /profile/image` |
| `hooks/useProducts.ts` | `useProductsQuery()` | — |
| `hooks/useOrders.ts` | `useMyOrdersQuery(page)`, `useOrderQuery(id)`, `usePlaceOrderMutation()`, `useCancelOrderMutation()` | — |
| `hooks/useBuyer.ts` | `useBuyerProfileQuery()`, `useUpdateBuyerMutation()` | — |

### Pages to update

| Page | Replace with |
|---|---|
| `app/buy/page.tsx` | Real products via `useProductsQuery()` |
| `app/buy/orders/page.tsx` (if exists) | Real orders via `useMyOrdersQuery()` |
| `app/buy/orders/[id]/page.tsx` | Real order detail via `useOrderQuery(id)` |
| `app/buy/checkout/page.tsx` | Real order placement via `usePlaceOrderMutation()` |

### Query key conventions
```ts
['products']
['buyer', 'orders']
['buyer', 'orders', orderId]
['buyer', 'profile']
```

### Done when
- [ ] Buyer sees real product list
- [ ] Buyer can place an order (M-Pesa prompt triggers)
- [ ] Buyer can view and cancel orders
- [ ] Buyer profile loads and edits save

---

## Phase 4 — Farmer Portal

**Goal:** Replace all mock data in `/farmer/*` with real API data.

**Depends on:** Phase 1

### Files to create

| File | Purpose | API |
|---|---|---|
| `lib/api/farmer.ts` | `farmerApi.getPickups()`, `farmerApi.getEarnings()` | `GET /farmer/pickups`, `GET /farmer/earnings` |
| `lib/api/applications.ts` | `applicationsApi.listByFarmer(farmerId)` | `GET /pesticide-applications/farmer/:farmerId` |
| `lib/api/chemicals.ts` | `chemicalsApi.list()`, `chemicalsApi.get(id)` | `GET /chemicals`, `GET /chemicals/:id` |
| `hooks/useFarmer.ts` | `useFarmerPickupsQuery()`, `useFarmerEarningsQuery()` | — |
| `hooks/useApplications.ts` | `useApplicationsQuery(farmerId)` | — |

### Pages to update

| Page | Replace with |
|---|---|
| `app/farmer/pickups/page.tsx` | Real pickups via `useFarmerPickupsQuery()` |
| `app/farmer/applications/page.tsx` | Real applications via `useApplicationsQuery()` |
| `app/farmer/dashboard/page.tsx` | Real earnings via `useFarmerEarningsQuery()` |

### Note
Farmer `id` comes from `useAuthStore().user.id` after login.

### Query key conventions
```ts
['farmer', 'pickups']
['farmer', 'earnings']
['farmer', 'applications', farmerId]
['chemicals']
```

### Done when
- [ ] Farmer sees real pickup history
- [ ] Farmer sees real earnings summary
- [ ] Farmer sees real pesticide application records

---

## Phase 5 — Rider Portal

**Goal:** Replace all mock data in `/rider/*` with real API data.

**Depends on:** Phase 1

### Files to create

| File | Purpose | API |
|---|---|---|
| `lib/api/rider.ts` | `riderApi.getTodayPickups()`, `riderApi.getPickup(id)`, `riderApi.collectPickup(id, formData)` | `GET /rider/pickups/today`, `GET /rider/pickups/:id`, `POST /rider/pickups/:id/collect` |
| `hooks/useRider.ts` | `useRiderTodayPickupsQuery()`, `useRiderPickupQuery(id)`, `useCollectPickupMutation()` | — |

### Pages to update

| Page | Replace with |
|---|---|
| `app/rider/pickups/page.tsx` | Real today's pickups via `useRiderTodayPickupsQuery()` |
| `app/rider/pickup/[id]/page.tsx` | Real pickup detail via `useRiderPickupQuery(id)` |

### Special: collect pickup
The collect endpoint is `multipart/form-data` with `weightKg`, optional `photo` file, and `notes`.
`useCollectPickupMutation` must send a `FormData` object, not JSON.

### Query key conventions
```ts
['rider', 'pickups', 'today']
['rider', 'pickups', pickupId]
```

### Done when
- [ ] Rider sees today's assigned pickups
- [ ] Rider can view pickup detail
- [ ] Rider can submit a collection with weight (and optional photo)

---

## Phase 6 — Staff Dashboard

**Goal:** Replace all mock data in `/dashboard/*` with real API data.

**Depends on:** Phase 1

### Files to create

| File | Purpose | API |
|---|---|---|
| `lib/api/pickups.ts` | `pickupsApi.list(params)`, `pickupsApi.assign(id, riderId)`, `pickupsApi.cancel(id)` | Dashboard pickup endpoints |
| `lib/api/dashboardOrders.ts` | `dashOrdersApi.list(params)`, `dashOrdersApi.markReady(id)`, `dashOrdersApi.markDelivered(id)` | Dashboard order endpoints |
| `lib/api/inventory.ts` | intake + batches + stock calls | `GET/POST /dashboard/inventory/*` |
| `lib/api/certificates.ts` | `certsApi.get(id)`, `certsApi.revoke(id)` | `GET/POST /dashboard/certificates/*` |
| `hooks/useDashboard.ts` | `usePickupsQuery(filters)`, `useAssignRiderMutation()`, `useCancelPickupMutation()` | — |
| `hooks/useInventory.ts` | `useIntakeQuery()`, `useBatchesQuery()`, `useStockQuery()`, mutations | — |
| `hooks/useDashboardOrders.ts` | `useDashOrdersQuery()`, `useMarkReadyMutation()`, `useMarkDeliveredMutation()` | — |

### Pages to update

| Page | Replace with |
|---|---|
| `app/dashboard/page.tsx` (overview) | Real stock + pickup/order counts |
| Pickups page | Real pickup list with filter chips + assign/cancel actions |
| Orders page | Real order list + status actions |
| Inventory page | Tabs: intake list + record form, batch list + create form, stock display |
| Certificates page | Real cert list + revoke + QR modal |

### Known API gap (from frontend.md)
- No `GET /dashboard/certificates` list endpoint exists yet — only `GET /dashboard/certificates/:id`
- No `GET /dashboard/stats` summary endpoint — aggregate client-side from pickups + orders for now

### Query key conventions
```ts
['dashboard', 'pickups', filters]
['dashboard', 'orders', filters]
['dashboard', 'inventory', 'intake']
['dashboard', 'inventory', 'batches']
['dashboard', 'inventory', 'stock']
['dashboard', 'certificates', certId]
```

### Done when
- [ ] Overview shows real stock, pickup counts, and pending orders
- [ ] Staff can view, filter, assign riders to, and cancel pickups
- [ ] Staff can mark orders ready and delivered
- [ ] Staff can record intake and create production batches
- [ ] Staff can view and revoke certificates

---

## Phase 7 — Admin Panel

**Goal:** Build new admin pages for staff and rider management.

**Depends on:** Phase 1

### Files to create

| File | Purpose | API |
|---|---|---|
| `lib/api/staff.ts` | `staffApi.list()`, `staffApi.create()`, `staffApi.get(id)`, `staffApi.deactivate(id)`, `staffApi.activate(id)` | `GET/POST/DELETE /admin/staff`, `POST /admin/staff/:id/activate` |
| `lib/api/riders.ts` | `ridersApi.get(id)`, `ridersApi.create()`, `ridersApi.deactivate(id)` | `GET/POST/DELETE /admin/riders/*` |
| `hooks/useStaff.ts` | `useStaffQuery()`, `useCreateStaffMutation()`, `useDeactivateStaffMutation()`, `useActivateStaffMutation()` | — |
| `hooks/useAdminRiders.ts` | `useRiderQuery(id)`, `useCreateRiderMutation()`, `useDeactivateRiderMutation()` | — |

### Pages to create

| Page | URL |
|---|---|
| `app/admin/staff/page.tsx` | `/admin/staff` — table with create + deactivate/reactivate |
| `app/admin/staff/new/page.tsx` | `/admin/staff/new` — create staff form |
| `app/admin/staff/[id]/page.tsx` | `/admin/staff/:id` — detail + actions |
| `app/admin/riders/page.tsx` | `/admin/riders` — table |
| `app/admin/riders/new/page.tsx` | `/admin/riders/new` — register rider form |
| `app/admin/riders/[id]/page.tsx` | `/admin/riders/:id` — detail |

### Known API gap
- No `GET /admin/riders` list endpoint — use individual `GET /admin/riders/:id` or ask backend to add list endpoint

### Done when
- [ ] Admin can list and create staff users
- [ ] Admin can deactivate and reactivate staff
- [ ] Admin can register and deactivate riders

---

## Progress Tracker

| Phase | Status | Notes |
|---|---|---|
| Phase 0 — Foundation | ✅ Done | Axios client, Zustand auth store, QueryClient, Providers, middleware, .env.local, next.config rewrite |
| Phase 1 — Authentication | ✅ Done | LoginForm (4 role tabs), RegisterForm (buyer), /login, /register pages, role cookie, post-login redirect |
| Phase 2 — Public Pages | ✅ Done | /products (Server Component, ISR 60s), /verify/[token] (Server Component, no-cache), landing page ProductsPreview section |
| Phase 3 — Buyer Portal | Not started | |
| Phase 4 — Farmer Portal | Not started | |
| Phase 5 — Rider Portal | Not started | |
| Phase 6 — Staff Dashboard | Not started | |
| Phase 7 — Admin Panel | Not started | |
