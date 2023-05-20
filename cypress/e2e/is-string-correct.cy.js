import {
  button,
  input,
  defaultColor,
  changingColor,
  modifiedColor,
  circle,
  stringTag,
} from "../constants/constants";

describe("string is correct", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.get(stringTag).click();
    cy.contains("Строка");
  });

  it("button is disabled when input is empty", function () {
    if (cy.get(input).should("have.value", "")) {
      cy.get(button).should("be.disabled");
    }
  });

  it("reverses the string correctly", function () {
    cy.get(input).type("hello").should("have.value", "hello");
    cy.get(button).should("be.enabled").click();
    cy.get(button)
      .should("be.disabled")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contain("loader"));

    //1st
    cy.get(circle).then((elem) => {
      cy.get(elem[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingColor));
      cy.get(elem[0]).children().should("have.text", "h");

      cy.get(elem[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultColor));
      cy.get(elem[1]).children().should("have.text", "e");

      cy.get(elem[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultColor));
      cy.get(elem[2]).children().should("have.text", "l");

      cy.get(elem[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultColor));
      cy.get(elem[3]).children().should("have.text", "l");

      cy.get(elem[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingColor));
      cy.get(elem[4]).children().should("have.text", "o");
    });

    //2nd
    cy.get(circle).then((elem) => {
      cy.get(elem[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingColor));
      cy.get(elem[0]).children().should("have.text", "o");

      cy.get(elem[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingColor));
      cy.get(elem[1]).children().should("have.text", "e");

      cy.get(elem[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultColor));
      cy.get(elem[2]).children().should("have.text", "l");

      cy.get(elem[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingColor));
      cy.get(elem[3]).children().should("have.text", "l");

      cy.get(elem[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedColor));
      cy.get(elem[4]).children().should("have.text", "h");
    });

    cy.get(circle).then((elem) => {
      cy.get(elem[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedColor));
      cy.get(elem[0]).children().should("have.text", "o");

      cy.get(elem[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingColor));
      cy.get(elem[1]).children().should("have.text", "l");

      cy.get(elem[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingColor));
      cy.get(elem[2]).children().should("have.text", "l");

      cy.get(elem[3])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedColor));
      cy.get(elem[3]).children().should("have.text", "e");

      cy.get(elem[4])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedColor));
      cy.get(elem[4]).children().should("have.text", "h");
    });
  });
});
