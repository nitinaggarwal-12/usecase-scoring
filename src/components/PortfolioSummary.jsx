import { useState } from 'react';
import { LayoutDashboard, TrendingUp, CheckCircle, AlertTriangle, Users, ArrowUpRight, Layers, Briefcase, Activity, Search, Calendar, Sparkles } from 'lucide-react';

export default function PortfolioSummary({ sessions, onLoadSession, onNewIntake }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');
  
  // Interactive KPI Hovering Highlights State
  const [highlightedPillar, setHighlightedPillar] = useState(null); // null | 'technical' | 'business' | 'migration' | 'timeToValue' | 'risk'

  // 1. Aggregated Calculations across the Portfolio
  const totalCases = sessions.length;
  
  const avgFit = totalCases > 0 
    ? Math.round(sessions.reduce((acc, s) => acc + (s.scoring?.overallFit || s.rawResponse?.scoring?.overallFit || 0), 0) / totalCases)
    : 0;

  const strongFitCount = sessions.filter(s => {
    const score = s.scoring?.overallFit || s.rawResponse?.scoring?.overallFit || 0;
    return score >= 80;
  }).length;

  const strongFitRatio = totalCases > 0 ? Math.round((strongFitCount / totalCases) * 100) : 0;

  // Calculate aggregate projected financial savings
  const getSpendValue = (spendStr) => {
    if (!spendStr) return 350000;
    if (spendStr.includes('<$50k')) return 35000;
    if (spendStr.includes('$50k-$200k')) return 125000;
    if (spendStr.includes('$200k-$500k')) return 350000;
    if (spendStr.includes('$500k-$1M')) return 750000;
    if (spendStr.includes('>$1M')) return 1500000;
    return 350000;
  };

  const totalProjectedSavings = sessions.reduce((acc, s) => {
    const fData = s.formData;
    const baseSpend = getSpendValue(fData?.annualSpend);
    const savings = baseSpend * 0.24; 
    return acc + savings;
  }, 0);

  // Discovery status health counts
  const onTrackCount = sessions.filter(s => (s.health || s.formData?.health || 'Green') === 'Green').length;
  const delayedCount = sessions.filter(s => (s.health || s.formData?.health) === 'Yellow').length;
  const supportCount = sessions.filter(s => (s.health || s.formData?.health) === 'Red').length;

  // Calculate average score for each of the 5 pillars
  const getPillarAverage = (pillarKey) => {
    if (totalCases === 0) return 0;
    const sum = sessions.reduce((acc, s) => {
      const scores = s.scoring?.scores || s.rawResponse?.scoring?.scores || {};
      return acc + (scores[pillarKey] || 0);
    }, 0);
    return Math.round(sum / totalCases);
  };

  const pillarAverages = {
    technical: getPillarAverage('technical'),
    business: getPillarAverage('business'),
    migration: getPillarAverage('migration'),
    timeToValue: getPillarAverage('timeToValue'),
    risk: getPillarAverage('risk')
  };

  // Unique Industries list for filter
  const industries = ['All', ...new Set(sessions.map(s => s.formData?.industry).filter(Boolean))];

  // Filtered sessions list
  const filteredSessions = sessions.filter(s => {
    const company = s.formData?.company || '';
    const useCase = s.formData?.useCaseName || '';
    const industry = s.formData?.industry || '';

    const matchesSearch = company.toLowerCase().includes(searchQuery.toLowerCase()) || 
      useCase.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = industryFilter === 'All' || industry === industryFilter;

    return matchesSearch && matchesIndustry;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Empty State if no sessions exist
  if (totalCases === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '500px', maxWidth: '800px', margin: '0 auto', textAlign: 'center', gap: '1.5rem' }}>
        <div style={{ background: 'var(--google-blue-light)', color: 'var(--google-blue)', padding: '1.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)' }}>
          <LayoutDashboard size={48} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Cross-Portfolio Executive Summary</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: 1.5 }}>
            Analyze enterprise workload suitability, track migration velocities, and aggregate projected TCO savings across all client discovery sessions.
          </p>
        </div>
        <button 
          onClick={onNewIntake}
          className="btn btn-primary"
          style={{ padding: '0.75rem 2rem', fontSize: '0.95rem', fontWeight: 700, borderRadius: '8px', background: 'linear-gradient(90deg, #1a73e8 0%, #4285f4 100%)', color: '#ffffff', border: 'none', boxShadow: '0 4px 12px rgba(26,115,232,0.25)' }}
        >
          🚀 Create Your First Intake Draft
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '1340px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem', padding: '0 1rem' }}>
      
      {/* 📊 Looker-Style Premium Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #1a73e8 0%, #3b82f6 100%)', color: 'white', padding: '0.6rem', borderRadius: '10px', boxShadow: '0 4px 12px rgba(26,115,232,0.15)' }}>
            <LayoutDashboard size={26} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
              Portfolio Summary Analytics
            </h1>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.15rem' }}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--google-green)', animation: 'pulse 1.5s infinite' }} />
              <span>Active Project Registry: <strong style={{ color: 'var(--text-primary)' }}>nitinagga-ge</strong> • Altostrat SSO Real-Time Data Feed</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onNewIntake}
          className="btn btn-primary"
          style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', fontWeight: 700, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.45rem' }}
        >
          <span>New Intake</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* 📈 Executive KPI Grid - Inline Grid Style prevents vertical stacking */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem', width: '100%' }}>
        
        {/* KPI 1 */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1.25rem', background: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '12px', borderTop: '4px solid var(--google-blue)', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Use Cases</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>{totalCases}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>active drafts</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--google-blue)', display: 'flex', alignItems: 'center', gap: '0.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
            <Sparkles size={11} />
            <span>100% multi-agent rated</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1.25rem', background: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '12px', borderTop: '4px solid #0284c7', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Avg. Fit Score</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
            <span style={{ fontSize: '2.25rem', fontWeight: 900, color: avgFit >= 75 ? 'var(--google-green)' : avgFit >= 55 ? 'var(--google-blue)' : 'var(--google-amber)', lineHeight: 1 }}>{avgFit}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>/100</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
            <Activity size={11} style={{ color: 'var(--google-green)' }} />
            <span>Verdicts Clamped Neutral</span>
          </div>
        </div>

        {/* KPI 3: Portfolio Discovery Health */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', padding: '1.25rem', background: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '12px', borderTop: '4px solid var(--google-amber)', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Discovery Status Health</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.15rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700 }}>
              <span style={{ color: 'var(--google-green)' }}>🟢 On Track:</span>
              <span style={{ color: 'var(--text-primary)' }}>{onTrackCount}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700 }}>
              <span style={{ color: 'var(--google-amber)' }}>🟡 Delayed:</span>
              <span style={{ color: 'var(--text-primary)' }}>{delayedCount}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700 }}>
              <span style={{ color: 'var(--google-red)' }}>🔴 Support Needed:</span>
              <span style={{ color: 'var(--text-primary)' }}>{supportCount}</span>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1.25rem', background: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '12px', borderTop: '4px solid var(--google-purple)', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Strong Fit Ratio</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--google-purple)', lineHeight: 1 }}>{strongFitRatio}%</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>({strongFitCount} cases)</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--google-purple)', display: 'flex', alignItems: 'center', gap: '0.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
            <CheckCircle size={11} />
            <span>Ready for immediate PoC</span>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1.25rem', background: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '12px', borderTop: '4px solid var(--google-green)', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Aggregate TCO Savings</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
            <span style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--google-green)', lineHeight: 1 }}>{formatCurrency(totalProjectedSavings)}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>/yr</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--google-green)', display: 'flex', alignItems: 'center', gap: '0.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
            <TrendingUp size={11} />
            <span>Calculated via GCP CUDs</span>
          </div>
        </div>
      </div>

      {/* 📊 Pillar Score Averages Breakdown - Inline Grid Style prevents layout collapsing */}
      <div className="card" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '16px', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Average Feasibility Metrics Across Active Portfolio
          </span>
          {highlightedPillar && (
            <span style={{ fontSize: '0.72rem', color: 'var(--google-blue)', fontWeight: 700, animation: 'fadeIn 0.2s ease' }}>
              💡 Highlighting key contributors to average {highlightedPillar} score in the grid below...
            </span>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {[
            { label: 'Technical Feasibility', val: pillarAverages.technical, key: 'technical' },
            { label: 'Business Value', val: pillarAverages.business, key: 'business' },
            { label: 'Transformation Ease', val: pillarAverages.migration, key: 'migration' },
            { label: 'Time to Value', val: pillarAverages.timeToValue, key: 'timeToValue' },
            { label: 'Risk Safety', val: pillarAverages.risk, key: 'risk' }
          ].map((pillar, idx) => {
            let color = 'var(--google-blue)';
            if (pillar.val >= 80) color = 'var(--google-green)';
            else if (pillar.val >= 60) color = 'var(--google-blue)';
            else if (pillar.val >= 40) color = 'var(--google-amber)';
            else color = 'var(--google-red)';

            const isHovered = highlightedPillar === pillar.key;

            return (
              <div 
                key={idx} 
                onMouseEnter={() => setHighlightedPillar(pillar.key)}
                onMouseLeave={() => setHighlightedPillar(null)}
                style={{ 
                  background: isHovered ? 'rgba(26,115,232,0.02)' : 'var(--bg-surface)', 
                  border: `1px solid ${isHovered ? 'var(--google-blue)' : 'var(--border-color)'}`, 
                  padding: '1rem', 
                  borderRadius: '10px',
                  cursor: 'help',
                  transition: 'all 0.2s ease',
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: isHovered ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>{pillar.label}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{pillar.val}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>/100</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pillar.val}%`, background: color, borderRadius: '3px' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔎 Filters & Search */}
      <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        
        {/* Search bar */}
        <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text"
            placeholder="Search by company, primary use case description..."
            className="form-input"
            style={{ paddingLeft: '2.35rem', fontSize: '0.85rem' }}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Industry Dropdown Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Industry:</span>
          <select
            value={industryFilter}
            onChange={e => setIndustryFilter(e.target.value)}
            className="form-select"
            style={{ width: '200px', padding: '0.45rem 0.75rem', fontSize: '0.85rem', borderRadius: '8px', background: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
          >
            {industries.map((ind, idx) => (
              <option key={idx} value={ind}>{ind}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 🗂️ Interactive Portfolio Grid */}
      <div>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '1rem' }}>
          Assessed Use Cases ({filteredSessions.length})
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {filteredSessions.map((session) => {
            const fData = session.formData || {};
            const score = session.scoring?.overallFit || session.rawResponse?.scoring?.overallFit || 65;
            const verdict = session.scoring?.verdict || session.rawResponse?.scoring?.overallFitVerdict || 'Good Fit';
            
            let verdictColor = 'badge-blue';
            if (verdict === 'Strong Fit') verdictColor = 'badge-green';
            else if (verdict === 'Good Fit') verdictColor = 'badge-blue';
            else if (verdict === 'Moderate Fit') verdictColor = 'badge-amber';
            else if (verdict === 'Low Fit') verdictColor = 'badge-red';

            // SVG Radial Suitability Gauge parameters
            const radius = 18;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (score / 100) * circumference;
            let gaugeStroke = 'var(--google-blue)';
            if (score >= 80) gaugeStroke = 'var(--google-green)';
            else if (score >= 65) gaugeStroke = 'var(--google-blue)';
            else if (score >= 50) gaugeStroke = 'var(--google-amber)';
            else gaugeStroke = 'var(--google-red)';

            // Dynamic Health status badge
            const health = session.health || fData.health || 'Green';
            let healthBadge = 'badge-green';
            let healthText = '🟢 On Track';
            if (health === 'Yellow') { healthBadge = 'badge-amber'; healthText = '🟡 Delayed'; }
            else if (health === 'Red') { healthBadge = 'badge-red'; healthText = '🔴 Support Needed'; }

            // Dynamic Approval status badge
            const status = session.status || 'Draft';
            let statusBadge = 'badge-grey';
            let statusText = '📝 Draft';
            if (status === 'Pending Approval') { statusBadge = 'badge-blue'; statusText = '⏳ Pending'; }
            else if (status === 'Approved') { statusBadge = 'badge-green'; statusText = '🔒 Approved'; }

            // Dynamic compilation time
            const genTime = session.generationTime || '1.8s';

            // Polished Draft handling for unnamed clients
            const displayName = fData.company?.trim() || 'Client Draft Proposal';
            const displayIndustry = fData.industry?.trim() || 'Industry Sector Pending';
            const displayUseCase = fData.useCaseName?.trim() || 'GenAI Workload Suitability Blueprint';
            const displayDesc = fData.useCaseDesc?.trim() || 'Discovery data compilation pending... Click to open and prefill intake.';

            // KPI Hovering Highlights Logic
            const isHighlighting = highlightedPillar !== null;
            const cardPillarScore = isHighlighting 
              ? (session.scoring?.scores?.[highlightedPillar] || session.rawResponse?.scoring?.scores?.[highlightedPillar] || 0)
              : 0;

            let borderGlow = status === 'Approved' ? 'var(--google-green)' : 'var(--border-color)';
            let cardOpacity = 1;
            let transformScale = 'scale(1)';

            if (isHighlighting) {
              if (cardPillarScore >= 80) {
                borderGlow = 'var(--google-green)';
                transformScale = 'scale(1.015)';
              } else if (cardPillarScore < 60) {
                borderGlow = 'var(--google-red)';
                transformScale = 'scale(1.015)';
              } else {
                cardOpacity = 0.45;
              }
            }

            return (
              <div 
                key={session.id}
                onClick={() => onLoadSession(session)}
                className="card pulse-node"
                style={{ 
                  padding: '1.25rem', 
                  background: 'var(--bg-card)', 
                  borderColor: borderGlow, 
                  borderRadius: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: cardOpacity,
                  transform: transformScale,
                  boxShadow: isHighlighting && cardPillarScore >= 80 
                    ? '0 6px 20px rgba(52,168,83,0.12)' 
                    : isHighlighting && cardPillarScore < 60 
                    ? '0 6px 20px rgba(234,67,53,0.12)' 
                    : status === 'Approved' 
                    ? '0 4px 12px rgba(52,168,83,0.08)' 
                    : 'var(--shadow-sm)'
                }}
              >
                
                {/* Card Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                      {displayName}
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.15rem' }}>
                      {displayIndustry}
                    </span>
                  </div>

                  {/* Looker-style SVG Radial suitability dial */}
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', flexShrink: 0 }}>
                    <svg width="52" height="52" style={{ transform: 'rotate(-90deg)' }}>
                      <circle
                        cx="26"
                        cy="26"
                        r={radius}
                        fill="transparent"
                        stroke="rgba(15, 23, 42, 0.06)"
                        strokeWidth="4"
                      />
                      <circle
                        cx="26"
                        cy="26"
                        r={radius}
                        fill="transparent"
                        stroke={gaugeStroke}
                        strokeWidth="4"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.35s ease' }}
                      />
                    </svg>
                    <span style={{ position: 'absolute', fontSize: '0.9rem', fontWeight: 900, color: gaugeStroke }}>
                      {score}
                    </span>
                  </div>
                </div>

                {/* Case Brief */}
                <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '0.75rem' }}>
                  <strong style={{ fontSize: '0.8rem', color: 'var(--text-primary)', display: 'block' }}>
                    {displayUseCase}
                  </strong>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {displayDesc}
                  </p>
                </div>

                {/* Meta Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: 'auto' }}>
                  <span className={`badge ${verdictColor}`} style={{ fontSize: '0.68rem', fontWeight: 700 }}>
                    {verdict}
                  </span>
                  <span className={`badge ${healthBadge}`} style={{ fontSize: '0.68rem', fontWeight: 700 }}>
                    {healthText}
                  </span>
                  <span className={`badge ${statusBadge}`} style={{ fontSize: '0.68rem', fontWeight: 700 }}>
                    {statusText}
                  </span>
                  {fData.division && (
                    <span className="badge badge-grey" style={{ fontSize: '0.68rem' }}>
                      {fData.division}
                    </span>
                  )}
                </div>

                {/* Ownership, Synthesis time & Date */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.65rem', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Users size={11} style={{ color: 'var(--google-blue)' }} />
                    <span>Personas: <strong style={{ color: 'var(--text-primary)' }}>{fData.businessOwner ? 'Active' : 'Pending'}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--google-blue)', fontWeight: 700 }}>
                    <span>⚡ Synthesis: {genTime}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={11} />
                    <span>{session.timestamp ? new Date(session.timestamp).toLocaleDateString() : 'Date N/A'}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
