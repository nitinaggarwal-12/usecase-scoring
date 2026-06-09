filepath = "/Users/nitinagga/Documents/usecase_scoring/src/components/AgenticDiscoveryV7.jsx"

with open(filepath, "r", encoding="utf-8") as f:
    text = f.read()

# Let's locate and extract the main state hooks at the start of AgenticDiscoveryV7
idx_hooks_start = text.find("export default function AgenticDiscoveryV7({ viewMode, onViewModeChange }) {")
idx_hooks_end = text.find("  const handleSelectOpt = (qId, val, isMulti) => {")

assert idx_hooks_start != -1, "Could not locate function header in AgenticDiscoveryV7.jsx"
assert idx_hooks_end != -1, "Could not locate first helper handler in AgenticDiscoveryV7.jsx"

# Let's locate and extract all helper functions up to the start of the evaluated score constants
idx_helpers_start = text.find("  const handleSelectOpt = (qId, val, isMulti) => {")
idx_helpers_end = text.find("  // 5 Core Scoping Pillars Scores (Symmetrical to V6!)")

assert idx_helpers_start != -1, "Could not locate helpers start block"
assert idx_helpers_end != -1, "Could not locate score constants start block"

# Let's extract the evaluated score constants block itself
idx_scores_end = text.find("  const getVerdictHTML = (score, type) => {")
assert idx_scores_end != -1, "Could not locate getVerdictHTML start"

helpers_block = text[idx_helpers_start:idx_helpers_end]
scores_block = text[idx_helpers_end:idx_scores_end]

# Wait! Inside helpers_block, there are declarations like countAnswered, getBlockerCounts etc.
# Let's check if countAnswered or totalApplicable or getBlockerCounts is inside helpers_block.
# Ah! They are defined below the scores_block in the current file!
# Let's extract all declarations from idx_helpers_start to the return statement return (
idx_ret_block = text.find("  // --- Consultative Narrative Generator (§7.5 Symmetrical to V6!) ---")
assert idx_ret_block != -1, "Could not locate narrative generator block start"

full_body_to_move = text[idx_helpers_start:idx_ret_block]

# Now let's assemble a highly logical, perfectly ordered body block:
# 1. Core input change event helpers (handleSelectOpt, handleAddCustom, handleSetPath, handleAutofillV7, handleChapterClick)
# 2. Pure scoring & progress metrics helpers (scoreQ, scoreSec, calcDiscovery, calcReadiness, countAnswered, totalApplicable, getBlockerCounts)
# 3. Symmetrical score & pillar constants evaluated from helpers (discScore, readScore, answeredCount, applicableCount, cntFatal, cntStart, cntRisk, pStrategicVal, pDataReadiness, pArchitecture, pSecurityGovern, pExecutionEval)
# 4. Saved Sessions save/load/reset handlers (handleSaveSession, handleLoadSession, handleResetSession)
# 5. UI helper getVerdictHTML

# Let's write this perfectly structured, 100% correct code directly into AgenticDiscoveryV7.jsx!
# To prevent any syntax issues, we will use write_to_file to write the entire cleanly formatted, pristine file!
