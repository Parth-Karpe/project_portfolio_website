(function(root){
  const THEME_KNOWLEDGE_RULES = {
    dimension: 'Theme Knowledge',
    questionFramingRules: {
      intent: 'Frame questions on specialization-theme technical knowledge tied to team-meta, engines, Table 0.3, and scope — not documentation quality or generic NFR traceability.',
      constraints: [
        'Anchor stems in the team specialization theme and documented engines.',
        'Ask about domain principles, technologies, trade-offs, and limitations.',
        'Use byTheme profiles when the theme maps to storage, concurrent, network, or algorithm patterns.',
        'Distractors must be plausible domain alternatives, not roster or formatting noise.'
      ]
    },
    stageTemplates: {}
  };
  if(typeof module !== 'undefined' && module.exports) module.exports = { THEME_KNOWLEDGE_RULES };
  else root.THEME_KNOWLEDGE_RULES = THEME_KNOWLEDGE_RULES;
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
