import { button, input, circle, fibonacciTag } from "../constants/constants";

describe("string is correct", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.get(fibonacciTag).click();
    cy.contains("Фибоначчи");
  });

  it("button is disabled when input is empty", function () {
    if (cy.get(input).should("have.value", "")) {
      cy.get(button).should("be.disabled");
    }
  });

  it("finds fibonacci correctly", function () {
    const array = [0, 1, 1, 2, 3, 5];
    cy.get(input).type("5").should("have.value", "5");
    cy.get(button).should("be.enabled").click();
    cy.get(button)
      .should("be.disabled")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contain("loader"));

    cy.wait(700);

    cy.get(circle).each((item, index) => {
      cy.get(item).contains(array[index]);
    });

    cy.wait(700);

    cy.get(circle).each((item, index) => {
      cy.get(item).contains(array[index]);
    });

    cy.wait(700);

    cy.get(circle).each((item, index) => {
      cy.get(item).contains(array[index]);
    });

    cy.wait(700);

    cy.get(circle).each((item, index) => {
      cy.get(item).contains(array[index]);
    });

    cy.wait(700);

    cy.get(circle).each((item, index) => {
      cy.get(item).contains(array[index]);
    });
  });

  it("cleans the value", function () {
    cy.get(input).should("have.value", "");
    cy.get(button).should("be.disabled");
  });
});
