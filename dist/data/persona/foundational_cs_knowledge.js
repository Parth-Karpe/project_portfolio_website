/**
 * Foundational CS Knowledge — stage 2–4 question banks.
 * Stage 0 and Stage 1 stay in portfolio-rag.js so other personas are untouched.
 */
(function(root){
  function mcq(id, focus, prompt, options, correct, explanation){
    return { id, focus, layer: 'project', prompt, options, correct, explanation };
  }
  function desc(id, focus, prompt, points){
    return { id, focus, layer: 'project', prompt, points };
  }

  const design = {
    mcq: [
      mcq('CSD-M1', 'Algorithm selection', 'Which algorithm or access method in the design best matches a documented operation?', ['A method that cannot represent the designed data', 'The method the design names for that operation', 'A user-interface color', 'A test log from a later stage'], 1, 'The design should name the method that carries out the operation.'),
      mcq('CSD-M2', 'Data structure', 'Which data structure best supports a module described in the design?', ['One that cannot store the module\'s data', 'One chosen for an unrelated problem', 'The structure the design uses for that module', 'A feature placed out of scope'], 2, 'Use the structure the design assigns to the module.'),
      mcq('CSD-M3', 'Complexity trade-off', 'Which complexity or resource trade-off does the design accept?', ['A cost the design explicitly accepts', 'A guarantee that the design has no cost', 'A measured production outage', 'A course with no link to the design'], 0, 'Name the cost the design itself accepts.'),
      mcq('CSD-M4', 'Module interface', 'Which foundational idea explains how two designed modules exchange work?', ['The idea that matches their documented interface', 'A team-member name', 'A cover-page layout', 'An excluded feature'], 0, 'The interface should be explained by the concept the design uses.'),
      mcq('CSD-M5', 'Design alternative', 'Which statement correctly compares two computing approaches in this design?', ['They differ only by file name', 'The design\'s chosen approach and a real alternative differ in cost or fit', 'Both approaches are already proven by final tests', 'Neither approach uses any CS concept'], 1, 'Compare the designed choice with a real alternative.')
    ],
    descriptive: [
      desc('CSD-D1', 'Algorithm justification', 'Using the submitted design, explain why a selected algorithm or access method fits one designed operation.', ['Name the operation from the design', 'Name the algorithm or access method', 'Explain why it fits', 'Do not invent an algorithm the design does not use']),
      desc('CSD-D2', 'Structure in a module', 'Explain how a data structure in the design supports one module.', ['Name the module', 'Name the structure', 'Explain what the structure stores or retrieves']),
      desc('CSD-D3', 'Complexity', 'Explain one complexity or resource trade-off accepted by the design.', ['Name the trade-off', 'Say which module it affects', 'Explain the cost']),
      desc('CSD-D4', 'Interfaces', 'Explain how two modules interact, using a foundational CS concept from the project.', ['Name the two modules', 'Name the concept', 'Explain the interaction']),
      desc('CSD-D5', 'Alternatives', 'Compare the designed approach with one foundational alternative. Say which fits this design and why.', ['Name both approaches', 'Give one advantage and one limit', 'Choose using the design, not a later test result'])
    ]
  };

  const implementation = {
    mcq: [
      mcq('CS3-M1', 'Concept in code', 'Which foundational concept is applied by a documented implementation step?', ['A concept the foundation table does not connect to that step', 'The concept that step actually uses', 'A slide title', 'An out-of-scope feature'], 1, 'Match the implementation step to the concept it uses.'),
      mcq('CS3-M2', 'Algorithm correctness', 'Which statement best checks that an implemented algorithm does what the project requires?', ['It is correct because the file exists', 'It is correct when its steps produce the required result for the documented inputs', 'It is correct because testing is skipped', 'It is correct because the title is technical'], 1, 'Correctness means the steps produce the required result.'),
      mcq('CS3-M3', 'Structure correctness', 'Which data-structure mistake would make a documented operation wrong?', ['Storing the data the operation needs', 'Using a structure that cannot support the required lookup or update', 'Citing the foundation course', 'Keeping an excluded feature out of the build'], 1, 'A wrong structure cannot support the required lookup or update.'),
      mcq('CS3-M4', 'Integration', 'Which foundational mechanism best explains a documented integration point?', ['The mechanism that carries data or control across that point', 'A mechanism from an unrelated course', 'A font choice', 'A result that exists only in a future stage'], 0, 'Integration is explained by the mechanism that crosses the boundary between parts.'),
      mcq('CS3-M5', 'Debugging limit', 'Which limitation should be considered while debugging this implementation?', ['A limit of the concept or structure the code uses', 'A guarantee that the code cannot fail', 'A course that is not in the foundation table', 'A requirement the scope removed'], 0, 'Debug against a real limit of the concept in use.')
    ],
    descriptive: [
      desc('CS3-D1', 'Concept in implementation', 'Explain how one implemented part applies a foundation-course concept.', ['Name the implemented part', 'Name the course and concept', 'Explain the application']),
      desc('CS3-D2', 'Algorithm walk-through', 'Walk through one implemented algorithm and state what must be true when it finishes.', ['Name the algorithm', 'State the main steps', 'State the finishing condition']),
      desc('CS3-D3', 'Structure correctness', 'Explain how a data structure in the implementation keeps one operation correct.', ['Name the structure', 'Name the operation', 'Explain the correctness condition']),
      desc('CS3-D4', 'Integration', 'Explain how two implemented parts work together through a foundational mechanism.', ['Name the two parts', 'Name the mechanism', 'Explain what crosses between them']),
      desc('CS3-D5', 'Defect or limit', 'Describe one debugging or correctness limit of the implementation and how it relates to a CS concept.', ['Name the limit', 'Name the concept', 'Explain the effect on the result'])
    ]
  };

  const testing = {
    mcq: [
      mcq('CS4-M1', 'Correctness evidence', 'Which test or result best shows that a foundational behavior is correct?', ['A check that observes the result that behavior promises', 'A check of an unrelated label', 'A note that the team worked hard', 'A feature placed out of scope'], 0, 'The useful test observes the promised result.'),
      mcq('CS4-M2', 'Edge case', 'Which edge case should be considered for a documented foundational operation?', ['An input the operation must still handle correctly', 'An input the scope says will never occur and need not be handled', 'A cover-page typo', 'A course that is not documented'], 0, 'An edge case is an input the operation must still handle.'),
      mcq('CS4-M3', 'Complexity reading', 'Which reading of a reported cost is technically sound?', ['The cost grows in a way that matches the chosen scan, lookup, or structure', 'The cost is meaningless because every algorithm is constant time', 'The cost proves an excluded feature was built', 'The cost replaces the need for a correct result'], 0, 'Interpret cost using the chosen algorithm or structure.'),
      mcq('CS4-M4', 'Mechanism under test', 'Which foundational mechanism is a selected test actually exercising?', ['The mechanism whose behavior the test observes', 'A mechanism the test never touches', 'The project title alone', 'A later feature that is not in this stage'], 0, 'Name the mechanism the test observes.'),
      mcq('CS4-M5', 'Validation alternatives', 'Which statement correctly compares two ways to validate the same concept?', ['They can check different failures even when both target the same concept', 'They are identical if they share a heading', 'Only a screenshot can validate a concept', 'Validation does not need an expected result'], 0, 'Two checks can expose different failures of the same concept.')
    ],
    descriptive: [
      desc('CS4-D1', 'Correctness', 'Explain how one documented test shows that a foundational behavior is correct.', ['Name the test', 'Name the concept or behavior', 'State the expected result']),
      desc('CS4-D2', 'Edge case', 'Explain one edge case for a foundational operation and the result the tests should expect.', ['Name the operation', 'Name the edge case', 'State the expected result']),
      desc('CS4-D3', 'Performance', 'Interpret one reported cost or limit using the complexity of the approach under test.', ['Name the measurement or limit', 'Name the approach', 'Explain what the cost implies']),
      desc('CS4-D4', 'Coverage', 'Explain whether the tests cover one foundational behavior, and what is still missing if they do not.', ['Name the behavior', 'Name the tests that cover it', 'State a gap or explain why coverage is enough']),
      desc('CS4-D5', 'Two checks', 'Compare two ways this project could validate the same concept. Say what each one can and cannot show.', ['Name the concept', 'Describe two checks', 'State a strength and a blind spot of each'])
    ]
  };

  root.FOUNDATIONAL_CS_KNOWLEDGE = {
    persona: 'Foundational CS Knowledge',
    laterBank: {
      'system-design': design,
      '2': implementation,
      '3': testing
    }
  };
})(typeof window !== 'undefined' ? window : this);
