# Checklist antes de publicar (la pasa Claude y luego Javier)

## Contenido
- [ ] Responde la duda del título en las primeras 3 líneas.
- [ ] 400-600 palabras, frases cortas, tuteando, sin jerga (o explicada).
- [ ] Incluye "Qué puedes hacer ahora" con pasos concretos.
- [ ] Sin dramatismo ni miedo; tono tranquilo y empático.

## Legal (publicidad de abogados — normas del ICAB / Código Deontológico)
- [ ] NO promete resultados ni cancelaciones garantizadas ("te quitamos
      las deudas"). Usa "puede", "dependerá de tu caso".
- [ ] No hay datos inventados: plazos, importes, leyes y porcentajes
      están comprobados en BOE / TRLC / CGPJ, o marcados [VERIFICAR].
- [ ] No da asesoramiento sobre un caso concreto: informa y remite a consulta.
- [ ] No compara con otros despachos ni usa testimonios inventados.
- [ ] No hay descuentos agresivos ni captación con presión.
- [ ] Javier ha revisado y resuelto TODOS los [VERIFICAR].

## SEO
- [ ] Palabra clave en el título y en las primeras líneas.
- [ ] `description` de 140-160 caracteres.
- [ ] `slug` sin acentos ni fecha; categoría de la lista cerrada.
- [ ] 2-3 enlaces internos a páginas del sitio.

## Técnico
- [ ] Frontmatter completo y archivo en `src/content/blog/<slug>.md`.
- [ ] Sin HTML, tablas ni imágenes.
- [ ] Para publicar: Javier cambia `status: published` y hace merge.
      La fecha `date` no puede ser futura si quiere que salga ya.

Resultado de la revisión: Claude lo deja al final del Pull Request.
