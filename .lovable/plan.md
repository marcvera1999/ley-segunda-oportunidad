# Landing Page Redesign — Horizonte Legal

Full restructure of `/` (home) for maximum conversion, minimum friction. Keeps existing palette, fonts, SEO, FAQ content, testimonial quotes, quiz logic, Supabase + Make integration, and all other routes untouched.

## Scope

**Touched files**
- `src/routes/index.tsx` — rebuild section composition
- `src/components/site/SiteHeader.tsx` — strip nav, keep logo + sticky gold "Consulta gratis" only
- `src/components/site/SiteFooter.tsx` — collapse to 2 rows
- `src/components/site/ContactForm.tsx` — rebuild as 3-step mini-form (debt pills → phone → name), keep Supabase insert + Make webhook intact
- `src/components/site/EligibilityQuiz.tsx` — restyle only (progress bar, pill yes/no, slide transition, sage result card), logic untouched
- `src/components/site/StickyCTA.tsx` — mobile-only gold bar variant
- `src/styles.css` — add tokens for sage-light `#E8F4EE`, border `#E8E0D4`, hero gradient, base font size bump

**New files**
- `src/components/site/WhatsAppFab.tsx` — floating WhatsApp button with pulse
- `src/components/site/ExitIntent.tsx` — desktop exit-intent toast (session-scoped)
- `src/components/site/TrustBar.tsx` — navy bar with count-up numbers
- `src/components/site/HowItWorks.tsx`, `Identificacion.tsx`, `Testimonials.tsx`, `SeoBlock.tsx` (collapsible), `Hero.tsx`, `MiniLeadForm.tsx` — extracted from index for clarity

**Not touched**
- `src/routes/__root.tsx` meta, `sitemap.xml.ts`, `robots.txt`, all other route files, Supabase migrations, Make webhook URL, FAQ copy, testimonial quotes, quiz questions.

## Section-by-section

1. **Header**: logo left, single sticky gold pill "Consulta gratis" right that scrolls to `#contacto`. Remove all other nav links.
2. **Hero** (`min-h-screen` desktop, centered): gold-bordered pill label, Playfair H1 "¿Y si pudieras / borrar tus deudas / legalmente?" with word-stagger animation, 520px subtitle, single gold CTA → scrolls to mini-form, 5-star micro social proof line. Background: `linear-gradient(#FAF8F4, #F5F0E8)` + faint 4% gold circle behind H1.
3. **Trust bar**: navy `#0D1B2A`, 4 items with thin dividers, gold Playfair numbers (count-up on view), white Lato labels, 20px vertical padding. 2x2 on mobile.
4. **Identificación**: 2x2 cards (1 col mobile), emoji + first-person phrase + empathetic line; sage-green italic transition line below.
5. **Mini form** (`#contacto`): gold-bordered white card, shadow `0 8px 40px rgba(201,168,76,0.12)`. Step 1 debt pills (2-col grid, last full-width); Step 2 phone slides in after selection; Step 3 name slides in after phone; GDPR check; gold submit. Success state replaces card with animated check + "Gracias, [nombre]. Te llamamos en menos de 2 horas." Wire payload through existing `supabase.from('leads').insert(...)` + `fetch(MAKE_WEBHOOK, ...)` non-blocking. Field mapping: `deuda_aproximada` ← selected pill label, `contacto_tipo: 'telefono'`, `contacto_valor` ← phone, `nombre` ← name, `situacion: null`, `mensaje: null`.
6. **How it works**: horizontal stepper desktop (dashed gold connector), vertical mobile, 4 steps with emoji icons + 2-line bodies, muted footer line.
7. **Social proof**: 3 testimonial cards (existing quotes Carlos/María/Ahmed), white with 4px gold left border, italic quote no quotes, sage initials avatar + name/city + gold debt amount. Horizontal snap-scroll on mobile. Navy 3-stat bar below.
8. **Quiz**: existing logic preserved; visual shell only — gold-bordered card max-w 600px, gold progress bar "Pregunta X de 5", Playfair 24px question, large pill Yes (sage) / No (muted), slide-left transition, sage-light result card with CTA scrolling to mini-form.
9. **FAQ**: borderless accordion (bottom border only), single-open, first open by default, rotating chevron — content unchanged.
10. **SEO block**: H2 + first paragraph visible, "Leer más" expands the rest (height/opacity transition). All copy preserved for indexing.
11. **Footer**: 2 rows only — logo / legal links / phone+WhatsApp; then "© 2026 Horizonte Legal · ICAB Colegiados · Barcelona".

## Floating elements
- **WhatsAppFab**: 56px circle (52px mobile), `#25D366`, white icon, hover tooltip, pulse ring every 4s, appears after 3s. Link as specified.
- **Mobile sticky CTA**: full-width gold bar 56px, "Consulta gratuita → Respuesta en 2h", appears after scrolling past hero, shadow above. Replaces current StickyCTA mobile bar.
- **ExitIntent (desktop)**: `mouseleave` toward top triggers bottom-left toast once per session (`sessionStorage` flag), dismissable.

## Design tokens (additions to `src/styles.css`)
- `--sage-light: #E8F4EE`
- `--border-warm: #E8E0D4`
- `--gradient-hero: linear-gradient(180deg, #FAF8F4 0%, #F5F0E8 100%)`
- Base body font-size → 18px; H1 desktop 56px / mobile 38px (36px in hero per mobile spec)
- Section vertical padding +40% (use `py-32 md:py-44` where current is `py-24 md:py-32`)

## Animations
- Section reveal: existing `Reveal` component already does Intersection Observer fade-up; reuse with `threshold 0.15`, `translateY 24px`, `duration 0.5s`.
- Hero H1: framer-motion word stagger 0.15s.
- Trust bar numbers: count-up hook (rAF, 1.5s ease-out) triggered on first intersection.
- Form pill: `hover:scale-[1.02]`, `active:scale-100`.
- Submit: spinner replaces arrow, button disabled while pending.
- FAQ chevron: `rotate-180 transition-transform duration-200`.
- Testimonials: `hover:-translate-y-1 hover:shadow-lg transition`.

## Constraints honored
- Supabase insert shape unchanged (no `.select()`, no `.single()`).
- Make webhook URL and payload unchanged.
- No new routes, no SEO meta changes, FAQ + testimonial + quiz copy verbatim.
- All colors via tokens; no hard-coded hex in components beyond the WhatsApp brand green.

## Out of scope
- A/B testing, analytics events, new translations, image generation for testimonial avatars (initials only), changes to other pages, backend schema changes.
