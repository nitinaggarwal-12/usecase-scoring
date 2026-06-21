import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Target a stable injection point right after state declarations (around lines 480-488)
target_insertion = """  // Dynamic status filters
  const doneCount = useMemo(() => {
    return FLAT_QUESTIONS.filter(q => typeof scores[q.id]?.current === 'number').length;
  }, [scores]);

  const todoCount = useMemo(() => 25 - doneCount, [doneCount]);"""

replacement_insertion = """  // Dynamic status filters
  const doneCount = useMemo(() => {
    return FLAT_QUESTIONS.filter(q => typeof scores[q.id]?.current === 'number').length;
  }, [scores]);

  const todoCount = useMemo(() => 25 - doneCount, [doneCount]);

  // --------------------------------------------------------------------------
  // FDA GxP SESSION PERSISTENCE & AUTO-REHYDRATION ENGINE
  // --------------------------------------------------------------------------
  
  // Extract Session ID from URL Hash
  const getSessionIdFromHash = () => {
    const hash = window.location.hash || '';
    if (hash.includes('session=')) {
      const params = new URLSearchParams(hash.split('?')[1]);
      return params.get('session');
    }
    return null;
  };

  const activeSessionId = getSessionIdFromHash();

  // 1. Rehydrate State from LocalStorage upon mounting/hashchange
  useEffect(() => {
    const sessId = getSessionIdFromHash();
    if (!sessId) return;

    try {
      // Rehydrate Scores
      const savedScoresRaw = localStorage.getItem(`v12_scores_${sessId}`);
      if (savedScoresRaw) {
        const parsed = JSON.parse(savedScoresRaw);
        setScores(prev => ({ ...prev, ...parsed }));
      }

      // Rehydrate Customer Info
      const savedInfoRaw = localStorage.getItem(`v12_customer_info_${sessId}`);
      if (savedInfoRaw) {
        setCustomerInfo(JSON.parse(savedInfoRaw));
      }

      // Rehydrate Report Page View Mode & Tab View
      const savedPage = localStorage.getItem(`v12_report_page_${sessId}`);
      if (savedPage) {
        setReportPage(savedPage);
        setActiveTab('report'); // Automatically lock them into the report dashboard view!
      }
    } catch (e) {
      console.error("[GxP_REHYDRATION_ERROR] Failed to restore session states:", e);
    }
  }, [activeSessionId]);

  // 2. Auto-Save States to LocalStorage in Real-Time
  useEffect(() => {
    const sessId = getSessionIdFromHash();
    if (!sessId) return;

    try {
      // Write Scores
      localStorage.setItem(`v12_scores_${sessId}`, JSON.stringify(scores));

      // Write Customer Info
      localStorage.setItem(`v12_customer_info_${sessId}`, JSON.stringify(customerInfo));

      // Write Report Page View Mode
      localStorage.setItem(`v12_report_page_${sessId}`, reportPage);
    } catch (e) {
      console.error("[GxP_AUTOSAVE_ERROR] Failed to persist session states:", e);
    }
  }, [scores, customerInfo, reportPage, activeSessionId]);"""

code = code.replace(target_insertion, replacement_insertion)

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Successfully deployed FDA GxP Session Persistence & Auto-Rehydration Engine!")
