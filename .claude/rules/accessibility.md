# Rule: Accessibility standards

Loaded when auditing, or when finishing any interactive element.

Split out of `CLAUDE.md` so it loads only when the work calls for it. The
headings below are unchanged, so any pointer to them still resolves.

---

## Accessibility Standards

### Mandatory Checks (P0 — Every Component)
1. Keyboard navigable — Tab reaches it, Enter/Space activates it
2. Focus visible — Focus ring meets 3:1 contrast
3. Screen reader — Announces name, role, state
4. Color contrast — 4.5:1 text, 3:1 UI
5. Target size — ≥ 24×24px
6. No color-only — Information not conveyed by color alone

### WCAG 2.2 New Criteria (Prioritize)
- **2.4.11 Focus Not Obscured** — Sticky headers must not cover focused elements
- **2.5.8 Target Size** — All touch targets ≥ 24×24px
- **3.3.8 Accessible Authentication** — No cognitive function tests; allow password managers

### Implementation Reference
- Full checklist: `.claude/skills/ux-ui-kit/accessibility/wcag-checklist.md`
- ARIA patterns for 19 components: `.claude/skills/ux-ui-kit/accessibility/aria-patterns.md`
- Cognitive accessibility (load, plain language, memory, dyslexia, reduced-data): `.claude/skills/ux-ui-kit/accessibility/cognitive.md`
- Internationalization & RTL (logical properties, mirroring, text expansion): `.claude/skills/ux-ui-kit/accessibility/i18n-rtl.md`
- Vision (color blindness, low vision, high-contrast / forced-colors): `.claude/skills/ux-ui-kit/accessibility/vision.md`
- AAA upgrade delta (when targeting the highest support level): `.claude/skills/ux-ui-kit/accessibility/wcag-aaa.md`
