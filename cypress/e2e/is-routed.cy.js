import {
  stringTag,
  fibonacciTag,
  sortingTag,
  stackTag,
  queueTag,
  listTag,
} from "../constants/constants";

describe("service is available", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("should open mail page by default", function () {
    cy.contains("АЛГОСОШ");
    cy.wait(1000);
  });

  it("should open string page after recursion link click", function () {
    cy.get(stringTag).click();
    cy.contains("Строка");
  });

  it("should open fibonacci page after fibonacci link click", function () {
    cy.get(fibonacciTag).click();
    cy.contains("Фибоначчи");
  });

  it("should open sorting page after sorting link click", function () {
    cy.get(sortingTag).click();
    cy.contains("Сортировка");
  });

  it("should open stack page after stack link click", function () {
    cy.get(stackTag).click();
    cy.contains("Стек");
  });

  it("should open queue page after queue link click", function () {
    cy.get(queueTag).click();
    cy.contains("Очередь");
  });

  it("should open list page after list link click", function () {
    cy.get(listTag).click();
    cy.contains("Связный список");
  });
});
