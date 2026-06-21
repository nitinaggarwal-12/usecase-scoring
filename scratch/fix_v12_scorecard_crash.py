import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Locate the Executive Summary Card and replace the direct object render with .rationale
old_summary_p = """                <p style={{ fontSize: '0.78rem', color: colors.textDark, lineHeight: 1.45, margin: 0 }}>
                  {liveSynthesis?.executiveSummary || `V12 Diagnostic for ${customerInfo.company || 'unspecified client'} compiles an overall C-Suite readiness score of ${scoringData.overallScore} out of 5.0. Capability & GxP Compliance is scored at ${scoringData.capabilityScore}, and Implementation Feasibility is scored at ${scoringData.feasibilityScore}. Recommendation: Proceed with the incubator pathway.`}
                </p>"""

new_summary_p = """                <p style={{ fontSize: '0.78rem', color: colors.textDark, lineHeight: 1.45, margin: 0 }}>
                  {liveSynthesis?.executiveSummary?.rationale || `V12 Diagnostic for ${customerInfo.company || 'unspecified client'} compiles an overall C-Suite readiness score of ${scoringData.overallScore} out of 5.0. Capability & GxP Compliance is scored at ${scoringData.capabilityScore}, and Implementation Feasibility is scored at ${scoringData.feasibilityScore}. Recommendation: Proceed with the incubator pathway.`}
                </p>"""

code = code.replace(old_summary_p, new_summary_p)

# Locate the Detailed Remediations block and upgrade it to a Unified Roadmap Viewer
old_roadmap_block = """            {/* Detailed Remediations */}
            {liveSynthesis?.remediationRoadmap && (
              <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1, minHeight: 0 }}>
                <h3 style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', color: '#16a34a', margin: 0 }}>
                  Strategic Technical Roadmap
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', overflowY: 'auto', flex: 1 }}>
                  {liveSynthesis.remediationRoadmap.map((rem, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.4rem', fontSize: '0.74rem', color: colors.textDark, padding: '0.35rem', background: 'var(--bg-surface)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontWeight: 800, color: '#16a34a' }}>Step {i + 1}:</span>
                      <span>{rem}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}"""

new_roadmap_block = """            {/* Detailed Remediations (Unified Roadmap Viewer!) */}
            {(liveSynthesis?.technicalRoadmap || liveSynthesis?.remediationRoadmap) && (
              <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1, minHeight: 0 }}>
                <h3 style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', color: '#16a34a', margin: 0 }}>
                  Strategic Technical Roadmap
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', overflowY: 'auto', flex: 1 }}>
                  {liveSynthesis?.technicalRoadmap ? (
                    liveSynthesis.technicalRoadmap.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.4rem', fontSize: '0.72rem', color: colors.textDark, padding: '0.45rem', background: 'var(--bg-surface)', borderRadius: '6px', border: '1px solid var(--border-color)', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.15rem', marginBottom: '0.15rem' }}>
                          <span style={{ fontWeight: 850, color: '#16a34a', fontSize: '0.74rem' }}>Step {i + 1}: {item.title}</span>
                          <span style={{ fontSize: '0.58rem', color: colors.textMuted, fontWeight: 800 }}>ID: {item.targetTopicId}</span>
                        </div>
                        <span style={{ fontSize: '0.7rem', color: colors.textDark, lineHeight: 1.35 }}>{item.remediation}</span>
                      </div>
                    ))
                  ) : (
                    liveSynthesis.remediationRoadmap.map((rem, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.4rem', fontSize: '0.74rem', color: colors.textDark, padding: '0.35rem', background: 'var(--bg-surface)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                        <span style={{ fontWeight: 800, color: '#16a34a' }}>Step {i + 1}:</span>
                        <span>{rem}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}"""

code = code.replace(old_roadmap_block, new_roadmap_block)

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Successfully patched V12 Executive Summary rendering and technical roadmap viewer!")
