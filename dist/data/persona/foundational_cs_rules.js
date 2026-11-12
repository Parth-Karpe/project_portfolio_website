/**
 * Foundational CS Knowledge — stage rules and template binding.
 * Other personas do not read this file.
 */
(function(root){
  function slot(focus, tokens, outcome, difficulty){
    return {
      assessmentFocus: focus,
      artifactTokens: tokens,
      learningOutcome: outcome,
      difficulty: difficulty || 'applied',
      avoidOverlap: 'Ask how a CS concept works in this project. Do not ask only whether a document contains a requirement, and do not ask about system boundaries or documentation quality.'
    };
  }

  const stage0 = ['table-0-1', 'engine-', 'table-0-3', 'stage0-problem', 'stage0-objectives', 'table-0-4'];
  const stage1 = ['fr-', 'nfr-', 'table-use-cases', 'table-testsuite', 'table-0-1'];
  const stageDesign = ['stage2-algorithm', 'stage2-data-design', 'stage2-architecture', 'table-0-1'];
  const stageImpl = ['stage2-algorithm', 'table-0-1'];
  const stageTest = ['table-testsuite', 'table-0-1'];

  root.FOUNDATIONAL_CS_RULES = {
    persona: 'Foundational CS Knowledge',
    stageGuards: {
      '0': { deny: /\b(source code|implemented in code|unit test|measured latency|class diagram|architecture diagram|deployment)\b/i },
      '1': { deny: /\b(source code|we already implemented|final benchmark|production outage)\b/i },
      'system-design': { deny: /\b(unit test passed|lines of code)\b/i },
      '2': { deny: /\b(only the problem statement)\b/i },
      '3': { deny: /\b(will be designed later)\b/i }
    },
    bindings: {
      '0': {
        'CS0-M1': slot('conceptual understanding', stage0, 'Name the prerequisite concept the proposed operation depends on.', 'core'),
        'CS0-M2': slot('application', stage0, 'Apply a data structure or algorithm to a proposed operation.', 'applied'),
        'CS0-M3': slot('conceptual understanding', stage0, 'Connect a foundational mechanism to a stated objective.', 'core'),
        'CS0-M4': slot('comparison', stage0, 'Compare two foundational approaches at a conceptual level.', 'applied'),
        'CS0-M5': slot('limitations', stage0, 'Name a complexity, correctness, or feasibility limit of a concept.', 'applied'),
        'CS0-D1': slot('conceptual understanding', stage0, 'Explain two documented concepts and the operations they support.', 'core'),
        'CS0-D2': slot('application', stage0, 'Explain how a structure or algorithm supports one operation.', 'applied'),
        'CS0-D3': slot('application', stage0, 'Explain how a mechanism supports one objective.', 'applied'),
        'CS0-D4': slot('comparison', stage0, 'Compare two approaches and choose one with a reason.', 'applied'),
        'CS0-D5': slot('algorithmic reasoning', stage0, 'Show how two courses depend on each other in the workflow.', 'stretch')
      },
      '1': {
        'CS1-M1': slot('application', stage1, 'Match a documented concept to a functional requirement.', 'core'),
        'CS1-M2': slot('algorithmic reasoning', stage1, 'Choose a structure or algorithm implied by a requirement.', 'applied'),
        'CS1-M3': slot('application', stage1, 'Connect a concept to a non-functional target.', 'applied'),
        'CS1-M4': slot('conceptual understanding', stage1, 'Name the property that lets a requirement be met.', 'core'),
        'CS1-M5': slot('limitations', stage1, 'Name a trade-off of the approach a requirement implies.', 'applied'),
        'CS1-D1': slot('application', stage1, 'Explain concepts that satisfy one functional requirement.', 'core'),
        'CS1-D2': slot('algorithmic reasoning', stage1, 'Explain a structure or algorithm for one requirement.', 'applied'),
        'CS1-D3': slot('application', stage1, 'Relate a mechanism to one quality target.', 'applied'),
        'CS1-D4': slot('comparison', stage1, 'Compare two approaches for one requirement without claiming they are built.', 'applied'),
        'CS1-D5': slot('algorithmic reasoning', stage1, 'Explain how two subjects must work together for one requirement or use case.', 'stretch')
      },
      'system-design': {
        'CSD-M1': slot('algorithmic reasoning', stageDesign, 'Select an algorithm that matches a documented design choice.', 'applied'),
        'CSD-M2': slot('application', stageDesign, 'Match a data structure to a designed module.', 'applied'),
        'CSD-M3': slot('limitations', stageDesign, 'State a complexity trade-off in the design.', 'applied'),
        'CSD-M4': slot('conceptual understanding', stageDesign, 'Explain an interface using a foundational concept.', 'core'),
        'CSD-M5': slot('comparison', stageDesign, 'Compare two design-level computing approaches.', 'applied'),
        'CSD-D1': slot('algorithmic reasoning', stageDesign, 'Justify an algorithm selection from the design.', 'applied'),
        'CSD-D2': slot('application', stageDesign, 'Explain a data structure used by a module.', 'applied'),
        'CSD-D3': slot('limitations', stageDesign, 'Explain a complexity or correctness trade-off.', 'applied'),
        'CSD-D4': slot('conceptual understanding', stageDesign, 'Explain module responsibilities using CS concepts.', 'core'),
        'CSD-D5': slot('comparison', stageDesign, 'Compare two technical alternatives in the design.', 'stretch')
      },
      '2': {
        'CS3-M1': slot('application', stageImpl, 'Connect implemented behavior to a course concept.', 'applied'),
        'CS3-M2': slot('algorithmic reasoning', stageImpl, 'Check whether an implemented algorithm matches its purpose.', 'applied'),
        'CS3-M3': slot('conceptual understanding', stageImpl, 'Identify a data-structure correctness issue.', 'core'),
        'CS3-M4': slot('application', stageImpl, 'Explain an integration point using a foundational mechanism.', 'applied'),
        'CS3-M5': slot('limitations', stageImpl, 'Name a debugging or correctness limit of the implementation.', 'applied'),
        'CS3-D1': slot('application', stageImpl, 'Explain how code applies a documented concept.', 'applied'),
        'CS3-D2': slot('algorithmic reasoning', stageImpl, 'Walk through an implemented algorithm.', 'applied'),
        'CS3-D3': slot('conceptual understanding', stageImpl, 'Explain data-structure correctness in the code.', 'core'),
        'CS3-D4': slot('application', stageImpl, 'Explain how modules integrate through a CS mechanism.', 'applied'),
        'CS3-D5': slot('limitations', stageImpl, 'Describe a defect or limit found while integrating.', 'stretch')
      },
      '3': {
        'CS4-M1': slot('conceptual understanding', stageTest, 'Identify what a test checks for correctness.', 'core'),
        'CS4-M2': slot('algorithmic reasoning', stageTest, 'Name an edge case a concept must handle.', 'applied'),
        'CS4-M3': slot('limitations', stageTest, 'Interpret a performance or complexity result.', 'applied'),
        'CS4-M4': slot('application', stageTest, 'Connect a test to a foundational mechanism.', 'applied'),
        'CS4-M5': slot('comparison', stageTest, 'Compare two ways of validating the same concept.', 'applied'),
        'CS4-D1': slot('conceptual understanding', stageTest, 'Explain what evidence shows a concept is correct.', 'core'),
        'CS4-D2': slot('algorithmic reasoning', stageTest, 'Explain an edge case and the expected result.', 'applied'),
        'CS4-D3': slot('limitations', stageTest, 'Interpret measured cost using complexity ideas.', 'applied'),
        'CS4-D4': slot('application', stageTest, 'Explain coverage of a foundational behavior.', 'applied'),
        'CS4-D5': slot('comparison', stageTest, 'Compare two validation approaches for one concept.', 'stretch')
      }
    }
  };
})(typeof window !== 'undefined' ? window : this);
