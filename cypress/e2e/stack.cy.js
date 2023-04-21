import {
  CIRCLE,
  CIRCLE_CHANGING_COLOR,
  CIRCLE_DEFAULT_COLOR
} from "../constants/const";

describe('Тестирование страницы "Стек"', function () {
  beforeEach(() => {
    cy.visit('stack');
  })

  it('Eсли в инпуте пусто, то кнопка добавления недоступна', function () {
    cy.get('input').should('have.value', '')
    cy.contains('Добавить').should('be.disabled')
  });

  it('Добавление и удаление элемента из стека', function () {
    cy.get('button').contains('Добавить').as('button')

    cy.get('input').type(6)
    cy.get('input').should('have.value', 6)
    cy.get('@button').click()

    cy.get(CIRCLE).as('circle')

    cy.get('@circle').should('have.css', 'border', CIRCLE_CHANGING_COLOR)
    cy.get('@circle').should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
    cy.get('@circle').should('contain', 6)

    cy.get('button').contains('Удалить').click()
    cy.get('@circle').should('have.length', 0);
  })

  it('Очистка стека', function () {
    cy.get('button').contains('Добавить').as('button')

    cy.get('input').type(6)
    cy.get('input').should('have.value', 6)
    cy.get('@button').click()

    cy.get('input').type(12)
    cy.get('input').should('have.value', 12)
    cy.get('@button').click()

    cy.get('input').type(23)
    cy.get('input').should('have.value', 23)
    cy.get('@button').click()

    cy.get(CIRCLE).as('circle')

    cy.get('input').should('have.value', '')
    cy.get('button').contains('Очистить').click()
    cy.get('@circle').should('have.length', 0);
  })
});