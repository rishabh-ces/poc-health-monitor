/// <reference types="cypress" />

/**
 * cypress/support/e2e.ts
 *
 * Central support file loaded before your Cypress e2e tests.
 * - Import custom commands from ./commands.ts
 * - Add helpful test-library and accessibility helpers
 * - Add common global handlers (eg. uncaught exceptions)
 *
 * Tailor to your project's needs (remove imports you don't use).
 */

import './commands' // your custom Cypress commands (create this file if missing)
import '@testing-library/cypress/add-commands' // optional: DOM testing helpers
import 'cypress-axe' // optional: accessibility testing

// Prevent Cypress from failing tests on uncaught exceptions coming from
// third-party libs or application code you don't want to fail the test for.
// Return false to instruct Cypress to ignore the error.
// Adjust logging and behavior to your needs.
Cypress.on('uncaught:exception', (err) => {
  // Example: ignore specific error messages:
  // if (err.message && err.message.includes('ResizeObserver loop limit exceeded')) {
  //   return false
  // }
  // By default, return false to avoid flakiness from unrelated runtime errors.
  return false
})

// Optionally set a consistent viewport for tests that don't override it.
before(() => {
  // For consistent snapshots and layout-sensitive tests:
  // cy.viewport(1280, 720)
})

// Example helper to inject axe for accessibility checks in tests.
// Usage in a test:
// cy.injectAxe()
// cy.checkA11y()
// Cypress.Commands.add('initAxe', () => {
//   cy.injectAxe()
// })

// If you need to preserve cookies/localStorage between tests, you can set them here:
// beforeEach(() => {
//   Cypress.Cookies.preserveOnce('session_id')
// })

// You can also expose test helpers on the global window if needed.
// (Avoid over-using globals; prefer Cypress commands.)
export {}
