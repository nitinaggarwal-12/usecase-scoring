import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# -----------------------------------------------------------------------------
# 1. Update stylesheet .v12-grid-area class (Add flex: 1 and grid-template-rows)
# -----------------------------------------------------------------------------
code = code.replace(
    """        .v12-grid-area {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
          flex-shrink: 0;
          min-height: 0;
        }""",
    """        .v12-grid-area {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(5, 1fr);
          gap: 0.5rem;
          flex: 1;
          min-height: 0;
        }"""
)

# -----------------------------------------------------------------------------
# 2. Update the JSX style override for .v12-grid-area
# -----------------------------------------------------------------------------
old_grid_jsx = """              {/* 4-Column Symmetrical Grid Body */}
              <div className="v12-grid-area" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', flex_shrink: 0 }}>"""

# Wait, let's look at the exact string we wrote in move_notes_to_bottom.py:
# new_grid_body_start = '              {/* 4-Column Symmetrical Grid Body */}
#               <div className="v12-grid-area" style={{ display: \'grid\', gridTemplateColumns: \'repeat(4, 1fr)\', gap: \'0.5rem\', flexShrink: 0 }}>'
# Let's handle both possible stylings (flexShrink or flex_shrink) just in case!

code = code.replace(
    """              {/* 4-Column Symmetrical Grid Body */}
              <div className="v12-grid-area" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', flexShrink: 0 }}>""",
    """              {/* 4-Column Symmetrical Grid Body (Auto-stretching rows!) */}
              <div className="v12-grid-area" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(5, 1fr)', gap: '0.5rem', flex: 1, minHeight: 0 }}>"""
)

code = code.replace(
    """              {/* 4-Column Symmetrical Grid Body */}
              <div className="v12-grid-area" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', flex_shrink: 0 }}>""",
    """              {/* 4-Column Symmetrical Grid Body (Auto-stretching rows!) */}
              <div className="v12-grid-area" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(5, 1fr)', gap: '0.5rem', flex: 1, minHeight: 0 }}>"""
)

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Successfully deployed the V12 auto-stretching responsive grid engine!")
