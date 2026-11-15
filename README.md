# Member Solutions Hub

Self-service portal prototype for FHLBank Topeka members: dashboard, tool library, liquidity stress test, marginal cost of funds calculator, analysis requests, guides, and a Business Partner usage view.

> Prototype with **sample data**. Nothing is sent to a server.

## Tech stack

| Layer | Choice |
|---|---|
| UI | [React 19](https://react.dev) |
| Build / dev server | [Vite](https://vite.dev) |
| Routing | [React Router](https://reactrouter.com) (`HashRouter`, URLs like `/#/tools`) |
| State | React Context (`src/context/AppProvider.jsx`) |
| Styling | Plain CSS (`src/styles/global.css`) |
| Charts | Hand-built SVG components |
| Lint | oxlint |

## Getting started

Requires Node.js 20+.

```bash
npm install      # first time only
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally
npm run lint     # check code
```

## Project structure

```
src/
├── main.jsx                 # entry point
├── App.jsx                  # routes
├── assets/                  # logo and images
├── styles/global.css        # all styles
├── context/                 # shared app state (AppProvider)
├── hooks/useApp.js          # read shared state in any component
├── data/                    # sample members, tool catalogue, assumptions, rates
├── utils/                   # number formatting, chart path, calculations
├── components/
│   ├── layout/              # Layout, Sidebar, Topbar
│   ├── ui/                  # Icon, Modal, Toast, Slider, Segmented, PageHead
│   └── charts/              # CapacityChart, LiquidityChart, Donut
└── pages/                   # Home, Tools, ToolPage, Liquidity, Funding,
                             # ToolPreview, Requests, Resources, Insights
```

## Routes

| URL | Page |
|---|---|
| `/#/` | Dashboard |
| `/#/tools` | Tool library |
| `/#/tools/liquidity` | Liquidity Stress Analysis |
| `/#/tools/funding-cost` | Marginal Cost of Funds Analysis |
| `/#/tools/<other-id>` | "In development" preview |
| `/#/requests` | My requests |
| `/#/resources` | Guides & FAQ |
| `/#/insights` | Usage insights (Business Partner view only) |

## Adding a new tool

1. Add or update its entry in `src/data/tools.js` (set `status: 'live'`).
2. Create the page in `src/pages/`, e.g. `Dividend.jsx`.
3. Register it in `LIVE_TOOLS` in `src/pages/ToolPage.jsx`.
