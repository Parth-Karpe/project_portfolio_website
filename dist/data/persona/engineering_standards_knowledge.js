(function(root){
  const ENGINEERING_STANDARDS_KNOWLEDGE = {
    dimension: 'Engineering Standards',
    tagline: 'Check the quality targets and how the project says they are verified.',
    description: 'Evaluates software engineering specification rigor, IEEE/ISO standards compliance, requirement testability, measurable benchmarks, and bidirectional traceability.',

    // Software Engineering Standards and Rigorous Principles
    coreConcepts: {
      ieeeRequirementsStandards: {
        standard: 'IEEE 830 / ISO/IEC/IEEE 29148 Software Requirements Specification (SRS)',
        characteristics: [
          'Unambiguous: Exactly one semantic interpretation for both developers and evaluators.',
          'Atomic: Contains one specific user action and one observable system response.',
          'Testable & Verifiable: Capable of being definitively verified via inspection, test, or demonstration.',
          'Complete & Consistent: Does not contradict other requirements or leave undefined corner cases.',
          'Prioritized: Clear ranking of Core vs. Secondary requirements for delivery planning.'
        ]
      },
      measurableQualityBenchmarks: {
        standard: 'Quantifiable Non-Functional Performance & SLA Benchmarks',
        characteristics: [
          'Explicit Units of Measurement (ms latency, MB memory footprint, req/sec throughput).',
          'Statistical Percentiles (e.g. 95th percentile, average, worst-case bound under specified concurrent users).',
          'Strict Avoidance of Vague Slogans (e.g., rejecting "system should be user friendly" or "fast and secure").'
        ]
      },
      bidirectionalTraceability: {
        standard: 'Traceability Matrix (Need -> Objective -> FR -> TC)',
        characteristics: [
          'Forward Traceability: Ensuring every Stage 0 project objective has at least one corresponding FR in Stage 1.',
          'Backward Traceability: Ensuring every implemented FR can be justified by tracing back to an approved Stage 0 objective.',
          'Verification Traceability: Mapping every requirement to an explicit Test Case ID in the Acceptance Test Matrix.'
        ]
      },
      acceptanceVerification: {
        standard: 'Formal Acceptance Criteria & Test Suites (Table 1.3)',
        characteristics: [
          'Explicit Pass/Fail assertions for each requirement.',
          'Boundary condition checks (empty inputs, maximum payloads, invalid authorizations).',
          'Repeatable, automated or documented manual verification steps.'
        ]
      }
    },

    // Mapping from AI_MENTOR_DIMENSIONS_AND_MCQ_ARCHITECTURE.md
    stageSectionMappings: {
      '0': {
        stageName: 'Stage 0 - Problem Definition and Scope',
        chunkIds: ['stage0-objectives', 'table-0-4', 'table-0-5'],
        sections: [
          { key: 'objectives', label: 'Measurable Objectives', citation: '[Stage 0: Objectives]', focus: 'Clarity, specificity, and measurable targets' },
          { key: 'scope', label: 'Scope Discipline (Table 0.4)', citation: '[Table 0.4]', focus: 'Preventing scope creep with explicit In/Out boundary definitions' },
          { key: 'feasibility', label: 'Feasibility & Constraints (Table 0.5)', citation: '[Table 0.5]', focus: 'Risk mitigation, resource limits, and viability checks' }
        ]
      },
      '1': {
        stageName: 'Stage 1 - Requirement Analysis',
        chunkIds: ['fr-', 'nfr-', 'table-use-cases', 'table-testsuite'],
        sections: [
          { key: 'fr', label: 'Functional Requirements', citation: '[FR-xx]', focus: 'IEEE syntactic clarity, atomicity, priority, and source need traceability' },
          { key: 'nfr', label: 'Non-Functional Requirements', citation: '[NFR-xx]', focus: 'Verifiable benchmarks, explicit metrics, and SLA conditions' },
          { key: 'usecases', label: 'Use Case Rigor', citation: '[Use Cases]', focus: 'Actor preconditions, main flow consistency, and exception handling' },
          { key: 'testsuite', label: 'Acceptance Test Suite (Table 1.3)', citation: '[Table 1.3: Test Matrix]', focus: 'Mapping TC-xx IDs to requirements and pass/fail criteria' }
        ]
      },
      '3': {
        stageName: 'Stage 4 - Testing and Validations',
        chunkIds: ['table-testsuite'],
        sections: [
          { key: 'test-evidence', label: 'Test Execution & Verification', citation: '[Table 1.3: Test Matrix]', focus: 'Execution logs, edge case testing, and verification against acceptance criteria' }
        ]
      }
    },

    extractEvidence: function(kb, stage){
      if(!kb || !kb.chunks) return '';
      const stageKey = String(stage || '0');
      const mapping = this.stageSectionMappings[stageKey];
      if(!mapping) return '';

      const lines = [];
      mapping.sections.forEach(sec => {
        const matchingChunks = kb.chunks.filter(c => {
          if(c.id === sec.key || c.id.startsWith(sec.key)) return true;
          if(sec.key === 'objectives' && c.id === 'stage0-objectives') return true;
          if(sec.key === 'scope' && c.id === 'table-0-4') return true;
          if(sec.key === 'feasibility' && c.id === 'table-0-5') return true;
          if(sec.key === 'fr' && c.id.startsWith('fr-')) return true;
          if(sec.key === 'nfr' && c.id.startsWith('nfr-')) return true;
          if(sec.key === 'usecases' && c.id === 'table-use-cases') return true;
          if(sec.key === 'testsuite' && c.id === 'table-testsuite') return true;
          return false;
        });
        if(matchingChunks.length){
          lines.push(`=== ${sec.label} (${sec.citation}) ===`);
          matchingChunks.forEach(c => lines.push(c.text));
        }
      });
      return lines.join('\n\n');
    }
  };

  if(typeof module !== 'undefined' && module.exports) module.exports = ENGINEERING_STANDARDS_KNOWLEDGE;
  if(typeof window !== "undefined") window.ENGINEERING_STANDARDS_KNOWLEDGE = ENGINEERING_STANDARDS_KNOWLEDGE;
  if(typeof global !== "undefined") global.ENGINEERING_STANDARDS_KNOWLEDGE = ENGINEERING_STANDARDS_KNOWLEDGE;
})(typeof window !== 'undefined' ? window : global);
