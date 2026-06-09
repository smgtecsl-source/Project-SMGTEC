# SMGTEC SL Design System (Open CoDesign Blueprint)

This file serves as the core design specification for the SMGTEC Barcelona MSP & Smarthands website.

## 1. Color Tokens (OKLCH Palette)
Following Tailwind CSS v4 design parameters:

| Token | Purpose | Dark Mode (Default) | Light Mode |
|---|---|---|---|
| `--color-background` | Canvas backdrop | `oklch(15% 0.015 240)` (Deep Slate Blue) | `oklch(100% 0 0)` (Pure White) |
| `--color-surface` | Cards, boxes, modals | `oklch(22% 0.02 240)` (Slate Surface) | `oklch(98% 0.005 240)` (Warm Gray) |
| `--color-primary` | Main brand identity | `oklch(55% 0.18 240)` (Teal Blue) | `oklch(50% 0.2 245)` (Royal Indigo) |
| `--color-accent-secure` | Active states, trust | `oklch(75% 0.15 150)` (Active Neon Green) | `oklch(65% 0.18 145)` (Emerald Green) |
| `--color-accent-warning` | Warning states, alerts | `oklch(75% 0.18 60)` (Alert Orange) | `oklch(65% 0.22 55)` (Sienna Orange) |
| `--color-text-primary` | High-contrast copy | `oklch(96% 0.01 240)` (Ice White) | `oklch(15% 0.02 240)` (Charcoal) |
| `--color-text-muted` | Captions, secondary text | `oklch(70% 0.02 240)` (Cool Gray) | `oklch(45% 0.03 240)` (Slate Gray) |
| `--color-border` | Framing, subtle lines | `oklch(25% 0.02 240)` | `oklch(90% 0.01 240)` |

## 2. Typography
- **Primary & Display font:** `Readex Pro` & `Inter` sans-serif
- **Data & Monospace font:** `JetBrains Mono` for IT status logs, calculators, and telemetry metrics.

## 3. Custom Utilities
- Inline status pulse animations.
- Cost-of-Downtime calculations.
- Dispatch SLA matrices.
