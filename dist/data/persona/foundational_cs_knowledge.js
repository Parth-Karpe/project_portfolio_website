(function(root){
  const FOUNDATIONAL_CS_KNOWLEDGE = {
    dimension: 'Core CS Knowledge',
    tagline: 'Connect a course idea to this project.',
    description: 'Evaluates the application of core computer science curriculum subjects (Data Structures, Algorithms, Operating Systems, DBMS, Computer Networks, Compilers) to project design and implementation.',
    
    // Core curriculum domains and theoretical concepts
    coreConcepts: {
      dataStructuresAndAlgorithms: {
        subject: 'Data Structures and Algorithms (DSA)',
        concepts: [
          'Hash Tables & Associative Arrays (O(1) average lookup, collision resolution)',
          'Trees & Balanced Search Trees (B-Tree, B+ Tree, AVL, BST for indexed queries)',
          'Priority Queues & Binary Heaps (O(log N) min/max scheduling and dispatch)',
          'Graphs & Directed Acyclic Graphs (DAGs for task scheduling and dependency resolution)',
          'Asymptotic Complexity (Big-O time and space trade-offs)'
        ]
      },
      operatingSystems: {
        subject: 'Operating Systems (OS)',
        concepts: [
          'Process Management & Concurrency (Processes, Threads, Thread Pools)',
          'Synchronization Primitives (Mutexes, Semaphores, Spinlocks, Condition Variables)',
          'Concurrency Hazards (Race Conditions, Deadlocks, Starvation, Priority Inversion)',
          'Memory Management (Virtual Memory, Buffer Cache, Paging, Memory Leaks)',
          'Inter-Process Communication (IPC, Named Pipes, Shared Memory, Message Queues)'
        ]
      },
      databaseManagement: {
        subject: 'Database Management Systems (DBMS)',
        concepts: [
          'ACID Transaction Properties (Atomicity, Consistency, Isolation, Durability)',
          'Transaction Isolation Levels (Read Committed, Repeatable Read, Serializable)',
          'Indexing & Storage Layout (Clustered vs. Secondary Indexes, WAL Write-Ahead Logs)',
          'Normalization & Relational Schema Design (1NF, 2NF, 3NF, BCNF)',
          'Query Execution & Join Optimization'
        ]
      },
      computerNetworks: {
        subject: 'Computer Networks (CN)',
        concepts: [
          'Transport Layer Protocols (TCP stream reliability vs. UDP low-latency datagrams)',
          'Socket Programming & Connection Lifecycles (TCP handshakes, socket buffers)',
          'Application Protocols (HTTP/1.1 persistent connections, HTTP/2 multiplexing, WebSockets)',
          'Flow & Congestion Control (Sliding window, backpressure, retries with exponential backoff)'
        ]
      }
    },

    // Mapping from AI_MENTOR_DIMENSIONS_AND_MCQ_ARCHITECTURE.md
    stageSectionMappings: {
      '0': {
        stageName: 'Stage 0 - Problem Definition and Scope',
        chunkIds: ['table-0-1', 'table-0-3', 'engine-'],
        sections: [
          { key: 'courses', label: 'Foundation Courses (Table 0.1)', citation: '[Table 0.1]', focus: 'Explicit mapping of college courses to project mechanisms' },
          { key: 'engines', label: 'Workflow Engines (Table 0.3)', citation: '[Table 0.3]', focus: 'Core computational primitives powering each engine' }
        ]
      },
      '1': {
        stageName: 'Stage 1 - Requirement Analysis',
        chunkIds: ['fr-', 'nfr-'],
        sections: [
          { key: 'fr', label: 'Functional Requirements', citation: '[FR-xx]', focus: 'Data structure and algorithmic selection to satisfy functional capabilities' },
          { key: 'nfr', label: 'Non-Functional Requirements', citation: '[NFR-xx]', focus: 'OS, DBMS, and Network primitives required to meet quality targets' }
        ]
      },
      'system-design': {
        stageName: 'Stage 2 - System Design',
        chunkIds: ['stage2-data-design', 'stage2-algorithm'],
        sections: [
          { key: 'data-design', label: 'Data Design & Schema', citation: '[Data Design]', focus: 'Relational entities, schemas, storage formats, caching' },
          { key: 'algorithm-design', label: 'Algorithm Design', citation: '[Algorithm Design]', focus: 'Algorithm logic, time/space complexity, synchronization' }
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
          if(sec.key === 'courses' && c.id === 'table-0-1') return true;
          if(sec.key === 'engines' && c.id.startsWith('engine-')) return true;
          if(sec.key === 'fr' && c.id.startsWith('fr-')) return true;
          if(sec.key === 'nfr' && c.id.startsWith('nfr-')) return true;
          if(sec.key === 'data-design' && c.id === 'stage2-data-design') return true;
          if(sec.key === 'algorithm-design' && c.id === 'stage2-algorithm') return true;
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

  if(typeof module !== 'undefined' && module.exports) module.exports = FOUNDATIONAL_CS_KNOWLEDGE;
  if(typeof window !== "undefined") window.FOUNDATIONAL_CS_KNOWLEDGE = FOUNDATIONAL_CS_KNOWLEDGE;
  if(typeof global !== "undefined") global.FOUNDATIONAL_CS_KNOWLEDGE = FOUNDATIONAL_CS_KNOWLEDGE;
})(typeof window !== 'undefined' ? window : global);
