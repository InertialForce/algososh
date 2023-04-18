describe('Тестирование страницы "Последовательность Фибоначчи"', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000/fibonacci');
  })

  it('Eсли в инпуте пусто, то кнопка добавления недоступна', function () {
    cy.get('input').should('have.value', '')
    cy.contains('Рассчитать').should('be.disabled')
  });

  it('Последовательность Фибоначчи генерируются корректно', function () {
    cy.get('input').type(6)
    cy.get('input').should('have.value', 6)
    cy.get('button').contains('Рассчитать').click()

    cy.get('[class*=circle_circle]').as('circle')

    cy.get('@circle').should('have.length', 7).each(($circle, index) => {
      switch (index) {
        case 0:
          cy.wrap($circle).contains('1');
          break;
        case 1:
          cy.wrap($circle).contains('1');
          break;
        case 2:
          cy.wrap($circle).contains('2');
          break;
        case 3:
          cy.wrap($circle).contains('3');
          break;
        case 4:
          cy.wrap($circle).contains('5');
          break;
        case 5:
          cy.wrap($circle).contains('8');
          break;
        case 6:
          cy.wrap($circle).contains('13');
          break;
        default:
          return;
      }
    })
  });
});