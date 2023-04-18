describe('Тестирование переходов по страницам', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('Переход на страницу "Cтрока" по адресу http://localhost:3000/recursion', function () {
    cy.get('a[href*="/recursion"]').click()
    cy.contains('Строка')
  });

  it('Переход на страницу "Последовательность Фибоначчи" по адресу http://localhost:3000/fibonacci', function () {
    cy.get('a[href*="/fibonacci"]').click()
    cy.contains('Последовательность Фибоначчи')
  });

  it('Переход на страницу "Сортировка массива" по адресу http://localhost:3000/sorting', function () {
    cy.get('a[href*="/sorting"]').click()
    cy.contains('Сортировка массива')
  });

  it('Переход на страницу "Стек" по адресу http://localhost:3000/stack', function () {
    cy.get('a[href*="/stack"]').click()
    cy.contains('Стек')
  });

  it('Переход на страницу "Очередь" по адресу http://localhost:3000/queue', function () {
    cy.get('a[href*="/queue"]').click()
    cy.contains('Очередь')
  });

  it('Переход на страницу "Связный список" по адресу http://localhost:3000/list', function () {
    cy.get('a[href*="/list"]').click()
    cy.contains('Связный список')
  });
});