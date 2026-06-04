/**
 * DeferredCSS inline script
 * Injects a script that defers CSS loading using media="print" onload technique
 * This prevents render-blocking CSS while ensuring styles are applied after page renders
 */

export function DeferredCSSScript() {
  const deferCSSScript = `
    (function(){
      const links = document.querySelectorAll('link[rel="stylesheet"][data-precedence="next"]');
      links.forEach(link => {
        link.media = 'print';
        link.onload = function() {
          this.media = 'all';
        };
        if (link.sheet) {
          link.media = 'all';
        }
      });
      window.addEventListener('load', function() {
        const remainingLinks = document.querySelectorAll('link[rel="stylesheet"][media="print"]');
        remainingLinks.forEach(link => {
          link.media = 'all';
        });
      });
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: deferCSSScript }}
      suppressHydrationWarning
    />
  );
}
