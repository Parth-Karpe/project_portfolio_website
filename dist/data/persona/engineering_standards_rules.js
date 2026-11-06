(function(root){
  const ENGINEERING_STANDARDS_RULES = {
    dimension: 'Engineering Standards',

    // Core Rules for Question Framing
    questionFramingRules: {
      intent: 'Frame questions that assess software engineering specification rigor, IEEE 830 standards compliance, requirement testability, measurable benchmarks, and bidirectional traceability.',
      constraints: [
        'MUST assess conformance to IEEE 830 requirement structure (Actor + Action + Observable Result).',
        'Stems must evaluate the presence of measurable, non-subjective quality targets in NFRs (e.g. latency, throughput, concurrency).',
        'Must test bidirectional traceability between Stage 0 objectives and Stage 1 functional requirements.',
        'Must inspect acceptance criteria from Table 1.3 for definitive pass/fail verification conditions.',
        'Options must contrast rigorous specifications against vague, untestable, or scope-violating statements.'
      ],
      distractorStrategy: [
        'Use vague, subjective statements without measurable metrics (e.g., "system should be fast and user-friendly").',
        'Use untestable compound requirements that bundle multiple disjoint features.',
        'Use features that violate Table 0.4 scope exclusions.',
        'Use circular requirements that simply repeat the project title without observable outcomes.'
      ]
    },

    // Standardized Question Templates per Stage
    stageTemplates: {
      '0': {
        mcq: [
          {
            id: 'ES0-M1',
            focus: 'Clear objective',
            stem: 'Which statement best represents a clear and technically meaningful project objective?',
            prompt: 'Which statement best represents a clear and technically meaningful project objective?',
            layer: 'project',
            options: [
              'A vague hope with no technical outcome',
              'An objective that says what will be achieved and how it can be recognized',
              'A restatement of the team members names',
              'A feature the scope says will not be built'
            ],
            correct: 1,
            explanation: 'A clear objective states the outcome and how it can be recognized.',
            defenseTip: 'State the specific objective, its observable outcome, and how completion is verified.'
          },
          {
            id: 'ES0-M2',
            focus: 'Measurable outcome',
            stem: 'Which measurable outcome would provide the strongest evidence that a selected project objective has been achieved?',
            prompt: 'Which measurable outcome would provide the strongest evidence that a selected project objective has been achieved?',
            layer: 'project',
            options: [
              'A number or observable result that matches that objective',
              'The statement that the team worked hard',
              'An objective copied from an unrelated project',
              'A feature that was declared out of scope'
            ],
            correct: 0,
            explanation: 'Evidence is an observable result that matches the objective.',
            defenseTip: 'Provide quantifiable metrics (e.g. benchmark figures, test pass rates) rather than subjective claims.'
          },
          {
            id: 'ES0-M3',
            focus: 'Problem and objective mismatch',
            stem: 'Which inconsistency, if present, would indicate a mismatch between the problem statement and project objectives?',
            prompt: 'Which inconsistency, if present, would indicate a mismatch between the problem statement and project objectives?',
            layer: 'project',
            options: [
              'The objectives name the same need as the problem',
              'The objectives can be checked against the problem',
              'The objectives pursue a different problem from the one stated',
              'The scope repeats a limit already named in the problem'
            ],
            correct: 2,
            explanation: 'A mismatch means the objectives pursue a different problem from the one stated.',
            defenseTip: 'Show how each objective directly mitigates a specific friction documented in the problem statement.'
          },
          {
            id: 'ES0-M4',
            focus: 'Scope violation',
            stem: 'Which proposed feature would violate the documented project scope?',
            prompt: 'Which proposed feature would violate the documented project scope?',
            layer: 'project',
            options: [
              'A feature listed as in scope',
              'A feature that directly serves a stated objective',
              'A constraint already accepted in the feasibility notes',
              'A feature the project has placed out of scope'
            ],
            correct: 3,
            explanation: 'A feature placed out of scope would violate the scope.',
            defenseTip: 'Defend scope containment by citing the Out-of-Scope boundary in Table 0.4.'
          },
          {
            id: 'ES0-M5',
            focus: 'Feasibility consideration',
            stem: "Which engineering consideration is most important when evaluating the project's feasibility and constraints?",
            prompt: "Which engineering consideration is most important when evaluating the project's feasibility and constraints?",
            layer: 'project',
            options: [
              'Whether the plan fits the stated limits of time, skill, and resources',
              'Whether the title uses more technical words',
              'Whether later source code already exists',
              'Whether every excluded idea is added back'
            ],
            correct: 0,
            explanation: 'Feasibility asks whether the plan fits the stated limits.',
            defenseTip: 'Demonstrate that the architectural plan is feasible within the documented technical and time constraints.'
          }
        ],
        descriptive: [
          {
            id: 'ES0-D1',
            focus: 'Objective clarity',
            prompt: 'Examine the project objectives. Identify one objective that needs greater clarity or measurability and suggest how it could be improved.',
            layer: 'project',
            points: ['Quote or name one objective', 'Say what is unclear or not measurable', 'Suggest a clearer or measurable form']
          },
          {
            id: 'ES0-D2',
            focus: 'Objectives address the problem',
            prompt: 'Explain how the stated project objectives address the problem identified in the problem statement.',
            layer: 'project',
            points: ['State the problem', 'Name the objectives that respond to it', 'Explain the link between them']
          },
          {
            id: 'ES0-D3',
            focus: 'Workflow covers objectives',
            prompt: 'Examine the conceptual workflow and explain whether its major operations adequately cover the stated project objectives.',
            layer: 'project',
            points: ['Name the major operations', 'Match them to the objectives', 'Say whether any objective is left uncovered']
          },
          {
            id: 'ES0-D4',
            focus: 'Scope boundary',
            prompt: 'Explain how the In Scope and Out of Scope sections establish clear project boundaries and help prevent scope expansion.',
            layer: 'project',
            points: ['State what is in scope', 'State what is out of scope', 'Explain how that boundary limits later expansion']
          },
          {
            id: 'ES0-D5',
            focus: 'Constraints and planning',
            prompt: 'Identify two important project constraints or risks and explain how they should influence planning and later verification.',
            layer: 'project',
            points: ['Name two constraints or risks', 'Explain the effect on planning', 'Explain what should later be verified']
          }
        ]
      },
      '1': {
        mcq: [
          {
            id: 'ES1-M1',
            focus: 'Clear requirement',
            stem: 'Which functional requirement is stated most clearly, specifically and unambiguously?',
            prompt: 'Which functional requirement is stated most clearly, specifically and unambiguously?',
            layer: 'project',
            options: [
              'A statement that describes one specific action and its observable result',
              'A sentence that mixes several conflicting ideas',
              'A claim that the system will do everything well',
              'A repetition of the project title'
            ],
            correct: 0,
            explanation: 'A clear requirement states one action and its observable result.',
            defenseTip: 'Quote the requirement following the IEEE 830 formula: Actor + Action + Observable Result.'
          },
          {
            id: 'ES1-M2',
            focus: 'Measurable quality target',
            stem: 'Which non-functional requirement contains a measurable quality target rather than a vague statement?',
            prompt: 'Which non-functional requirement contains a measurable quality target rather than a vague statement?',
            layer: 'project',
            options: [
              'A sentence that only says the system should be fast',
              'A requirement that names what is measured and under what condition',
              'A description with no unit or benchmark',
              'A note that performance will be checked later'
            ],
            correct: 1,
            explanation: 'A measurable requirement states what is measured and under what condition.',
            defenseTip: 'Highlight the quantitative SLA metric (e.g., latency <= 200ms at 95th percentile) in your NFR.'
          },
          {
            id: 'ES1-M3',
            focus: 'Traceability to an objective',
            stem: 'Which functional requirement can be traced directly to an approved project objective?',
            prompt: 'Which functional requirement can be traced directly to an approved project objective?',
            layer: 'project',
            options: [
              'A requirement that carries out part of that objective',
              'A requirement that pursues an out-of-scope idea',
              'A requirement with no connection to the problem statement',
              'A note explaining the team meeting schedule'
            ],
            correct: 0,
            explanation: 'Traceability connects the requirement directly to the objective it serves.',
            defenseTip: 'Provide the explicit mapping showing which FR ID satisfies which Stage 0 Objective ID.'
          },
          {
            id: 'ES1-M4',
            focus: 'Objective acceptance criterion',
            stem: 'Which acceptance criterion provides the most objective basis for verifying a selected requirement?',
            prompt: 'Which acceptance criterion provides the most objective basis for verifying a selected requirement?',
            layer: 'project',
            options: [
              'A pass or fail condition that can be observed directly',
              'A general hope that the feature works well',
              'A criterion that tests an out-of-scope feature',
              'An opinion gathered without a test'
            ],
            correct: 0,
            explanation: 'An objective criterion gives a condition that can be observed directly.',
            defenseTip: 'Point to the exact pass/fail condition and expected output documented in Table 1.3.'
          },
          {
            id: 'ES1-M5',
            focus: 'Ambiguous or untestable requirement',
            stem: 'Which of the following describes an ambiguous, untestable or poorly specified requirement?',
            prompt: 'Which of the following describes an ambiguous, untestable or poorly specified requirement?',
            layer: 'project',
            options: [
              'One that leaves the action or the expected result open to interpretation',
              'One that specifies the input, the process, and the outcome',
              'One with an explicit numerical target',
              'One that names the actor and the main flow'
            ],
            correct: 0,
            explanation: 'A poorly specified requirement leaves the action or the expected result open to interpretation.',
            defenseTip: 'Explain why requirements with vague modifiers or missing verification steps must be refactored.'
          }
        ],
        descriptive: [
          {
            id: 'ES1-D1',
            focus: 'Requirement clarity and testability',
            prompt: 'Select one functional requirement and evaluate its clarity, completeness and testability. Suggest an improvement if needed.',
            layer: 'project',
            points: ['Name the requirement', 'Evaluate its clarity and completeness', 'Evaluate its testability', 'Suggest an improvement if needed']
          },
          {
            id: 'ES1-D2',
            focus: 'Measurable quality target',
            prompt: 'Select one non-functional requirement. Evaluate whether its quality target is measurable and suggest how it could be made more objective.',
            layer: 'project',
            points: ['Name the non-functional requirement', 'State its current target', 'Evaluate whether it is measurable', 'Suggest a more objective form']
          },
          {
            id: 'ES1-D3',
            focus: 'Traceability to objective',
            prompt: 'Demonstrate the traceability between a selected functional requirement and its corresponding project objective.',
            layer: 'project',
            points: ['Name the requirement', 'Name the objective it supports', 'Explain how the requirement carries out that objective']
          },
          {
            id: 'ES1-D4',
            focus: 'Acceptance test matrix',
            prompt: 'Examine the acceptance test matrix for a selected requirement. Explain whether the acceptance criterion adequately verifies that requirement.',
            layer: 'project',
            points: ['Name the requirement and its acceptance criterion', 'Explain what the criterion checks', 'State whether the verification is adequate and why']
          },
          {
            id: 'ES1-D5',
            focus: 'Inconsistency or gap',
            prompt: 'Identify an inconsistency, ambiguity or gap among the Stage 1 requirements and use cases, and explain how it should be resolved.',
            layer: 'project',
            points: ['Name the requirements or use cases involved', 'Explain the inconsistency, ambiguity or gap', 'Propose a resolution']
          }
        ]
      }
    },

    // Evaluation & Grading Rules
    evaluationRules: {
      evaluateSubmission: function(question, chosenKeyOrText){
        const letters = ['A', 'B', 'C', 'D'];
        const correctKey = question.correctKey || (Number.isInteger(question.correct) ? letters[question.correct] : 'A');
        const correctText = question.correctAnswer || (Number.isInteger(question.correct) && question.options ? question.options[question.correct] : '');
        const chosen = String(chosenKeyOrText || '').trim();
        const isCorrect = (correctKey && chosen.toUpperCase() === correctKey.toUpperCase()) ||
                          (correctText && chosen.toLowerCase() === String(correctText).toLowerCase());
        return {
          isCorrect,
          chosenKey: chosen,
          correctKey,
          score: isCorrect ? 1 : 0,
          explanation: question.explanation || 'Verified against IEEE / ISO Software Engineering Standards.',
          defenseTip: question.defenseTip || 'Demonstrate verifiable testability and bidirectional traceability.'
        };
      }
    }
  };

  if(typeof module !== 'undefined' && module.exports) module.exports = ENGINEERING_STANDARDS_RULES;
  if(typeof window !== "undefined") window.ENGINEERING_STANDARDS_RULES = ENGINEERING_STANDARDS_RULES;
  if(typeof global !== "undefined") global.ENGINEERING_STANDARDS_RULES = ENGINEERING_STANDARDS_RULES;
})(typeof window !== 'undefined' ? window : global);
