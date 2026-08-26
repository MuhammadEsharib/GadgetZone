---
name: impeccable-ui
description: Impeccable UI — Premium Frontend Design. Use when designing, redesigning, reviewing, critiquing, auditing, polishing, or improving any frontend interface — websites, landing pages, dashboards, SaaS apps, web apps, components, forms, navigation, settings, onboarding, and empty/loading/error states. Apply automatically whenever a request involves UI, frontend design, visual design, UX, layout, typography, color, responsive design, accessibility, interaction design, animation, or visual polish.
---

# Impeccable UI — Premium Frontend Design

Inspired by and adapted from the Impeccable project by pbakaus
(https://github.com/pbakaus/impeccable, https://impeccable.style/).
Only the design methodology is adapted here — no provider-specific CLI
commands, shell scripts, hooks, or tooling.

## Core objective

Produce distinctive, production-quality interfaces that feel intentionally
designed by an experienced product designer and frontend engineer. Never
settle for generic AI-generated SaaS aesthetics.

## Design process

Before substantial UI work:

1. Inspect the existing interface.
2. Understand the product and user context.
3. Identify the current design language.
4. Identify typography, colors, spacing, layout, components, interaction patterns.
5. Decide whether the task is refinement, redesign, or a new surface.
6. Preserve existing functionality unless functional changes were requested.
7. Reuse existing components and design tokens where appropriate.
8. Establish a clear visual direction before broad visual changes.

Do not blindly redesign an existing interface.

## Creative north star

For new products or major redesigns, commit to a visual direction across:
product personality, target audience, emotional tone, visual density,
typography personality, color personality, layout/composition, interaction
style, motion language, accessibility requirements.

Prefer a coherent point of view over generic "modern SaaS" styling.

## Premium design principles

Premium quality comes from typography, hierarchy, spacing, composition,
alignment, consistency, restraint, information architecture, interaction
quality, and meaningful details — not from gradients, glassmorphism, glow,
shadows, heavy rounding, or animation.

## AI UI anti-patterns

Avoid unless there is a strong product-specific reason: purple-to-blue or
unnecessary gradients, gradient text, excessive glassmorphism, glowing
borders, neon effects, heavy drop shadows, excessively rounded cards, nested
cards, card grids everywhere, excessive pills and badges, decorative icon
tiles above every heading, random blobs, decorative charts with no purpose,
everything centered, repetitive identical sections, generic SaaS dashboard
layouts, oversized headings without purpose, whitespace without hierarchy,
tiny low-contrast text, arbitrary animation, bounce/elastic motion
everywhere, decoration with no functional purpose.

## Typography

Treat typography as a primary design element. Establish deliberate hierarchy
for display, page titles, section headings, subheadings, body, supporting
text, labels, metadata, buttons, navigation. Do not default to Inter or
Roboto — choose type based on product personality and audience. Use readable
line lengths, appropriate line heights, deliberate weights, and clear
contrast between levels.

## Layout

Compose deliberately instead of dropping everything into cards. Prioritize
hierarchy, alignment, rhythm, content width, whitespace, grouping, balance,
visual flow. Use asymmetry or editorial composition when appropriate. Do not
make every section visually identical.

## Spacing

Use a coherent spacing system, no arbitrary one-off values. Spacing
communicates hierarchy: small gaps for related elements, medium for groups,
large between major sections.

## Color

Use a semantic system: background, surface, surface-elevated, foreground,
foreground-muted, border, primary, primary-hover, secondary, success,
warning, danger. Never introduce colors randomly. Use color for hierarchy,
state, brand, and interaction. Maintain accessible contrast.

## Components

Prefer reusable components and design tokens. Before creating a new one:
reuse an existing component, extend it when appropriate, avoid near-duplicate
components, keep states consistent across related components.

Every interactive component considers: default, hover, focus, active,
disabled, loading, error, success.

## Responsive design

Design responsive behavior intentionally; do not just shrink desktop. Review
navigation, typography, spacing, content width, tables, forms, cards,
dialogs, buttons, touch targets, images, overflow, content hierarchy. Mobile
should feel designed, not compressed.

## Accessibility

Semantic HTML, keyboard navigation, visible focus states, sufficient
contrast, form labels, validation errors, touch target sizes, reduced motion,
meaningful screen-reader labels, logical heading hierarchy.

## Motion

Motion communicates state changes, hierarchy, feedback, transitions, and
spatial relationships. Keep it subtle and intentional. Do not animate
everything or delay the user.

## UX writing

Clear, concise, human copy. No Lorem ipsum, meaningless placeholders, vague
labels, jargon, or repetitive instructions. Buttons name the action. Error
messages explain what happened and what to do next.

## Loading / empty / error states

Design these deliberately — loading, skeletons where appropriate, empty,
error, success, and offline where relevant — in the product's visual
language.

## Design command vocabulary

When the user names a design operation (INIT, SHAPE, CRITIQUE, AUDIT, POLISH,
TYPESET, LAYOUT, COLORIZE, ANIMATE, DISTILL, BOLDER, QUIETER, HARDEN,
RESPONSIVE, CLARIFY, OPTIMIZE), read
`references/design-commands.md` for its meaning and scope.

## Final quality pass

Before completing substantial UI work, review: visual hierarchy, typography,
spacing, layout, color, contrast, responsive behavior, accessibility,
interactive states, loading/empty/error states, component consistency,
unnecessary decoration, generic AI/SaaS patterns, overall distinctiveness.

If it still looks like a generic AI-generated SaaS template, keep refining.

## AI/AI Agent behavior

- Do not modify business logic, database behavior, auth, or API behavior just
  to improve visuals.
- Keep design changes scoped to the requested surface unless consistency
  requires more.
- When improving an existing UI, prefer the smallest set of high-impact
  changes that materially improves quality.
- A requested full redesign allows broad visual change, but preserve
  functional behavior unless told otherwise.

The goal is not flashy. The goal is intentional, coherent, distinctive,
usable, accessible, responsive, production-quality.

# Design command vocabulary

Interpret these as scoped design operations on the current interface.

- **INIT** — Establish the product's design direction: visual language,
  typography, color, spacing, component language, creative direction.
- **SHAPE** — Define or improve the overall visual system and product
  personality.
- **CRITIQUE** — Analyze UX, hierarchy, composition, cognitive load,
  usability, and visual quality _before_ changing anything.
- **AUDIT** — Systematic review of accessibility, responsiveness, interaction
  states, consistency, typography, spacing, contrast, and design quality.
- **POLISH** — Final refinement pass after the major design work is done.
- **TYPESET** — Typography focus: hierarchy, font selection, sizing, weight,
  line height, letter spacing, readable composition.
- **LAYOUT** — Composition focus: spacing, alignment, hierarchy, content
  width, responsive structure.
- **COLORIZE** — Color focus: hierarchy, semantic roles, contrast, states,
  cohesion.
- **ANIMATE** — Purposeful motion and micro-interactions only.
- **DISTILL** — Remove unnecessary visual elements and simplify while keeping
  useful functionality.
- **BOLDER** — Increase visual personality and distinctiveness without adding
  random decoration.
- **QUIETER** — Reduce visual noise, excessive contrast, decoration, or
  unnecessary emphasis.
- **HARDEN** — Improve accessibility, edge cases, responsive behavior, error
  and loading states, robustness.
- **RESPONSIVE** — Review and improve desktop, tablet, and mobile behavior.
- **CLARIFY** — Improve information hierarchy, labels, instructions,
  navigation, and content clarity.
- **OPTIMIZE** — Improve performance-sensitive UI decisions without
  sacrificing design quality.
