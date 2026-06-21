import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Locate the formattedPayload mapping block in V12
old_payload_mapping = """      // Convert V12 scores state into the structured payload array expected by the AI service!
      const formattedPayload = V12_PILLARS.map(pillar => {
        return {
          pillar: pillar.name,
          results: pillar.questions.map(q => {
            const qScore = scores[q.id] || {};
            return {
              id: q.id,
              currentScore: typeof qScore.current === 'number' ? qScore.current : null,
              futureScore: typeof qScore.future === 'number' ? qScore.future : null,
              notes: qScore.comments || '',
              painPoints: [...(qScore.techPain || []), ...(qScore.bizPain || [])]
            };
          })
        };
      });"""

new_payload_mapping = """      // Convert V12 scores state into the structured payload array expected by the AI service!
      const formattedPayload = V12_PILLARS.map(pillar => {
        return {
          pillar: pillar.name,
          results: pillar.questions.map(q => {
            const qScore = scores[q.id] || {};
            return {
              id: q.id,
              topic: q.topic, // Crucial! Fixes 'includes' crash in aiService.js
              currentScore: typeof qScore.current === 'number' ? qScore.current : null,
              futureScore: typeof qScore.future === 'number' ? qScore.future : null,
              notes: qScore.comments || '',
              technicalPainpoints: qScore.techPain || [], // Crucial! Matches aiService.js expectation
              businessPainpoints: qScore.bizPain || []
            };
          })
        };
      });"""

if old_payload_mapping in code:
    code = code.replace(old_payload_mapping, new_payload_mapping)
    print("Successfully corrected payload mapping to include topic and technicalPainpoints!")
else:
    print("⚠️ Warning: Payload mapping block not found exactly in PremiumScopingAssessorV12.jsx.")

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 V12 AI payload correction complete!")
