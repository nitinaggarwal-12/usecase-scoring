import os

server_path = '/usr/local/google/home/nitinagga/usecase_scoring/server.js'

with open(server_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Target the header middleware block
old_middleware = """app.use((req, res, next) => {
  const host = req.hostname || '';
  const isLocal = host === 'localhost' || host.startsWith('127.0.0.1') || host === '::1';
  const isSecure = req.secure || req.headers['x-forwarded-proto'] === 'https';
  
  if (isSecure || isLocal) {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
  }
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});"""

replacement_middleware = """app.use((req, res, next) => {
  const host = req.hostname || '';
  const isLocal = host === 'localhost' || host.startsWith('127.0.0.1') || host === '::1';
  const isSecure = req.secure || req.headers['x-forwarded-proto'] === 'https';
  const isProxy = host.includes('proxy.googlers.com');
  
  if ((isSecure || isLocal) && !isProxy) {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
  }
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});"""

if old_middleware in code:
    code = code.replace(old_middleware, replacement_middleware)
    print("✓ Successfully patched server.js to bypass COOP/COEP headers on Cloudtop proxy!")
else:
    print("❌ Target middleware block not found in server.js!")

with open(server_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Complete!")
