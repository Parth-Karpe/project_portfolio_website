(function(root){
  const SYSTEMS_THINKING_KNOWLEDGE = {
    dimension: 'Systems Thinking',
    tagline: 'Explain how the need, the boundary, and the flow fit together.',
    description: 'Evaluates the project as an integrated ecosystem of interconnected components, data flows, operational boundaries, and dependency chains.',
    
    // Core theoretical concepts governing Systems Thinking in software engineering
    coreConcepts: {
      systemBoundaries: {
        concept: 'System Perimeter & Scope Control',
        description: 'Differentiating in-scope deliverables from out-of-scope external exclusions to establish clear operational boundaries and prevent scope expansion.',
        keyReferences: ['Table 0.4 Scope Boundaries', 'In-Scope Deliverables', 'Out-of-Scope Exclusions']
      },
      pipelineFlow: {
        concept: 'End-to-End Pipeline Transformations',
        description: 'Sequential lifecycle of data and control passing through discrete transformation engines from actor input to verified system output.',
        keyReferences: ['Table 0.2 Conceptual Pipeline Flow', 'Table 0.3 Conceptual Workflow Engines', 'Figure 0.2 AS-IS Workflow']
      },
      componentDependencies: {
        concept: 'Inter-Requirement Dependency Chains',
        description: 'Structural and data dependencies where a downstream functional requirement strictly requires the successful output of an upstream requirement.',
        keyReferences: ['Stage 1 Functional Requirements', 'FR Dependencies', 'Producer-Consumer Relationships']
      },
      crossCuttingQuality: {
        concept: 'Cross-Cutting Non-Functional Influence',
        description: 'How non-functional constraints (e.g., latency, throughput, concurrency, fault-tolerance) dictate and modify the interaction behavior across all functional subsystems.',
        keyReferences: ['Stage 1 Non-Functional Requirements', 'Quality Attribute Interactions']
      },
      failurePropagation: {
        concept: 'Failure Cascades & Exception Flow',
        description: 'Predicting how missing requirements, network drops, or resource starvation propagate failures across use cases and defining resilience boundaries.',
        keyReferences: ['Stage 1 Use Cases', 'Exception Flows', 'Alternative Paths']
      }
    },

    // Mapping from AI_MENTOR_DIMENSIONS_AND_MCQ_ARCHITECTURE.md
    stageSectionMappings: {
      '0': {
        stageName: 'Stage 0 - Problem Definition and Scope',
        chunkIds: ['stage0-problem', 'stage0-objectives', 'table-0-2', 'table-0-3', 'engine-', 'table-0-4', 'table-0-5', 'diag-asis'],
        sections: [
          { key: 'problem', label: 'Problem Statement & Friction', citation: '[Stage 0: Problem Statement]', focus: 'Stakeholder need and baseline friction' },
          { key: 'objectives', label: 'Project Objectives', citation: '[Stage 0: Objectives]', focus: 'System-level goals and expected outcomes' },
          { key: 'pipeline', label: 'Conceptual Pipeline Flow (Table 0.2)', citation: '[Table 0.2]', focus: 'Input -> Processing -> User Action -> Output' },
          { key: 'engines', label: 'Workflow Engines (Table 0.3)', citation: '[Table 0.3]', focus: 'Multi-engine data processing transitions' },
          { key: 'scope', label: 'Scope Boundaries (Table 0.4)', citation: '[Table 0.4]', focus: 'In-Scope deliverables vs. Out-of-Scope boundaries' },
          { key: 'feasibility', label: 'Feasibility Assessment (Table 0.5)', citation: '[Table 0.5]', focus: 'Resource, time, and architectural constraints' }
        ]
      },
      '1': {
        stageName: 'Stage 1 - Requirement Analysis',
        chunkIds: ['fr-', 'nfr-', 'table-use-cases', 'diag-usecase'],
        sections: [
          { key: 'fr', label: 'Functional Requirements', citation: '[FR-xx]', focus: 'Component capabilities and inter-requirement dependencies' },
          { key: 'nfr', label: 'Non-Functional Requirements', citation: '[NFR-xx]', focus: 'Quality targets influencing system behavior' },
          { key: 'usecases', label: 'Use Cases & Diagrams', citation: '[Use Cases]', focus: 'Actor boundary interactions, main flow, exception flows' }
        ]
      },
      'system-design': {
        stageName: 'Stage 2 - System Design',
        chunkIds: ['stage2-architecture'],
        sections: [
          { key: 'architecture', label: 'System Architecture', citation: '[Architecture]', focus: 'Tiered component layout and interface boundaries' }
        ]
      }
    },

    // Helper to extract grounded evidence text from a team knowledge base for this persona
    extractEvidence: function(kb, stage){
      if(!kb || !kb.chunks) return '';
      const stageKey = String(stage || '0');
      const mapping = this.stageSectionMappings[stageKey];
      if(!mapping) return '';
      
      const lines = [];
      mapping.sections.forEach(sec => {
        const matchingChunks = kb.chunks.filter(c => {
          if(c.id === sec.key || c.id.startsWith(sec.key)) return true;
          if(sec.key === 'engines' && c.id.startsWith('engine-')) return true;
          if(sec.key === 'fr' && c.id.startsWith('fr-')) return true;
          if(sec.key === 'nfr' && c.id.startsWith('nfr-')) return true;
          if(sec.key === 'usecases' && (c.id === 'table-use-cases' || c.id === 'diag-usecase')) return true;
          if(sec.key === 'pipeline' && c.id === 'table-0-2') return true;
          if(sec.key === 'scope' && c.id === 'table-0-4') return true;
          if(sec.key === 'feasibility' && c.id === 'table-0-5') return true;
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

  if(typeof module !== 'undefined' && module.exports) module.exports = SYSTEMS_THINKING_KNOWLEDGE;
  if(typeof window !== "undefined") window.SYSTEMS_THINKING_KNOWLEDGE = SYSTEMS_THINKING_KNOWLEDGE;
  if(typeof global !== "undefined") global.SYSTEMS_THINKING_KNOWLEDGE = SYSTEMS_THINKING_KNOWLEDGE;
})(typeof window !== 'undefined' ? window : global);
