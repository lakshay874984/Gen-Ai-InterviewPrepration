import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { SpinnerInfinity } from 'spinners-react';
import { useNavigate } from 'react-router'

const Home = () => {
    const [fileName, setFileName] = useState("");
    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()
    const [activeTab, setActiveTab] = useState('new')

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    if (loading) {
        return (
            <main className='prof-loading'>
                <div className='prof-loading__content'>
                    <SpinnerInfinity size={90} thickness={100} speed={100} color="#a78bfa" secondaryColor="rgba(167, 139, 250, 0.2)" />
                    <p>Analyzing your profile...</p>
                </div>
            </main>
        )
    }

    return (
        <div className='prof-home'>
            <div className='prof-container'>
                
                {/* Header Section */}
                <section className='prof-header'>
                    <div className='prof-header__content'>
                        <h1 className='prof-header__title'>Interview Preparation Platform</h1>
                        <p className='prof-header__subtitle'>Prepare, Practice, and Perfect Your Interview Skills</p>
                    </div>
                    <div className='prof-header__stats'>
                        <div className='stat-card'>
                            <span className='stat-label'>Sessions Completed</span>
                            <span className='stat-value'>{reports.length}</span>
                        </div>
                        <div className='stat-card'>
                            <span className='stat-label'>Avg Match Score</span>
                            <span className='stat-value'>78%</span>
                        </div>
                        <div className='stat-card'>
                            <span className='stat-label'>Success Rate</span>
                            <span className='stat-value'>92%</span>
                        </div>
                    </div>
                </section>

                {/* Tab Navigation */}
                <section className='prof-tabs-section'>
                    <div className='prof-tabs'>
                        <button 
                            className={`prof-tab ${activeTab === 'new' ? 'prof-tab--active' : ''}`}
                            onClick={() => setActiveTab('new')}
                        >
                            <span className='tab-icon'>✨</span>
                            New Interview Session
                        </button>
                        <button 
                            className={`prof-tab ${activeTab === 'history' ? 'prof-tab--active' : ''}`}
                            onClick={() => setActiveTab('history')}
                        >
                            <span className='tab-icon'>📋</span>
                            Previous Sessions ({reports.length})
                        </button>
                    </div>

                    {/* New Session Tab */}
                    {activeTab === 'new' && (
                        <div className='prof-form-section'>
                            <div className='form-header'>
                                <h2>Create New Interview Session</h2>
                                <p>Provide your background information to get personalized interview preparation</p>
                            </div>
                            
                            <div className='prof-form-container'>
                                {/* Left Panel - Job Description */}
                                <div className='form-panel'>
                                    <div className='panel-header'>
                                        <h3>Job Description</h3>
                                        <span className='badge'>Required</span>
                                    </div>
                                    <div className='panel-body'>
                                        <label>Paste the job description to analyze role requirements</label>
                                        <textarea
                                            value={jobDescription}
                                            onChange={(e) => setJobDescription(e.target.value)}
                                            className='prof-textarea'
                                            placeholder='Paste job description here...'
                                            maxLength={5000}
                                        />
                                        <div className='char-counter'>
                                            {jobDescription.length} / 5000 characters
                                        </div>
                                    </div>
                                </div>

                                {/* Right Panel - User Profile */}
                                <div className='form-panel'>
                                    <div className='panel-header'>
                                        <h3>Your Profile</h3>
                                        <span className='badge optional'>Optional</span>
                                    </div>
                                    <div className='panel-body'>
                                        {/* Resume Section */}
                                        <div className='upload-section'>
                                            <label>Upload Resume</label>
                                            <label className='upload-dropzone' htmlFor='resume'>
                                                <div className='dropzone-icon'>📄</div>
                                                <p className='dropzone-title'>
                                                    {fileName ? `✓ ${fileName}` : "Click to upload or drag and drop"}
                                                </p>
                                                <p className='dropzone-subtitle'>
                                                    {fileName ? "Ready for analysis" : "PDF or DOCX (Max 5MB)"}
                                                </p>
                                                <input
                                                    ref={resumeInputRef}
                                                    hidden
                                                    type='file'
                                                    id='resume'
                                                    name='resume'
                                                    accept='.pdf,.docx'
                                                    onChange={(e) => {
                                                        const file = e.target.files[0]
                                                        if (file) setFileName(file.name)
                                                    }}
                                                />
                                            </label>
                                        </div>

                                        {/* Divider */}
                                        <div className='divider-section'>
                                            <span>Or</span>
                                        </div>

                                        {/* Manual Input Section */}
                                        <div className='textarea-section'>
                                            <label>Describe Your Background</label>
                                            <textarea
                                                value={selfDescription}
                                                onChange={(e) => setSelfDescription(e.target.value)}
                                                className='prof-textarea'
                                                placeholder='Describe your skills, experience, and qualifications...'
                                            />
                                        </div>

                                        {/* Info Box */}
                                        <div className='info-box'>
                                            <span className='info-icon'>ℹ️</span>
                                            <p>Upload a resume <strong>or</strong> provide a manual description to proceed.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Section */}
                            <div className='form-footer'>
                                <span className='form-info'>
                                    AI Analysis — Typically 30 seconds
                                </span>
                                <button
                                    onClick={handleGenerateReport}
                                    className='prof-btn-primary'
                                    disabled={!jobDescription || (!resumeInputRef.current?.files[0] && !selfDescription)}
                                >
                                    Start Interview Analysis
                                    <span className='btn-arrow'>→</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Sessions History Tab */}
                    {activeTab === 'history' && (
                        <div className='prof-history'>
                            {reports.length > 0 ? (
                                <div className='sessions-grid'>
                                    <h3 className='grid-title'>Your Interview Sessions</h3>
                                    <div className='session-items'>
                                        {reports.map((report, index) => (
                                            <div 
                                                key={report._id} 
                                                className='session-item'
                                                onClick={() => navigate(`/interview/${report._id}`)}
                                            >
                                                <div className='session-item__header'>
                                                    <span className='session-number'>Session {index + 1}</span>
                                                    <h4>{report.title || 'Untitled Session'}</h4>
                                                </div>
                                                <div className='session-item__content'>
                                                    <p className='session-date'>
                                                        📅 {new Date(report.createdAt).toLocaleDateString()}
                                                    </p>
                                                    <div className={`session-score ${
                                                        report.matchScore >= 80 ? 'score--high' :
                                                        report.matchScore >= 60 ? 'score--medium' : 'score--low'
                                                    }`}>
                                                        <span>Match Score</span>
                                                        <span className='score-value'>{report.matchScore}%</span>
                                                    </div>
                                                </div>
                                                <div className='session-item__footer'>
                                                    <span className='btn-link'>View Report →</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className='empty-state'>
                                    <p className='empty-icon'>📝</p>
                                    <p className='empty-text'>No Interview Sessions Yet</p>
                                    <p className='empty-hint'>Create your first interview session to begin</p>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

export default Home