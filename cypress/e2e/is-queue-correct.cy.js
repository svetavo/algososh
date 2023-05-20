import {
  addBtn,
  delBtn,
  clearBtn,
  input,
  circle,
  result,
  changingColor,
  defaultColor,
  queueTag,
} from "../constants/constants";

describe("queue is correct", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.get(queueTag).click();
    cy.contains("Очередь");
  });

  it("button is disabled when input is empty", function () {
    cy.get(input).should("have.value", "");
    cy.get(addBtn).should("be.disabled");
    cy.get(delBtn).should("be.disabled");
    cy.get(clearBtn).should("be.disabled");
  });

  it("adds elements to queue correctly", function () {
    //1st
    cy.get(input).type("1").should("have.value", "1");
    cy.get(addBtn).should("be.enabled").click();
    cy.get(addBtn)
      .should("be.disabled")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));

    cy.get(delBtn).should("be.disabled");
    cy.get(clearBtn).should("be.disabled");

    cy.get(circle).then((el) => {
      cy.get(el[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingColor));
    });
    cy.wait(700);
    cy.get(delBtn).should("be.enabled");
    cy.get(clearBtn).should("be.enabled");
    cy.get(circle).then((el) => {
      cy.get(el[0])
        .should("have.text", "1")
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultColor));
    });
    cy.get(result).then((el) => {
      cy.get(el[0]).invoke("text").should("include", "head", "tail");
    });
    cy.get(addBtn).should("be.disabled");
    cy.get(input).should("have.value", "");

    //2nd
    cy.get(input).type("2").should("have.value", "2");
    cy.get(addBtn).should("be.enabled").click();

    cy.get(addBtn)
      .should("be.disabled")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));

    cy.get(delBtn).should("be.disabled");
    cy.get(clearBtn).should("be.disabled");

    cy.get(circle).then((el) => {
      cy.get(el[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingColor));
    });
    cy.wait(700);
    cy.get(delBtn).should("be.enabled");
    cy.get(clearBtn).should("be.enabled");
    cy.get(circle).then((el) => {
      cy.get(el[1])
        .should("have.text", "2")
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultColor));
    });
    cy.get(result).then((el) => {
      cy.get(el[1]).invoke("text").should("include", "tail");
    });
    cy.get(result).then((el) => {
      cy.get(el[0]).invoke("text").should("include", "head");
    });
  });

  it("removes elements from queue correctly", function () {
    cy.get(input).type("1");
    cy.get(addBtn).click();
    cy.wait(700);
    cy.get(input).type("2");
    cy.get(addBtn).click();
    cy.wait(700);
    cy.get(circle).then((el) => {
      cy.get(el[0]).should("have.text", "1");
      cy.get(el[1]).should("have.text", "2");
    });

    cy.get(delBtn).should("be.enabled").click();
    cy.get(delBtn)
      .should("be.disabled")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));

    cy.get(circle).then((el) => {
      cy.get(el[0]).should("have.text", "");
      cy.get(el[1]).should("have.text", "2");
    });
    cy.get(result).then((el) => {
      cy.get(el[1]).invoke("text").should("include", "head", "tail");
    });
  });

  it("clears queue correctly", () => {
    cy.get(input).type("1");
    cy.get(addBtn).click();
    cy.wait(700);
    cy.get(input).type("2");
    cy.get(addBtn).click();
    cy.wait(700);
    cy.get(circle).then((el) => {
      cy.get(el[0]).should("have.text", "1");
      cy.get(el[1]).should("have.text", "2");
    });

    cy.get(clearBtn).should("be.enabled").click();
    cy.get(clearBtn)
      .should("be.disabled")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(addBtn).should("be.disabled");
    cy.get(delBtn).should("be.disabled");

    cy.get(circle).then((el) => {
      cy.get(el[0]).should("have.text", "");
      cy.get(el[1]).should("have.text", "");
    });

    cy.get(addBtn).should("be.disabled");
    cy.get(delBtn).should("be.disabled");
    cy.get(clearBtn).should("be.disabled");
  });
});
