import { useState, useEffect } from 'react';
import { Check, Clock, Target, Home, Building2 } from 'lucide-react';

// interface Task {
//   text: string;
// }

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
      endTime: assessmentTime.getTime(),
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
            transition: 'all 0.2s'
          }}
        >
          <Target className="w-4 h-4" />
          {showFocus ? 'Hide' : 'Show'} Focus Cues
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