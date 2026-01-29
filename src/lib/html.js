/**
 * Býr til HTML beinagrind fyrir síðu.
 * @param {string} title Titill síðunnar
 * @param {string} content Innihald síðunnar (body)
 * @returns {string} Fullbúið HTML skjal
 */
export function template(title, content) {
  return `<!doctype html>
<html lang="is">
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="styles.css">
    <script type="module" src="scripts.js"></script>
  </head>
  <body>
    <main>
      ${content}
    </main>
  </body>
</html>`;
}