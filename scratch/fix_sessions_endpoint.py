import os

server_path = '/usr/local/google/home/nitinagga/usecase_scoring/server.js'

with open(server_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Target the hardcoded GET route
target_route = "app.get('/api/sessions', (req, res) => res.json([]));"

replacement_routes = """// Helper to read local flat-file sessions database
const getSessionsFromBackup = () => {
  try {
    if (fs.existsSync(BACKUP_FILE)) {
      const data = fs.readFileSync(BACKUP_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('[SESSIONS_DB_WARN] Flat-file read failed:', err.message);
  }
  return [];
};

// 1. GET: Retrieve all saved assessments for the Portfolio Summary master grid
app.get('/api/sessions', (req, res) => {
  const sessions = getSessionsFromBackup();
  return res.json(sessions);
});

// 2. POST: Save or Update a scoping assessment (handles versions & portfolio sync)
app.post('/api/sessions', (req, res) => {
  const session = req.body;
  if (!session || !session.id) {
    return res.status(400).json({ error: "Session ID is required" });
  }

  let sessionsList = getSessionsFromBackup();
  const idx = sessionsList.findIndex(s => s.id === session.id);
  
  // Normalize snake_case DB fields to camelCase client fields for flawless load rehydration!
  const sessionEntry = {
    id: session.id,
    reportName: session.report_name || session.reportName || "",
    reportId: session.report_id || session.reportId || "",
    timestamp: session.timestamp || new Date().toISOString(),
    status: session.status || "Completed",
    health: session.health || "Green",
    framework: session.framework || "option12",
    currentVersion: session.current_version || session.currentVersion || "v1.0",
    formData: session.form_data || session.formData || {},
    scores: session.scores || {},
    rawResponse: session.raw_response || session.rawResponse || {},
    versions: session.versions || []
  };

  if (idx !== -1) {
    // Update existing session in-place
    sessionsList[idx] = sessionEntry;
    console.log(`[SESSIONS_DB] Updated existing session ${session.id} successfully.`);
  } else {
    // Prepend new session to the top of the Portfolio Summary master grid
    sessionsList.unshift(sessionEntry);
    console.log(`[SESSIONS_DB] Created new session ${session.id} successfully.`);
  }

  // Sync to disk
  syncToFlatFileBackup(sessionsList);
  return res.json({ success: true, session: sessionEntry });
});"""

if target_route in code:
    code = code.replace(target_route, replacement_routes)
    print("✓ Successfully replaced hardcoded sessions route with full-featured local database!")
else:
    print("❌ target_route not found in server.js!")

with open(server_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("🎉 Complete!")
