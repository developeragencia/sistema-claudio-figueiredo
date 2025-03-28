import '@testing-library/jest-dom'

// Configurações globais de teste podem ser adicionadas aqui
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  }
} 