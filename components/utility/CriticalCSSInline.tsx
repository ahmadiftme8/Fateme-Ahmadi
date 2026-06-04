/**
 * Critical CSS for above-the-fold content (navbar, hero, headline).
 * Inlines minimal CSS needed for FCP (First Contentful Paint).
 * This component extracts and inlines the most critical styles.
 */

export function CriticalCSSInline() {
  // Critical CSS for navbar, hero section, and above-the-fold content
  // Includes essential layout, typography, and color definitions
  const criticalCSS = `
    /* Essential resets */
    *,*::before,*::after{box-sizing:border-box}
    html{scroll-behavior:smooth}
    html,body{margin:0;padding:0;min-height:100%;background-color:var(--color-background);color:var(--color-foreground);font-size:var(--font-size-base)}
    
    /* Layout essentials */
    .flex{display:flex}
    .min-h-dvh{min-height:100dvh}
    .flex-col{flex-direction:column}
    .flex-1{flex:1}
    .relative{position:relative}
    
    /* Typography */
    body{font-family:var(--font-poppins),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;text-rendering:optimizeLegibility}
    
    /* Header/Navbar styles */
    nav{position:relative;z-index:50}
    
    /* Hero section - above the fold */
    [class*="hero"]{width:100%;min-height:50vh}
    
    /* Images */
    img,svg{display:block;max-width:100%;height:auto}
    
    /* Links */
    a{text-decoration:none;-webkit-tap-highlight-color:transparent}
    
    /* Buttons */
    button{font:inherit;touch-action:manipulation;cursor:pointer}
    
    /* Transitions for critical elements only */
    html{scroll-behavior:smooth}
  `;

  return (
    <style
      dangerouslySetInnerHTML={{ __html: criticalCSS }}
      suppressHydrationWarning
    />
  );
}
