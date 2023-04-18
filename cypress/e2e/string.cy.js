import {
  CIRCLE,
  CIRCLE_MODIFIED_COLOR
} from "../constants/const";

describe('Тестирование страницы "Строка"', function () {
  beforeEach(() => {
    cy.visit('recursion');
  })

  it('Eсли в инпуте пусто, то кнопка добавления недоступна', function () {
    cy.get('input').should('have.value', '')
    cy.contains('Развернуть').should('be.disabled')
  });

  it('Cтрока разворачивается корректно', function () {
    cy.get('input').type('тест')
    cy.get('input').should('have.value', 'тест')
    cy.get('button').contains('Развернуть').click()

    cy.get(CIRCLE).as('circle')

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
          cy.wrap($circle).should('have.css', 'border', CIRCLE_MODIFIED_COLOR).contains('т');
          break;
        case 3:
          cy.wrap($circle).should('have.css', 'border', CIRCLE_MODIFIED_COLOR).contains('т');
          break;
        default:
          return;
      }
    })

    cy.get('@circle').each(($circle, index) => {
      switch (index) {
        case 1:
          cy.wrap($circle).should('have.css', 'border', CIRCLE_MODIFIED_COLOR).contains('с');
          break;
        case 2:
          cy.wrap($circle).should('have.css', 'border', CIRCLE_MODIFIED_COLOR).contains('е');
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