import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Target the rehydration code block
old_rehydration = """      // Rehydrate Report Page View Mode & Tab View
      const savedPage = localStorage.getItem(`v12_report_page_${sessId}`);
      if (savedPage) {
        setReportPage(savedPage);
        setActiveTab('report'); // Automatically lock them into the report dashboard view!
      }"""

replacement_rehydration = """      // Rehydrate Report Page View Mode & Tab View
      const savedPage = localStorage.getItem(`v12_report_page_${sessId}`);
      if (savedPage) {
        setReportPage(savedPage);
        setActiveTab('scorecard'); // Automatically lock them into the report dashboard view!
      }"""

if old_rehydration in code:
    code = code.replace(old_rehydration, replacement_rehydration)
    print("✓ Successfully fixed tab rehydration state ('report' -> 'scorecard')!")
else:
    print("❌ Target rehydration block not found!")

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Complete!")
