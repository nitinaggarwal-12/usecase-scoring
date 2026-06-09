from vertexai.agent_engines import AdkApp
from google.adk.artifacts.gcs_artifact_service import GcsArtifactService
from .agent import root_agent

def gcs_artifact_service_builder(app_name: str):
    return GcsArtifactService(bucket_name="usecase-scoring-advisor-nitinagga-ge")

adk_app = AdkApp(
    agent=root_agent,
    artifact_service_builder=gcs_artifact_service_builder,
    enable_tracing=None,
)
