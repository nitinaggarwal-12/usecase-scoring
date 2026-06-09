import { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Plus, Trash2, Info, Settings, Code, Check, Sparkles, HelpCircle, Layers, Shield, Sun, Moon } from 'lucide-react';

const PRESET_TOPOLOGIES = {
  gxpSecure: {
    name: "Secure GxP Discovery Migration Pipeline",
    description: "Merck discovery workspace hosted within a secure VPC-SC perimeter, using Vertex AI Reasoning Engine grounded in BigQuery.",
    nodes: [
      { id: "client_portal", label: "Client Discovery Portal", type: "frontend", x: 80, y: 220, status: "Secure", details: "Vite/React frontend securely hosted in GCP App Engine. Initiates discovery intake requests.", docs: "https://cloud.google.com/appengine" },
      { id: "psc_gateway", label: "Private Service Connect", type: "security", x: 280, y: 220, status: "Active", details: "Private Service Connect (PSC) endpoint ensuring all egress traffic remains within Merck's private network perimeter.", docs: "https://cloud.google.com/vpc/docs/private-service-connect" },
      { id: "reasoning_engine", label: "Vertex AI Reasoning Engine", type: "ai", x: 480, y: 120, status: "Active", details: "Serverless Agent Engine (ADK App) managing agentic workflows and pre-compiling contextual prompts.", docs: "https://cloud.google.com/vertex-ai/docs/generative-ai/reasoning-engine" },
      { id: "gemini_flash", label: "Gemini 2.5 Flash / Pro", type: "ai", x: 720, y: 120, status: "Secure", details: "Foundational Gemini LLM endpoints delivering fast, highly-grounded responses.", docs: "https://cloud.google.com/vertex-ai/generative-ai" },
      { id: "bigquery_vector", label: "BigQuery Vector Search", type: "database", x: 480, y: 320, status: "Grounded", details: "Merck's enterprise database storing grounded molecular indices and historical intake session vectors.", docs: "https://cloud.google.com/bigquery/docs/vector-search-intro" },
      { id: "gcs_gxp_bucket", label: "Cloud Storage (GxP Bucket)", type: "storage", x: 720, y: 320, status: "Compliant", details: "Highly secure GCS bucket enforcing GxP compliance, object versioning, and CMEK encryption.", docs: "https://cloud.google.com/storage" }
    ],
    edges: [
      { from: "client_portal", to: "psc_gateway", label: "Secure HTTPS" },
      { from: "psc_gateway", to: "reasoning_engine", label: "gRPC Tunnel" },
      { from: "psc_gateway", to: "bigquery_vector", label: "SQL Proxy" },
      { from: "reasoning_engine", to: "gemini_flash", label: "Encrypted API Dispatch" },
      { from: "reasoning_engine", to: "bigquery_vector", label: "Vector RAG lookup" },
      { from: "bigquery_vector", to: "gcs_gxp_bucket", label: "Raw source sync" }
    ]
  },
  multiAgent: {
    name: "Multi-Agent Co-Selling Orchestrator",
    description: "Advanced agentic architecture showing autonomous feedback loops, tool execution matrices, and human-in-the-loop (HITL) audit boards.",
    nodes: [
      { id: "user_intake", label: "CE Discovery UI", type: "frontend", x: 100, y: 150, status: "Active", details: "Web intake panel capturing CE meeting comments and scoring annotations.", docs: "https://reactflow.dev" },
      { id: "agent_coordinator", label: "Agent Coordinator", type: "ai", x: 320, y: 240, status: "Thinking", details: "ADK Orchestrator routing tasks to specialized research and audit subagents.", docs: "https://cloud.google.com/vertex-ai/docs/generative-ai/reasoning-engine" },
      { id: "research_agent", label: "Research Subagent", type: "ai", x: 560, y: 120, status: "Idle", details: "Autonomous subagent analyzing historical discovery patterns and molecular profiles.", docs: "https://cloud.google.com/vertex-ai" },
      { id: "auditor_agent", label: "FDE Auditor Subagent", type: "security", x: 560, y: 360, status: "Active", details: "Validates technical transfer feasibility, GxP perimeters, and generates FDE allocation justifications.", docs: "https://cloud.google.com/vertex-ai" },
      { id: "feedback_loop", label: "HITL Feedback Storage", type: "storage", x: 780, y: 240, status: "Active", details: "Stores thumbs-up/down feedback loops to constantly reinforce and align model parameters.", docs: "https://cloud.google.com/storage" }
    ],
    edges: [
      { from: "user_intake", to: "agent_coordinator", label: "Submit intake" },
      { from: "agent_coordinator", to: "research_agent", label: "Delegate research" },
      { from: "agent_coordinator", to: "auditor_agent", label: "Delegate GxP audit" },
      { from: "research_agent", to: "feedback_loop", label: "Store findings" },
      { from: "auditor_agent", to: "feedback_loop", label: "Save alignment" },
      { from: "feedback_loop", to: "agent_coordinator", label: "Dynamic in-context learning" }
    ]
  }
};

export default function ArchitectureCanvas() {
  const [activePreset, setActivePreset] = useState("gxpSecure");
  const [nodes, setNodes] = useState(PRESET_TOPOLOGIES.gxpSecure.nodes);
  const [edges, setEdges] = useState(PRESET_TOPOLOGIES.gxpSecure.edges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [draggedNodeId, setDraggedNodeId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isAddingConnection, setIsAddingConnection] = useState(false);
  const [newConnectionSource, setNewConnectionSource] = useState(null);
  const [showCodeExport, setShowCodeExport] = useState(false);
  const [canvasZoom, setCanvasZoom] = useState(1);
  const [canvasPan, setCanvasPan] = useState({ x: 0, y: 0 });
  const [animatePipelines, setAnimatePipelines] = useState(true);
  
  // Defaulting to FALSE (Light Mode) per user request to invert all colors for readability!
  const [isDarkMode, setIsDarkMode] = useState(false);

  const canvasRef = useRef(null);
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });

  // Sync topology on preset change
  useEffect(() => {
    setNodes(PRESET_TOPOLOGIES[activePreset].nodes);
    setEdges(PRESET_TOPOLOGIES[activePreset].edges);
    setSelectedNode(null);
    setIsAddingConnection(false);
  }, [activePreset]);

  // Drag Node handlers
  const handleNodeMouseDown = (e, id) => {
    e.stopPropagation();
    const node = nodes.find(n => n.id === id);
    if (!node) return;

    const svgElement = canvasRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - svgElement.left - canvasPan.x) / canvasZoom;
    const mouseY = (e.clientY - svgElement.top - canvasPan.y) / canvasZoom;
    
    setDraggedNodeId(id);
    setDragOffset({ x: mouseX - node.x, y: mouseY - node.y });
    setSelectedNode(node);
  };

  const handleCanvasMouseMove = (e) => {
    if (draggedNodeId) {
      const svgRect = canvasRef.current.getBoundingClientRect();
      const mouseX = (e.clientX - svgRect.left - canvasPan.x) / canvasZoom;
      const mouseY = (e.clientY - svgRect.top - canvasPan.y) / canvasZoom;

      setNodes(prev => prev.map(node => {
        if (node.id === draggedNodeId) {
          return {
            ...node,
            x: Math.round(mouseX - dragOffset.x),
            y: Math.round(mouseY - dragOffset.y)
          };
        }
        return node;
      }));
    } else if (isPanningRef.current) {
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      setCanvasPan({
        x: canvasPan.x + dx,
        y: canvasPan.y + dy
      });
      panStartRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleCanvasMouseUp = () => {
    setDraggedNodeId(null);
    isPanningRef.current = false;
  };

  const handleCanvasMouseDown = (e) => {
    if (e.button === 0) { // Left click pan
      isPanningRef.current = true;
      panStartRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleResetView = () => {
    setCanvasZoom(1);
    setCanvasPan({ x: 0, y: 0 });
    setNodes(PRESET_TOPOLOGIES[activePreset].nodes);
    setEdges(PRESET_TOPOLOGIES[activePreset].edges);
  };

  const handleAddNode = (type) => {
    const newId = `node_${Date.now().toString().slice(-4)}`;
    const names = {
      frontend: "Custom Web Intake",
      security: "VPC Perimeter Rules",
      ai: "Vertex Agent Service",
      database: "Cloud Spanner Store",
      storage: "Secure GCS Artifacts"
    };
    
    const newNode = {
      id: newId,
      label: names[type] || "GCP Service Core",
      type: type,
      x: 250 + Math.random() * 100,
      y: 180 + Math.random() * 100,
      status: "Staging",
      details: "Freshly deployed sandbox node ready for discovery workflow routing.",
      docs: "https://cloud.google.com"
    };

    setNodes(prev => [...prev, newNode]);
    setSelectedNode(newNode);
  };

  const handleDeleteNode = (id) => {
    if (!confirm("Remove this architecture node? Any connecting edges will be deleted.")) return;
    setNodes(prev => prev.filter(n => n.id !== id));
    setEdges(prev => prev.filter(e => e.from !== id && e.to !== id));
    if (selectedNode && selectedNode.id === id) {
      setSelectedNode(null);
    }
  };

  const handleAddConnectionClick = (id) => {
    if (!isAddingConnection) {
      setIsAddingConnection(true);
      setNewConnectionSource(id);
    } else {
      if (newConnectionSource === id) {
        setIsAddingConnection(false);
        setNewConnectionSource(null);
        return;
      }
      const edgeExists = edges.some(e => e.from === newConnectionSource && e.to === id);
      if (!edgeExists) {
        const label = prompt("Enter connection protocol label (e.g. gRPC, Pub/Sub, JDBC):", "Secure gRPC");
        setEdges(prev => [...prev, {
          from: newConnectionSource,
          to: id,
          label: label || "Connected"
        }]);
      }
      setIsAddingConnection(false);
      setNewConnectionSource(null);
    }
  };

  const handleDeleteEdge = (indexToDelete) => {
    if (!confirm("Delete this connection edge?")) return;
    setEdges(prev => prev.filter((_, idx) => idx !== indexToDelete));
  };

  const getEdgePath = (fromNode, toNode) => {
    if (!fromNode || !toNode) return "";
    
    const fx = fromNode.x + 100;
    const fy = fromNode.y + 40;
    const tx = toNode.x + 100;
    const ty = toNode.y + 40;

    const dx = tx - fx;
    const controlOffset = Math.max(Math.abs(dx) * 0.5, 50);
    
    return `M ${fx} ${fy} C ${fx + controlOffset} ${fy}, ${tx - controlOffset} ${ty}, ${tx} ${ty}`;
  };

  const getJsonCodeString = () => {
    const exportObj = {
      project_id: "nitinagga-ge",
      location: "us-central1",
      active_topology: PRESET_TOPOLOGIES[activePreset].name,
      last_updated: new Date().toISOString(),
      reasoning_engine_deployment: {
        class_name: "AdkApp",
        agents: nodes.filter(n => n.type === 'ai').map(n => ({ name: n.label, state: n.status })),
        security_context: {
          vpc_service_controls: nodes.some(n => n.type === 'security') ? "Active" : "Simulated",
          gxp_bucket_compliant: nodes.some(n => n.type === 'storage') ? "Verified" : "Pending"
        },
        data_bridges: edges.map(e => ({ from: e.from, to: e.to, protocol: e.label }))
      }
    };
    return JSON.stringify(exportObj, null, 2);
  };

  const getNodeColorTheme = (type) => {
    const themes = {
      frontend: { bg: 'rgba(26, 115, 232, 0.06)', border: '#1a73e8', text: '#1a73e8', tagBg: 'rgba(26, 115, 232, 0.12)', tagText: '#1a73e8', icon: '💻' },
      security: { bg: 'rgba(15, 157, 88, 0.06)', border: '#0f9d58', text: '#0f9d58', tagBg: 'rgba(15, 157, 88, 0.12)', tagText: '#0f9d58', icon: '🛡️' },
      ai: { bg: 'rgba(161, 63, 212, 0.06)', border: '#a13fd4', text: '#a13fd4', tagBg: 'rgba(161, 63, 212, 0.12)', tagText: '#a13fd4', icon: '✨' },
      database: { bg: 'rgba(244, 180, 0, 0.06)', border: '#f4b400', text: '#b07c00', tagBg: 'rgba(244, 180, 0, 0.12)', tagText: '#b07c00', icon: '🗄️' },
      storage: { bg: 'rgba(219, 68, 85, 0.06)', border: '#db4437', text: '#db4437', tagBg: 'rgba(219, 68, 85, 0.12)', tagText: '#db4437', icon: '🪣' }
    };
    return themes[type] || { bg: 'rgba(100,116,139,0.06)', border: '#64748b', text: '#64748b', tagBg: 'rgba(100,116,139,0.12)', tagText: '#64748b', icon: '⚙️' };
  };

  // HIGH-CONTRAST DYNAMIC COLOR TOKENS FOR ACCESSIBILITY
  const canvasBg = isDarkMode ? '#090d16' : '#ffffff';
  const canvasGrid = isDarkMode ? '#1e293b' : '#e2e8f0';
  
  const containerCardBg = isDarkMode ? 'var(--bg-surface)' : '#ffffff';
  const containerBorder = isDarkMode ? 'var(--border-color)' : '#cbd5e1';
  
  const cardHeaderBorder = isDarkMode ? 'var(--border-color)' : '#e2e8f0';
  const presetToggleBg = isDarkMode ? 'var(--bg-secondary)' : '#f1f5f9';
  const presetToggleBorder = isDarkMode ? 'var(--border-color)' : '#cbd5e1';
  
  const textTitle = isDarkMode ? 'var(--text-primary)' : '#0f172a';
  const textMuted = isDarkMode ? 'var(--text-secondary)' : '#475569';
  
  // SVG Node tokens
  const nodeCardBg = isDarkMode ? '#0e1626' : '#ffffff';
  const nodeCardBorder = isDarkMode ? '#1e293b' : '#cbd5e1';
  const nodeTitleColor = isDarkMode ? '#ffffff' : '#0f172a';
  const nodeStatusColor = isDarkMode ? '#94a3b8' : '#475569';
  
  // Edge line tokens
  const edgeLineColor = isDarkMode ? '#94a3b8' : '#475569';
  const textStrokeColor = isDarkMode ? '#0e1626' : '#ffffff';

  // Sidebar tokens
  const sidebarBgColor = isDarkMode ? '#0e1626' : '#f8fafc';
  const sidebarBorderColor = isDarkMode ? '#1e293b' : '#e2e8f0';
  const sidebarFormInputBg = isDarkMode ? '#131a2e' : '#ffffff';
  const sidebarFormInputBorder = isDarkMode ? 'rgba(255,255,255,0.18)' : '#cbd5e1';
  const sidebarFormInputText = isDarkMode ? '#ffffff' : '#0f172a';

  // Toolbox tokens
  const toolboxBgColor = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.04)';
  const toolboxBorderColor = isDarkMode ? 'var(--border-color)' : '#cbd5e1';

  return (
    <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: 'calc(100vh - 110px)', background: containerCardBg, border: `1px solid ${containerBorder}`, borderRadius: '16px', transition: 'background-color 0.2s, border-color 0.2s' }}>
      
      {/* Header and Topology Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1rem', borderBottom: `1px solid ${cardHeaderBorder}` }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: textTitle, margin: 0, transition: 'color 0.2s' }}>Architecture Co-Selling Playground</h2>
            <span className="badge badge-blue" style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}>Dynamic Canvas</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: textMuted, marginTop: '0.25rem', maxWidth: '650px', margin: '0.25rem 0 0 0', transition: 'color 0.2s' }}>
            Design, drag, connect, and audit serverless Vertex AI Agent blueprints mapped directly to corporate discovery needs.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Premium Contrast Mode Selector Toggle Switch */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="btn btn-outline"
            style={{
              padding: '0.45rem 0.75rem',
              fontSize: '0.75rem',
              borderRadius: '8px',
              background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#ffffff',
              border: `1px solid ${containerBorder}`,
              color: textTitle,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {isDarkMode ? (
              <>
                <Sun size={13} style={{ color: '#f59e0b' }} />
                <span>Light Mode Canvas</span>
              </>
            ) : (
              <>
                <Moon size={13} style={{ color: '#4285f4' }} />
                <span>Dark Mode Canvas</span>
              </>
            )}
          </button>

          <div style={{ display: 'flex', gap: '0.5rem', background: presetToggleBg, padding: '0.25rem', borderRadius: '10px', border: `1px solid ${presetToggleBorder}`, transition: 'all 0.2s' }}>
            <button
              onClick={() => setActivePreset("gxpSecure")}
              className={`btn ${activePreset === "gxpSecure" ? "btn-primary" : "btn-outline"}`}
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', borderRadius: '8px', background: activePreset === "gxpSecure" ? 'var(--google-blue)' : 'transparent', color: activePreset === "gxpSecure" ? '#ffffff' : textMuted, border: 'none' }}
            >
              🛡️ Secure GxP Intake
            </button>
            <button
              onClick={() => setActivePreset("multiAgent")}
              className={`btn ${activePreset === "multiAgent" ? "btn-primary" : "btn-outline"}`}
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', borderRadius: '8px', background: activePreset === "multiAgent" ? 'var(--google-blue)' : 'transparent', color: activePreset === "multiAgent" ? '#ffffff' : textMuted, border: 'none' }}
            >
              🤖 Multi-Agent Core
            </button>
          </div>
        </div>
      </div>

      {/* Main Playground Canvas Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', height: '640px' }}>
        
        {/* Interactive Canvas Area */}
        <div 
          style={{ 
            position: 'relative', 
            border: `1px solid ${containerBorder}`, 
            borderRadius: '14px', 
            background: `radial-gradient(circle, ${canvasGrid} 1px, transparent 1px)`, 
            backgroundSize: '24px 24px', 
            backgroundColor: canvasBg, 
            overflow: 'hidden',
            cursor: isPanningRef.current ? 'grabbing' : 'grab',
            transition: 'background-color 0.2s, border-color 0.2s'
          }}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseUp}
          onMouseDown={handleCanvasMouseDown}
        >
          
          {/* Canvas Controls Overlay Ribbon */}
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem', zIndex: 20 }}>
            <button
              onClick={() => setCanvasZoom(z => Math.min(z + 0.15, 2))}
              className="btn btn-outline"
              style={{ padding: '0.35rem 0.6rem', background: nodeCardBg, border: `1px solid ${nodeCardBorder}`, color: textTitle, fontSize: '0.75rem', borderRadius: '6px' }}
              title="Zoom In"
            >
              ➕
            </button>
            <button
              onClick={() => setCanvasZoom(z => Math.max(z - 0.15, 0.5))}
              className="btn btn-outline"
              style={{ padding: '0.35rem 0.6rem', background: nodeCardBg, border: `1px solid ${nodeCardBorder}`, color: textTitle, fontSize: '0.75rem', borderRadius: '6px' }}
              title="Zoom Out"
            >
              ➖
            </button>
            <button
              onClick={handleResetView}
              className="btn btn-outline"
              style={{ padding: '0.35rem 0.6rem', background: nodeCardBg, border: `1px solid ${nodeCardBorder}`, color: textTitle, fontSize: '0.75rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              <RotateCcw size={12} />
              <span>Reset View</span>
            </button>
            <button
              onClick={() => setAnimatePipelines(prev => !prev)}
              className={`btn ${animatePipelines ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.35rem 0.6rem', background: animatePipelines ? 'var(--google-blue)' : nodeCardBg, border: `1px solid ${animatePipelines ? 'transparent' : nodeCardBorder}`, color: animatePipelines ? '#fff' : textTitle, fontSize: '0.75rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              <Play size={10} style={{ transform: animatePipelines ? 'none' : 'rotate(90deg)' }} />
              <span>{animatePipelines ? 'Pulse Active' : 'Pulse Paused'}</span>
            </button>
          </div>

          {/* Drag & Drop Service Toolbox */}
          <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', display: 'flex', gap: '0.4rem', background: toolboxBgColor, backdropFilter: 'blur(8px)', padding: '0.4rem', borderRadius: '8px', border: `1px solid ${toolboxBorderColor}`, zIndex: 20 }} className="no-print">
            <span style={{ fontSize: '0.7rem', fontWeight: 800, alignSelf: 'center', paddingRight: '0.35rem', color: textMuted }}>DEPLOY NODE:</span>
            <button onClick={() => handleAddNode('frontend')} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', background: nodeCardBg, border: `1px solid ${nodeCardBorder}`, color: textTitle, borderRadius: '6px' }}>💻 Webapp</button>
            <button onClick={() => handleAddNode('security')} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', background: nodeCardBg, border: `1px solid ${nodeCardBorder}`, color: textTitle, borderRadius: '6px' }}>🛡️ Shield</button>
            <button onClick={() => handleAddNode('ai')} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', background: nodeCardBg, border: `1px solid ${nodeCardBorder}`, color: textTitle, borderRadius: '6px' }}>✨ Vertex AI</button>
            <button onClick={() => handleAddNode('database')} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', background: nodeCardBg, border: `1px solid ${nodeCardBorder}`, color: textTitle, borderRadius: '6px' }}>🗄️ BigQuery</button>
            <button onClick={() => handleAddNode('storage')} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', background: nodeCardBg, border: `1px solid ${nodeCardBorder}`, color: textTitle, borderRadius: '6px' }}>🪣 Bucket</button>
          </div>

          {/* SVG Connections and Nodes Canvas */}
          <svg 
            ref={canvasRef}
            width="100%" 
            height="100%" 
            style={{ 
              transform: `translate(${canvasPan.x}px, ${canvasPan.y}px) scale(${canvasZoom})`,
              transformOrigin: '0 0',
              pointerEvents: 'all'
            }}
          >
            {/* Definitions for gradients and glowing filters */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="8" refX="95" refY="4" orient="auto">
                <polygon points="0 0, 10 4, 0 8" fill={edgeLineColor} style={{ opacity: 0.6 }} />
              </marker>
              <marker id="arrowhead-active" markerWidth="10" markerHeight="8" refX="95" refY="4" orient="auto">
                <polygon points="0 0, 10 4, 0 8" fill="#1a73e8" />
              </marker>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Render Edge Connection Curves */}
            {edges.map((edge, index) => {
              const fromNode = nodes.find(n => n.id === edge.from);
              const toNode = nodes.find(n => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              const path = getEdgePath(fromNode, toNode);
              const isActive = selectedNode && (selectedNode.id === edge.from || selectedNode.id === edge.to);

              return (
                <g key={`edge-${index}`} style={{ cursor: 'pointer' }} onClick={() => {
                  if (confirm(`Delete connection "${edge.label}" between ${fromNode.label} and ${toNode.label}?`)) {
                    handleDeleteEdge(index);
                  }
                }}>
                  {/* Background hover-helper path */}
                  <path 
                    d={path} 
                    fill="none" 
                    stroke="transparent" 
                    strokeWidth="16" 
                  />
                  
                  {/* Main connection line */}
                  <path 
                    d={path} 
                    fill="none" 
                    stroke={isActive ? '#1a73e8' : edgeLineColor} 
                    strokeWidth={isActive ? 3 : 1.5}
                    strokeDasharray={animatePipelines ? "8, 6" : "none"}
                    style={{
                      animation: animatePipelines ? 'dash 25s linear infinite' : 'none',
                      opacity: isActive ? 1 : 0.45,
                      transition: 'stroke 0.2s, stroke-width 0.2s'
                    }}
                    markerEnd={isActive ? "url(#arrowhead-active)" : "url(#arrowhead)"}
                  />

                  {/* Pipeline labels on path with pro outlining backdrop */}
                  {edge.label && (
                    <text 
                      dy="-5" 
                      style={{ 
                        fontSize: '9.5px', 
                        fontWeight: 700, 
                        fill: isActive ? '#1a73e8' : textMuted,
                        textAnchor: 'middle',
                        opacity: isActive ? 1 : 0.85,
                        paintOrder: 'stroke fill',
                        stroke: textStrokeColor,
                        strokeWidth: '3px',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round'
                      }}
                    >
                      <textPath href={`#edge-path-${index}`} startOffset="50%" id={`edge-path-${index}`}>
                        {edge.label}
                      </textPath>
                      <tspan x={(fromNode.x + toNode.x) / 2 + 100} y={(fromNode.y + toNode.y) / 2 + 30}>
                        {edge.label}
                      </tspan>
                    </text>
                  )}
                </g>
              );
            })}

            {/* Render Node Cards */}
            {nodes.map((node) => {
              const theme = getNodeColorTheme(node.type);
              const isSelected = selectedNode && selectedNode.id === node.id;
              
              return (
                <g 
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                  style={{ cursor: 'move' }}
                >
                  {/* Card shadow glow background if selected */}
                  {isSelected && (
                    <rect 
                      width="200" 
                      height="80" 
                      rx="12" 
                      fill={theme.border}
                      style={{ opacity: isDarkMode ? 0.18 : 0.08 }}
                      filter="url(#glow)"
                    />
                  )}

                  {/* Main Node Card Container */}
                  <rect 
                    width="200" 
                    height="80" 
                    rx="12" 
                    fill={nodeCardBg} 
                    stroke={isSelected ? theme.border : nodeCardBorder}
                    strokeWidth={isSelected ? 2.5 : 1.2}
                    style={{ 
                      transition: 'stroke 0.2s, stroke-width 0.2s, fill 0.2s',
                      filter: isDarkMode ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.35))' : 'drop-shadow(0 4px 6px rgba(15,23,42,0.06))'
                    }}
                  />

                  {/* Category Left color stripe indicator */}
                  <rect 
                    width="6" 
                    height="80" 
                    rx="12" 
                    fill={theme.border}
                  />

                  {/* Node Icon & Category Label */}
                  <text x="16" y="26" style={{ fontSize: '13px' }}>{theme.icon}</text>
                  <text 
                    x="36" 
                    y="24" 
                    style={{ 
                      fontSize: '10px', 
                      fontWeight: 800, 
                      fill: theme.text, 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.5px' 
                    }}
                  >
                    {node.type}
                  </text>

                  {/* Node Title */}
                  <text 
                    x="16" 
                    y="48" 
                    style={{ 
                      fontSize: '11.5px', 
                      fontWeight: 700, 
                      fill: nodeTitleColor,
                      transition: 'fill 0.2s'
                    }}
                  >
                    {node.label.length > 26 ? `${node.label.slice(0, 24)}...` : node.label}
                  </text>

                  {/* Active status indicator */}
                  <g transform="translate(16, 58)">
                    <circle 
                      cx="4" 
                      cy="4" 
                      r="3" 
                      fill={
                        node.status === 'Secure' || node.status === 'Active' || node.status === 'Grounded' || node.status === 'Compliant' 
                          ? 'var(--google-green)' 
                          : node.status === 'Thinking' 
                            ? 'var(--google-blue)' 
                            : textMuted
                      } 
                    />
                    <text 
                      x="12" 
                      y="7" 
                      style={{ 
                        fontSize: '9px', 
                        fontWeight: 600, 
                        fill: nodeStatusColor,
                        transition: 'fill 0.2s'
                      }}
                    >
                      {node.status}
                    </text>
                  </g>

                  {/* Small Quick Connection dot handles on left & right */}
                  {isAddingConnection && (
                    <g 
                      transform="translate(190, 30)" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddConnectionClick(node.id);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <circle 
                        r="8" 
                        fill={newConnectionSource === node.id ? 'var(--google-red)' : 'var(--google-blue)'} 
                        style={{ opacity: 0.9 }} 
                      />
                      <text 
                        x="-3" 
                        y="3" 
                        style={{ 
                          fill: '#fff', 
                          fontSize: '9px', 
                          fontWeight: 900 
                        }}
                      >
                        {newConnectionSource === node.id ? '×' : '＋'}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Node Details Inspector Sidebar Panel */}
        <div 
          className="card" 
          style={{ 
            padding: '1.25rem', 
            background: sidebarBgColor, 
            border: `1px solid ${sidebarBorderColor}`, 
            borderRadius: '14px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            overflowY: 'auto',
            transition: 'background-color 0.2s, border-color 0.2s'
          }}
        >
          {selectedNode ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Node Title Header */}
              <div style={{ borderBottom: `1px solid ${sidebarBorderColor}`, paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span 
                    style={{ 
                      fontSize: '0.65rem', 
                      fontWeight: 800, 
                      padding: '0.2rem 0.45rem', 
                      borderRadius: '4px', 
                      background: getNodeColorTheme(selectedNode.type).tagBg, 
                      color: getNodeColorTheme(selectedNode.type).tagText,
                      textTransform: 'uppercase'
                    }}
                  >
                    {selectedNode.type}
                  </span>
                  <button 
                    onClick={() => handleDeleteNode(selectedNode.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--google-red)', cursor: 'pointer', padding: '0.2rem' }}
                    title="Remove Node"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: textTitle, margin: '0.5rem 0 0.25rem 0', transition: 'color 0.2s' }}>{selectedNode.label}</h3>
                <span style={{ fontSize: '0.75rem', color: textMuted }}>Node ID: <code style={{ fontSize: '0.7rem' }}>{selectedNode.id}</code></span>
              </div>

              {/* Status and Quick properties */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label" style={{ fontSize: '0.7rem', color: textTitle }}>Resource Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={selectedNode.label} 
                    onChange={(e) => {
                      const val = e.target.value;
                      setNodes(prev => prev.map(n => n.id === selectedNode.id ? { ...n, label: val } : n));
                      setSelectedNode(prev => ({ ...prev, label: val }));
                    }}
                    style={{ padding: '0.45rem 0.65rem', fontSize: '0.8rem', borderRadius: '6px', background: sidebarFormInputBg, border: `1.5px solid ${sidebarFormInputBorder}`, color: sidebarFormInputText }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label" style={{ fontSize: '0.7rem', color: textTitle }}>Compliance/State Status</label>
                  <select
                    value={selectedNode.status}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNodes(prev => prev.map(n => n.id === selectedNode.id ? { ...n, status: val } : n));
                      setSelectedNode(prev => ({ ...prev, status: val }));
                    }}
                    className="form-select"
                    style={{ padding: '0.45rem 0.65rem', fontSize: '0.8rem', borderRadius: '6px', cursor: 'pointer', background: sidebarFormInputBg, border: `1.5px solid ${sidebarFormInputBorder}`, color: sidebarFormInputText }}
                  >
                    <option value="Active">Active</option>
                    <option value="Secure">Secure</option>
                    <option value="Grounded">Grounded</option>
                    <option value="Compliant">Compliant</option>
                    <option value="Staging">Staging</option>
                    <option value="Thinking">Thinking</option>
                    <option value="Standby">Standby</option>
                  </select>
                </div>

                <div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: textMuted, textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Technical Execution</span>
                  <p style={{ fontSize: '0.75rem', color: textMuted, margin: 0, lineHeight: 1.35 }}>
                    {selectedNode.details}
                  </p>
                </div>

                {/* Quick Routing Action triggers */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem' }}>
                  <button
                    onClick={() => handleAddConnectionClick(selectedNode.id)}
                    className={`btn ${isAddingConnection && newConnectionSource === selectedNode.id ? 'btn-primary' : 'btn-outline'}`}
                    style={{ 
                      padding: '0.45rem', 
                      fontSize: '0.7rem', 
                      borderRadius: '6px', 
                      width: '100%', 
                      background: isAddingConnection && newConnectionSource === selectedNode.id ? 'var(--google-red)' : 'transparent', 
                      color: isAddingConnection && newConnectionSource === selectedNode.id ? '#fff' : 'var(--google-blue)', 
                      border: '1px dashed var(--google-blue)' 
                    }}
                  >
                    {isAddingConnection && newConnectionSource === selectedNode.id ? '❌ Cancel Routing' : '🔌 Route Custom Pipeline Edge'}
                  </button>
                </div>

              </div>

              {/* Documentation Link */}
              {selectedNode.docs && (
                <a 
                  href={selectedNode.docs} 
                  target="_blank" 
                  rel="noreferrer"
                  className="badge badge-blue" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '0.25rem', 
                    padding: '0.4rem', 
                    fontSize: '0.7rem', 
                    textAlign: 'center',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  <Info size={11} />
                  <span>Read Vertex Reference Docs</span>
                </a>
              )}

            </div>
          ) : (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: textMuted, gap: '0.75rem' }}>
              <div style={{ fontSize: '2rem' }}>🎨</div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: textTitle }}>No Element Selected</h4>
                <p style={{ fontSize: '0.75rem', margin: 0, lineHeight: 1.3 }}>
                  Click any GCP service node in the viewport to audit properties, manage ports, or connect pipeline routes.
                </p>
              </div>
            </div>
          )}

          {/* Bottom Action panel buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '1rem', borderTop: `1px solid ${sidebarBorderColor}`, marginTop: '1rem' }} className="no-print">
            <button 
              onClick={() => setShowCodeExport(!showCodeExport)} 
              className="btn btn-outline" 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', fontSize: '0.75rem', padding: '0.45rem', flex: 1, borderRadius: '8px', background: nodeCardBg, border: `1px solid ${nodeCardBorder}`, color: textTitle }}
            >
              <Code size={13} />
              <span>Export ADK Manifest</span>
            </button>
          </div>
        </div>

      </div>

      {/* Code Export overlay drawer */}
      {showCodeExport && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.35)', backdropFilter: 'blur(4px)', zIndex: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card" style={{ width: '90%', maxWidth: '540px', padding: '1.5rem', borderRadius: '16px', background: containerCardBg, border: `1px solid ${containerBorder}`, boxShadow: 'var(--shadow-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${cardHeaderBorder}`, paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Layers size={18} style={{ color: 'var(--google-blue)' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: textTitle, margin: 0 }}>Reasoning Engine App Manifest</h3>
              </div>
              <button 
                onClick={() => setShowCodeExport(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', color: textMuted, cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
            <p style={{ fontSize: '0.75rem', color: textMuted, marginBottom: '0.75rem' }}>
              Copy-paste this generated ADK payload configuration to register your co-selling blueprint inside your GCP cloud console shell.
            </p>
            <pre style={{ background: isDarkMode ? '#131a2e' : '#f8fafc', border: `1px solid ${containerBorder}`, color: textTitle, padding: '1rem', borderRadius: '8px', overflow: 'auto', maxHeight: '250px', fontSize: '11px', fontFamily: 'Courier, monospace' }}>
              {getJsonCodeString()}
            </pre>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1.25rem' }}>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(getJsonCodeString());
                  alert("📋 Reasoning Engine Manifest copied to clipboard!");
                }} 
                className="btn btn-primary" 
                style={{ background: 'var(--google-blue)', color: '#fff', border: 'none', padding: '0.5rem 1rem', fontSize: '0.75rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Check size={13} />
                <span>Copy Manifest</span>
              </button>
              <button 
                onClick={() => setShowCodeExport(false)} 
                className="btn btn-outline" 
                style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', borderRadius: '6px', background: nodeCardBg, border: `1px solid ${nodeCardBorder}`, color: textTitle }}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyframe Animations styling injector */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>
    </div>
  );
}
