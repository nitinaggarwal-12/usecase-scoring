import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Locate the Dial 1 and Dial 2 blocks and fix the closing tag </g> to </svg>
old_dials_block = """                    {/* Dial 1: Agent Actions Drift */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                        <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
                        <circle cx="30" cy="30" r="24" fill="none" stroke={colors.accentTeal} strokeWidth="4" strokeDasharray="150" strokeDashoffset="132" style={{ transition: 'stroke-dashoffset 0.3s' }} />
                      </g>
                      <div>
                        <span style={{ fontSize: '0.52rem', color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Agent Actions Drift</span>
                        <span style={{ fontSize: '1rem', fontWeight: 950, color: colors.accentTeal }}>0.12 <span style={{ fontSize: '0.65rem', color: '#4b5563' }}>/ 5.0</span></span>
                        <span style={{ fontSize: '0.48rem', color: '#22c55e', display: 'block', marginTop: '0.05rem' }}>✓ Within FDA Validated Boundary</span>
                      </div>
                    </div>

                    {/* Dial 2: Validation Bounds */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                        <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
                        <circle cx="30" cy="30" r="24" fill="none" stroke={colors.accentAmber} strokeWidth="4" strokeDasharray="150" strokeDashoffset="25" />
                      </g>"""

new_dials_block = """                    {/* Dial 1: Agent Actions Drift */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                        <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
                        <circle cx="30" cy="30" r="24" fill="none" stroke={colors.accentTeal} strokeWidth="4" strokeDasharray="150" strokeDashoffset="132" style={{ transition: 'stroke-dashoffset 0.3s' }} />
                      </svg>
                      <div>
                        <span style={{ fontSize: '0.52rem', color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Agent Actions Drift</span>
                        <span style={{ fontSize: '1rem', fontWeight: 950, color: colors.accentTeal }}>0.12 <span style={{ fontSize: '0.65rem', color: '#4b5563' }}>/ 5.0</span></span>
                        <span style={{ fontSize: '0.48rem', color: '#22c55e', display: 'block', marginTop: '0.05rem' }}>✓ Within FDA Validated Boundary</span>
                      </div>
                    </div>

                    {/* Dial 2: Validation Bounds */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                        <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
                        <circle cx="30" cy="30" r="24" fill="none" stroke={colors.accentAmber} strokeWidth="4" strokeDasharray="150" strokeDashoffset="25" />
                      </svg>"""

if old_dials_block in code:
    code = code.replace(old_dials_block, new_dials_block)
    print("Successfully corrected SVG closing tags on Page 7 dials!")
else:
    print("⚠️ Warning: Dials block not found exactly in PremiumScopingAssessorV12.jsx.")

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Gauge tag correction complete!")
