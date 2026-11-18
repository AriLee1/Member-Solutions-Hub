# Member Solutions Hub

A self-service web portal prototype for **FHLBank Topeka member institutions** (banks, credit unions and insurance companies). It brings the analyses that Member Solutions currently prepares by request into one place where members can run them on their own, using their own balance-sheet data.

> [!IMPORTANT]
> Status: Early Prototype with **sample data only**. There is nothing connected to any real member data, internal systems, or APIs (in line with security requirements.) All figures are in idea level. 

## Current stage
layout and structure

Overall page layout, navigation and visual style
- Two working sample tools: Liquidity Stress Analysis and Marginal Cost of Funds
- Request flow, guides/FAQ, and a Business Partner usage view
- **Next:** confirm with stakeholders which components each page needs (what members want to see first, which tools matter most), then refine content and priorities
- **Later:** convert remaining report-based analyses into tools; connect real data

## UI & design direction

- **Calm, trustworthy, financial.** Built on the FHLBank Topeka palette: navy `#003359` for text and key numbers, teal `#057A94` for actions and positive states, and light blue `#93B1CC` for surfaces and highlights. Accent colors are used only for status (warnings, shortfalls).
- **Soft card dashboard.** A pale blue canvas with rounded white cards (18px radius) and light shadows. Each card answers one question.
- **Numbers first.** The key figure on each card is large and bold, with a short label above and context below, so members can read their position at a glance.
- **Inputs left, results right.** Every tool follows the same pattern: assumptions on the left (sliders, scenario presets), live results, charts and a sources-and-uses table on the right.
- **Plain language.** Labels describe what a number means ("Remaining borrowing capacity") rather than internal terms.
- **Accessible and responsive.** Readable typography (Plus Jakarta Sans), keyboard-friendly controls, layouts that adapt down to tablet and phone, and respect for reduced-motion settings.
for team's future road map


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
