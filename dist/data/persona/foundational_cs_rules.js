(function(root){
  const FOUNDATIONAL_CS_RULES = {
    dimension: 'Core CS Knowledge',

    // Core Rules for Question Framing
    questionFramingRules: {
      intent: 'Frame questions that test academic computer science theory (DSA, OS, DBMS, Computer Networks, Compilers) applied to real project requirements.',
      constraints: [
        'MUST reference Table 0.1 course mappings and Stage 1 FR/NFR technical mechanisms.',
        'Stems must query data structures, algorithmic complexity, concurrency primitives, transaction properties, or network protocol choices.',
        'Avoid high-level GUI fluff; focus on memory layout, computational efficiency, and systems guarantees.',
        'Options must be technically accurate alternatives with distinct computational profiles.'
      ],
      distractorStrategy: [
        'Use suboptimal data structures (e.g. O(N) array scan where O(1) hash lookup or O(log N) tree is required).',
        'Use theoretical concepts from unrelated curriculum subjects that do not fit the problem.',
        'Use improper synchronization or transaction isolation levels.'
      ]
    },

    // Standardized Question Templates per Stage
    stageTemplates: {
      '0': {
        mcq: [
          {
            id: 'CS0-M1',
            focus: 'Relevant course concept',
            stem: 'Which foundational CS concept is most relevant to addressing a selected technical challenge in the project?',
            prompt: 'Which foundational CS concept is most relevant to addressing a selected technical challenge in the project?',
            layer: 'project',
            options: [
              'A concept from a course the project does not use',
              'The course concept that matches that challenge',
              'A screen color or label choice',
              'The project title by itself'
            ],
            correct: 1,
            explanation: 'The useful concept is the one that addresses the challenge the project actually has.',
            defenseTip: 'Anchor your answer in Table 0.1 foundation courses and explain which course theory addresses this challenge.'
          },
          {
            id: 'CS0-M2',
            focus: 'Structure or algorithm',
            stem: 'Which data structure or algorithm is most appropriate for a specific operation in the proposed workflow?',
            prompt: 'Which data structure or algorithm is most appropriate for a specific operation in the proposed workflow?',
            layer: 'project',
            options: [
              'One that cannot represent the data that operation needs',
              'One chosen for an unrelated problem',
              'The structure or algorithm that fits that operation',
              'A manual step the scope has excluded'
            ],
            correct: 2,
            explanation: 'The right choice is the one that fits the operation, not an unrelated method.',
            defenseTip: 'State the specific data structure chosen for the engine and justify its memory layout and asymptotic efficiency.'
          },
          {
            id: 'CS0-M3',
            focus: 'Foundational mechanism',
            stem: 'Which OS, DBMS, networking or other foundational mechanism best supports a selected project objective?',
            prompt: 'Which OS, DBMS, networking or other foundational mechanism best supports a selected project objective?',
            layer: 'project',
            options: [
              'A mechanism that does not serve that objective',
              'The mechanism the objective actually depends on',
              'A later test script',
              'An objective with no technical content'
            ],
            correct: 1,
            explanation: 'Choose the mechanism the objective depends on.',
            defenseTip: 'Explain whether file systems, concurrency primitives, or network sockets power this objective.'
          },
          {
            id: 'CS0-M4',
            focus: 'Advantage of a concept',
            stem: 'What is the primary technical advantage of applying a selected foundational CS concept to this project?',
            prompt: 'What is the primary technical advantage of applying a selected foundational CS concept to this project?',
            layer: 'project',
            options: [
              'It makes the write-up longer without changing the solution',
              'It replaces the project objectives',
              'It adds a feature the scope excludes',
              'It gives a concrete way to carry out part of the solution'
            ],
            correct: 3,
            explanation: 'A course concept helps when it gives a concrete way to do part of the work.',
            defenseTip: 'Show how foundational theory transforms an abstract problem statement into a rigorous programmatic solution.'
          },
          {
            id: 'CS0-M5',
            focus: 'Concept trade-off',
            stem: 'Which limitation or trade-off should be considered when applying a selected algorithm, data structure or computing mechanism?',
            prompt: 'Which limitation or trade-off should be considered when applying a selected algorithm, data structure or computing mechanism?',
            layer: 'project',
            options: [
              'The cost, limit, or compromise that comes with that choice',
              'A guarantee that the choice has no downside',
              'A result measured only after final testing',
              'A course that is not connected to the project'
            ],
            correct: 0,
            explanation: 'Every technical choice has a cost or limit that should be named.',
            defenseTip: 'Discuss the space vs time complexity trade-off or synchronization overhead inherent in your approach.'
          }
        ],
        descriptive: [
          {
            id: 'CS0-D1',
            focus: 'Two course concepts',
            prompt: 'Identify two foundational CS concepts relevant to the project and explain their roles in solving the identified problem.',
            layer: 'project',
            points: ['Name two relevant concepts', 'Explain the role of the first concept', 'Explain the role of the second concept']
          },
          {
            id: 'CS0-D2',
            focus: 'Structure in an operation',
            prompt: 'Explain how a selected data structure or algorithm could support an important operation in the proposed system.',
            layer: 'project',
            points: ['Name the operation', 'Name the structure or algorithm', 'Explain how it supports that operation']
          },
          {
            id: 'CS0-D3',
            focus: 'Mechanism and objective',
            prompt: 'Explain how an OS, DBMS, networking or other relevant foundational mechanism contributes to a stated project objective.',
            layer: 'project',
            points: ['Name the mechanism', 'Name the objective it supports', 'Explain the contribution']
          },
          {
            id: 'CS0-D4',
            focus: 'Compare two approaches',
            prompt: 'Compare two possible foundational computing approaches for a technical challenge identified in the project. Explain which appears more suitable and why.',
            layer: 'project',
            points: ['Name the challenge', 'Describe two possible approaches', 'Choose the more suitable one and give the reason']
          },
          {
            id: 'CS0-D5',
            focus: 'Two courses together',
            prompt: 'Explain how concepts from two different foundational CS courses work together in the proposed workflow.',
            layer: 'project',
            points: ['Name the two courses or concepts', 'Show where each appears in the workflow', 'Explain how they depend on each other']
          }
        ]
      },
      '1': {
        mcq: [
          {
            id: 'CS1-M1',
            focus: 'Concepts for a requirement',
            stem: 'Which foundational CS concept is most relevant to implementing a selected functional requirement?',
            prompt: 'Which foundational CS concept is most relevant to implementing a selected functional requirement?',
            layer: 'project',
            options: [
              'A concept from a subject that does not support that requirement',
              'The foundational concept that carries out that functional requirement',
              'A choice made only for team styling',
              'A requirement that was removed during scoping'
            ],
            correct: 1,
            explanation: 'The relevant concept is the one that directly supports the requirement.',
            defenseTip: 'Demonstrate which textbook CS algorithm or protocol implements this functional requirement.'
          },
          {
            id: 'CS1-M2',
            focus: 'Structure for a requirement',
            stem: 'Which data structure, algorithm or computing mechanism could best support a selected functional requirement?',
            prompt: 'Which data structure, algorithm or computing mechanism could best support a selected functional requirement?',
            layer: 'project',
            options: [
              'A structure or mechanism that fits what that requirement must do',
              'A mechanism selected for an unrelated system',
              'A requirement title with no data structure behind it',
              'A step that is already completed in Stage 0'
            ],
            correct: 0,
            explanation: 'The best mechanism is the one whose behavior fits the requirement.',
            defenseTip: 'Specify whether hash maps, trees, or FIFO queues provide the required operational characteristics.'
          },
          {
            id: 'CS1-M3',
            focus: 'Mechanism for a quality target',
            stem: 'Which OS, DBMS, networking or other foundational concept is most relevant to a selected non-functional requirement?',
            prompt: 'Which OS, DBMS, networking or other foundational concept is most relevant to a selected non-functional requirement?',
            layer: 'project',
            options: [
              'A concept that does not influence the target quality',
              'The system concept that makes that quality target possible',
              'A test executed only after final delivery',
              'A team preference that sets no technical limit'
            ],
            correct: 1,
            explanation: 'Connect the quality target to the foundational mechanism that can achieve it.',
            defenseTip: 'Explain how low-level buffer caches, indices, or thread synchronization enable the target performance benchmark.'
          },
          {
            id: 'CS1-M4',
            focus: 'Advantage of a mechanism',
            stem: 'What is the primary technical benefit of using a selected computing mechanism to satisfy a functional requirement?',
            prompt: 'What is the primary technical benefit of using a selected computing mechanism to satisfy a functional requirement?',
            layer: 'project',
            options: [
              'It gives a direct technical way to satisfy that requirement',
              'It removes the need to write down the requirement',
              'It replaces all other requirements automatically',
              'It turns the requirement into an out-of-scope idea'
            ],
            correct: 0,
            explanation: 'A computing mechanism helps by giving a direct way to satisfy the requirement.',
            defenseTip: 'Highlight the formal guarantees (e.g. ACID properties, lock-free concurrency, O(log N) lookup) that this mechanism provides.'
          },
          {
            id: 'CS1-M5',
            focus: 'Mechanism trade-off',
            stem: 'What technical limitation or trade-off should be evaluated when selecting a computing mechanism for a specific requirement?',
            prompt: 'What technical limitation or trade-off should be evaluated when selecting a computing mechanism for a specific requirement?',
            layer: 'project',
            options: [
              'The trade-off, cost or compromise of the approach used for that requirement',
              'A claim that no resource cost or limit exists',
              'A detail belonging only to team composition',
              'An objective the scope has already rejected'
            ],
            correct: 0,
            explanation: 'Evaluate the cost or compromise of the approach used for that requirement.',
            defenseTip: 'Be prepared to explain worst-case time complexity, memory footprint, or lock contention risks under scale.'
          }
        ],
        descriptive: [
          {
            id: 'CS1-D1',
            focus: 'Concepts for a requirement',
            prompt: 'Select one functional requirement and explain which foundational CS concepts are relevant to satisfying it.',
            layer: 'project',
            points: ['Name the requirement', 'Name the relevant concepts', 'Explain how each concept helps satisfy it']
          },
          {
            id: 'CS1-D2',
            focus: 'Structure for a requirement',
            prompt: 'Explain how a suitable data structure or algorithm could support a selected functional requirement.',
            layer: 'project',
            points: ['Name the requirement', 'Name the structure or algorithm', 'Explain how it supports the requirement']
          },
          {
            id: 'CS1-D3',
            focus: 'Mechanism for a quality target',
            prompt: 'Explain how an OS, DBMS, networking or other foundational mechanism relates to a selected non-functional requirement.',
            layer: 'project',
            points: ['Name the non-functional requirement', 'Name the mechanism', 'Explain the relationship']
          },
          {
            id: 'CS1-D4',
            focus: 'Compare approaches',
            prompt: 'Compare two foundational computing approaches that could satisfy a selected requirement. Discuss their advantages and limitations.',
            layer: 'project',
            points: ['Name the requirement', 'Describe two approaches', 'Give an advantage and a limitation', 'Present them as alternatives, not as a completed implementation']
          },
          {
            id: 'CS1-D5',
            focus: 'Two subjects together',
            prompt: 'Explain how concepts from two foundational CS subjects may need to work together to satisfy a selected requirement or use case.',
            layer: 'project',
            points: ['Name the requirement or use case', 'Name the two subjects or concepts', 'Explain how they must work together']
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
          explanation: question.explanation || 'Verified against core Foundational CS course concepts.',
          defenseTip: question.defenseTip || 'Identify the specific data structure, OS primitive, or network protocol that supports this choice.'
        };
      }
    }
  };

  if(typeof module !== 'undefined' && module.exports) module.exports = FOUNDATIONAL_CS_RULES;
  if(typeof window !== "undefined") window.FOUNDATIONAL_CS_RULES = FOUNDATIONAL_CS_RULES;
  if(typeof global !== "undefined") global.FOUNDATIONAL_CS_RULES = FOUNDATIONAL_CS_RULES;
})(typeof window !== 'undefined' ? window : global);
