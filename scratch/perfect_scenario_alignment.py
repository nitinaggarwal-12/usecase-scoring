import os

v12_path = '/usr/local/google/home/nitinagga/usecase_scoring/src/components/PremiumScopingAssessorV12.jsx'

with open(v12_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update the vendors.storage label for s3
old_vendors_s3 = "s3: { label: 'Custom S3 / Cloud Storage', cost: 0.2, agility: 50, compliance: 60, gxp: 65 }"
replacement_vendors_s3 = "s3: { label: 'Google Cloud Storage / Custom S3', cost: 0.2, agility: 50, compliance: 60, gxp: 65 }"
code = code.replace(old_vendors_s3, replacement_vendors_s3)

# 2. Update the select option label for s3 in Tab 8
old_option_s3 = '<option value="s3">Custom S3 / Cloud Storage</option>'
replacement_option_s3 = '<option value="s3">Google Cloud Storage / Custom S3</option>'
code = code.replace(old_option_s3, replacement_option_s3)

# 3. Ensure Scenario A conditional requires all 4 components (including s3) in both calculations
old_math_scen_a = "if (whatIfOrch === 'google' && whatIfIdentity === 'google_id' && whatIfFederation === 'google_bq') {"
replacement_math_scen_a = "if (whatIfOrch === 'google' && whatIfIdentity === 'google_id' && whatIfFederation === 'google_bq' && whatIfStorage === 's3') {"
code = code.replace(old_math_scen_a, replacement_math_scen_a)

# 4. Ensure Scenario A conditional requires all 4 components in the Page 12 Resilience Report
old_report_scen_a = "const isGoogleNativeStack = selectedOrch === 'google' && selectedId === 'google_id' && selectedFed === 'google_bq';"
replacement_report_scen_a = "const isGoogleNativeStack = selectedOrch === 'google' && selectedId === 'google_id' && selectedFed === 'google_bq' && selectedStore === 's3';"
code = code.replace(old_report_scen_a, replacement_report_scen_a)

with open(v12_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Successfully aligned all Dropdown Labels & 4-Pillar Scenario Conditionals!")
