file_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV11.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the old V10-style handleLoadPreset implementation with the robust V11 Dynamic GxP Mapper
old_preset_implementation = """  const handleLoadPreset = (presetKey, customUseCase = '', customCompany = '') => {
    if (presetKey === 'submission_copilot' || customUseCase.toLowerCase().includes('dossier') || customUseCase.toLowerCase().includes('submission')) {
      setScores({
        Q1: 4, Q2: 4, Q3: 3, Q4: 4, Q5: 4, Q6: 3, Q7: 4, Q8: 3, Q9: 4, Q10: 4,
        Q11: 4, Q12: 4, Q13: 4, Q14: 4, Q15: 3, Q16: 4, Q17: 4, Q18: 3,
        Q19: 4, Q20: 4, Q21: 3, Q22: 4, Q23: 3, Q24: 4, Q25: 4, Q26: 3, Q27: 4, Q28: 3, Q29: 4, Q30: 4
      });
      setCustomerInfo({ company: customCompany || 'Merck & Co.', useCaseName: customUseCase || 'Regulatory Submission Dossier Drafting Copilot', domain: 'R&D / Clinical', runtime: 'Google Cloud Vertex AI', connectors: ['Corporate Lake', 'Private Interconnect'] });
    } else if (presetKey === 'quality_investigator' || customUseCase.toLowerCase().includes('quality') || customUseCase.toLowerCase().includes('pharmacovigilance')) {
      setScores({
        Q1: 3, Q2: 4, Q3: 3, Q4: 3, Q5: 4, Q6: 4, Q7: 3, Q8: 4, Q9: 3, Q10: 3,
        Q11: 4, Q12: 3, Q13: 3, Q14: 4, Q15: 4, Q16: 3, Q17: 4, Q18: 3,
        Q19: 4, Q20: 3, Q21: 4, Q22: 3, Q23: 4, Q24: 4, Q25: 4, Q26: 3, Q27: 3, Q28: 4, Q29: 3, Q30: 4
      });
      setCustomerInfo({ company: customCompany || 'Novartis Pharma AG', useCaseName: customUseCase || 'Global Pharmacovigilance Quality Inspector', domain: 'Quality & Compliance', runtime: 'Google Cloud Vertex AI', connectors: ['Verified GxP Docs', 'BigQuery Zero-ETL'] });
    } else if (customUseCase.toLowerCase().includes('financial') || customUseCase.toLowerCase().includes('sap')) {
      setScores({
        Q1: 4, Q2: 3, Q3: 4, Q4: 4, Q5: 3, Q6: 4, Q7: 4, Q8: 3, Q9: 4, Q10: 4,
        Q11: 3, Q12: 4, Q13: 4, Q14: 3, Q15: 4, Q16: 4, Q17: 4, Q18: 3,
        Q19: 4, Q20: 4, Q21: 4, Q22: 4, Q23: 3, Q24: 4, Q25: 4, Q26: 4, Q27: 3, Q28: 4, Q29: 4, Q30: 4
      });
      setCustomerInfo({ company: customCompany || 'Pfizer Inc.', useCaseName: customUseCase || 'SAP S/4HANA Autonomous Financial Reconciliation', domain: 'Finance & Operations', runtime: 'Google Cloud Vertex AI', connectors: ['SAP OData Bridge', 'Private Interconnect'] });
    } else if (customUseCase.toLowerCase().includes('sop') || customUseCase.toLowerCase().includes('manufacturing')) {
      setScores({
        Q1: 3, Q2: 4, Q3: 3, Q4: 4, Q5: 4, Q6: 4, Q7: 3, Q8: 4, Q9: 3, Q10: 3,
        Q11: 4, Q12: 3, Q13: 4, Q14: 4, Q15: 4, Q16: 3, Q17: 4, Q18: 3,
        Q19: 3, Q20: 3, Q21: 4, Q22: 3, Q23: 4, Q24: 4, Q25: 3, Q26: 3, Q27: 4, Q28: 3, Q29: 3, Q30: 3
      });
      setCustomerInfo({ company: customCompany || 'Roche Diagnostics', useCaseName: customUseCase || 'Next-Gen GxP Compliant Manufacturing SOP Assistant', domain: 'Manufacturing', runtime: 'Google Cloud Vertex AI', connectors: ['LIMS SQL Server', 'Veeva Vault'] });
    } else {
      const charMod = customUseCase ? customUseCase.length % 3 : 0;
      setScores({
        Q1: 3 + (charMod === 0 ? 1 : 0), Q2: 3 + (charMod === 1 ? 1 : 0), Q3: 2 + (charMod === 2 ? 1 : 0), Q4: 4,
        Q5: 3 + (charMod === 1 ? 1 : 0), Q6: 3, Q7: 3 + (charMod === 0 ? 1 : 0), Q8: 4, Q9: 3, Q10: 3 + (charMod === 2 ? 1 : 0),
        Q11: 4, Q12: 3, Q13: 3, Q14: 4, Q15: 3, Q16: 3, Q17: 4, Q18: 3, Q19: 4, Q20: 3,
        Q21: 3 + (charMod === 1 ? 1 : 0), Q22: 3, Q23: 3, Q24: 4, Q25: 3, Q26: 3, Q27: 3, Q28: 3, Q29: 3 + (charMod === 0 ? 1 : 0), Q30: 3
      });
      setCustomerInfo({ company: customCompany || 'Enterprise Client', useCaseName: customUseCase || 'Strategic AI Discovery', domain: 'Enterprise Operations', runtime: 'Google Cloud Vertex AI', connectors: ['Corporate Data Lake'] });
    }
  };"""

new_preset_implementation = """  const handleLoadPreset = (presetKey, customUseCase = '', customCompany = '') => {
    // Determine baseline V10 flat answers for mapping
    let baseAnswers = {};
    let finalCompany = customCompany;
    let finalUseCase = customUseCase;
    let finalDomain = 'R&D / Clinical';

    const useCaseLower = (customUseCase || '').toLowerCase();

    if (presetKey === 'submission_copilot' || useCaseLower.includes('dossier') || useCaseLower.includes('submission') || useCaseLower.includes('merck')) {
      baseAnswers = {
        Q1: 4, Q2: 4, Q3: 3, Q4: 4, Q5: 4, Q6: 3, Q7: 4, Q8: 3, Q9: 4, Q10: 4,
        Q11: 4, Q12: 4, Q13: 4, Q14: 4, Q15: 3, Q16: 4, Q17: 4, Q18: 3,
        Q19: 4, Q20: 4, Q21: 4
      };
      finalCompany = customCompany || 'Merck & Co. Enterprise';
      finalUseCase = customUseCase || 'BeyondCorp OData Clinical Search Federation';
      finalDomain = 'R&D / Clinical';
    } else if (presetKey === 'quality_investigator' || useCaseLower.includes('quality') || useCaseLower.includes('pharmacovigilance')) {
      baseAnswers = {
        Q1: 3, Q2: 4, Q3: 3, Q4: 3, Q5: 4, Q6: 4, Q7: 3, Q8: 4, Q9: 3, Q10: 3,
        Q11: 4, Q12: 3, Q13: 3, Q14: 4, Q15: 4, Q16: 3, Q17: 4, Q18: 3,
        Q19: 4, Q20: 3, Q21: 4
      };
      finalCompany = customCompany || 'Novartis Pharma AG';
      finalUseCase = customUseCase || 'Global Pharmacovigilance Quality Inspector';
      finalDomain = 'Quality & Compliance';
    } else if (useCaseLower.includes('financial') || useCaseLower.includes('sap')) {
      baseAnswers = {
        Q1: 4, Q2: 3, Q3: 4, Q4: 4, Q5: 3, Q6: 4, Q7: 4, Q8: 3, Q9: 4, Q10: 4,
        Q11: 3, Q12: 4, Q13: 4, Q14: 3, Q15: 4, Q16: 4, Q17: 4, Q18: 3,
        Q19: 4, Q20: 4, Q21: 4
      };
      finalCompany = customCompany || 'Pfizer Inc.';
      finalUseCase = customUseCase || 'SAP S/4HANA Autonomous Financial Reconciliation';
      finalDomain = 'Finance & Operations';
    } else if (useCaseLower.includes('sop') || useCaseLower.includes('manufacturing') || useCaseLower.includes('demand') || useCaseLower.includes('sanofi')) {
      baseAnswers = {
        Q1: 3, Q2: 4, Q3: 3, Q4: 4, Q5: 4, Q6: 4, Q7: 3, Q8: 4, Q9: 3, Q10: 3,
        Q11: 4, Q12: 3, Q13: 4, Q14: 4, Q15: 4, Q16: 3, Q17: 4, Q18: 3,
        Q19: 3, Q20: 3, Q21: 4
      };
      finalCompany = customCompany || 'Sanofi S.A.';
      finalUseCase = customUseCase || 'Supply Chain Autonomous Demand Forecasting';
      finalDomain = 'Supply Chain';
    } else {
      const charMod = customUseCase ? customUseCase.length % 3 : 0;
      baseAnswers = {
        Q1: 3 + (charMod === 0 ? 1 : 0), Q2: 3 + (charMod === 1 ? 1 : 0), Q3: 2 + (charMod === 2 ? 1 : 0), Q4: 4,
        Q5: 3 + (charMod === 1 ? 1 : 0), Q6: 3, Q7: 3 + (charMod === 0 ? 1 : 0), Q8: 4, Q9: 3, Q10: 3 + (charMod === 2 ? 1 : 0),
        Q11: 4, Q12: 3, Q13: 3, Q14: 4, Q15: 3, Q16: 3, Q17: 4, Q18: 3, Q19: 4, Q20: 3, Q21: 3
      };
      finalCompany = customCompany || 'GSK Bio-Pharma';
      finalUseCase = customUseCase || 'Clinical Study Report (CSR) De-identifying Copilot';
      finalDomain = 'Commercial Ops';
    }

    // Dynamically convert the flat baseline answers into robust V11 multi-dimensional scoring objects
    const mappedScores = {};
    V11_PILLARS.forEach(pillar => {
      pillar.questions.forEach(q => {
        const val = baseAnswers[q.id] || 3; // Baseline score
        const targetVal = Math.min(5, val + 1); // Target score

        const techPain = [];
        if (val <= 3 && q.technicalPainpoints && q.technicalPainpoints.length > 0) {
          techPain.push(q.technicalPainpoints[0]);
        }

        const bizPain = [];
        if (val <= 3 && q.businessPainpoints && q.businessPainpoints.length > 0) {
          bizPain.push(q.businessPainpoints[0]);
        }

        mappedScores[q.id] = {
          current: val,
          future: targetVal,
          techPain,
          bizPain,
          comments: `Consultative discovery baseline established for ${q.dimension} scoring matrix.`,
          skipped: false
        };
      });
    });

    setScores(mappedScores);
    setCustomerInfo({
      company: finalCompany,
      useCaseName: finalUseCase,
      domain: finalDomain,
      runtime: 'Google Cloud Vertex AI',
      connectors: ['Veeva Vault GxP Docs', 'BigQuery Zero-ETL Feature Store', 'Microsoft SharePoint']
    });
  };"""

content = content.replace(old_preset_implementation, new_preset_implementation)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Preset score mapping successfully modernized to V11 multi-dimensional GxP objects!")
