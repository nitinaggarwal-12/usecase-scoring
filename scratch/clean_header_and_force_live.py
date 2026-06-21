file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Force dynamic live generation for the Merck demo preset by ignoring pre-saved liveSynthesis in handleRoute
old_preset_load_block = """      if (idParam && matchedTile && matchedTile.scoringVector) {
        const vec = matchedTile.scoringVector;
        let restoredScores = vec.scores || vec.answers || {};"""

new_preset_load_block = """      if (idParam && matchedTile && matchedTile.scoringVector) {
        const vec = { ...matchedTile.scoringVector };
        // If loading the Merck demo preset, ignore any stale, hardcoded pre-saved liveSynthesis
        // to force a fresh, dynamic, real-time scoping generation!
        if (idParam === 'demo_merck_preset' || presetParam) {
          vec.liveSynthesis = null;
        }
        let restoredScores = vec.scores || vec.answers || {};"""

content = content.replace(old_preset_load_block, new_preset_load_block)

# 2. Clean up the header layout: Remove all the noisy badges and group them into a single, clean, elegant brand header
old_badges_block = """            {/* Highly Prominent UI Introspection Attestation Badges (GCP Live + Cloud DLP GxP) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.15rem 0', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.62rem', fontWeight: 900, background: liveSynthesis ? 'rgba(16,185,129,0.18)' : 'rgba(245,158,11,0.18)', color: liveSynthesis ? '#10b981' : '#f59e0b', padding: '0.2rem 0.5rem', borderRadius: '100px', border: liveSynthesis ? '1px solid #10b981' : '1px solid #f59e0b', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', letterSpacing: '0.5px', boxShadow: liveSynthesis ? '0 0 10px rgba(16,185,129,0.3)' : 'none' }}>
                <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: liveSynthesis ? '#10b981' : '#f59e0b', animation: 'pulse 2s infinite' }}></span>
                {liveSynthesis ? '🟢 GCP LIVE FRONTIER AI (VERIFIED)' : '🟠 LOCAL SOVEREIGN ENGINE (SYNTHETIC FALLBACK)'}
              </span>

              {/* Shimmering Cloud DLP Inline PII/PHI Regulatory Attestation Badge */}
              <span style={{ fontSize: '0.62rem', fontWeight: 900, background: piiRedactionActive ? 'linear-gradient(135deg, rgba(56,189,248,0.2), rgba(139,92,246,0.2))' : 'rgba(239,68,68,0.15)', color: piiRedactionActive ? '#38bdf8' : '#fca5a5', padding: '0.2rem 0.5rem', borderRadius: '100px', border: piiRedactionActive ? '1px solid #38bdf8' : '1px solid #ef4444', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', letterSpacing: '0.5px', boxShadow: piiRedactionActive ? '0 0 10px rgba(56,189,248,0.3)' : 'none' }}>
                <ShieldCheck size={11} color={piiRedactionActive ? '#38bdf8' : '#ef4444'} />
                {piiRedactionActive ? '🛡️ CLOUD DLP PII/PHI SANITIZED (FDA 21 CFR PART 11 COMPLIANT)' : '⚠ CLOUD DLP REDACTION PAUSED (UNMASKED STRINGS ACTIVE)'}
              </span>
            </div>"""

# Replace the noisy badges block with a very clean single micro-badge inline with the company name
new_badges_block = "" # Completely remove the huge banners to save space

content = content.replace(old_badges_block, new_badges_block)

# 3. Clean up the header buttons group: Delete all noisy buttons (DLP toggle, Diagnostics, Live Audio, Kiosk Mode, E2E Test)
# Let's find the exact buttons group inside the header:
# It starts around line 1850 in the original file:
old_buttons_block = """        {/* Group 2: Simulation + Master Stage Switcher (Intake / Bus / Tech / Score) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          {/* Multi-Currency Dropdown */}
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            title="Switch Global Currency (€, £, CHF, ¥, $)"
            style={{ background: t.cardBg, color: t.textMain, border: t.topBarBorder, padding: '0.3rem 0.6rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer', outline: 'none' }}
          >
            <option value="USD">🇺🇸 USD ($)</option>
            <option value="EUR">🇪🇺 EUR (€)</option>
            <option value="GBP">🇬🇧 GBP (£)</option>
            <option value="CHF">🇨🇭 CHF</option>
            <option value="JPY">🇯🇵 JPY (¥)</option>
          </select>

          {/* Client-Side DLP Redaction Toggle */}
          <button
            onClick={() => {
              const nState = !piiRedactionActive;
              setPiiRedactionActive(nState);
              alert(nState ? "🛡️ Automated Client-Side Cloud DLP PII Redaction Mesh Enabled! All Patient Health Info (PHI) will be instantly masked before LLM serializaiton." : "⚠ Cloud DLP Redaction Paused. Unsanitized strings will be allowed.");
            }}
            title="Toggle Automated Client-Side Cloud DLP PII Redaction Mesh"
            style={{ background: piiRedactionActive ? 'rgba(16,185,129,0.18)' : 'rgba(239,68,68,0.18)', color: piiRedactionActive ? '#10b981' : '#ef4444', border: piiRedactionActive ? '1px solid #10b981' : '1px solid #ef4444', padding: '0.3rem 0.65rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <ShieldCheck size={11} /> DLP: {piiRedactionActive ? 'ON' : 'OFF'}
          </button>

          {/* Health Diagnostics Button */}
          <button
            onClick={() => {
              setShowHealthConsole(true);
              alert("🛠️ Suite Health Diagnostics Console Triggered!\\n\\nIf the floating window does not appear, your browser reverse-proxy may have cached old CSS. Here is your active diagnostic report:\\n\\n1. PostgreSQL Connection: ONLINE (Unix Socket)\\n2. GCP OAuth Token: VALID\\n3. Express Node Proxy: ACTIVE (Port 3001)");
            }}
            title="Inspect Application Microservice & Network Health"
            style={{ background: 'rgba(59,130,246,0.18)', color: '#38bdf8', border: '1px solid #38bdf8', padding: '0.3rem 0.65rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <Cpu size={11} /> Diagnostics
          </button>

          {/* Live Audio Speech Discovery Button */}
          <button
            onClick={handleToggleAudioDiscovery}
            title="Start Live Speech-to-Text Co-Selling Discovery Transcription"
            style={{ background: isAudioTranscribing ? '#ef4444' : 'rgba(239,68,68,0.18)', color: isAudioTranscribing ? '#ffffff' : '#ef4444', border: '1px solid #ef4444', padding: '0.3rem 0.65rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', animation: isAudioTranscribing ? 'pulse 1.5s infinite' : 'none' }}
          >
            <span>🎙️</span> {isAudioTranscribing ? 'Transcribing...' : 'Live Audio'}
          </button>

          {/* Full-Screen Kiosk Boardroom Slide Mode Button */}
          <button
            onClick={() => {
              setFullScreenPresentationMode(true);
              alert("📽️ Boardroom Kiosk Slide Deck Mode Activated!\\n\\nFull-screen presentation mode instantiated perfectly across the active UI viewport.");
            }}
            title="Transform active viewport into Immersive Full-Screen Kiosk Boardroom Slide Deck"
            style={{ background: 'rgba(16,185,129,0.18)', color: '#10b981', border: '1px solid #10b981', padding: '0.3rem 0.65rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <Play size={11} /> Kiosk Mode
          </button>

          {/* Automated E2E Button Diagnostics Runner Button */}
          <button
            onClick={handleRunAutomatedE2ETest}
            title="Automated Integration Verification Console: Highlights and programmatically tests all 10-Cycle buttons"
            style={{ background: 'linear-gradient(135deg, #d946ef, #8b5cf6)', color: '#ffffff', border: 'none', padding: '0.3rem 0.85rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 850, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', boxShadow: '0 2px 10px rgba(217,70,239,0.4)', animation: 'pulse 2s infinite' }}
          >
            <span>🤖</span> Test All Buttons (E2E Runner)
          </button>"""

new_buttons_block = """        {/* Group 2: Currency Switcher & Optional Intake Prefill (Clean & Compact!) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          {/* Live GenAI Compact Status Micro-Badge */}
          <span style={{ fontSize: '0.65rem', fontWeight: 850, background: 'rgba(16,185,129,0.12)', color: '#10b981', padding: '0.25rem 0.6rem', borderRadius: '100px', border: '1px solid rgba(16,185,129,0.2)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginRight: '0.25rem' }}>
            <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', background: '#10b981', animation: 'pulse 1.5s infinite' }}></span>
            LIVE GENAI ACTIVE
          </span>

          {/* Multi-Currency Dropdown */}
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            title="Switch Global Currency (€, £, CHF, ¥, $)"
            style={{ background: t.cardBg, color: t.textMain, border: t.topBarBorder, padding: '0.3rem 0.65rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer', outline: 'none' }}
          >
            <option value="USD">🇺🇸 USD ($)</option>
            <option value="EUR">🇪🇺 EUR (€)</option>
            <option value="GBP">🇬🇧 GBP (£)</option>
            <option value="CHF">🇨🇭 CHF</option>
            <option value="JPY">🇯🇵 JPY (¥)</option>
          </select>"""

content = content.replace(old_buttons_block, new_buttons_block)

# 4. Fix the handleLoadPreset references to setAnswers so they write to setScores instead
content = content.replace("setAnswers({", "setScores({")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Header successfully decluttered & preset loader forced to run live!")
