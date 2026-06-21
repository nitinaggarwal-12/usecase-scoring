import os

file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    code = f.read()

# -----------------------------------------------------------------------------
# 1. Replace the state initializer block
# -----------------------------------------------------------------------------
old_state_init = """  const [scores, setScores] = useState(() => {
    const initial = {};
    V12_PILLARS.forEach(p => {
      p.questions.forEach(q => {
        initial[q.id] = {
          current: 3,
          future: 4,
          techPain: [],
          bizPain: [],
          comments: '',
          skipped: false
        };
      });
    });
    return initial;
  });"""

new_state_init = """  const [scores, setScores] = useState(() => {
    const initial = {};
    V12_PILLARS.forEach(p => {
      p.questions.forEach(q => {
        initial[q.id] = {
          current: null,
          future: null,
          techPain: [],
          bizPain: [],
          comments: '',
          skipped: false
        };
      });
    });
    return initial;
  });"""

if old_state_init in code:
    code = code.replace(old_state_init, new_state_init)
    print("Successfully updated V12 state initializer to use null defaults.")
else:
    # Fuzzy replacement if whitespace varies
    code = code.replace("current: 3,", "current: null,")
    code = code.replace("future: 4,", "future: null,")
    print("Fuzzy-replaced default score values to null.")

# -----------------------------------------------------------------------------
# 2. Replace the scoringData calculation block
# -----------------------------------------------------------------------------
old_scoring_data = """  const scoringData = useMemo(() => {
    let totalWeightedPoints = 0;
    let totalQuestionsAnswered = 0;
    let yAxisWeightedPoints = 0; // Pillars 1-5 (Capability & Compliance) - total weight 45
    let xAxisWeightedPoints = 0; // Pillar 6 (Feasibility & TCO) - total weight 9

    V12_PILLARS.forEach(pillar => {
      pillar.questions.forEach(q => {
        const scoreObj = scores[q.id] || {};
        const cur = typeof scoreObj.current === 'number' ? scoreObj.current : 3;
        
        // Multiplier: base score * assigned weight
        const weightedScore = cur * q.weight;
        totalWeightedPoints += weightedScore;
        totalQuestionsAnswered++;

        if (pillar.id === 'FEASIBILITY') {
          xAxisWeightedPoints += weightedScore;
        } else {
          yAxisWeightedPoints += weightedScore;
        }
      });
    });

    // Final Weighted averages on a 1.0 to 5.0 executive scale!
    const finalScore = Number((totalWeightedPoints / 54).toFixed(2));
    const capabilityScore = Number((yAxisWeightedPoints / 45).toFixed(2));
    const feasibilityScore = Number((xAxisWeightedPoints / 9).toFixed(2));

    let verdict = 'De-Prioritize';
    if (finalScore >= 4.0) verdict = 'Strategic Launch';
    else if (finalScore >= 3.0) verdict = 'Fund Incubator';
    else if (finalScore >= 2.0) verdict = 'Coached Re-Architect';

    return {
      overallScore: finalScore,
      capabilityScore,
      feasibilityScore,
      verdict,
      totalAnswered: totalQuestionsAnswered
    };
  }, [scores]);"""

new_scoring_data = """  const scoringData = useMemo(() => {
    let totalWeightedPoints = 0;
    let totalQuestionsAnswered = 0;
    let yAxisWeightedPoints = 0; // Pillars 1-5 (Capability & Compliance) - total weight 45
    let xAxisWeightedPoints = 0; // Pillar 6 (Feasibility & TCO) - total weight 9
    let totalWeightSum = 0;
    let yWeightSum = 0;
    let xWeightSum = 0;

    V12_PILLARS.forEach(pillar => {
      pillar.questions.forEach(q => {
        const scoreObj = scores[q.id] || {};
        if (typeof scoreObj.current === 'number') {
          const cur = scoreObj.current;
          const weightedScore = cur * q.weight;
          totalWeightedPoints += weightedScore;
          totalQuestionsAnswered++;
          totalWeightSum += q.weight;

          if (pillar.id === 'FEASIBILITY') {
            xAxisWeightedPoints += weightedScore;
            xWeightSum += q.weight;
          } else {
            yAxisWeightedPoints += weightedScore;
            yWeightSum += q.weight;
          }
        }
      });
    });

    // Final Weighted averages on a 1.0 to 5.0 executive scale!
    const finalScore = totalWeightSum > 0 ? Number((totalWeightedPoints / totalWeightSum).toFixed(2)) : 0;
    const capabilityScore = yWeightSum > 0 ? Number((yAxisWeightedPoints / yWeightSum).toFixed(2)) : 0;
    const feasibilityScore = xWeightSum > 0 ? Number((xAxisWeightedPoints / xWeightSum).toFixed(2)) : 0;

    let verdict = 'Offline';
    if (totalQuestionsAnswered > 0) {
      if (finalScore >= 4.0) verdict = 'Strategic Launch';
      else if (finalScore >= 3.0) verdict = 'Fund Incubator';
      else if (finalScore >= 2.0) verdict = 'Coached Re-Architect';
      else verdict = 'De-Prioritize';
    }

    return {
      overallScore: finalScore,
      capabilityScore,
      feasibilityScore,
      verdict,
      totalAnswered: totalQuestionsAnswered
    };
  }, [scores]);"""

if old_scoring_data in code:
    code = code.replace(old_scoring_data, new_scoring_data)
    print("Successfully updated V12 C-Suite scoring math and rolling averages.")
else:
    print("⚠️ Warning: scoringData block not found exactly. Check file spacing.")

# -----------------------------------------------------------------------------
# 3. Replace the getPillarProgress check
# -----------------------------------------------------------------------------
old_progress = """  const getPillarProgress = (pillar) => {
    let completed = 0;
    pillar.questions.forEach(q => {
      if (scores[q.id]?.current !== undefined) {
        completed++;
      }
    });
    return `${completed}/${pillar.questions.length}`;
  };"""

new_progress = """  const getPillarProgress = (pillar) => {
    let completed = 0;
    pillar.questions.forEach(q => {
      if (typeof scores[q.id]?.current === 'number') {
        completed++;
      }
    });
    return `${completed}/${pillar.questions.length}`;
  };"""

if old_progress in code:
    code = code.replace(old_progress, new_progress)
    print("Successfully updated V12 progress tracker to use number-type verification.")
else:
    print("⚠️ Warning: getPillarProgress block not found exactly. Check file spacing.")

# Write back to file
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 V12 state and progress cleanup complete!")
