// Secure HMR Fast-Refresh Polyfill Guard
// Encapsulates defensive window module registrations to protect component hot-reloading boundaries.
if (typeof window !== 'undefined') {
  window.$RefreshReg$ = window.$RefreshReg$ || (() => {});
  window.$RefreshSig$ = window.$RefreshSig$ || (() => (type) => type);
}
export default {};
