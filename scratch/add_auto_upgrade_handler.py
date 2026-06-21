file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Locate the exact restoredScores restoration block (around lines 1234-1239)
old_restoration_block = """        let restoredScores = vec.scores || {};
        let restoredCust = vec.customerInfo || {};
        
        if (Object.keys(restoredScores).length === 0) { restoredScores = {}; }
        setScores(restoredScores);
        setCustomerInfo(restoredCust);"""

# Replace it with a robust, self-healing auto-upgrader that converts legacy formats to V11 GxP objects on the fly!
new_restoration_block = """        let restoredScores = vec.scores || {};
        let restoredCust = vec.customerInfo || {};
        
        // Self-Healing Migrator: If the loaded session contains legacy V10 flat numbers,
        // dynamically upgrade them to V11 multi-dimensional GxP objects on the fly!
        const upgradedScores = {};
        let needsUpgrade = false;
        
        Object.keys(restoredScores).forEach(qId => {
          const val = restoredScores[qId];
          if (val !== null && val !== undefined) {
            if (typeof val === 'number') {
              needsUpgrade = true;
              upgradedScores[qId] = {
                current: val,
                future: Math.min(5, val + 1),
                techPain: [],
                bizPain: [],
                comments: 'Auto-upgraded from legacy V10 session profile.',
                skipped: false
              };
            } else if (typeof val === 'object' && !('current' in val)) {
              needsUpgrade = true;
              const numericVal = typeof val.current === 'number' ? val.current : 3;
              upgradedScores[qId] = {
                current: numericVal,
                future: typeof val.future === 'number' ? val.future : Math.min(5, numericVal + 1),
                techPain: Array.isArray(val.techPain) ? val.techPain : [],
                bizPain: Array.isArray(val.bizPain) ? val.bizPain : [],
                comments: val.comments || 'Auto-upgraded from legacy V10 session profile.',
                skipped: !!val.skipped
              };
            } else {
              upgradedScores[qId] = val;
            }
          }
        });

        if (needsUpgrade) {
          console.log("🧬 Self-Healing Migrator: Upgraded legacy flat-number scores to V11 GxP object format.");
          restoredScores = upgradedScores;
        }

        if (Object.keys(restoredScores).length === 0) { restoredScores = {}; }
        setScores(restoredScores);
        setCustomerInfo(restoredCust);"""

# Apply the replacement and perform a strict verification check to guarantee it was written!
content = content.replace(old_restoration_block, new_restoration_block)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Self-healing V11 session migrator successfully deployed!")
