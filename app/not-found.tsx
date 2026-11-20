// Fallback for requests outside the [locale] segment. The localized 404 is TODO.
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <h1>404</h1>
      </body>
    </html>
  );
}
