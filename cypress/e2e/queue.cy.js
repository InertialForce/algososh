import {
  CIRCLE,
  CIRCLE_CHANGING_COLOR,
  CIRCLE_CONTENT,
  CIRCLE_DEFAULT_COLOR
} from "../constants/const";

describe('Тестирование страницы "Очередь"', function () {
  beforeEach(() => {
    cy.visit('queue');
  })

  it('Eсли в инпуте пусто, то кнопка добавления недоступна', function () {
    cy.get('input').should('have.value', '')
    cy.contains('Добавить').should('be.disabled')
  });

  it('Добавление и удаление элемента из очереди', function () {
    cy.get('button').contains('Добавить').as('button')

    cy.get('input').type('t1')
    cy.get('input').should('have.value', 't1')
    cy.get('@button').click();

    cy.get(CIRCLE).as('circle')
    cy.get(CIRCLE_CONTENT).as('circle-content')

    cy.get('@circle-content').should('have.length', 7).each(($circle_content, index) => {
      switch (index) {
        case 0:
          cy.get('@circle').eq(0).should('have.css', 'border', CIRCLE_CHANGING_COLOR)
          cy.wrap($circle_content).contains('t1');
          cy.wrap($circle_content).contains('head');
          cy.wrap($circle_content).contains('tail');
          cy.get('@circle').eq(0).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        default:
          return;
      }
    })

    cy.get('input').type('t2')
    cy.get('input').should('have.value', 't2')
    cy.get('@button').click();

    cy.get('@circle-content').should('have.length', 7).each(($circle_content, index) => {
      switch (index) {
        case 0:
          cy.wrap($circle_content).contains('t1');
          cy.wrap($circle_content).contains('head');
          cy.get('@circle').eq(0).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        case 1:
          cy.get('@circle').eq(1).should('have.css', 'border', CIRCLE_CHANGING_COLOR)
          cy.wrap($circle_content).contains('t2');
          cy.wrap($circle_content).contains('tail');
          cy.get('@circle').eq(1).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        default:
          return;
      }
    })

    cy.get('input').type('t3')
    cy.get('input').should('have.value', 't3')
    cy.get('@button').click();

    cy.get('@circle-content').should('have.length', 7).each(($circle_content, index) => {
      switch (index) {
        case 0:
          cy.wrap($circle_content).contains('t1');
          cy.wrap($circle_content).contains('head');
          cy.get('@circle').eq(0).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        case 1:
          cy.wrap($circle_content).contains('t2');
          cy.get('@circle').eq(1).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        case 2:
          cy.get('@circle').eq(2).should('have.css', 'border', CIRCLE_CHANGING_COLOR)
          cy.wrap($circle_content).contains('t3');
          cy.wrap($circle_content).contains('tail');
          cy.get('@circle').eq(2).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        default:
          return;
      }
    })

    cy.get('button').contains('Удалить').click()
    cy.get('@circle-content').should('have.length', 7).each(($circle_content, index) => {
      switch (index) {
        case 0:
          cy.get('@circle').eq(0).should('have.css', 'border', CIRCLE_CHANGING_COLOR)
          cy.get('@circle').eq(0).should('have.text', '')
          cy.get('@circle').eq(0).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        case 1:
          cy.wrap($circle_content).contains('t2');
          cy.wrap($circle_content).contains('head');
          cy.get('@circle').eq(1).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        case 2:
          cy.wrap($circle_content).contains('t3');
          cy.wrap($circle_content).contains('tail');
          cy.get('@circle').eq(2).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        default:
          return;
      }
    })

    cy.get('button').contains('Удалить').click()
    cy.get('@circle-content').should('have.length', 7).each(($circle_content, index) => {
      switch (index) {
        case 0:
          cy.get('@circle').eq(0).should('have.text', '')
          cy.get('@circle').eq(0).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        case 1:
          cy.get('@circle').eq(1).should('have.css', 'border', CIRCLE_CHANGING_COLOR)
          cy.wrap($circle_content).contains('t2');
          cy.get('@circle').eq(1).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        case 2:
          cy.wrap($circle_content).contains('t3');
          cy.wrap($circle_content).contains('head');
          cy.wrap($circle_content).contains('tail');
          cy.get('@circle').eq(2).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        default:
          return;
      }
    })
  })

  it('Очистка очереди', function () {
    cy.get('button').contains('Добавить').as('button')

    cy.get('input').type('t1')
    cy.get('input').should('have.value', 't1')
    cy.get('@button').click();

    cy.get(CIRCLE).as('circle')
    cy.get(CIRCLE_CONTENT).as('circle-content')

    cy.get('@circle-content').should('have.length', 7).each(($circle_content, index) => {
      switch (index) {
        case 0:
          cy.get('@circle').eq(0).should('have.css', 'border', CIRCLE_CHANGING_COLOR)
          cy.wrap($circle_content).contains('t1');
          cy.wrap($circle_content).contains('head');
          cy.wrap($circle_content).contains('tail');
          cy.get('@circle').eq(0).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        default:
          return;
      }
    })

    cy.get('input').type('t2')
    cy.get('input').should('have.value', 't2')
    cy.get('@button').click();

    cy.get('@circle-content').should('have.length', 7).each(($circle_content, index) => {
      switch (index) {
        case 0:
          cy.wrap($circle_content).contains('t1');
          cy.wrap($circle_content).contains('head');
          cy.get('@circle').eq(0).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        case 1:
          cy.get('@circle').eq(1).should('have.css', 'border', CIRCLE_CHANGING_COLOR)
          cy.wrap($circle_content).contains('t2');
          cy.wrap($circle_content).contains('tail');
          cy.get('@circle').eq(1).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        default:
          return;
      }
    })

    cy.get('input').type('t3')
    cy.get('input').should('have.value', 't3')
    cy.get('@button').click();

    cy.get('@circle-content').should('have.length', 7).each(($circle_content, index) => {
      switch (index) {
        case 0:
          cy.wrap($circle_content).contains('t1');
          cy.wrap($circle_content).contains('head');
          cy.get('@circle').eq(0).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        case 1:
          cy.wrap($circle_content).contains('t2');
          cy.get('@circle').eq(1).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        case 2:
          cy.get('@circle').eq(2).should('have.css', 'border', CIRCLE_CHANGING_COLOR)
          cy.wrap($circle_content).contains('t3');
          cy.wrap($circle_content).contains('tail');
          cy.get('@circle').eq(2).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        default:
          return;
      }
    })

    cy.get('button').contains('Очистить').click()
    cy.get('[class*=circle_head]').as('head')
    cy.get('[class*=circle_tail]').as('tail')
    cy.get('@circle').should('have.length', 7).each(($circle, index) => {
      switch (index) {
        case 0:
          cy.get('@head').should('have.text', '')
          cy.get('@tail').should('have.text', '')
          cy.wrap($circle).should('have.text', '')
          cy.wrap($circle).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        case 1:
          cy.get('@head').should('have.text', '')
          cy.get('@tail').should('have.text', '')
          cy.wrap($circle).should('have.text', '')
          cy.wrap($circle).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        case 2:
          cy.get('@head').should('have.text', '')
          cy.get('@tail').should('have.text', '')
          cy.wrap($circle).should('have.text', '')
          cy.wrap($circle).should('have.css', 'border', CIRCLE_DEFAULT_COLOR)
          break;
        default:
          return;
      }
    })
  })
});