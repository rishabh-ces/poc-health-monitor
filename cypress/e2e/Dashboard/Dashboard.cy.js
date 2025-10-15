describe('Dashboard Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/devices*', {
      statusCode: 200,
      body: [
        {
          id: 'device-001',
          name: 'Factory Sensor A',
          location: 'Line 1',
          status: 'online',
          battery: 90,
          temperature: 25,
          signalStrength: 'good',
          lastUpdated: new Date().toISOString(),
        },
        {
          id: 'device-002',
          name: 'Factory Sensor B',
          location: 'Line 2',
          status: 'offline',
          battery: 70,
          temperature: 22,
          signalStrength: 'poor',
          lastUpdated: new Date().toISOString(),
        },
      ],
    }).as('getDevices')

    cy.visit('/')
    cy.wait('@getDevices') // wait for mock API to resolve
  })

  it('renders the dashboard title and subtitle', () => {
    cy.contains('IoT Devices Health Monitor').should('be.visible')
    cy.contains('Real-time status and telemetry').should('be.visible')
  })

  it('navigates to device detail when a device is clicked', () => {
    // Wait for the device cards to appear
    cy.get('[data-testid^="device-card-"]', { timeout: 15000 })
      .should('have.length.at.least', 1)
      .first()
      .click()

    cy.url().should('include', '/devices/')
    cy.get('h2').should('exist')
  })
})
