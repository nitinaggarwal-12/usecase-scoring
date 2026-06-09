from google.adk.agents import LlmAgent
from google.adk.tools.agent_tool import AgentTool

from .tools import calculate_base_scores, save_intake_session_to_db, load_intake_sessions_from_db
from .schemas import AssessmentReport, CodeIntrospectionResponse

MODEL = "gemini-3.5-pro"


assessment_generator_agent = LlmAgent(
    name="AssessmentGeneratorAgent",
    model=MODEL,
    description="Analyzes customer use case migration intake data and calculates base scores to generate a structured assessment report.",
    instruction="""You are an expert Google Cloud Generative AI Customer Engineer and Solution Architect.
Analyze the customer use case migration intake data and calculated base scores to synthesize a professional, structured assessment report.

Provide rich architectural rationale, specific GCP blockers (such as PII handling in DLP or Snowflake pipeline ownership), and actionable recommendations like Vertex AI Agent Builder and Private Service Connect (PSC). Include TCO payback period calculations, and include realistic peer and competitor benchmarks (including their specific tech stack and realized benefits) tailored to the customer's industry sub-vertical. You MUST quote the correct source for each benchmark (such as specific Gartner, Forrester, IDC reports, or official GCP public case studies) and populate the `source` field.""",
    tools=[calculate_base_scores, save_intake_session_to_db],
    output_schema=AssessmentReport,
    output_key="assessment_report",
)


chat_assistant_agent = LlmAgent(
    name="LiveChatAssistantAgent",
    model=MODEL,
    description="Assists Customer Engineers in real time during customer discovery and migration meetings. Handles objection handling and roadmap planning.",
    instruction="""You are an elite Google Cloud Generative AI Specialist and Solution Architect assisting a Customer Engineer (CE) during a live customer discovery and migration meeting.

Maintain full contextual awareness of both the customer intake profile and the assessment report. Answer real-time follow-up questions, handle CISO objections regarding data privacy, HIPAA, and PII by explaining Google Cloud's zero-logging policy and DLP guardrails. Draft 4-week joint technical migration roadmaps and competitive briefs against Azure OpenAI and Anthropic. Format your response in clean Markdown.""",
    tools=[load_intake_sessions_from_db],
    output_key="chat_response",
)


coordinator = LlmAgent(
    name="Coordinator",
    model=MODEL,
    description="Main orchestrator interface for the Use Case Scoring & Discovery Advisor. Routes requests to assessment generation or interactive chat.",
    instruction="""You are the main interface for the Gemini Use Case Scoring & Discovery Advisor on Google Cloud.

When a user or client application submits customer intake data for evaluation, delegate to the `AssessmentGeneratorAgent` to calculate base scores and output a structured JSON report.
When a user asks real-time meeting questions, objections, or roadmap deep-dives, delegate to the `LiveChatAssistantAgent`.

### 💡 Auto-Sample / Mock Report Directive:
If the user asks you to "make assumptions", "generate a sample", "decide on your own", or test the system without providing data, you MUST NOT refuse or apologize! Instead, immediately formulate a complete, realistic enterprise customer profile (such as Merck & Co. migrating from AWS Bedrock to Google Cloud or Northside Health Systems migrating from Azure OpenAI) and delegate to `AssessmentGeneratorAgent` using that synthesized mock profile!

Always be highly professional, actionable, and grounded in official Google Cloud architecture.""",
    tools=[
        AgentTool(agent=assessment_generator_agent),
        AgentTool(agent=chat_assistant_agent),
    ],
)

code_introspection_agent = LlmAgent(
    name="CodeIntrospectionAgent",
    model=MODEL,
    description="Analyzes legacy code snippets, prompt templates, or SQL queries and refactors them to Google Cloud equivalents, highlighting risks.",
    instruction="""You are an expert Google Cloud migration engineering assistant.
Analyze the pasted code snippet, prompt template, or SQL query. Evaluate the migration difficulty, targets on GCP (e.g. BigQuery native SQL, Vertex AI Agent Builder, DLP API), list any conversion risks or deprecated elements, and generate the proposed refactored GCP equivalent code. Return a structured JSON response matching our output schema.""",
    output_schema=CodeIntrospectionResponse,
    output_key="introspection_response",
)

root_agent = coordinator
