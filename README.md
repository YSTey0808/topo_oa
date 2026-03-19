# Rick & Morty Universe Explorer

An interactive data dashboard that lets you explore characters from the Rick & Morty universe and visualize how they are distributed across origin locations.

## Overview

### Approach & Architecture

Built with **React + Vite** for fast development and hot module reloading, **Tailwind CSS** for utility-first dark-themed styling, and **Recharts** for responsive data visualizations.

**Data flow:**
```
Rick & Morty API → useCharacters (hook) → App (filter + pagination state) → Charts + CharacterGrid
```

**Key architectural decisions:**
- `hooks/useCharacters.js` — fetches the first page to discover total page count, then fetches all remaining pages in parallel with `Promise.all`. This reduces load time from ~42 sequential requests to roughly 2 round trips.
- `utils/filterCharacters.js` — pure utility functions with no React dependencies, making them easy to unit test.
- `App.jsx` owns all filter and pagination state; derived data (filtered list, paginated slice) is computed with `useMemo` to avoid unnecessary re-renders.
- Components are purely presentational — they receive data and callbacks via props.

### Features

- **Character Explorer** — browse all 826+ characters with lazy-loaded avatar images
- **Search** — filter by character name (case-insensitive)
- **Filters** — filter by species, status (Alive / Dead / Unknown), and origin location
- **Origin Bar Chart** — top 10 origin locations by character count (updates with active filters)
- **Status Pie Chart** — alive / dead / unknown distribution (updates with active filters)
- **Live stats bar** — total characters, filtered count, unique origins, unique species
- **Pagination** — 20 characters per page

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
cd rick-morty-explorer
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Testing Instructions

Run the full test suite:

```bash
npm test
```

Run in watch mode during development:

```bash
npm run test:watch
```

Run with interactive UI:

```bash
npm run test:ui
```

Tests are located in `src/utils/filterCharacters.test.js` and cover:

- **`filterCharacters`** — search by name, filter by species, filter by status, filter by origin, combined multi-filter, empty results
- **`getUniqueValues`** — deduplication, sorting, and nested `origin.name` key handling

## Assumptions & Challenges

**Assumptions:**

- Characters with `origin.name === "unknown"` are treated as a valid origin group and included in charts. This accurately reflects the API data rather than hiding it.
- Status values are matched case-sensitively as returned by the API (`Alive`, `Dead`, `unknown`).
- The full character dataset (~826 characters across ~42 pages) is fetched on mount. This gives complete filter/chart accuracy at the cost of a brief loading period.

**Challenges:**

- **Parallel pagination**: The API has no bulk endpoint. Fetching page 1 first to get the total page count, then dispatching all remaining requests in parallel, reduces loading time significantly vs. sequential fetches.
- **Large origin dropdown**: With 100+ unique origin values, the origin filter select is functional but not ideal for UX. A searchable combobox would be a natural improvement.
- **Chart label truncation**: Long origin names (e.g. "Earth (Replacement Dimension)") are truncated to 22 characters in the bar chart Y-axis. The full name is shown in the hover tooltip.

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| Vite | 5 | Build tool & dev server |
| Tailwind CSS | 3 | Utility-first styling |
| Recharts | 2 | Data visualization |
| Vitest | 2 | Unit testing |
| Testing Library | 16 | Component testing utilities |
