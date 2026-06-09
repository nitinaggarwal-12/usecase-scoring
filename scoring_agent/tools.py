import json
import psycopg2
from typing import Dict, Any, List
from google.cloud import storage

PROJECT_ID = "nitinagga-ge"
BUCKET_NAME = "usecase-scoring-advisor-nitinagga-ge"


def calculate_base_scores(form_data: Dict[str, Any]) -> Dict[str, Any]:
    """Calculates the multi-dimensional fit scores based on customer intake data."""
    # Bounded Gemini Enterprise Scoring Engine (Max Score: 100)
    # Inverted Baseline: Every dimension starts at a perfect 100, applying only negative offsets (penalties).
    tech_score = 100
    biz_score = 100
    mig_score = 100
    ttv_score = 100
    risk_score = 100

    current_cloud = form_data.get("currentCloud", "GCP")
    ml_maturity = form_data.get("mlMaturity", 3)
    annual_spend = form_data.get("annualSpend", "$200k-$500k/yr")
    urgency = form_data.get("urgency", 3)
    exec_sponsor = form_data.get("execSponsor", "Pending")
    migrating_from = form_data.get("migratingFrom", [])
    data_stack = form_data.get("dataStack", [])
    use_case_types = form_data.get("useCaseTypes", [])
    compliance = form_data.get("compliance", [])
    blockers = form_data.get("blockers", [])

    # 1. Technical Feasibility (Weight: 25%)
    # Custom Orchestration (Penalty: -15)
    requires_adk = (form_data.get("groundingStrategy") == "custom") or ("Open source / Self-hosted (Llama, Mistral)" in migrating_from)
    if requires_adk:
        tech_score -= 15
    # Data Ingestion Friction (Penalty: -25)
    has_ingestion_friction = (current_cloud == "On-Premises") or (form_data.get("currentDataSource") == "On-Premises") or ("Vector DBs (Pinecone/Milvus)" in data_stack) or ("Salesforce" in data_stack)
    if has_ingestion_friction:
        tech_score -= 25
    # Model Weight (Penalty: -10)
    requires_complex_models = ("Multi-modal (images, audio, video)" in use_case_types) or (form_data.get("inputModality") == "multimodal")
    if requires_complex_models:
        tech_score -= 10
    # Legacy Architecture (Penalty: -5)
    is_legacy_migration = (form_data.get("isCurrentUseCase") == "Yes") or (len(migrating_from) > 0 and "None" not in migrating_from)
    if is_legacy_migration:
        tech_score -= 5

    # 2. Business Value / ROI (Weight: 25%)
    # Niche User Base (Penalty: -20)
    is_niche_audience = (form_data.get("annualSpend") == "<$200k/yr")
    if is_niche_audience:
        biz_score -= 20
    # Single-Task Scope (Penalty: -15)
    is_single_task = (len(use_case_types) == 1)
    if is_single_task:
        biz_score -= 15
    # Lack of Sponsorship (Penalty: -35)
    if exec_sponsor == "No":
        biz_score -= 35
    elif exec_sponsor == "Pending":
        biz_score -= 15

    # 3. Transformation Ease (Weight: 20%)
    # Interface Friction (Penalty: -25)
    has_interface_friction = (form_data.get("groundingStrategy") == "custom") or ("Agentic / multi-step workflows" in use_case_types)
    if has_interface_friction:
        mig_score -= 25
    # Shadow IT Debt (Penalty: -10)
    has_shadow_it_debt = (len(migrating_from) > 0 and "None" not in migrating_from)
    if has_shadow_it_debt:
        mig_score -= 10

    # 4. Time to Value (Weight: 15%)
    # Data Chaos (Penalty: -30)
    has_data_chaos = ("S3 / GCS Unstructured" in data_stack) or (form_data.get("groundingStrategy") == "hybrid")
    if has_data_chaos:
        ttv_score -= 30
    # Network Complexity (Penalty: -20)
    has_network_complexity = (form_data.get("dataResidency") in ["vpc_restricted", "eu_restricted"]) or ("Snowflake" in data_stack)
    if has_network_complexity:
        ttv_score -= 20

    # 5. Risk / Safety (Weight: 15%)
    # Full Autonomy (Penalty: -25)
    is_fully_autonomous = ("Agentic / multi-step workflows" in use_case_types)
    if is_fully_autonomous:
        risk_score -= 25
    # Regulatory Perimeter (Penalty: -20)
    requires_reg_perimeter = ("SOC2" in compliance) or ("FedRAMP / Gov" in compliance) or (form_data.get("dataResidency") == "vpc_restricted")
    if requires_reg_perimeter:
        risk_score -= 20
    # Strict Compliance (Penalty: -15)
    requires_strict_compliance = ("HIPAA" in compliance) or ("PII / GDPR" in compliance) or ("PII handling in prompt pipelines" in blockers)
    if requires_strict_compliance:
        risk_score -= 15

    # Bounding constraint: clamped strictly between 0 and 100
    clamp = lambda val: min(max(round(val), 0), 100)
    tech_score = clamp(tech_score)
    biz_score = clamp(biz_score)
    mig_score = clamp(mig_score)
    ttv_score = clamp(ttv_score)
    risk_score = clamp(risk_score)

    overall = round((tech_score * 0.25) + (biz_score * 0.25) + (mig_score * 0.2) + (ttv_score * 0.15) + (risk_score * 0.15))
    verdict = "Moderate Fit"
    if overall >= 80:
        verdict = "Strong Fit"
    elif overall >= 65:
        verdict = "Good Fit"
    elif overall < 50:
        verdict = "Low Fit"

    return {
        "overallFit": overall,
        "verdict": verdict,
        "scores": {
            "technical": tech_score,
            "business": biz_score,
            "migration": mig_score,
            "timeToValue": ttv_score,
            "risk": risk_score
        }
    }


def save_intake_session_to_db(session_id: str, form_data: Dict[str, Any], report_summary: Dict[str, Any]) -> str:
    """Saves an intake session draft directly to the local PostgreSQL database."""
    try:
        conn = psycopg2.connect("postgresql:///usecase_scoring")
        cursor = conn.cursor()
        
        # Check if exists
        cursor.execute("SELECT 1 FROM sessions WHERE id = %s", (session_id,))
        exists = cursor.fetchone()
        
        # Format names / ids
        report_name = form_data.get("reportName") or form_data.get("company", "Unnamed") + " Assessment"
        report_id = report_summary.get("reportId") or "GE-SAVED"
        framework = "option1"
        status = "Completed"
        health = "Green"
        current_version = "v1.0"
        
        scores = report_summary.get("scoring", {}).get("scores", {})
        
        if exists:
            cursor.execute("""
                UPDATE sessions SET
                    report_name = %s,
                    report_id = %s,
                    status = %s,
                    health = %s,
                    framework = %s,
                    current_version = %s,
                    form_data = %s,
                    scores = %s,
                    raw_response = %s
                WHERE id = %s
            """, (
                report_name,
                report_id,
                status,
                health,
                framework,
                current_version,
                json.dumps(form_data),
                json.dumps(scores),
                json.dumps(report_summary),
                session_id
            ))
        else:
            cursor.execute("""
                INSERT INTO sessions (
                    id, report_name, report_id, status, health, framework, current_version, form_data, scores, raw_response
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                session_id,
                report_name,
                report_id,
                status,
                health,
                framework,
                current_version,
                json.dumps(form_data),
                json.dumps(scores),
                json.dumps(report_summary)
            ))
        conn.commit()
        cursor.close()
        conn.close()
        return f"Successfully saved session {session_id} to PostgreSQL database."
    except Exception as e:
        return f"Error saving session to PostgreSQL: {e}"


def load_intake_sessions_from_db() -> List[Dict[str, Any]]:
    """Lists and loads saved intake sessions from PostgreSQL."""
    try:
        conn = psycopg2.connect("postgresql:///usecase_scoring")
        cursor = conn.cursor()
        cursor.execute("SELECT id, form_data, raw_response FROM sessions")
        rows = cursor.fetchall()
        sessions = []
        for r in rows:
            sessions.append({
                "session_id": r[0],
                "form_data": r[1],
                "report_summary": r[2]
            })
        cursor.close()
        conn.close()
        return sessions
    except Exception as e:
        print(f"Failed loading sessions from PostgreSQL: {e}")
        return []
