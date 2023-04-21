import {
  CIRCLE,
  CIRCLE_CONTENT,
  CIRCLE_DEFAULT_COLOR,
  INPUT_INDEX,
  INPUT_TEXT
} from "../constants/const";

/* eslint-disable cypress/no-unnecessary-waiting */
describe('Тестирование страницы "Связный список"', function () {
  beforeEach(() => {
    cy.visit('list');
    cy.get(CIRCLE).its("length").as("size");
  })

  it('Eсли в инпуте пусто, то кнопки добавления и удаления недоступны', function () {
    cy.get(INPUT_TEXT).should('have.value', '')
    cy.get(INPUT_INDEX).should('have.value', '')
    cy.contains('Добавить в head').should('be.disabled')
    cy.contains('Добавить в tail').should('be.disabled')
    cy.contains('Добавить по индексу').should('be.disabled')
    cy.contains('Удалить по индексу').should('be.disabled')
  });

  it('Дефолтная отрисовка списка', function () {
    cy.get(CIRCLE_CONTENT).as('circle-content')
    cy.get(CIRCLE).as('circle')

    cy.get('@circle-content').first().contains('head')
    cy.get('@circle').should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
    cy.get('@circle-content').last().contains('tail')
  })

  it('Добавление элемента в head', function () {
    cy.get('button').contains('Добавить в head').as('button-head')
    cy.get(INPUT_TEXT).as('input')
    cy.get(CIRCLE_CONTENT).as('circle-content')
    cy.get(CIRCLE).as('circle')

    cy.get("@input").type('23')
    cy.get("@input").should('have.value', '23')
    cy.get('@button-head').click()

    cy.wait(2000)
    cy.get('@circle').first().contains('23')
    cy.get('@circle-content').first().contains('head')
  })

  it('Добавление элемента в tail', function () {
    cy.get('button').contains('Добавить в tail').as('button-tail')
    cy.get(INPUT_TEXT).as('input')
    cy.get(CIRCLE_CONTENT).as('circle-content')
    cy.get(CIRCLE).as('circle')

    cy.get("@input").type('11')
    cy.get("@input").should('have.value', '11')
    cy.get('@button-tail').click()

    cy.wait(2000)
    cy.get('@circle').last().contains('11')
    cy.get('@circle-content').last().contains('tail')
  })

  it('Добавление элемента по индексу', function () {
    cy.get('button').contains('Добавить по индексу').as('button-index')
    cy.get(INPUT_TEXT).as('input')
    cy.get(INPUT_INDEX).as('input-index')
    cy.get(CIRCLE_CONTENT).as('circle-content')
    cy.get(CIRCLE).as('circle')

    cy.get("@input").type('33')
    cy.get("@input").should('have.value', '33')
    cy.get("@input-index").type('3')
    cy.get("@input-index").should('have.value', '3')
    cy.get('@button-index').click()

    cy.wait(3000)
    cy.get('@circle').eq(3).contains('33')
  })

  it('Удаление элемента из head', function () {
    cy.get('button').contains('Удалить из head').as('button-del-head')
    cy.get(CIRCLE_CONTENT).as('circle-content')
    cy.get(CIRCLE).as('circle')

    cy.get('@circle').should('have.length', this.size)
    cy.get('@circle-content').first().contains('head')
    cy.get('@button-del-head').click()
    cy.wait(2000)
    cy.get('@circle').should('have.length', this.size - 1)
    cy.get('@circle-content').first().contains('head')
  })

  it('Удаление элемента из tail', function () {
    cy.get('button').contains('Удалить из tail').as('button-del-tail')
    cy.get(CIRCLE_CONTENT).as('circle-content')
    cy.get(CIRCLE).as('circle')

    cy.get('@circle').should('have.length', this.size)
    cy.get('@circle-content').last().contains('tail')
    cy.get('@button-del-tail').click()
    cy.wait(2000)
    cy.get('@circle').should('have.length', this.size - 1)
    cy.get('@circle-content').last().contains('tail')
  })

  it('Удаление элемента по индексу', function () {
    cy.get('button').contains('Удалить по индексу').as('button-del-index')
    cy.get(INPUT_INDEX).as('input-index')
    cy.get(CIRCLE_CONTENT).as('circle-content')
    cy.get(CIRCLE).as('circle')

    cy.get('@circle').should('have.length', this.size)
    cy.get('@circle-content').first().contains('head')
    cy.get('@circle-content').last().contains('tail')
    cy.get('@input-index').type(2)
    cy.get('@button-del-index').click()
    cy.wait(2000)
    cy.get('@circle').should('have.length', this.size - 1)
    cy.get('@circle-content').first().contains('head')
    cy.get('@circle-content').last().contains('tail')
  })
});