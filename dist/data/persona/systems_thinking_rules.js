(function(root){
  const SYSTEMS_THINKING_RULES = {
    dimension: 'Systems Thinking',
    
    // Core Rules for Question Framing
    questionFramingRules: {
      intent: 'Frame questions that test holistic system behavior, workflow continuity, boundary enforcement, and component dependencies.',
      constraints: [
        'MUST extract concrete entities from the active team portfolio (FR IDs, specific engine names, scope boundaries, use cases).',
        'Stems must avoid generic textbook wording and instead reference the project title, engines, or requirements.',
        'Each question must evaluate one specific systems thinking competency: (1) Core Enabling Operation, (2) Requirement Dependency, (3) Use Case Execution Flow, (4) Failure Impact, or (5) Quality Attribute Influence.',
        'Options must be of similar length, plausible to students, and free of meta-hints like "All of the above" or "None of the above".'
      ],
      distractorStrategy: [
        'Use verified Out-of-Scope items from Table 0.4 as plausible distractors to test boundary awareness.',
        'Use independent or downstream functional requirements that do NOT satisfy the dependency.',
        'Use exception paths where a main flow is requested, or vice versa.'
      ]
    },

    // Standardized Question Templates per Stage (Stage 0 and Stage 1)
    stageTemplates: {
      '0': {
        mcq: [
          {
            id: 'ST0-M1',
            focus: 'Workflow sequence',
            stem: 'Which sequence correctly represents the major operations in the proposed system?',
            prompt: 'Which sequence correctly represents the major operations in the proposed system?',
            layer: 'project',
            options: [
              'Publish the result, then discard the input, then skip processing',
              'Accept the inputs, carry them through the processing stages, and emit the outputs',
              'Treat every excluded item as the first processing stage',
              'Run only the output step and invent the missing inputs'
            ],
            correct: 1,
            explanation: 'A system accepts inputs, processes them in stages, and produces outputs.',
            defenseTip: 'Walk the committee through the conceptual pipeline in Table 0.2 from raw input to verified output.'
          },
          {
            id: 'ST0-M2',
            focus: 'Stage dependency',
            stem: 'Which of the following best describes the relationship between two important stages of the conceptual workflow?',
            prompt: 'Which of the following best describes the relationship between two important stages of the conceptual workflow?',
            layer: 'project',
            options: [
              'The stages share no data and cannot affect each other',
              'The output is created before any stage begins',
              'A downstream stage depends on the output of an upstream stage',
              'An excluded external system performs the core stages'
            ],
            correct: 2,
            explanation: 'Later stages depend on what earlier stages produce.',
            defenseTip: 'Show how Engine outputs become prerequisites for downstream workflow engines in Table 0.3.'
          },
          {
            id: 'ST0-M3',
            focus: 'Failure consequence',
            stem: 'What is the most likely consequence if a critical operation in the proposed workflow fails?',
            prompt: 'What is the most likely consequence if a critical operation in the proposed workflow fails?',
            layer: 'project',
            options: [
              'Dependent work stops or becomes incorrect',
              'The objective is completed by the failure',
              'The boundary vanishes and scope no longer matters',
              'Only the project title needs to change'
            ],
            correct: 0,
            explanation: 'A failed critical step blocks the stages that rely on it.',
            defenseTip: 'Explain error propagation and how upstream failure disrupts downstream data integrity.'
          },
          {
            id: 'ST0-M4',
            focus: 'System boundary',
            stem: 'Which of the following correctly identifies the system boundary and its interaction with external inputs or outputs?',
            prompt: 'Which of the following correctly identifies the system boundary and its interaction with external inputs or outputs?',
            layer: 'project',
            options: [
              'The system includes every idea in the problem statement',
              'Outputs exist, but the system has no inputs',
              'Exclusions are implemented as core stages',
              'In-scope work stays inside, and inputs and outputs cross the boundary'
            ],
            correct: 3,
            explanation: 'The boundary separates in-scope work from the inputs and outputs that cross it.',
            defenseTip: 'Defend your Table 0.4 scope boundaries by explaining why out-of-scope exclusions were excluded.'
          },
          {
            id: 'ST0-M5',
            focus: 'Limitation or dependency',
            stem: "Which system-level limitation or dependency must be considered to achieve the project's primary objective?",
            prompt: "Which system-level limitation or dependency must be considered to achieve the project's primary objective?",
            layer: 'project',
            options: [
              'Work the scope has already excluded',
              'A dependency or limit the primary objective relies on',
              'A definition that the project does not use',
              'Evidence from implementation or testing'
            ],
            correct: 1,
            explanation: 'The objective can be met only if its real dependency or limit is recognized.',
            defenseTip: 'Tie primary objectives back to documented feasibility constraints and operational dependencies.'
          }
        ],
        descriptive: [
          {
            id: 'ST0-D1',
            focus: 'End-to-end workflow',
            prompt: 'Explain the end-to-end conceptual workflow of the proposed system, identifying its major inputs, processing stages and outputs.',
            layer: 'project',
            points: ['Name the major inputs', 'Name the processing stages in order', 'Name the outputs', 'Show how the stages form one flow']
          },
          {
            id: 'ST0-D2',
            focus: 'Operation dependency',
            prompt: 'Explain how the major operations or components of the proposed system depend on one another.',
            layer: 'project',
            points: ['Name the major operations', 'State what each one produces for the next', 'Explain what fails if one operation is missing']
          },
          {
            id: 'ST0-D3',
            focus: 'Failure scenario',
            prompt: 'Identify a critical failure scenario in the proposed workflow and explain its effect on the overall system.',
            layer: 'project',
            points: ['Name a critical failure', 'Explain which stages it affects', 'Describe the effect on the overall result']
          },
          {
            id: 'ST0-D4',
            focus: 'System boundary',
            prompt: 'Explain the system boundary, including what the system is responsible for and what is outside its scope.',
            layer: 'project',
            points: ['State what the system is responsible for', 'State what is outside the scope', 'Explain how inputs and outputs cross the boundary']
          },
          {
            id: 'ST0-D5',
            focus: 'Workflow and objectives',
            prompt: 'Explain how the proposed workflow collectively supports the stated project objectives.',
            layer: 'project',
            points: ['Name the relevant objectives', 'Map workflow stages to those objectives', 'Explain why the set of stages is enough for those objectives']
          }
        ]
      },
      '1': {
        mcq: [
          {
            id: 'ST1-M1',
            focus: 'Core operation',
            stem: 'Which functional requirement is most directly responsible for enabling a selected core system operation?',
            prompt: 'Which functional requirement is most directly responsible for enabling a selected core system operation?',
            layer: 'project',
            options: [
              'A requirement that describes a different operation',
              'The requirement that carries out that core operation',
              'A team-member name',
              'An objective that belongs only to later testing'
            ],
            correct: 1,
            explanation: 'The enabling requirement is the one that carries out the core operation.',
            defenseTip: 'Demonstrate which FR ID serves as the primary engine driver in Stage 1.'
          },
          {
            id: 'ST1-M2',
            focus: 'Requirement dependency',
            stem: 'Which two functional requirements have an important dependency, and what is the correct relationship between them?',
            prompt: 'Which two functional requirements have an important dependency, and what is the correct relationship between them?',
            layer: 'project',
            options: [
              'Two requirements that never exchange a result',
              'A later requirement that needs the result of an earlier one',
              'Two items placed out of scope',
              'A title and a submission date'
            ],
            correct: 1,
            explanation: 'A dependency means one requirement needs what another requirement produces.',
            defenseTip: 'Cite the prerequisite FR that feeds data into the dependent FR.'
          },
          {
            id: 'ST1-M3',
            focus: 'Use-case sequence',
            stem: 'Which sequence of system operations best satisfies a selected use case?',
            prompt: 'Which sequence of system operations best satisfies a selected use case?',
            layer: 'project',
            options: [
              'Skip the actor goal and store an unrelated result',
              'Follow the main flow from the request to its outcome',
              'Start from an exception and never perform the main flow',
              'Replace the use case with an out-of-scope feature'
            ],
            correct: 1,
            explanation: 'A use case is satisfied by its main flow from request to outcome.',
            defenseTip: 'Walk through the actor trigger, system response, and final persistent state.'
          },
          {
            id: 'ST1-M4',
            focus: 'Missing requirement',
            stem: 'What is the most likely system-level consequence if a selected functional requirement is not satisfied?',
            prompt: 'What is the most likely system-level consequence if a selected functional requirement is not satisfied?',
            layer: 'project',
            options: [
              'The operation that depends on it cannot succeed',
              'Every other requirement becomes successful automatically',
              'The actor of the use case disappears',
              'Scope exclusions turn into required functions'
            ],
            correct: 0,
            explanation: 'If a required function is missing, the operation that depends on it cannot succeed.',
            defenseTip: 'Explain how downstream use cases or FRs break if the prerequisite requirement fails.'
          },
          {
            id: 'ST1-M5',
            focus: 'Non-functional influence',
            stem: 'Which non-functional requirement most strongly influences the behavior or interaction of major system functions?',
            prompt: 'Which non-functional requirement most strongly influences the behavior or interaction of major system functions?',
            layer: 'project',
            options: [
              'A quality target that changes how those functions must behave',
              'A spelling choice in the team name',
              'A sentence with no quality target',
              'A caption that adds no constraint'
            ],
            correct: 0,
            explanation: 'A non-functional requirement matters when its quality target changes function behavior.',
            defenseTip: 'Point to the specific latency, concurrency, or throughput NFR that forces system caching or pooling.'
          }
        ],
        descriptive: [
          {
            id: 'ST1-D1',
            focus: 'Requirements and an objective',
            prompt: 'Explain how the major functional requirements work together to achieve a selected project objective.',
            layer: 'project',
            points: ['Name the objective', 'Name the functional requirements involved', 'Explain how they work together']
          },
          {
            id: 'ST1-D2',
            focus: 'Requirement dependency',
            prompt: 'Identify two functional requirements that depend on one another. Explain their dependency and its importance to the overall system.',
            layer: 'project',
            points: ['Name two requirements', 'Explain what one needs from the other', 'Explain why that dependency matters to the system']
          },
          {
            id: 'ST1-D3',
            focus: 'Use case support',
            prompt: 'Select one important use case and explain how the specified system functions collectively support its successful execution.',
            layer: 'project',
            points: ['Name the use case and its goal', 'Name the functions that support it', 'Explain how those functions complete the main flow']
          },
          {
            id: 'ST1-D4',
            focus: 'Exception scenario',
            prompt: 'Identify a possible failure or exception scenario associated with a selected use case. Explain which requirements should address it.',
            layer: 'project',
            points: ['Name the use case', 'Describe a failure or exception', 'Name the requirements that should address it']
          },
          {
            id: 'ST1-D5',
            focus: 'Non-functional influence',
            prompt: 'Explain how a selected non-functional requirement influences the behavior or interaction of the proposed system functions.',
            layer: 'project',
            points: ['Name the non-functional requirement', 'State its quality target', 'Explain how it changes function behavior or interaction']
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
          explanation: question.explanation || 'Verified against documented Systems Thinking relationships in the project.',
          defenseTip: question.defenseTip || 'Explain how the components synchronize and where the boundary lies.'
        };
      }
    }
  };

  if(typeof module !== 'undefined' && module.exports) module.exports = SYSTEMS_THINKING_RULES;
  if(typeof window !== "undefined") window.SYSTEMS_THINKING_RULES = SYSTEMS_THINKING_RULES;
  if(typeof global !== "undefined") global.SYSTEMS_THINKING_RULES = SYSTEMS_THINKING_RULES;
})(typeof window !== 'undefined' ? window : global);
