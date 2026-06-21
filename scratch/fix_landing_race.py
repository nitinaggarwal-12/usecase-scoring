import os

v3_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/App_v3.jsx'

with open(v3_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Target the hash update statement around line 803
old_hash_update = """    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }"""

replacement_hash_update = """    if (window.location.hash !== newHash) {
      // Guard: If we are starting a new assessment or loading a demo preset, do not overwrite the hash!
      if (window.location.hash.includes('action=start') || window.location.hash.includes('preset=')) {
        return;
      }
      window.location.hash = newHash;
    }"""

if old_hash_update in code:
    code = code.replace(old_hash_update, replacement_hash_update)
    print("✓ Successfully deployed hash-synchronizer route guard!")
else:
    print("❌ old_hash_update not found in App_v3.jsx!")

with open(v3_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Complete!")
