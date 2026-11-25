describe('Central de atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')    
  })

  it('verifica o título da aplicação', () => {
    
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {    
    const longText = Cypress._.repeat('Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', 20)
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('john.doe@example.com')
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.contains('button', 'Enviar').click()
    
    cy.get('.success').should('be.visible')
    
  })
  it("verificar mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('john.doe@example;com')
    cy.contains('button', 'Enviar').click()
    cy.get('#open-text-area').type('teste')

    cy.get('.error').should('be.visible')
  })
  it('verifica se campo telefone continua vazio quando preenchido com valor não numérico', () => { 
    cy.get('#phone')
    .type('abcde')
    .should('have.value', '')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('john.doe@example.com')
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
    .type('John')
    .should('have.value', 'John')
    .clear()
    .should('have.value', '')
    cy.get('#lastName')
    .type('Doe')
    .should('have.value', 'Doe')
    .clear()
    .should('have.value', '')
    cy.get('#email')
    .type('john.doe@example.com')
    .should('have.value', 'john.doe@example.com')
    .clear()
    .should('have.value', '')
    cy.get('#phone')
    .type('123456789')
    .should('have.value', '123456789')
    .clear()
    .should('have.value', '') 
  })
  it('exibe mensagem de erro ao submenter o formulário sem preencher os campos obrigatórios',() => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it.only('envia o formulário com sucesso usando um comando customizado', () => {

    cy.fillMandatoryFieldsAndSubmit()
    
    cy.get('.success').should('be.visible') 
  })

  })
  