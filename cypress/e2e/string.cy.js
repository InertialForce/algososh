describe('Тестирование страницы "Строка"', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion');
  })

  it('Eсли в инпуте пусто, то кнопка добавления недоступна', function () {
    cy.get('input').should('have.value', '')
    cy.contains('Развернуть').should('be.disabled')
  });

  it('Cтрока разворачивается корректно', function () {
    cy.get('input').type('тест')
    cy.get('input').should('have.value', 'тест')
    cy.get('button').contains('Развернуть').click()

    cy.get('[class*=circle_circle]').as('circle')

    cy.get('@circle').should('have.length', 4).each(($circle, index) => {
      switch (index) {
        case 0:
          cy.wrap($circle).contains('т');
          break;
        case 1:
          cy.wrap($circle).contains('е');
          break;
        case 2:
          cy.wrap($circle).contains('с');
          break;
        case 3:
          cy.wrap($circle).contains('т');
          break;
        default:
          return;
      }
    })

    cy.get('@circle').each(($circle, index) => {
      switch (index) {
        case 0:
          cy.wrap($circle).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('т');
          break;
        case 3:
          cy.wrap($circle).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('т');
          break;
        default:
          return;
      }
    })

    cy.get('@circle').each(($circle, index) => {
      switch (index) {
        case 1:
          cy.wrap($circle).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('с');
          break;
        case 2:
          cy.wrap($circle).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('е');
          break;
        default:
          return;
      }
    })

    cy.get('@circle').should('have.length', 4).each(($circle, index) => {
      switch (index) {
        case 0:
          cy.wrap($circle).contains('т');
          break;
        case 1:
          cy.wrap($circle).contains('с');
          break;
        case 2:
          cy.wrap($circle).contains('е');
          break;
        case 3:
          cy.wrap($circle).contains('т');
          break;
        default:
          return;
      }
    })

  });
});