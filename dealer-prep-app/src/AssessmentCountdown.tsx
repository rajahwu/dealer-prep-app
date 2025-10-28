import { useState, useEffect } from 'react';
import { Check, Clock, Target, Home, Building2, FileText, X, MessageSquare } from 'lucide-react';

interface Phase {
    id: string;
    time: string;
    endTime: number;
    title: string;
    location: 'home' | 'office' | 'transit';
    icon: typeof Home;
    cue: string;
    tasks: string[];
}

interface CompletedTasks {
    [key: string]: boolean;
}

const AssessmentCountdown = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [completedTasks, setCompletedTasks] = useState<CompletedTasks>({});
    const [showFocus, setShowFocus] = useState(false);
    const [showCriteria, setShowCriteria] = useState(false);
    const [showScripts, setShowScripts] = useState(false);

    // Assessment time is 7 PM today
    const assessmentTime = new Date();
    assessmentTime.setHours(19, 0, 0, 0);

    const phases: Phase[] = [
        {
            id: 'home-1',
            time: '2:00 PM',
            endTime: new Date(assessmentTime).setHours(14, 40, 0, 0),
            title: 'Mental Prep & Hand Activation',
            location: 'home',
            icon: Home,
            cue: 'Calm hands build confidence',
            tasks: [
                '5 slow riffles — focus only on thumb release',
                '3 gentle bridges — watch the cascade',
                '1 full shuffle sequence (no pressure)',
                '2-minute visualization: one perfect shuffle',
                'Deep breathing: 4 in, 4 hold, 6 out (×3)'
            ]
        },
        {
            id: 'home-2',
            time: '2:40 PM',
            endTime: new Date(assessmentTime).setHours(15, 20, 0, 0),
            title: 'Mechanics Review',
            location: 'home',
            icon: Home,
            cue: 'Smooth is fast',
            tasks: [
                'Watch 2 dealer shuffle reference videos',
                '10 riffles at slow pace (no table needed)',
                'Mental walkthrough: approach → shuffle → deal → square',
                'Note one thing to focus on at the table',
                'Light snack + hydrate (no caffeine crash)'
            ]
        },
        {
            id: 'home-3',
            time: '3:20 PM',
            endTime: new Date(assessmentTime).setHours(16, 0, 0, 0),
            title: 'Confidence Building',
            location: 'home',
            icon: Home,
            cue: 'You know this choreography',
            tasks: [
                'Review assessment criteria (what they\'re watching)',
                '5 more gentle shuffle sequences',
                'Verbally narrate each motion (trains calm commentary)',
                'Visualize: walking up calm, finishing clean',
                'Stretch wrists and hands, stay loose'
            ]
        },
        {
            id: 'transition',
            time: '4:00 PM',
            endTime: new Date(assessmentTime).setHours(16, 0, 0, 0),
            title: 'Travel & Settle',
            location: 'transit',
            icon: Target,
            cue: 'Steady energy, clear mind',
            tasks: [
                'Head to office (arrive by 4 PM)',
                'Light stretching during travel',
                'Mental reset: "My hands know what to do"',
                'Arrive calm, not rushed',
                'Set up practice space with intention'
            ]
        },
        {
            id: 'office-1',
            time: '4:00 PM',
            endTime: new Date(assessmentTime).setHours(16, 45, 0, 0),
            title: 'Table Warm-In',
            location: 'office',
            icon: Building2,
            cue: 'Feel the table, trust the rhythm',
            tasks: [
                '3 slow riffles — feel the table surface',
                '3 bridges — gentle arc, clean cascade',
                '5 full shuffle sequences at half-speed',
                'Check posture: feet planted, shoulders loose',
                'One filmed rep — watch for tension points'
            ]
        },
        {
            id: 'office-2',
            time: '4:45 PM',
            endTime: new Date(assessmentTime).setHours(17, 30, 0, 0),
            title: 'High-Value Reps',
            location: 'office',
            icon: Building2,
            cue: 'Consistency over speed',
            tasks: [
                '10 complete shuffle sequences (even rhythm)',
                'Every 3rd one: verbal narration',
                '5 dealing runs (seats 1-7, index down)',
                'Fix one thing based on filmed rep',
                'Hydrate + quick hand shake between sets'
            ]
        },
        {
            id: 'office-3',
            time: '5:30 PM',
            endTime: new Date(assessmentTime).setHours(18, 15, 0, 0),
            title: 'Assessment Simulation',
            location: 'office',
            icon: Building2,
            cue: 'Controlled looks like competence',
            tasks: [
                '3 complete mock assessments (as if evaluator watching)',
                'Full sequence: approach → shuffle → deal → square → step back',
                'Between each: 2-min break, deep breath',
                'Focus on looking deliberate, not rushed',
                'End with one word after each: smooth/even/clean'
            ]
        },
        {
            id: 'office-4',
            time: '6:15 PM',
            endTime: new Date(assessmentTime).setHours(18, 45, 0, 0),
            title: 'Strategic Rest',
            location: 'office',
            icon: Building2,
            cue: 'Skill settles in stillness',
            tasks: [
                'STOP touching cards entirely',
                'Wrist rolls, finger stretches (gentle)',
                'Eat protein snack (not sugar)',
                '5-minute mental rehearsal: calm approach, smooth finish',
                'Breathe slow, let confidence build'
            ]
        },
        {
            id: 'pre-assessment',
            time: '6:45 PM',
            endTime: assessmentTime.setHours(18, 15, 0, 0),
            title: 'Walk-In Mode',
            location: 'office',
            icon: Target,
            cue: 'You don\'t need perfect. You need poised.',
            tasks: [
                'Arrive at assessment area early',
                '3 warm-up shuffles only (confirm hands are online)',
                'Posture check: shoulders down, feet planted',
                'No phone, no last-minute review',
                'Internal cue: "My hands know this. Let them work."'
            ]
        }


    ];

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getCurrentPhase = () => {
        const now = currentTime.getTime();
        return phases.findIndex(phase => now < phase.endTime);
    };

    const currentPhaseIndex = getCurrentPhase();
    const timeUntilAssessment = assessmentTime.getTime() - currentTime.getTime();
    const hoursLeft = Math.floor(timeUntilAssessment / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeUntilAssessment % (1000 * 60 * 60)) / (1000 * 60));

    const toggleTask = (phaseId: string, taskIndex: number) => {
        const key = `${phaseId}-${taskIndex}`;
        setCompletedTasks(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const getPhaseProgress = (phaseId: string): number => {
        const phase = phases.find(p => p.id === phaseId);
        if (!phase) return 0;
        const completed = phase.tasks.filter((_, i) =>
            completedTasks[`${phaseId}-${i}`]
        ).length;
        return (completed / phase.tasks.length) * 100;
    };

    const focusCues = [
        'Riffle: Even release, no spray',
        'Bridge: Gentle arc, clean cascade',
        'Posture: Calm body = competent read'
    ];

    const LocationIcon = ({ type }: { type: 'home' | 'office' | 'transit' }) => {
        const icons = {
            home: Home,
            office: Building2,
            transit: Target
        };
        const Icon = icons[type] || Target;
        return <Icon className="w-4 h-4" />;
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0f1117',
            color: '#f5f5f5',
            padding: '1rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* Header */}
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                marginBottom: '2rem'
            }}>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    background: 'linear-gradient(135deg, #00e6a8, #5a4bff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Assessment Countdown
                </h1>

                {/* Time Remaining */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    background: '#1a1d29',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(0, 230, 168, 0.3)',
                    marginBottom: '1rem'
                }}>
                    <Clock className="w-5 h-5" style={{ color: '#00e6a8' }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '0.25rem' }}>
                            Time Until Assessment
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00e6a8' }}>
                            {hoursLeft}h {minutesLeft}m
                        </div>
                    </div>
                </div>

                {/* Focus Button */}
                <button
                    onClick={() => setShowFocus(!showFocus)}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: showFocus ? '#5a4bff' : '#1a1d29',
                        border: `1px solid ${showFocus ? '#5a4bff' : 'rgba(90, 75, 255, 0.3)'}`,
                        borderRadius: '0.5rem',
                        color: '#f5f5f5',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '1rem',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                        marginBottom: '0.5rem'
                    }}
                >
                    <Target className="w-4 h-4" />
                    {showFocus ? 'Hide' : 'Show'} Focus Cues
                </button>

                {/* Criteria Button */}
                <button
                    onClick={() => setShowCriteria(!showCriteria)}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: showCriteria ? '#00e6a8' : '#1a1d29',
                        border: `1px solid ${showCriteria ? '#00e6a8' : 'rgba(0, 230, 168, 0.3)'}`,
                        borderRadius: '0.5rem',
                        color: '#f5f5f5',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '1rem',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                        marginBottom: '0.5rem'
                    }}
                >
                    <FileText className="w-4 h-4" />
                    {showCriteria ? 'Hide' : 'Show'} Assessment Criteria
                </button>

                {/* Scripts Button */}
                <button
                    onClick={() => setShowScripts(!showScripts)}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: showScripts ? '#ffa502' : '#1a1d29',
                        border: `1px solid ${showScripts ? '#ffa502' : 'rgba(255, 165, 2, 0.3)'}`,
                        borderRadius: '0.5rem',
                        color: '#f5f5f5',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '1rem',
                        fontWeight: '500',
                        transition: 'all 0.2s'
                    }}
                >
                    <MessageSquare className="w-4 h-4" />
                    {showScripts ? 'Hide' : 'Show'} Narration Scripts
                </button>

                {/* Focus Cues Panel */}
                {showFocus && (
                    <div style={{
                        marginTop: '1rem',
                        padding: '1.5rem',
                        background: '#1a1d29',
                        borderRadius: '0.5rem',
                        border: '2px solid #5a4bff'
                    }}>
                        <div style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#5a4bff' }}>
                            Core Focus
                        </div>
                        {focusCues.map((cue, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem',
                                background: '#0f1117',
                                borderRadius: '0.375rem',
                                marginBottom: i < focusCues.length - 1 ? '0.5rem' : 0
                            }}>
                                <div style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#00e6a8',
                                    flexShrink: 0
                                }} />
                                <div style={{ fontSize: '0.9375rem' }}>{cue}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Assessment Criteria Modal */}
                {showCriteria && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.9)',
                        zIndex: 1000,
                        overflowY: 'auto',
                        padding: '1rem'
                    }}>
                        <div style={{
                            maxWidth: '800px',
                            margin: '0 auto',
                            background: '#1a1d29',
                            borderRadius: '0.75rem',
                            border: '2px solid #00e6a8',
                            padding: '2rem',
                            position: 'relative'
                        }}>
                            <button
                                onClick={() => setShowCriteria(false)}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#f5f5f5',
                                    cursor: 'pointer',
                                    padding: '0.5rem'
                                }}
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <h2 style={{
                                fontSize: '1.75rem',
                                fontWeight: 'bold',
                                marginBottom: '1.5rem',
                                color: '#00e6a8'
                            }}>
                                Assessment Criteria
                            </h2>

                            {/* What They're Evaluating */}
                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                    marginBottom: '1rem',
                                    color: '#f5f5f5'
                                }}>
                                    What They're Evaluating
                                </h3>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h4 style={{
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        marginBottom: '0.5rem',
                                        color: '#00e6a8'
                                    }}>
                                        1. Shuffle Mechanics (Technical Execution)
                                    </h4>
                                    <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                                        <li><strong>Riffle Quality:</strong> Even card release, no spray or clumping</li>
                                        <li><strong>Bridge Control:</strong> Smooth cascade, appropriate arc height, gentle execution</li>
                                        <li><strong>Strip Cuts:</strong> Clean separation, no card exposure</li>
                                        <li><strong>Box/Square:</strong> Deck properly aligned and squared between actions</li>
                                        <li><strong>Hand Positioning:</strong> Proper finger/thumb placement throughout</li>
                                    </ul>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h4 style={{
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        marginBottom: '0.5rem',
                                        color: '#00e6a8'
                                    }}>
                                        2. Dealing Technique
                                    </h4>
                                    <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                                        <li><strong>Card Delivery:</strong> Index finger down, wrist steady</li>
                                        <li><strong>Consistency:</strong> Same motion/speed for each card</li>
                                        <li><strong>Accuracy:</strong> Cards land in proper positions (seats 1-7)</li>
                                        <li><strong>Pace:</strong> Smooth rhythm, not rushed or hesitant</li>
                                    </ul>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h4 style={{
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        marginBottom: '0.5rem',
                                        color: '#00e6a8'
                                    }}>
                                        3. Presentation & Composure
                                    </h4>
                                    <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                                        <li><strong>Body Language:</strong> Calm, controlled, deliberate movements</li>
                                        <li><strong>Posture:</strong> Upright, shoulders relaxed, feet planted</li>
                                        <li><strong>Eye Contact:</strong> Awareness of table/players (when applicable)</li>
                                        <li><strong>Recovery:</strong> How you handle mistakes (smooth continuation vs. panic)</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 style={{
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        marginBottom: '0.5rem',
                                        color: '#00e6a8'
                                    }}>
                                        4. Procedure & Protocol
                                    </h4>
                                    <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                                        <li><strong>Sequence Adherence:</strong> Following proper shuffle order (box → riffle × 2 → strip → square)</li>
                                        <li><strong>Table Awareness:</strong> Keeping cards visible, proper hand positions</li>
                                        <li><strong>Professional Demeanor:</strong> Confident but not cocky, focused but relaxed</li>
                                    </ul>
                                </div>
                            </div>

                            {/* How They Weight It */}
                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                    marginBottom: '1rem',
                                    color: '#f5f5f5'
                                }}>
                                    How They Weight It
                                </h3>

                                <div style={{
                                    padding: '1rem',
                                    background: '#0f1117',
                                    borderRadius: '0.5rem',
                                    marginBottom: '0.75rem',
                                    borderLeft: '4px solid #ff4757'
                                }}>
                                    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#ff4757' }}>
                                        Critical (Must Pass)
                                    </div>
                                    <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8', fontSize: '0.9375rem' }}>
                                        <li>No major card exposure during shuffle</li>
                                        <li>Can complete full sequence without losing control</li>
                                        <li>Dealing cards accurately to positions</li>
                                    </ul>
                                </div>

                                <div style={{
                                    padding: '1rem',
                                    background: '#0f1117',
                                    borderRadius: '0.5rem',
                                    marginBottom: '0.75rem',
                                    borderLeft: '4px solid #ffa502'
                                }}>
                                    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#ffa502' }}>
                                        Important (Heavily Weighted)
                                    </div>
                                    <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8', fontSize: '0.9375rem' }}>
                                        <li>Smooth, consistent mechanics</li>
                                        <li>Looking controlled under observation</li>
                                        <li>Clean recoveries if something goes wrong</li>
                                    </ul>
                                </div>

                                <div style={{
                                    padding: '1rem',
                                    background: '#0f1117',
                                    borderRadius: '0.5rem',
                                    borderLeft: '4px solid #5a4bff'
                                }}>
                                    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#5a4bff' }}>
                                        Nice to Have (Not Deal-Breakers)
                                    </div>
                                    <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8', fontSize: '0.9375rem' }}>
                                        <li>Perfect speed</li>
                                        <li>Flashy technique</li>
                                        <li>Absolute perfection on every riffle</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Pass vs Fail */}
                            <div style={{ marginBottom: '2rem' }}>
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                    marginBottom: '1rem',
                                    color: '#f5f5f5'
                                }}>
                                    What Separates Pass from Fail
                                </h3>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr',
                                    gap: '1rem'
                                }}>
                                    <div style={{
                                        padding: '1rem',
                                        background: 'rgba(0, 230, 168, 0.1)',
                                        borderRadius: '0.5rem',
                                        border: '1px solid #00e6a8'
                                    }}>
                                        <div style={{ fontWeight: 'bold', marginBottom: '0.75rem', color: '#00e6a8', fontSize: '1rem' }}>
                                            ✓ Pass Indicators
                                        </div>
                                        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8', fontSize: '0.9375rem' }}>
                                            <li>Completes sequence without major errors</li>
                                            <li>Looks deliberate and in control</li>
                                            <li>Recovers smoothly from minor mistakes</li>
                                            <li>Maintains composure throughout</li>
                                        </ul>
                                    </div>

                                    <div style={{
                                        padding: '1rem',
                                        background: 'rgba(255, 71, 87, 0.1)',
                                        borderRadius: '0.5rem',
                                        border: '1px solid #ff4757'
                                    }}>
                                        <div style={{ fontWeight: 'bold', marginBottom: '0.75rem', color: '#ff4757', fontSize: '1rem' }}>
                                            ✗ Fail Indicators
                                        </div>
                                        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8', fontSize: '0.9375rem' }}>
                                            <li>Cards spray/fly everywhere repeatedly</li>
                                            <li>Visible panic or loss of composure</li>
                                            <li>Can't complete basic sequence</li>
                                            <li>Multiple major procedural errors</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* The Hidden Factor */}
                            <div style={{
                                padding: '1.5rem',
                                background: 'rgba(90, 75, 255, 0.1)',
                                borderRadius: '0.5rem',
                                border: '2px solid #5a4bff'
                            }}>
                                <h3 style={{
                                    fontSize: '1.125rem',
                                    fontWeight: 'bold',
                                    marginBottom: '0.75rem',
                                    color: '#5a4bff'
                                }}>
                                    The Hidden Scoring Factor
                                </h3>
                                <p style={{ lineHeight: '1.8', marginBottom: '1rem' }}>
                                    <strong>Perceived Competence</strong> often matters as much as technical perfection. An evaluator watching someone with calm body language, deliberate pacing, smooth recoveries, and steady breathing will subconsciously grade them higher than someone with perfect mechanics but visible anxiety.
                                </p>
                                <p style={{ lineHeight: '1.8', fontStyle: 'italic', color: '#00e6a8' }}>
                                    You're being evaluated on "Can we put this person at a table tomorrow?" — not "Is this person already world-class?"
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Narration Scripts Modal */}
                {showScripts && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.9)',
                        zIndex: 1000,
                        overflowY: 'auto',
                        padding: '1rem'
                    }}>
                        <div style={{
                            maxWidth: '800px',
                            margin: '0 auto',
                            background: '#1a1d29',
                            borderRadius: '0.75rem',
                            border: '2px solid #ffa502',
                            padding: '2rem',
                            position: 'relative'
                        }}>
                            <button
                                onClick={() => setShowScripts(false)}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#f5f5f5',
                                    cursor: 'pointer',
                                    padding: '0.5rem'
                                }}
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <h2 style={{
                                fontSize: '1.75rem',
                                fontWeight: 'bold',
                                marginBottom: '1rem',
                                color: '#ffa502'
                            }}>
                                Narration Scripts
                            </h2>

                            <p style={{
                                lineHeight: '1.8',
                                marginBottom: '2rem',
                                opacity: 0.9
                            }}>
                                Verbal narration slows you down naturally, builds calm commentary skills, and trains your brain to stay present through each step. Use these scripts during practice to build confidence and composure.
                            </p>

                            {/* Script 1 */}
                            <div style={{
                                marginBottom: '2rem',
                                padding: '1.5rem',
                                background: '#0f1117',
                                borderRadius: '0.5rem',
                                border: '2px solid #5a4bff'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '1rem'
                                }}>
                                    <div style={{
                                        padding: '0.25rem 0.75rem',
                                        background: '#5a4bff',
                                        borderRadius: '1rem',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold'
                                    }}>
                                        PRACTICE
                                    </div>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                        color: '#5a4bff'
                                    }}>
                                        Script 1: Technical Narration
                                    </h3>
                                </div>
                                <p style={{
                                    fontSize: '0.875rem',
                                    opacity: 0.8,
                                    marginBottom: '1rem',
                                    fontStyle: 'italic'
                                }}>
                                    Use during 4:00-4:45 PM warm-in — keeps you focused on form
                                </p>
                                <div style={{
                                    padding: '1rem',
                                    background: '#1a1d29',
                                    borderRadius: '0.375rem',
                                    fontFamily: 'monospace',
                                    fontSize: '0.9375rem',
                                    lineHeight: '2',
                                    whiteSpace: 'pre-line'
                                }}>
                                    {`"Boxing the deck... squaring the corners.

First riffle — thumbs at the back edge, even pressure... release... watching the cascade.

Bridge — gentle lift, let it fall naturally.

Second riffle — same rhythm, same pressure... release... smooth cascade.

Strip cut — clean separation, no exposure.

Final square — align the corners, check the edges.

Ready to deal."`}
                                </div>
                            </div>

                            {/* Script 2 */}
                            <div style={{
                                marginBottom: '2rem',
                                padding: '1.5rem',
                                background: '#0f1117',
                                borderRadius: '0.5rem',
                                border: '2px solid #00e6a8'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '1rem'
                                }}>
                                    <div style={{
                                        padding: '0.25rem 0.75rem',
                                        background: '#00e6a8',
                                        color: '#0f1117',
                                        borderRadius: '1rem',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold'
                                    }}>
                                        MOCK RUNS
                                    </div>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                        color: '#00e6a8'
                                    }}>
                                        Script 2: Confidence Narration
                                    </h3>
                                </div>
                                <p style={{
                                    fontSize: '0.875rem',
                                    opacity: 0.8,
                                    marginBottom: '1rem',
                                    fontStyle: 'italic'
                                }}>
                                    Use during 5:30-6:15 PM simulations — builds assessment composure
                                </p>
                                <div style={{
                                    padding: '1rem',
                                    background: '#1a1d29',
                                    borderRadius: '0.375rem',
                                    fontFamily: 'monospace',
                                    fontSize: '0.9375rem',
                                    lineHeight: '2',
                                    whiteSpace: 'pre-line'
                                }}>
                                    {`"Setting up for the shuffle.

First riffle... controlled release... clean bridge.

Second riffle... maintaining rhythm... even cascade.

Strip cut... keeping cards secure.

Squaring the deck.

Ready to deal — index down, wrist steady, seats one through seven."`}
                                </div>
                            </div>

                            {/* Script 3 */}
                            <div style={{
                                marginBottom: '2rem',
                                padding: '1.5rem',
                                background: '#0f1117',
                                borderRadius: '0.5rem',
                                border: '2px solid #ffa502'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '1rem'
                                }}>
                                    <div style={{
                                        padding: '0.25rem 0.75rem',
                                        background: '#ffa502',
                                        color: '#0f1117',
                                        borderRadius: '1rem',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold'
                                    }}>
                                        FINAL WARM-UP
                                    </div>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                        color: '#ffa502'
                                    }}>
                                        Script 3: Minimal Cue Narration
                                    </h3>
                                </div>
                                <p style={{
                                    fontSize: '0.875rem',
                                    opacity: 0.8,
                                    marginBottom: '1rem',
                                    fontStyle: 'italic'
                                }}>
                                    Use at 6:45-7:00 PM — just enough to stay grounded
                                </p>
                                <div style={{
                                    padding: '1rem',
                                    background: '#1a1d29',
                                    borderRadius: '0.375rem',
                                    fontFamily: 'monospace',
                                    fontSize: '0.9375rem',
                                    lineHeight: '2',
                                    whiteSpace: 'pre-line'
                                }}>
                                    {`"Box.

Riffle one... bridge.

Riffle two... bridge.

Strip.

Square.

Deal."`}
                                </div>
                            </div>

                            {/* Pro Tips */}
                            <div style={{
                                padding: '1.5rem',
                                background: 'rgba(90, 75, 255, 0.1)',
                                borderRadius: '0.5rem',
                                border: '1px solid #5a4bff',
                                marginBottom: '1.5rem'
                            }}>
                                <h3 style={{
                                    fontSize: '1.125rem',
                                    fontWeight: 'bold',
                                    marginBottom: '1rem',
                                    color: '#5a4bff'
                                }}>
                                    Pro Narration Tips
                                </h3>
                                <div style={{ lineHeight: '1.8' }}>
                                    <p style={{ marginBottom: '1rem' }}>
                                        <strong>Tone Matters:</strong>
                                    </p>
                                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                                        <li>Speak at conversational volume (not whisper, not loud)</li>
                                        <li>Keep your voice steady and even (trains calm under observation)</li>
                                        <li>Pause briefly between actions (gives hands time to execute)</li>
                                    </ul>

                                    <p style={{ marginBottom: '0.5rem' }}>
                                        <strong style={{ color: '#ff4757' }}>What NOT to Say:</strong>
                                    </p>
                                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', opacity: 0.8 }}>
                                        <li>"Okay, here we go..." (sounds nervous)</li>
                                        <li>"Hopefully this works..." (undermines confidence)</li>
                                        <li>"Oops, let me try again..." (if you mess up, continue smoothly)</li>
                                    </ul>

                                    <p style={{ marginBottom: '0.5rem' }}>
                                        <strong style={{ color: '#00e6a8' }}>If You Make a Mistake:</strong>
                                    </p>
                                    <p style={{ opacity: 0.9 }}>
                                        Keep narrating through the recovery: "Adjusting the alignment... continuing with the riffle..." Shows control, not panic.
                                    </p>
                                </div>
                            </div>

                            {/* Silent Mental Script */}
                            <div style={{
                                padding: '1.5rem',
                                background: 'rgba(0, 230, 168, 0.1)',
                                borderRadius: '0.5rem',
                                border: '2px solid #00e6a8'
                            }}>
                                <h3 style={{
                                    fontSize: '1.125rem',
                                    fontWeight: 'bold',
                                    marginBottom: '0.75rem',
                                    color: '#00e6a8'
                                }}>
                                    Silent Mental Script (For Actual Assessment)
                                </h3>
                                <p style={{
                                    fontSize: '0.875rem',
                                    opacity: 0.8,
                                    marginBottom: '1rem',
                                    fontStyle: 'italic'
                                }}>
                                    If they don't want you talking, use this internal mantra:
                                </p>
                                <div style={{
                                    padding: '1rem',
                                    background: '#0f1117',
                                    borderRadius: '0.375rem',
                                    fontFamily: 'monospace',
                                    fontSize: '1rem',
                                    lineHeight: '2',
                                    whiteSpace: 'pre-line',
                                    textAlign: 'center',
                                    color: '#00e6a8'
                                }}>
                                    {`Calm hands.
Even release.
Gentle bridge.
Smooth rhythm.
Controlled finish.`}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Phases */}
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {phases.map((phase, phaseIndex) => {
                    const isActive = phaseIndex === currentPhaseIndex;
                    const isPast = phaseIndex < currentPhaseIndex;
                    const progress = getPhaseProgress(phase.id);

                    return (
                        <div
                            key={phase.id}
                            style={{
                                marginBottom: '1.5rem',
                                padding: '1.5rem',
                                background: isActive ? 'rgba(0, 230, 168, 0.05)' : '#1a1d29',
                                border: `2px solid ${isActive ? '#00e6a8' : 'rgba(0, 230, 168, 0.1)'}`,
                                borderRadius: '0.75rem',
                                opacity: isPast ? 0.6 : 1,
                                transition: 'all 0.3s'
                            }}
                        >
                            {/* Phase Header */}
                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    marginBottom: '0.5rem'
                                }}>
                                    <div style={{
                                        padding: '0.5rem',
                                        background: isActive ? '#00e6a8' : '#0f1117',
                                        borderRadius: '0.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <LocationIcon type={phase.location} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            fontSize: '0.875rem',
                                            opacity: 0.7,
                                            marginBottom: '0.25rem'
                                        }}>
                                            {phase.time}
                                        </div>
                                        <div style={{
                                            fontSize: '1.25rem',
                                            fontWeight: 'bold',
                                            color: isActive ? '#00e6a8' : '#f5f5f5'
                                        }}>
                                            {phase.title}
                                        </div>
                                    </div>
                                    {isActive && (
                                        <div style={{
                                            padding: '0.25rem 0.75rem',
                                            background: '#00e6a8',
                                            color: '#0f1117',
                                            borderRadius: '1rem',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold'
                                        }}>
                                            NOW
                                        </div>
                                    )}
                                </div>

                                {/* Mindset Cue */}
                                <div style={{
                                    padding: '0.75rem',
                                    background: '#0f1117',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.9375rem',
                                    fontStyle: 'italic',
                                    color: '#00e6a8',
                                    borderLeft: '3px solid #00e6a8'
                                }}>
                                    "{phase.cue}"
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div style={{
                                height: '4px',
                                background: '#0f1117',
                                borderRadius: '2px',
                                marginBottom: '1rem',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    height: '100%',
                                    width: `${progress}%`,
                                    background: isActive ? '#00e6a8' : '#5a4bff',
                                    transition: 'width 0.3s'
                                }} />
                            </div>

                            {/* Tasks */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {phase.tasks.map((task, taskIndex) => {
                                    const isCompleted = completedTasks[`${phase.id}-${taskIndex}`];
                                    return (
                                        <label
                                            key={taskIndex}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '0.75rem',
                                                padding: '0.75rem',
                                                background: '#0f1117',
                                                borderRadius: '0.5rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                opacity: isCompleted ? 0.5 : 1
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isCompleted || false}
                                                onChange={() => toggleTask(phase.id, taskIndex)}
                                                style={{ display: 'none' }}
                                            />
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '0.25rem',
                                                border: `2px solid ${isCompleted ? '#00e6a8' : 'rgba(255, 255, 255, 0.2)'}`,
                                                background: isCompleted ? '#00e6a8' : 'transparent',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                                marginTop: '0.125rem'
                                            }}>
                                                {isCompleted && <Check className="w-3 h-3" style={{ color: '#0f1117' }} />}
                                            </div>
                                            <div style={{
                                                fontSize: '0.9375rem',
                                                lineHeight: '1.5',
                                                textDecoration: isCompleted ? 'line-through' : 'none'
                                            }}>
                                                {task}
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Final Message */}
            {currentPhaseIndex === -1 && (
                <div style={{
                    maxWidth: '800px',
                    margin: '2rem auto',
                    padding: '2rem',
                    background: 'linear-gradient(135deg, rgba(0, 230, 168, 0.1), rgba(90, 75, 255, 0.1))',
                    border: '2px solid #00e6a8',
                    borderRadius: '0.75rem',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        You're Ready
                    </div>
                    <div style={{ fontSize: '1.125rem', opacity: 0.9 }}>
                        Your hands know this. Trust your training.
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssessmentCountdown;