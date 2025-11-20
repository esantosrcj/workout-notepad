// Routes with 'auto' can be dynamically server rendered
export const prerender = false;

// SSR:
// Normally, SvelteKit renders your page on the server first
// and sends that HTML to the client where it's hydrated.
// If you set 'ssr' to false, it renders an empty 'shell' page instead.

// If you add 'export const ssr = false' to your root +layout.js,
// your entire app will only be rendered on the client — which essentially means
// you turn your app into an SPA.

// CSR:
// Some pages don't require JavaScript at all — many blog posts and 'about'
// pages fall into this category.

// Disabling CSR does not ship any JavaScript to the client.
