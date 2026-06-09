from typing import List, Dict, Any, Optional, Literal
from pydantic import BaseModel


class DimensionScores(BaseModel):
    technical: int
    business: int
    migration: int
    timeToValue: int
    risk: int


class ScoringSummary(BaseModel):
    overallFit: int
    verdict: Literal["Strong Fit", "Good Fit", "Moderate Fit", "Low Fit"]
    scores: DimensionScores
    rationale: str


class InFavorItem(BaseModel):
    title: str
    desc: str


class BlockerItem(BaseModel):
    id: str
    category: Literal["Technical", "Business", "Compliance", "Operational"]
    severity: Literal["Critical", "High", "Medium", "Low"]
    title: str
    desc: str


class RecommendationItem(BaseModel):
    title: str
    desc: str


class NextStepItem(BaseModel):
    id: int
    owner: Literal["CE", "Customer", "Joint"]
    timeframe: str
    title: str
    desc: str


class RoiSummary(BaseModel):
    tcoSavings: str
    paybackPeriod: str
    summary: str


class PeerBenchmarkItem(BaseModel):
    peerName: str
    useCase: str
    benefitsRealized: str
    techStack: str
    source: str


class AssessmentReport(BaseModel):
    company: str
    industry: str
    timestamp: str
    scoring: ScoringSummary
    inFavor: List[InFavorItem]
    blockers: List[BlockerItem]
    recommendations: List[RecommendationItem]
    features: List[str]
    nextSteps: List[NextStepItem]
    roi: RoiSummary
    benchmarks: Optional[List[PeerBenchmarkItem]] = None


class CodeIntrospectionResponse(BaseModel):
    difficulty: Literal["Low", "Medium", "High"]
    targetService: str
    risks: List[str]
    refactoredCode: str
    rationale: str
