file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the auto-save effect hook dependency
content = content.replace("  }, [answers, customerInfo, liveSynthesis]);", "  }, [scores, customerInfo, liveSynthesis]);")
content = content.replace("      if (Object.keys(answers).length > 0) {", "      if (Object.keys(scores).length > 0) {")

# 2. Update the session loader from local storage
content = content.replace("        let restoredAnswers = vec.answers || {};", "        let restoredScores = vec.scores || vec.answers || {};")
content = content.replace(
    "        // If answers are empty or unpopulated, automatically seed Premium Candidate default answers so the evaluator never gets blocked by an unseeded ID!",
    "        if (Object.keys(restoredScores).length === 0) { restoredScores = {}; }\n        setScores(restoredScores);"
)

# 3. Update the backend POST payload
content = content.replace("        answers: overrideAnswers || answers,", "        scores: overrideScores || scores,")

# 4. Update the live generation comment extractor
old_comments_extractor = """    const allCustomComments = Object.entries(answers)
      .filter(([k, v]) => k.startsWith('Q') && typeof v === 'string' && v.trim().length > 0)
      .map(([k, v]) => v.trim());"""

new_comments_extractor = """    const allCustomComments = Object.values(scores)
      .filter(val => val && typeof val.comments === 'string' && val.comments.trim().length > 0)
      .map(val => val.comments.trim());"""

content = content.replace(old_comments_extractor, new_comments_extractor)

# 5. Update the loading log message
content = content.replace(
    "`[${ts()}] [VECTOR_ASSEMBLY] Serializing 30-Dimension QA answers & user commentary...`",
    "`[${ts()}] [VECTOR_ASSEMBLY] Serializing 21-Dimension GxP scores & user commentary...`"
)

# 6. Update the persistence call
content = content.replace(
    "persistToSavedAssessments(cName, uName, scoringData?.overallPriority || 92, answers, liveGenReport);",
    "persistToSavedAssessments(cName, uName, scoringData?.overallPriority || 92, scores, liveGenReport);"
)

# 7. Update the report data property passed to child visualizers
content = content.replace(
    "reportData={liveSynthesis || Object.assign({}, customerInfo, scoringData, { answers })}",
    "reportData={liveSynthesis || Object.assign({}, customerInfo, scoringData, { scores })}"
)

# 8. Clear answers state completely on reset
content = content.replace(
    "      setAnswers({});",
    "      setScores({});"
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Remaining references successfully patched!")
