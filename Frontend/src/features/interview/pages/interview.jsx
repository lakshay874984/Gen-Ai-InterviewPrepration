import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import { SpinnerInfinity } from 'spinners-react';

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Skills', icon: '⚙️', emoji: '💻' },
    { id: 'behavioral', label: 'Behavioral', icon: '💬', emoji: '🤝' },
    { id: 'roadmap', label: 'Study Plan', icon: '📋', emoji: '📚' },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className='prof-q-card'>
            <div className='prof-q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='prof-q-card__index'>Q{index + 1}</span>
                <p className='prof-q-card__question'>{item.question}</p>
                <span className={`prof-q-card__chevron ${open ? 'open' : ''}`}>▼</span>
            </div>
            {open && (
                <div className='prof-q-card__body'>
                    <div className='prof-q-card__section'>
                        <span className='section-tag intro'>Why Asked</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='prof-q-card__divider' />
                    <div className='prof-q-card__section'>
                        <span className='section-tag answer'>Sample Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const TrainingDay = ({ day }) => (
    <div className='training-day'>
        <div className='training-day__header'>
            <span className='day-badge'>Day {day.day}</span>
            <h3 className='day-focus'>{day.focus}</h3>
        </div>
        <ul className='training-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i} className='training-task'>
                    <span className='task-bullet'>▸</span>
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [interviewId])

    if (loading || !report) {
        return (
            <main className='prof-loading'>
                <div className='prof-loading__content'>
                    <SpinnerInfinity size={90} thickness={100} speed={100} color="#a78bfa" secondaryColor="rgba(167, 139, 250, 0.2)" />
                    <p>Loading interview report...</p>
                </div>
            </main>
        )
    }

    const getRankTier = (score) => {
        if (score >= 85) return { tier: 'Excellent', color: '#a78bfa', emoji: '⭐' }
        if (score >= 75) return { tier: 'Very Good', color: '#c4b5fd', emoji: '✓' }
        if (score >= 60) return { tier: 'Good', color: '#ddd6fe', emoji: '○' }
        return { tier: 'Fair', color: '#ede9fe', emoji: '→' }
    }

    const rank = getRankTier(report.matchScore)

    return (
        <div className='prof-interview'>
            {/* Header Section */}
            <section className='prof-header-section'>
                <div className='header-left'>
                    <button className='back-btn' onClick={() => navigate('/')}>
                        ← Back
                    </button>
                    <div>
                        <h1 className='report-title'>Interview Analysis Report</h1>
                        <p className='report-subtitle'>Completed Analysis</p>
                    </div>
                </div>
                <button className='export-btn' onClick={() => getResumePdf(interviewId)}>
                    📥 Export Report
                </button>
            </section>

            <div className='prof-interview__body'>
                {/* Left Sidebar - Navigation */}
                <nav className='prof-sidebar-nav'>
                    <div className='nav-header'>Report Sections</div>
                    <div className='nav-items'>
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className='nav-emoji'>{item.emoji}</span>
                                <span className='nav-label'>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Center Content */}
                <main className='prof-content-area'>
                    {activeNav === 'technical' && (
                        <section className='report-section'>
                            <div className='section-header'>
                                <span className='section-emoji'>💻</span>
                                <div>
                                    <h2>Technical Skills</h2>
                                    <p className='section-count'>{report.technicalQuestions.length} Questions</p>
                                </div>
                            </div>
                            <div className='questions-list'>
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section className='report-section'>
                            <div className='section-header'>
                                <span className='section-emoji'>🤝</span>
                                <div>
                                    <h2>Behavioral Questions</h2>
                                    <p className='section-count'>{report.behavioralQuestions.length} Questions</p>
                                </div>
                            </div>
                            <div className='questions-list'>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section className='report-section'>
                            <div className='section-header'>
                                <span className='section-emoji'>📚</span>
                                <div>
                                    <h2>Study Plan</h2>
                                    <p className='section-count'>{report.preparationPlan.length}-Day Plan</p>
                                </div>
                            </div>
                            <div className='training-list'>
                                {report.preparationPlan.map((day) => (
                                    <TrainingDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* Right Sidebar - Statistics */}
                <aside className='prof-stats-panel'>
                    {/* Match Score Card */}
                    <div className='stats-card score-card'>
                        <div className='score-header'>
                            <span className='score-emoji'>{rank.emoji}</span>
                            <div>
                                <p className='score-label'>Overall Assessment</p>
                                <p className='score-tier' style={{ color: rank.color }}>{rank.tier}</p>
                            </div>
                        </div>
                        <div className='match-score-ring'>
                            <svg className='ring-svg' style={{ color: rank.color }} viewBox='0 0 120 120'>
                                <circle
                                    cx='60'
                                    cy='60'
                                    r='54'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='6'
                                    strokeDasharray={`${(report.matchScore / 100) * (2 * Math.PI * 54)} ${2 * Math.PI * 54}`}
                                    strokeLinecap='round'
                                    transform='rotate(-90 60 60)'
                                />
                            </svg>
                            <div className='ring-content'>
                                <span className='ring-value'>{report.matchScore}</span>
                                <span className='ring-percent'>%</span>
                            </div>
                        </div>
                        <p className='score-subtitle'>Job Match Score</p>
                    </div>

                    <div className='panel-divider' />

                    {/* Skill Gaps */}
                    <div className='stats-card gaps-card'>
                        <h3 className='card-title'>Areas for Improvement</h3>
                        <div className='gaps-list'>
                            {report.skillGaps?.length > 0 ? (
                                report.skillGaps.map((gap, i) => (
                                    <div key={i} className={`gap-item gap-severity--${gap.severity}`}>
                                        <span className='gap-dot'>●</span>
                                        <span className='gap-name'>{gap.skill}</span>
                                        <span className='gap-severity'>{gap.severity}</span>
                                    </div>
                                ))
                            ) : (
                                <p className='no-gaps'>All skill areas covered well!</p>
                            )}
                        </div>
                    </div>

                    <div className='panel-divider' />

                    {/* Quick Stats */}
                    <div className='stats-card quick-stats'>
                        <h3 className='card-title'>Quick Stats</h3>
                        <div className='stat-row'>
                            <span className='stat-name'>Technical Skills</span>
                            <span className='stat-bar'>
                                <span className='stat-fill' style={{ width: '75%' }}></span>
                            </span>
                        </div>
                        <div className='stat-row'>
                            <span className='stat-name'>Experience</span>
                            <span className='stat-bar'>
                                <span className='stat-fill' style={{ width: '85%' }}></span>
                            </span>
                        </div>
                        <div className='stat-row'>
                            <span className='stat-name'>Communication</span>
                            <span className='stat-bar'>
                                <span className='stat-fill' style={{ width: '68%' }}></span>
                            </span>
                        </div>
                    </div>

                    <div className='panel-divider' />

                    {/* Actions */}
                    <div className='action-buttons'>
                        <button className='prof-btn-secondary' onClick={() => navigate('/')}>
                            🏠 Return Home
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Interview