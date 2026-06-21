import re

file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Swap state declarations
content = content.replace("  const [answers, setAnswers] = useState({});", "  const [scores, setScores] = useState({});")
content = content.replace("  const [comments, setComments] = useState({});\n", "")

# 2. Rewrite scoringData useMemo
scoring_memo_old = """  const scoringData = useMemo(() => {
    let bvScore = 0;
    let uiScore = 0;
    let trScore = 0;
    let crScore = 0;

    const pScores = {};
    const qScores = {};
    const blockers = [];

    V11_PILLARS.forEach(pillar => {
      let pillarRawScore = 0;
      pillar.questions.forEach(q => {
        const ans = answers[q.id];
        let qVal = 0;
        if (q.type === 'multi') {
          const selectedList = ans || [];
          let sumVal = 0;
          selectedList.forEach(idx => {
            const opt = q.options[idx];
            if (opt) sumVal += opt.score;
          });
          qVal = Math.min(100, sumVal);
        } else {
          if (ans !== undefined && q.options[ans]) {
            const opt = q.options[ans];
            qVal = opt.score;
            if (opt.blocker) {
              blockers.push({
                pillarName: pillar.name,
                questionTitle: q.title,
                blocker: opt.blocker,
                mitigation: opt.mitigation
              });
            }
          }
        }
        const weightedQVal = qVal * (q.weightInPillar / 100);
        qScores[q.id] = Math.round(weightedQVal);
        pillarRawScore += weightedQVal;
      });
      pScores[pillar.id] = Math.round(pillarRawScore);
      
      if (pillar.id === 'BV') bvScore += pillarRawScore * (pillar.weight/20);
      else if (pillar.id === 'UI') uiScore += pillarRawScore * (pillar.weight/15);
      else if (['SI', 'OC', 'DK', 'SC', 'TF', 'AC', 'PR'].includes(pillar.id)) {
        trScore += pillarRawScore * (pillar.weight/60);
      } else {
        crScore += pillarRawScore * (pillar.weight/5);
      }
    });

    let prioritySum = 0;
    V11_PILLARS.forEach(pillar => {
      prioritySum += (pScores[pillar.id] || 0) * (pillar.weight / 100);
    });

    const normalizedTotal = Math.round(prioritySum);

    let finalVerdict = "LAUNCH NOW";
    let badgeColor = "#10b981";
    let rationale = "Exemplary high-value opportunity grounded in verified datasets with minimal integration friction.";

    if (blockers.length > 3 || normalizedTotal < 50) {
      finalVerdict = "HOLD & RE-ARCHITECT";
      badgeColor = "#ef4444";
      rationale = "Critical blocker gates identified across compliance boundaries or weak financial baseline.";
    } else if (blockers.length > 0 || normalizedTotal < 75) {
      finalVerdict = "INCUBATE & VALIDATE";
      badgeColor = "#f59e0b";
      rationale = "High intrinsic value but requires explicit Human-in-the-Loop exception models or connector proofs.";
    }

    const finalResult = {
      overallPriority: normalizedTotal,
      pillarScores: pScores,
      questionScores: qScores,
      activeBlockerMitigations: blockers,
      verdict: finalVerdict,
      badgeColor,
      rationale,
      businessValueScore: Math.round(bvScore),
      geminiActivationScore: Math.round(uiScore),
      technicalReadinessScore: Math.round(trScore),
      changeReadinessScore: Math.round(crScore)
    };
    scoringDataRef.current = finalResult;
    return finalResult;
  }, [answers]);"""

scoring_memo_new = """  const scoringData = useMemo(() => {
    const pScores = {};
    const qScores = {};
    const blockers = [];

    V11_PILLARS.forEach(pillar => {
      let pillarRawScore = 0;
      pillar.questions.forEach(q => {
        const val = scores[q.id] || {};
        const currentVal = val.current !== null && val.current !== undefined ? val.current : 1;
        
        // Map 1-5 to 20, 40, 60, 80, 100
        const qVal = currentVal * 20;
        
        if (currentVal <= 2) {
          let blockerText = `Low maturity in ${q.dimension}`;
          let mitigationText = `Develop roadmap to transition to ${q.dimension} target state`;
          
          if (q.id === 'UX_HITL.1') { blockerText = 'Manual PDF cross-referencing required'; mitigationText = 'Streamline into native workspace plugins'; }
          elif (q.id === 'UX_HITL.2') { blockerText = 'Manual email review routing bottleneck'; mitigationText = 'Deploy event-driven workflow pausing gates'; }
          elif (q.id === 'UX_HITL.3') { blockerText = 'Manual geolocalized disclaimer risk'; mitigationText = 'Automate geolocalized disclosures'; }
          elif (q.id === 'INT_REG.1') { blockerText = 'Single proprietary model vendor lock-in'; mitigationText = 'Incorporate Model Garden routing capabilities'; }
          elif (q.id === 'INT_REG.2') { blockerText = 'Manual rule enforcement prone to errors'; mitigationText = 'Deploy prompt progressive disclosure'; }
          elif (q.id === 'INT_REG.3') { blockerText = 'Manual ISI pasting & PV compliance PV gap'; mitigationText = 'Deploy Medical Safety Agent monitoring'; }
          elif (q.id === 'INT_REG.4') { blockerText = 'Manual audio/video compliance sync'; mitigationText = 'Deploy dual modality timing engine'; }
          elif (q.id === 'DATA_SEM.1') { blockerText = 'Manual claims copy/paste errors'; mitigationText = 'Ground claims via MCP into live databases'; }
          elif (q.id === 'DATA_SEM.2') { blockerText = 'Custom REST API integration debt'; mitigationText = 'Standardize middleware with MCP servers'; }
          elif (q.id === 'RUN_STATE.1') { blockerText = 'Monolithic prompt reasoning failures'; mitigationText = 'Deploy graph-based supervisor-worker loops'; }
          elif (q.id === 'RUN_STATE.2') { blockerText = 'Compute timeouts causing memory loss'; mitigationText = 'Deploy event-driven agentic hibernation'; }
          elif (q.id === 'RUN_STATE.3') { blockerText = 'Manual cross-vendor copy pasting'; mitigationText = 'Integrate standard Agent-to-Agent protocols'; }
          elif (q.id === 'RUN_STATE.4') { blockerText = 'No real-time token/cost visibility'; mitigationText = 'Deploy real-time FinOps budget caps'; }
          elif (q.id === 'RUN_STATE.5') { blockerText = 'Hardcoded legacy API endpoints'; mitigationText = 'Decouple agent logic via Managed Agent APIs'; }
          elif (q.id === 'RUN_STATE.6') { blockerText = 'Manual prompt tweaks with no history'; mitigationText = 'Transition prompts to Git YAML configurations'; }
          elif (q.id === 'SEC_VAL.1') { blockerText = 'No record of reasoning or data lineage'; mitigationText = 'Deploy cryptographic lineage trace logs'; }
          elif (q.id === 'SEC_VAL.2') { blockerText = 'Consumer-grade safety filters only'; mitigationText = 'Deploy Model Armor API guardrails'; }
          elif (q.id === 'SEC_VAL.3') { blockerText = 'Manual regression testing paperwork'; mitigationText = 'Deploy LLM-as-a-judge evaluation frameworks'; }
          elif (q.id === 'SEC_VAL.4') { blockerText = 'Over-privileged service account risk'; mitigationText = 'Implement dynamic user permission propagation'; }
          elif (q.id === 'SEC_VAL.5') { blockerText = 'Shared compute dependency risks'; mitigationText = 'Isolate tools inside secure sandboxes'; }
          elif (q.id === 'SEC_VAL.6') { blockerText = 'Procedural bypass risk for releases'; mitigationText = 'Enforce cryptographic Quality Unit signatures'; }

          blockers.push({
            pillarName: pillar.name,
            questionTitle: q.topic,
            blocker: blockerText,
            mitigation: mitigationText
          });
        }
        
        const weightedQVal = qVal * (1 / pillar.questions.length);
        qScores[q.id] = Math.round(qVal);
        pillarRawScore += weightedQVal;
      });
      pScores[pillar.id] = Math.round(pillarRawScore);
    });

    let prioritySum = 0;
    V11_PILLARS.forEach(pillar => {
      prioritySum += (pScores[pillar.id] || 0) * (pillar.weight / 100);
    });

    const normalizedTotal = Math.round(prioritySum);

    let finalVerdict = "LAUNCH NOW";
    let badgeColor = "#10b981";
    let rationale = "Exemplary high-value opportunity with robust security boundaries and optimized agentic persistence.";

    if (blockers.length > 3 || normalizedTotal < 50) {
      finalVerdict = "HOLD & RE-ARCHITECT";
      badgeColor = "#ef4444";
      rationale = "Critical blocker gates identified across GxP validation boundaries or low cognitive maturity.";
    } else if (blockers.length > 0 || normalizedTotal < 75) {
      finalVerdict = "INCUBATE & VALIDATE";
      badgeColor = "#f59e0b";
      rationale = "Strong agentic blueprint but requires explicit Quality Unit signature bindings or sandboxed runtimes.";
    }

    const finalResult = {
      overallPriority: normalizedTotal,
      pillarScores: pScores,
      questionScores: qScores,
      activeBlockerMitigations: blockers,
      verdict: finalVerdict,
      badgeColor,
      rationale,
      businessValueScore: pScores['UX_HITL'] || 0,
      geminiActivationScore: pScores['INT_REG'] || 0,
      technicalReadinessScore: pScores['RUN_STATE'] || 0,
      changeReadinessScore: pScores['SEC_VAL'] || 0
    };
    scoringDataRef.current = finalResult;
    return finalResult;
  }, [scores]);"""

# Replace in content
content = content.replace(scoring_memo_old, scoring_memo_new)

# Also fix Python syntax 'elif' to 'elif' in javascript? No, wait! The python script writes a javascript template, so the new string is JAVASCRIPT!
# In javascript, it is 'else if', NOT 'elif'!
# Ah! Look at the Javascript scoring_memo_new: it has 'elif' on lines 35-55!
# Yes! JAVASCRIPT does not support 'elif', it must be 'else if'!
# Let's fix that in our script so we write correct Javascript.
# Let's replace 'elif' with 'else if' in the template before writing it.
scoring_memo_new = scoring_memo_new.replace("elif (", "else if (")

content = content.replace(scoring_memo_old, scoring_memo_new)

# 3. Update the live generation payload compiler
payload_compiler_old = """      const assessmentPayload = V11_PILLARS.map(p => ({
        pillar: p.name,
        results: p.questions.map(q => {
          const selectedOptIdx = answers[q.id];
          const selectedScore = selectedOptIdx !== undefined ? (selectedOptIdx + 1) : 1;
          const selectedOption = selectedOptIdx !== undefined ? q.options[selectedOptIdx] : null;
          
          return {
            id: q.id,
            topic: q.title,
            currentScore: selectedScore,
            futureScore: 5,
            technicalPainpoints: selectedOption?.blocker ? [selectedOption.blocker] : [],
            businessPainpoints: selectedOption?.blocker ? [selectedOption.blocker] : [],
            comments: comments[q.id] || '',
            skipped: selectedOptIdx === undefined
          };
        })
      }));"""

payload_compiler_new = """      const assessmentPayload = V11_PILLARS.map(p => ({
        pillar: p.name,
        results: p.questions.map(q => {
          const val = scores[q.id] || {};
          return {
            id: q.id,
            topic: q.topic,
            currentScore: val.current !== null && val.current !== undefined ? val.current : 1,
            futureScore: val.future !== null && val.future !== undefined ? val.future : 5,
            technicalPainpoints: val.techPain || [],
            businessPainpoints: val.bizPain || [],
            comments: val.comments || '',
            skipped: !!val.skipped
          };
        })
      }));"""

content = content.replace(payload_compiler_old, payload_compiler_new)

# 4. Update the preset loader handleSelectPreset
preset_loader_old = """  const handleSelectPreset = (presetKey) => {
    if (!presetKey) return;
    
    let randomAnswers = {};
    V11_PILLARS.forEach(pillar => {
      pillar.questions.forEach(q => {
        randomAnswers[q.id] = 4; // Default to 5th option (Optimized)
      });
    });
    setAnswers(randomAnswers);
    
    setCustomerInfo({
      company: 'GSK Bio-Pharma',
      useCaseName: 'Clinical Study Report (CSR) De-identifying Copilot',
      userName: 'Nitin Aggarwal',
      subVertical: 'Commercial Ops',
      targetUserCount: '12000',
      useCaseDesc: 'Deploying dynamic Model Armor filters and context-caching over patient protocol filings.'
    });
  };"""

preset_loader_new = """  const handleSelectPreset = (presetKey) => {
    if (!presetKey) return;
    
    // Seed rich, multidimensional V5-style scores for Merck
    const merckPrefill = {
      'UX_HITL.1': { current: 2, future: 5, techPain: ['Brittle iframe integrations', 'No bidirectional state syncing'], bizPain: ['Users refuse to leave native tools', 'High context-switching overhead'], comments: 'Markatives currently toggle between AI portals and Veeva Canvas.', skipped: false },
      'UX_HITL.2': { current: 2, future: 5, techPain: ['No event-driven workflow pausing', 'Lack of state preservation during dormancy'], bizPain: ['Regulatory filings delayed by manual queues', 'Lack of audit trail for overrides'], comments: 'Dormancy review queues are managed via manual emails.', skipped: false },
      'UX_HITL.3': { current: 1, future: 4, techPain: ['Hardcoded compliance text', 'Lack of geolocalized routing intelligence'], bizPain: ['Non-compliance with state AI laws', 'Geolocalized disclaimer errors'], comments: 'Disclosures are appended manually based on legal printout lists.', skipped: false },
      'INT_REG.1': { current: 2, future: 5, techPain: ['Hardcoded model API calls', 'No dynamic failover routing'], bizPain: ['Vendor lock-in risks', 'High API costs for large context windows'], comments: 'Monolithic model integration forces context limits.', skipped: false },
      'INT_REG.2': { current: 3, future: 5, techPain: ['Monolithic prompt bloat', 'Brittle semantic search over legal text'], bizPain: ['Slowing time-to-market due to regulatory checks', 'Conflicting rules across regions'], comments: 'Pushes rule lists into prompts resulting in hallucination risks.', skipped: false },
      'INT_REG.3': { current: 2, future: 5, techPain: ['Lack of real-time pipeline monitoring', 'No automated layout prominence auditing'], bizPain: ['Missed Adverse Event (AE) signals', 'Severe FDA warning letter risks'], comments: 'Medical Safety Agent audit is completely absent today.', skipped: false },
      'INT_REG.4': { current: 1, future: 5, techPain: ['No unified multimodal token space', 'Lack of exact voiceover time extraction'], bizPain: ['Audio/video sync mismatch errors', 'Non-compliance with FDA pacing mandates'], comments: 'Synchronizing audio script pacing is manual.', skipped: false },
      'DATA_SEM.1': { current: 2, future: 5, techPain: ['No real-time grounding verification', 'No native connection to Veeva Vault API'], bizPain: ['Outdated claims in marketing assets', 'High risk of unapproved scientific claims'], comments: 'Claims lists are extracted to spreadsheets point-in-time.', skipped: false },
      'DATA_SEM.2': { current: 3, future: 5, techPain: ['Brittle custom webhook routing', 'Lack of protocol standardization'], bizPain: ['High integration engineering costs', 'Fragmented enterprise data silos'], comments: 'Connecting middleware requires custom webhooks.', skipped: false },
      'RUN_STATE.1': { current: 2, future: 5, techPain: ['Hardcoded orchestration scripts', 'No standardized agent state sharing'], bizPain: ['Monolithic prompt reasoning failures', 'High failure rate of long reasoning chains'], comments: 'Sequential chaining slows response times down.', skipped: false },
      'RUN_STATE.2': { current: 2, future: 5, techPain: ['Brittle custom state serialization', 'No native event-driven hibernation'], bizPain: ['High compute costs for idle sessions', 'Memory loss during long human reviews'], comments: 'Computed memory times out during multi-day MLR reviews.', skipped: false },
      'RUN_STATE.3': { current: 1, future: 4, techPain: ['Hardcoded custom REST wrappers', 'No standardized A2A protocol support'], bizPain: ['Manual cross-vendor copy pasting', 'High cost of custom SaaS integrations'], comments: 'Delegation across vendor boundaries is procedural.', skipped: false },
      'RUN_STATE.4': { current: 2, future: 5, techPain: ['No real-time token counters', 'No cost-effective token-routing mesh'], bizPain: ['No real-time token/cost visibility', 'Massive budget overruns from loops'], comments: 'IT lacks attribution tags for campaign tokens.', skipped: false },
      'RUN_STATE.5': { current: 3, future: 5, techPain: ['Hardcoded legacy API endpoints', 'No standardized agent interface APIs'], bizPain: ['High maintenance cost of legacy endpoints', 'Slow rollout of modern model features'], comments: 'Legacy MLOps stack hosting agent pipelines.', skipped: false },
      'RUN_STATE.6': { current: 2, future: 5, techPain: ['No version control for prompts', 'Manual deployment pipeline friction'], bizPain: ['Prompt tweaks breaking production', 'High risk of unauthorized hotfixes'], comments: 'Prompts are updated directly inside GCP sandbox consoles.', skipped: false },
      'SEC_VAL.1': { current: 2, future: 5, techPain: ['No cryptographic trace logging', 'Lack of real-time data cache validation'], bizPain: ['No record of reasoning or data lineage', 'Difficulty passing regulatory audits'], comments: 'Reasoning lineage trail is not cryptographically signed.', skipped: false },
      'SEC_VAL.2': { current: 2, future: 5, techPain: ['Consumer-grade safety filters only', 'No real-time token/prompt inspection'], bizPain: ['Accidental exposure of patient PII', 'Severe security compliance violations'], comments: 'PII scrubbing is regex-based.', skipped: false },
      'SEC_VAL.3': { current: 2, future: 5, techPain: ['No automated regression testing suite', 'Lack of LLM-as-a-judge frameworks'], bizPain: ['Months of delayed model upgrades', 'High cost of manual QA paperwork'], comments: 'Automated continuous validation is absent.', skipped: false },
      'SEC_VAL.4': { current: 1, future: 4, techPain: ['Hardcoded destination API keys', 'No user identity propagation mesh'], bizPain: ['Over-privileged service account risks', 'Severe tenant crossing vulnerabilities'], comments: 'Downstream agent API executes under single service account.', skipped: false },
      'SEC_VAL.5': { current: 2, future: 5, techPain: ['No isolated runtime sandboxes', 'Deserialization security vulnerabilities'], bizPain: ['High risk of Remote Code Execution (RCE)', 'Supply chain dependency vulnerabilities'], comments: 'Arbitrary tools executed outside isolated sandboxes.', skipped: false },
      'SEC_VAL.6': { current: 2, future: 5, techPain: ['No hardwired deployment locks', 'Lack of cryptographic signature binding'], bizPain: ['Procedural bypass risk for releases', 'High compliance liability for Quality Assurance'], comments: 'Quality unit release verification relies on email signatures.', skipped: false }
    };
    setScores(merckPrefill);
    
    setCustomerInfo({
      company: 'Merck & Co.',
      useCaseName: 'Clinical Trial Protocol Auditor',
      userName: 'Nitin Aggarwal',
      subVertical: 'Commercial Biopharma',
      targetUserCount: '11000',
      useCaseDesc: 'Deploying dual-modality pacing checkers and Veeva Vault MCP claims grounding.'
    });
  };"""

content = content.replace(preset_loader_old, preset_loader_new)

# 5. Replace other references to answers and comments
content = content.replace("localStorage.setItem('v11_active_consultative_buffer', JSON.stringify({ answers, customerInfo, liveSynthesis, timestamp: new Date().toISOString() }));", "localStorage.setItem('v11_active_consultative_buffer', JSON.stringify({ scores, customerInfo, liveSynthesis, timestamp: new Date().toISOString() }));")
content = content.replace("const snapshot = { answers, customerInfo, liveSynthesis, timestamp: new Date().toISOString() };", "const snapshot = { scores, customerInfo, liveSynthesis, timestamp: new Date().toISOString() };")
content = content.replace("if (stored.answers) setAnswers(stored.answers);", "if (stored.scores) setScores(stored.scores);")
content = content.replace("if (storedBuf.answers) setAnswers(storedBuf.answers);", "if (storedBuf.scores) setScores(storedBuf.scores);")
content = content.replace("if (vec.answers) setAnswers(vec.answers);", "if (vec.scores) setScores(vec.scores);")
content = content.replace("if (storedBuf.comments) setComments(storedBuf.comments);", "")
content = content.replace("if (stored.comments) setComments(stored.comments);", "")
content = content.replace("if (vec.comments) setComments(vec.comments);", "")
content = content.replace("setAnswers({});", "setScores({});")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Part 1: State and scoring refactoring complete!")
