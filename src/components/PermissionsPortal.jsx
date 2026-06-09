import { useState } from 'react';
import { Users, UserPlus, ShieldCheck, UserCheck, Key, Trash2, AlertCircle, RefreshCw } from 'lucide-react';

export default function PermissionsPortal() {
  const [usersList, setUsersList] = useState([
    { email: 'admin@nitinagga.altostrat.com', role: 'Super Admin', gcpRoles: ['Vertex AI Administrator', 'Storage Admin', 'Workspace Admin'], status: 'Active' },
    { email: 'architect@google.com', role: 'Solution Architect', gcpRoles: ['Vertex AI User', 'Storage Object Viewer'], status: 'Active' },
    { email: 'ciso@merck.com', role: 'CISO / Reviewer', gcpRoles: ['Vertex AI User'], status: 'Active' },
    { email: 'it_director@merck.com', role: 'VP of IT', gcpRoles: ['None'], status: 'Active' }
  ]);

  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Solution Architect');
  const [selectedGcpRoles, setSelectedGcpRoles] = useState(['Vertex AI User']);

  const handleToggleGcpRole = (gRole) => {
    if (selectedGcpRoles.includes(gRole)) {
      setSelectedGcpRoles(selectedGcpRoles.filter(r => r !== gRole));
    } else {
      setSelectedGcpRoles([...selectedGcpRoles, gRole]);
    }
  };

  const handleProvision = (e) => {
    e.preventDefault();
    if (!email || !email.trim()) return;

    const targetEmail = email.trim().toLowerCase();
    
    if (usersList.some(u => u.email === targetEmail)) {
      alert(`⚠️ Principal ${targetEmail} is already provisioned in this environment.`);
      return;
    }

    const newUser = {
      email: targetEmail,
      role: role,
      gcpRoles: selectedGcpRoles.length > 0 ? selectedGcpRoles : ['None'],
      status: 'Syncing'
    };

    setUsersList(prev => [...prev, newUser]);
    setEmail('');
    setSelectedGcpRoles(['Vertex AI User']);

    // Simulate live Active Directory and GCP Cloud IAM binding latency
    setTimeout(() => {
      setUsersList(prev => prev.map(u => {
        if (u.email === targetEmail) {
          return { ...u, status: 'Active' };
        }
        return u;
      }));
    }, 1500);
  };

  const handleDelete = (emailToDelete) => {
    if (emailToDelete === 'admin@nitinagga.altostrat.com') {
      alert("⚠️ For security compliance, you cannot de-provision the primary Workspace Super Admin!");
      return;
    }

    if (!confirm(`Are you sure you want to revoke all Workspace permissions and GCP Cloud IAM bindings for ${emailToDelete}?`)) {
      return;
    }

    setUsersList(prev => prev.map(u => {
      if (u.email === emailToDelete) {
        return { ...u, status: 'Revoking' };
      }
      return u;
    }));

    // Simulate GCP de-provisioning propagation latency
    setTimeout(() => {
      setUsersList(prev => prev.filter(u => u.email !== emailToDelete));
    }, 1200);
  };

  return (
    <div 
      style={{ 
        width: '100%', 
        maxWidth: '100%', 
        margin: '0', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.15rem', 
        padding: '0 0.5rem',
        height: 'calc(100vh - 110px)', // Viewport Height Locked!
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Header card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(26, 115, 232, 0.06) 0%, rgba(52, 168, 83, 0.06) 100%)', borderColor: 'var(--border-color)', borderRadius: '16px', padding: '1.15rem 1.5rem', boxShadow: 'var(--shadow-sm)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--google-blue-light)', color: 'var(--google-blue)', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Access Control & User Provisioning</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0 0' }}>Manage secure GCP Cloud IAM role bindings and Workspace identities for the scoring registry</p>
          </div>
        </div>
      </div>

      {/* Dynamic Double-Column Viewport Locked Grid */}
      <div style={{ display: 'flex', gap: '1.25rem', flex: 1, minHeight: 0, alignItems: 'stretch', paddingBottom: '1rem' }}>
        
        {/* Left Column: Active Principals Table (Equal height & scrollable internally!) */}
        <div 
          className="card" 
          style={{ 
            flex: '1.4', 
            display: 'flex', 
            flexDirection: 'column', 
            padding: '1.25rem', 
            borderRadius: '16px', 
            boxShadow: 'var(--shadow-sm)', 
            background: 'var(--bg-card)', 
            borderColor: 'var(--border-color)',
            height: '100%',
            minHeight: 0
          }}
        >
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem', margin: 0, flexShrink: 0 }}>
            <UserCheck size={16} style={{ color: 'var(--google-green)' }} />
            <span>Provisioned Workspace Principals</span>
          </h3>

          {/* Internally Scrollable Table Area */}
          <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, marginTop: '0.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '450px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', position: 'sticky', top: 0, background: 'var(--bg-surface)', zIndex: 5 }}>
                  <th style={{ padding: '0.65rem 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>User email</th>
                  <th style={{ padding: '0.65rem 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Role</th>
                  <th style={{ padding: '0.65rem 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>GCP IAM Roles</th>
                  <th style={{ padding: '0.65rem 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', width: '90px', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: '0.65rem 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', width: '60px', textAlign: 'center' }}>Revoke</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user, idx) => {
                  let statusBadge = 'badge-green';
                  let isSyncing = user.status === 'Syncing' || user.status === 'Revoking';
                  
                  if (user.status === 'Syncing') statusBadge = 'badge-blue';
                  else if (user.status === 'Revoking') statusBadge = 'badge-red';

                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)', opacity: user.status === 'Revoking' ? 0.5 : 1, transition: 'all 0.3s' }}>
                      <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {user.email}
                      </td>
                      <td style={{ padding: '0.85rem 0.5rem', fontSize: '0.82rem' }}>
                        <span className="badge badge-grey" style={{ fontSize: '0.62rem', fontWeight: 700 }}>{user.role}</span>
                      </td>
                      <td style={{ padding: '0.85rem 0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.25rem', alignItems: 'center' }}>
                        {user.gcpRoles.map((roleName, rIdx) => {
                          let bgCls = 'badge-blue';
                          if (roleName.includes('Admin')) bgCls = 'badge-red';
                          else if (roleName === 'None') bgCls = 'badge-grey';
                          return (
                            <span key={rIdx} className={`badge ${bgCls}`} style={{ fontSize: '0.58rem', padding: '0.15rem 0.4rem', fontWeight: 600 }}>
                              {roleName}
                            </span>
                          );
                        })}
                      </td>
                      <td style={{ padding: '0.85rem 0.5rem', textAlign: 'center' }}>
                        <span className={`badge ${statusBadge}`} style={{ fontSize: '0.62rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          {isSyncing && <RefreshCw size={9} style={{ animation: 'spin 1.5s infinite linear' }} />}
                          <span>{user.status}</span>
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 0.5rem', textAlign: 'center' }}>
                        <button 
                          onClick={() => handleDelete(user.email)}
                          disabled={isSyncing}
                          style={{ background: 'transparent', border: 'none', cursor: isSyncing ? 'not-allowed' : 'pointer', color: 'var(--google-red)', padding: '0.25rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', opacity: isSyncing ? 0.3 : 1 }}
                          title="Revoke Workspace access and de-provision IAM role bindings"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Provisioning Form (Stretched to match left height exactly!) */}
        <div 
          className="card" 
          style={{ 
            flex: '1', 
            display: 'flex', 
            flexDirection: 'column', 
            padding: '1.25rem', 
            borderRadius: '16px', 
            boxShadow: 'var(--shadow-sm)', 
            background: 'var(--bg-card)', 
            borderColor: 'var(--border-color)',
            height: '100%',
            minHeight: 0,
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, minHeight: 0, overflowY: 'auto' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem', margin: 0 }}>
              <UserPlus size={16} style={{ color: 'var(--google-blue)' }} />
              <span>Provision Workspace Principal</span>
            </h3>

            <form onSubmit={handleProvision} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>User Email Address</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="architect@merck.com"
                  style={{ padding: '0.6rem 0.75rem', fontSize: '0.88rem' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Workspace / Organizational Role</label>
                <select 
                  className="form-select"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  style={{ padding: '0.6rem 0.75rem', fontSize: '0.88rem' }}
                >
                  <option value="Solution Architect">Solution Architect</option>
                  <option value="Customer Engineer">Customer Engineer</option>
                  <option value="CISO / Reviewer">CISO / Reviewer</option>
                  <option value="VP of IT">VP of IT</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <Key size={13} style={{ color: 'var(--google-blue)' }} />
                  <span>Bind GCP IAM Roles (Active Directory Sync)</span>
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.35rem' }}>
                  {[
                    { name: 'Vertex AI User', desc: 'roles/aiplatform.user' },
                    { name: 'Storage Object Viewer', desc: 'roles/storage.objectViewer' }
                  ].map(gRole => {
                    const hasRole = selectedGcpRoles.includes(gRole.name);
                    return (
                      <div 
                        key={gRole.name}
                        onClick={() => handleToggleGcpRole(gRole.name)}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.65rem', 
                          padding: '0.55rem 0.75rem', 
                          background: hasRole ? 'var(--google-blue-light)' : 'var(--bg-surface)',
                          border: `1.2px solid ${hasRole ? 'var(--google-blue)' : 'var(--border-color)'}`,
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <input 
                          type="checkbox" 
                          checked={hasRole}
                          readOnly
                          style={{ width: '14px', height: '14px', cursor: 'pointer' }}
                        />
                        <div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{gRole.name}</div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{gRole.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </form>
          </div>

          {/* Action Button & compliance alert localized at card bottom */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', padding: '0.6rem', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <AlertCircle size={14} style={{ color: 'var(--google-blue)', flexShrink: 0, marginTop: '0.08rem' }} />
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.35, margin: 0 }}>
                Synchronizes Workspace identity database against corporate AD SSO and automatically binds GCP project <strong>nitinagga-ge</strong>.
              </p>
            </div>

            <button 
              onClick={handleProvision}
              type="button" 
              className="btn btn-primary" 
              style={{ width: '100%', borderRadius: '8px', padding: '0.65rem', fontWeight: 700, fontSize: '0.88rem' }}
            >
              <ShieldCheck size={15} />
              <span>Provision Access & Sync Roles</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
