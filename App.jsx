import { useState } from 'react';

export default function EnterpriseITOptimizer() {
  const [formData, setFormData] = useState({
    serverCount: '',
    serverTypes: '',
    userCount: '',
    userLocations: '',
    applications: '',
    authMethods: '',
    securityPosture: '',
    additionalContext: ''
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [activeSection, setActiveSection] = useState('infrastructure');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const analyzeEnvironment = async () => {
    setLoading(true);
    setResults(null);

    const prompt = `You are an expert Enterprise IT consultant. Analyze this IT environment and provide detailed, actionable optimization recommendations.

## Environment Details:

**Infrastructure:**
- Number of Servers: ${formData.serverCount || 'Not specified'}
- Server Types/Versions: ${formData.serverTypes || 'Not specified'}

**Users:**
- Total Users: ${formData.userCount || 'Not specified'}
- User Locations: ${formData.userLocations || 'Not specified'}

**Applications:**
- Apps in Use: ${formData.applications || 'Not specified'}

**Security:**
- Authentication Methods: ${formData.authMethods || 'Not specified'}
- Security Posture: ${formData.securityPosture || 'Not specified'}

**Additional Context:**
${formData.additionalContext || 'None provided'}

---

Provide your analysis in this JSON format (respond ONLY with valid JSON, no markdown):
{
  "overallScore": <number 1-100>,
  "summary": "<2-3 sentence executive summary>",
  "categories": [
    {
      "name": "<category name>",
      "icon": "<emoji>",
      "score": <number 1-100>,
      "status": "<critical|warning|good|excellent>",
      "findings": ["<finding 1>", "<finding 2>"],
      "recommendations": [
        {
          "title": "<recommendation title>",
          "description": "<detailed description>",
          "impact": "<high|medium|low>",
          "effort": "<high|medium|low>"
        }
      ]
    }
  ],
  "quickWins": ["<quick win 1>", "<quick win 2>", "<quick win 3>"],
  "strategicInitiatives": ["<initiative 1>", "<initiative 2>"]
}

Analyze these categories:
1. Infrastructure & Scalability
2. Security & Compliance
3. User Experience & Productivity
4. Cost Optimization
5. Disaster Recovery & Resilience

Be specific, technical, and actionable. Reference industry best practices.`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          messages: [{ role: 'user', content: prompt }]
        })
      });

      const data = await response.json();
      const text = data.content?.map(item => item.text || '').join('') || '';
      const cleaned = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      setResults(parsed);
    } catch (error) {
      console.error('Analysis error:', error);
      setResults({ error: 'Failed to analyze. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      critical: '#ff4757',
      warning: '#ffa502',
      good: '#2ed573',
      excellent: '#7bed9f'
    };
    return colors[status] || '#00d9ff';
  };

  const getImpactBadge = (impact) => {
    const colors = { high: '#ff4757', medium: '#ffa502', low: '#2ed573' };
    return colors[impact] || '#00d9ff';
  };

  const sections = [
    { id: 'infrastructure', label: 'INFRA', icon: '⚡' },
    { id: 'users', label: 'USERS', icon: '👥' },
    { id: 'apps', label: 'APPS', icon: '📦' },
    { id: 'security', label: 'SEC', icon: '🔐' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%)',
      color: '#e0e0e0',
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(0,217,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,217,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <header style={{
        textAlign: 'center',
        marginBottom: '40px',
        position: 'relative'
      }}>
        <div style={{
          display: 'inline-block',
          padding: '8px 24px',
          background: 'rgba(255,0,100,0.1)',
          border: '1px solid rgba(255,0,100,0.3)',
          borderRadius: '4px',
          marginBottom: '16px',
          fontSize: '11px',
          letterSpacing: '3px',
          color: '#ff0064'
        }}>
          ENTERPRISE SYSTEMS ANALYSIS
        </div>
        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: 800,
          margin: 0,
          background: 'linear-gradient(135deg, #ff0064 0%, #ff6b00 50%, #ffcc00 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 60px rgba(255,0,100,0.3)',
          letterSpacing: '-1px'
        }}>
          ANARCHY OPTIMIZER
        </h1>
        <p style={{
          color: '#666',
          marginTop: '12px',
          fontSize: '13px',
          letterSpacing: '1px'
        }}>
          AI-POWERED INFRASTRUCTURE INTELLIGENCE
        </p>
      </header>

      {!results ? (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Section tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '24px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  padding: '12px 24px',
                  background: activeSection === section.id 
                    ? 'linear-gradient(135deg, rgba(0,217,255,0.2), rgba(0,255,136,0.1))'
                    : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${activeSection === section.id ? '#00d9ff' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '4px',
                  color: activeSection === section.id ? '#00d9ff' : '#666',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '12px',
                  letterSpacing: '2px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>

          {/* Form sections */}
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(0,217,255,0.2)',
            borderRadius: '8px',
            padding: '32px',
            backdropFilter: 'blur(10px)'
          }}>
            {activeSection === 'infrastructure' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h3 style={{ color: '#00d9ff', margin: 0, fontSize: '14px', letterSpacing: '2px' }}>
                  ⚡ INFRASTRUCTURE CONFIG
                </h3>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#888', fontSize: '11px', letterSpacing: '1px' }}>
                    NUMBER OF SERVERS
                  </label>
                  <input
                    type="text"
                    value={formData.serverCount}
                    onChange={(e) => handleChange('serverCount', e.target.value)}
                    placeholder="e.g., 50 physical, 200 VMs, 30 cloud instances"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(0,0,0,0.5)',
                      border: '1px solid rgba(0,217,255,0.3)',
                      borderRadius: '4px',
                      color: '#fff',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#888', fontSize: '11px', letterSpacing: '1px' }}>
                    SERVER TYPES & VERSIONS
                  </label>
                  <textarea
                    value={formData.serverTypes}
                    onChange={(e) => handleChange('serverTypes', e.target.value)}
                    placeholder="e.g., Windows Server 2019/2022, Ubuntu 22.04 LTS, RHEL 8, VMware ESXi 7.0, AWS EC2, Azure VMs"
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(0,0,0,0.5)',
                      border: '1px solid rgba(0,217,255,0.3)',
                      borderRadius: '4px',
                      color: '#fff',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            )}

            {activeSection === 'users' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h3 style={{ color: '#00d9ff', margin: 0, fontSize: '14px', letterSpacing: '2px' }}>
                  👥 USER DISTRIBUTION
                </h3>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#888', fontSize: '11px', letterSpacing: '1px' }}>
                    TOTAL USER COUNT
                  </label>
                  <input
                    type="text"
                    value={formData.userCount}
                    onChange={(e) => handleChange('userCount', e.target.value)}
                    placeholder="e.g., 5,000 employees, 500 contractors, 200 admins"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(0,0,0,0.5)',
                      border: '1px solid rgba(0,217,255,0.3)',
                      borderRadius: '4px',
                      color: '#fff',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#888', fontSize: '11px', letterSpacing: '1px' }}>
                    USER LOCATIONS
                  </label>
                  <textarea
                    value={formData.userLocations}
                    onChange={(e) => handleChange('userLocations', e.target.value)}
                    placeholder="e.g., HQ in NYC (2000), London office (1000), Remote workers globally (2000), APAC region (500)"
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(0,0,0,0.5)',
                      border: '1px solid rgba(0,217,255,0.3)',
                      borderRadius: '4px',
                      color: '#fff',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            )}

            {activeSection === 'apps' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h3 style={{ color: '#00d9ff', margin: 0, fontSize: '14px', letterSpacing: '2px' }}>
                  📦 APPLICATION STACK
                </h3>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#888', fontSize: '11px', letterSpacing: '1px' }}>
                    APPLICATIONS IN USE
                  </label>
                  <textarea
                    value={formData.applications}
                    onChange={(e) => handleChange('applications', e.target.value)}
                    placeholder="e.g., Microsoft 365, Salesforce, SAP ERP, Slack, Zoom, Custom .NET apps, Legacy Oracle DB, Kubernetes clusters"
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(0,0,0,0.5)',
                      border: '1px solid rgba(0,217,255,0.3)',
                      borderRadius: '4px',
                      color: '#fff',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h3 style={{ color: '#00d9ff', margin: 0, fontSize: '14px', letterSpacing: '2px' }}>
                  🔐 SECURITY POSTURE
                </h3>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#888', fontSize: '11px', letterSpacing: '1px' }}>
                    AUTHENTICATION METHODS
                  </label>
                  <textarea
                    value={formData.authMethods}
                    onChange={(e) => handleChange('authMethods', e.target.value)}
                    placeholder="e.g., Azure AD with MFA, Okta SSO, Legacy LDAP for some apps, Hardware tokens for admins, Passwordless pilots"
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(0,0,0,0.5)',
                      border: '1px solid rgba(0,217,255,0.3)',
                      borderRadius: '4px',
                      color: '#fff',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#888', fontSize: '11px', letterSpacing: '1px' }}>
                    CURRENT SECURITY POSTURE
                  </label>
                  <textarea
                    value={formData.securityPosture}
                    onChange={(e) => handleChange('securityPosture', e.target.value)}
                    placeholder="e.g., SOC 2 compliant, SIEM with Splunk, EDR on endpoints, VPN for remote, Zero trust initiatives starting, Annual pentests"
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: 'rgba(0,0,0,0.5)',
                      border: '1px solid rgba(0,217,255,0.3)',
                      borderRadius: '4px',
                      color: '#fff',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Additional context - always visible */}
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(0,217,255,0.1)' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#888', fontSize: '11px', letterSpacing: '1px' }}>
                💬 ADDITIONAL CONTEXT (OPTIONAL)
              </label>
              <textarea
                value={formData.additionalContext}
                onChange={(e) => handleChange('additionalContext', e.target.value)}
                placeholder="Any specific pain points, upcoming initiatives, budget constraints, compliance requirements, or goals..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(0,217,255,0.3)',
                  borderRadius: '4px',
                  color: '#fff',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Analyze button */}
            <button
              onClick={analyzeEnvironment}
              disabled={loading}
              style={{
                width: '100%',
                marginTop: '32px',
                padding: '18px 32px',
                background: loading 
                  ? 'rgba(0,217,255,0.1)' 
                  : 'linear-gradient(135deg, #00d9ff 0%, #00ff88 100%)',
                border: 'none',
                borderRadius: '4px',
                color: loading ? '#00d9ff' : '#000',
                fontFamily: 'inherit',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '3px',
                cursor: loading ? 'wait' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: loading ? 'none' : '0 0 40px rgba(0,217,255,0.3)'
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                  <span style={{ 
                    width: '16px', 
                    height: '16px', 
                    border: '2px solid #00d9ff',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  ANALYZING ENVIRONMENT...
                </span>
              ) : (
                '▶ RUN ANALYSIS'
              )}
            </button>
          </div>
        </div>
      ) : results.error ? (
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '40px',
          background: 'rgba(255,71,87,0.1)',
          border: '1px solid rgba(255,71,87,0.3)',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#ff4757', margin: 0 }}>{results.error}</p>
          <button
            onClick={() => setResults(null)}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              background: 'transparent',
              border: '1px solid #ff4757',
              borderRadius: '4px',
              color: '#ff4757',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Score header */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '40px',
            padding: '40px',
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(0,217,255,0.2)',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#666', marginBottom: '16px' }}>
              OVERALL HEALTH SCORE
            </div>
            <div style={{
              fontSize: '72px',
              fontWeight: 800,
              background: `linear-gradient(135deg, ${results.overallScore >= 70 ? '#00ff88' : results.overallScore >= 40 ? '#ffa502' : '#ff4757'} 0%, #00d9ff 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {results.overallScore}
            </div>
            <p style={{ color: '#888', textAlign: 'center', maxWidth: '600px', lineHeight: 1.6, marginTop: '16px' }}>
              {results.summary}
            </p>
          </div>

          {/* Quick wins */}
          {results.quickWins && (
            <div style={{
              marginBottom: '32px',
              padding: '24px',
              background: 'linear-gradient(135deg, rgba(0,255,136,0.1) 0%, rgba(0,217,255,0.05) 100%)',
              border: '1px solid rgba(0,255,136,0.3)',
              borderRadius: '8px'
            }}>
              <h3 style={{ color: '#00ff88', margin: '0 0 16px 0', fontSize: '12px', letterSpacing: '2px' }}>
                ⚡ QUICK WINS
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {results.quickWins.map((win, i) => (
                  <span key={i} style={{
                    padding: '8px 16px',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(0,255,136,0.2)',
                    borderRadius: '4px',
                    fontSize: '13px',
                    color: '#ccc'
                  }}>
                    {win}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Category cards */}
          <div style={{ display: 'grid', gap: '24px' }}>
            {results.categories?.map((cat, i) => (
              <div key={i} style={{
                background: 'rgba(0,0,0,0.4)',
                border: `1px solid ${getStatusColor(cat.status)}33`,
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <div style={{
                  padding: '20px 24px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{cat.icon}</span>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#fff' }}>{cat.name}</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{
                      padding: '4px 12px',
                      background: `${getStatusColor(cat.status)}22`,
                      border: `1px solid ${getStatusColor(cat.status)}`,
                      borderRadius: '4px',
                      fontSize: '11px',
                      letterSpacing: '1px',
                      color: getStatusColor(cat.status),
                      textTransform: 'uppercase'
                    }}>
                      {cat.status}
                    </span>
                    <span style={{ fontSize: '24px', fontWeight: 700, color: getStatusColor(cat.status) }}>
                      {cat.score}
                    </span>
                  </div>
                </div>

                {cat.findings && cat.findings.length > 0 && (
                  <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', marginBottom: '12px' }}>
                      FINDINGS
                    </div>
                    {cat.findings.map((finding, j) => (
                      <p key={j} style={{ margin: '8px 0', color: '#aaa', fontSize: '13px', lineHeight: 1.6 }}>
                        • {finding}
                      </p>
                    ))}
                  </div>
                )}

                {cat.recommendations && cat.recommendations.length > 0 && (
                  <div style={{ padding: '20px 24px' }}>
                    <div style={{ fontSize: '11px', letterSpacing: '1px', color: '#666', marginBottom: '16px' }}>
                      RECOMMENDATIONS
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {cat.recommendations.map((rec, j) => (
                        <div key={j} style={{
                          padding: '16px',
                          background: 'rgba(0,217,255,0.03)',
                          border: '1px solid rgba(0,217,255,0.1)',
                          borderRadius: '4px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
                            <h4 style={{ margin: 0, color: '#00d9ff', fontSize: '14px' }}>{rec.title}</h4>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <span style={{
                                padding: '2px 8px',
                                background: `${getImpactBadge(rec.impact)}22`,
                                border: `1px solid ${getImpactBadge(rec.impact)}`,
                                borderRadius: '3px',
                                fontSize: '10px',
                                color: getImpactBadge(rec.impact)
                              }}>
                                {rec.impact?.toUpperCase()} IMPACT
                              </span>
                              <span style={{
                                padding: '2px 8px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '3px',
                                fontSize: '10px',
                                color: '#888'
                              }}>
                                {rec.effort?.toUpperCase()} EFFORT
                              </span>
                            </div>
                          </div>
                          <p style={{ margin: 0, color: '#999', fontSize: '13px', lineHeight: 1.6 }}>
                            {rec.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Strategic initiatives */}
          {results.strategicInitiatives && (
            <div style={{
              marginTop: '32px',
              padding: '24px',
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(0,217,255,0.2)',
              borderRadius: '8px'
            }}>
              <h3 style={{ color: '#00d9ff', margin: '0 0 16px 0', fontSize: '12px', letterSpacing: '2px' }}>
                🎯 STRATEGIC INITIATIVES
              </h3>
              {results.strategicInitiatives.map((init, i) => (
                <p key={i} style={{ margin: '12px 0', color: '#aaa', fontSize: '14px', lineHeight: 1.6 }}>
                  {i + 1}. {init}
                </p>
              ))}
            </div>
          )}

          {/* New analysis button */}
          <button
            onClick={() => setResults(null)}
            style={{
              display: 'block',
              margin: '40px auto 0',
              padding: '14px 32px',
              background: 'transparent',
              border: '1px solid rgba(0,217,255,0.5)',
              borderRadius: '4px',
              color: '#00d9ff',
              fontFamily: 'inherit',
              fontSize: '12px',
              letterSpacing: '2px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            ← NEW ANALYSIS
          </button>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap');
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input::placeholder, textarea::placeholder {
          color: #444;
        }
        input:focus, textarea:focus {
          border-color: #00d9ff !important;
          box-shadow: 0 0 20px rgba(0,217,255,0.2);
        }
        button:hover:not(:disabled) {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
