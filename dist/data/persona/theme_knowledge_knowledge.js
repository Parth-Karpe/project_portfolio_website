(function(root){
  const THEME_KNOWLEDGE = {
    dimension: 'Theme Knowledge',
    tagline: 'Domain-specific concepts, technologies, and technical trade-offs.',
    description: 'Evaluates specialization-theme knowledge: domain principles, relevant technologies, alternatives, limitations, and how engines in the portfolio embody the theme.',
    profileHints: {
      storage: 'Indexing, persistence, query paths, B+ tree versus hash, transactional storage.',
      concurrent: 'Concurrency control, isolation, logging, rollback, scheduling under load.',
      algorithm: 'Optimization passes, complexity trade-offs, domain-specific algorithms.',
      network: 'Protocols, endpoints, distributed behavior, latency and reliability.',
      analytics: 'Profiling, pipelines, aggregation, anomaly handling.',
      tools: 'Compiler and tooling chains, build-time analysis, developer workflows.',
      general: 'Theme-stated technical approach in engines and scope.'
    }
  };
  if(typeof module !== 'undefined' && module.exports) module.exports = { THEME_KNOWLEDGE };
  else root.THEME_KNOWLEDGE = THEME_KNOWLEDGE;
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
