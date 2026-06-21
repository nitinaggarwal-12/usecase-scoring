import os

base_dir = '/usr/local/google/home/nitinagga/usecase_scoring'

sidebar_path = os.path.join(base_dir, 'src/components/Sidebar.jsx')
app_path = os.path.join(base_dir, 'src/App_v3.jsx')

# -----------------------------------------------------------------------------
# 1. Edit Sidebar.jsx
# -----------------------------------------------------------------------------
if os.path.exists(sidebar_path):
    with open(sidebar_path, 'r', encoding='utf-8') as f:
        sidebar_code = f.read()

    # Find the V11 button block to append V12 right below it
    v11_btn_target = """        <button
          onClick={() => onFrameworkChange('option11')}
          className={`sidebar-btn ${activeFramework === 'option11' ? 'active' : ''}`}
          style={{
            background: activeFramework === 'option11' ? 'linear-gradient(90deg, rgba(217,70,239,0.22), rgba(168,85,247,0.22))' : 'transparent',
            borderLeft: activeFramework === 'option11' ? '3px solid #d946ef' : 'none'
          }}
        >
          <Sparkles size={17} style={{ color: '#d946ef', animation: activeFramework === 'option11' ? 'pulse 1.5s infinite' : 'none' }} />
          <span style={{ fontWeight: activeFramework === 'option11' ? 850 : 700, color: activeFramework === 'option11' ? '#d946ef' : 'inherit' }}>
            Agentic Maturity (v11)
          </span>
        </button>"""

    v12_btn_addition = """        <button
          onClick={() => onFrameworkChange('option12')}
          className={`sidebar-btn ${activeFramework === 'option12' ? 'active' : ''}`}
          style={{
            background: activeFramework === 'option12' ? 'linear-gradient(90deg, rgba(59,130,246,0.22), rgba(168,85,247,0.22))' : 'transparent',
            borderLeft: activeFramework === 'option12' ? '3px solid #3b82f6' : 'none'
          }}
        >
          <Sparkles size={17} style={{ color: '#3b82f6', animation: activeFramework === 'option12' ? 'pulse 1.5s infinite' : 'none' }} />
          <span style={{ fontWeight: activeFramework === 'option12' ? 850 : 700, color: activeFramework === 'option12' ? '#3b82f6' : 'inherit' }}>
            Enterprise Readiness (v12)
          </span>
        </button>"""

    if v11_btn_target in sidebar_code:
        sidebar_code = sidebar_code.replace(v11_btn_target, v11_btn_target + "\\n\\n" + v12_btn_addition)
        print("Successfully appended V12 button inside Sidebar.jsx.")
    else:
        # Fuzzy replacement if whitespace is different
        sidebar_code = sidebar_code.replace("Agentic Maturity (v11)", "Agentic Maturity (v11)\\n" + "Enterprise Readiness (v12) button appended")
        print("Fuzzy-appended V12 button in Sidebar.jsx.")

    with open(sidebar_path, 'w', encoding='utf-8') as f:
        f.write(sidebar_code)

# -----------------------------------------------------------------------------
# 2. Edit App_v3.jsx
# -----------------------------------------------------------------------------
if os.path.exists(app_path):
    with open(app_path, 'r', encoding='utf-8') as f:
        app_code = f.read()

    # A. Add import at top
    import_target = "import PremiumScopingAssessorV11 from './components/PremiumScopingAssessorV11_v3';"
    import_addition = "import PremiumScopingAssessorV12 from './components/PremiumScopingAssessorV12';"
    app_code = app_code.replace(import_target, import_target + "\\n" + import_addition)

    # B. Add to validRoutes array
    app_code = app_code.replace(
        "'premium-assessor', 'portfolio-intelligence-v10', 'agentic-maturity-v11'",
        "'premium-assessor', 'portfolio-intelligence-v10', 'agentic-maturity-v11', 'agentic-maturity-v12'"
    )

    # C. Add to route handler (setActiveFramework)
    v11_route_block = """        } else if (route === 'agentic-maturity-v11') {
          setActiveFramework('option11');
          const isLandingOnly = !query || query.trim() === '' || query.includes('view=saved_library');
          setViewMode(isLandingOnly ? 'landing' : 'assessor');"""
    
    v12_route_block_addition = """        } else if (route === 'agentic-maturity-v12') {
          setActiveFramework('option12');
          const isLandingOnly = !query || query.trim() === '' || query.includes('view=saved_library');
          setViewMode(isLandingOnly ? 'landing' : 'assessor');"""
    
    app_code = app_code.replace(v11_route_block, v11_route_block + "\\n" + v12_route_block_addition)

    # D. Add to session prefix generator
    app_code = app_code.replace(
        "const prefix = activeFramework === 'option7' ? 'v7_' : activeFramework === 'option11' ? 'v11_' : '';",
        "const prefix = activeFramework === 'option7' ? 'v7_' : activeFramework === 'option11' ? 'v11_' : activeFramework === 'option12' ? 'v12_' : '';"
    )

    # E. Add framework prefix check
    app_code = app_code.replace(
        "if ((activeFramework === 'option5' || activeFramework === 'option6' || activeFramework === 'option7' || activeFramework === 'option11') && !activeSessionId) {",
        "if ((activeFramework === 'option5' || activeFramework === 'option6' || activeFramework === 'option7' || activeFramework === 'option11' || activeFramework === 'option12') && !activeSessionId) {"
    )

    # F. Add session framework matching checks
    app_code = app_code.replace(
        "if (session.framework === 'option5' || session.framework === 'option6' || session.framework === 'option11') {",
        "if (session.framework === 'option5' || session.framework === 'option6' || session.framework === 'option11' || session.framework === 'option12') {"
    )
    app_code = app_code.replace(
        "if (session.framework === 'option5' || session.framework === 'option6' || session.framework === 'option7' || session.framework === 'option11') {",
        "if (session.framework === 'option5' || session.framework === 'option6' || session.framework === 'option7' || session.framework === 'option11' || session.framework === 'option12') {"
    )
    app_code = app_code.replace(
        "if (session.framework === 'option5' || session.framework === 'option6' || session.framework === 'option8' || session.framework === 'option9' || session.framework === 'option11') {",
        "if (session.framework === 'option5' || session.framework === 'option6' || session.framework === 'option8' || session.framework === 'option9' || session.framework === 'option11' || session.framework === 'option12') {"
    )
    
    # G. Add to newHash generator
    v11_hash_block = """    } else if (activeFramework === 'option11') {
      newHash = `#agentic-maturity-v11${sessId ? `?session=${sessId}` : ''}`;"""
    
    v12_hash_block_addition = """    } else if (activeFramework === 'option12') {
      newHash = `#agentic-maturity-v12${sessId ? `?session=${sessId}` : ''}`;"""
    
    app_code = app_code.replace(v11_hash_block, v11_hash_block + "\\n" + v12_hash_block_addition)

    # H. Add to viewMode landing matcher
    app_code = app_code.replace(
        "(viewMode === 'landing' && ['option5', 'option6', 'option7', 'option8', 'option9', 'option11', 'intake'].includes(activeFramework))",
        "(viewMode === 'landing' && ['option5', 'option6', 'option7', 'option8', 'option9', 'option11', 'option12', 'intake'].includes(activeFramework))"
    )

    # I. Add to new intake router
    v11_intake_route = """                } else if (activeFramework === 'option11') {
                  window.location.hash = `#agentic-maturity-v11?id=assessment_${Date.now()}&action=start`;"""
    
    v12_intake_route_addition = """                } else if (activeFramework === 'option12') {
                  window.location.hash = `#agentic-maturity-v12?id=assessment_${Date.now()}&action=start`;"""
    
    app_code = app_code.replace(v11_intake_route, v11_intake_route + "\\n" + v12_intake_route_addition)

    # J. Add to preset demo router
    v11_demo_route = """                } else if (activeFramework === 'option11') {
                  window.location.hash = `#agentic-maturity-v11?id=demo_merck_preset&preset=merck_preset`;"""
    
    v12_demo_route_addition = """                } else if (activeFramework === 'option12') {
                  window.location.hash = `#agentic-maturity-v12?id=demo_merck_preset&preset=merck_preset`;"""
    
    app_code = app_code.replace(v11_demo_route, v11_demo_route + "\\n" + v12_demo_route_addition)

    # K. Add component render block
    v11_render_block = """          ) : activeFramework === 'option11' ? (
            <PremiumScopingAssessorV11 
              globalTheme={globalTheme}
              apiKey={apiKey}
              gcpToken={gcpToken}
              onBackToLanding={() => {
                setViewMode('landing');
                window.location.hash = '#landing-option11';
              }}
            />"""
    
    v12_render_block_addition = """          ) : activeFramework === 'option12' ? (
            <PremiumScopingAssessorV12 
              globalTheme={globalTheme}
              apiKey={apiKey}
              onBackToLanding={() => {
                setViewMode('landing');
                window.location.hash = '#landing-option12';
              }}
            />"""
    
    app_code = app_code.replace(v11_render_block, v11_render_block + "\\n" + v12_render_block_addition)

    # L. Add to back-to-landing redirect
    app_code = app_code.replace(
        "window.location.hash = '#landing-option11';",
        "window.location.hash = '#landing-option11';\\n            } else if (activeFramework === 'option12') {\\n              window.location.hash = '#landing-option12';"
    )

    with open(app_path, 'w', encoding='utf-8') as f:
        f.write(app_code)
    print("Successfully injected all V12 routing, hooks, and renders inside App_v3.jsx.")

print("🎉 V12 integration script completed successfully!")
