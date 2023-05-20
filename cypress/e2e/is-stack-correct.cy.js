import {
  addBtn,
  delBtn,
  clearBtn,
  input,
  circle,
  defaultColor,
  changingColor,
  result,
  stackTag,
} from "../constants/constants";

describe("stack is correct", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.get(stackTag).click();
    cy.contains("Стек");
  });

  it("button is disabled when input is empty", function () {
    if (cy.get(input).should("have.value", "")) {
      cy.get(addBtn).should("be.disabled");
      cy.get(delBtn).should("be.disabled");
      cy.get(clearBtn).should("be.disabled");
    }
  });

  it("adds elements to stack correctly", function () {
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
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultColor));
    });
    cy.get(result).then((el) => {
      cy.get(el[0]).invoke("text").should("include", "top");
    });

    cy.get(input).should("have.value", "");
    cy.get(addBtn).should("be.disabled");

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
    cy.get(result).then((el) => {
      cy.get(el[1]).invoke("text").should("include", "top");
    });

    cy.wait(700);
    cy.get(delBtn).should("be.enabled");
    cy.get(clearBtn).should("be.enabled");
    cy.get(circle).then((el) => {
      cy.get(el[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultColor));
    });
  });

  it("removes elements from stack correctly", function () {
    cy.get(input).type("1");
    cy.get(addBtn).click();
    cy.wait(700);
    cy.get(input).type("2");
    cy.get(addBtn).click();
    cy.wait(700);
    cy.get(delBtn).should("be.enabled").click();
    cy.get(delBtn)
      .should("be.disabled")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(delBtn).should("be.disabled");
    cy.get(clearBtn).should("be.disabled");
    cy.get(result).then((el) => {
      cy.get(el[0]).invoke("text").should("include", "top");
    });

    cy.get(circle).should("have.length", 1);
  });

  it("clears stack correctly", () => {
    cy.get(input).type("1");
    cy.get(addBtn).click();
    cy.wait(700);
    cy.get(input).type("2");
    cy.get(addBtn).click();
    cy.wait(700);
    cy.get(circle).should("have.length", 2);

    cy.get(clearBtn).should("be.enabled").click();
    cy.get(clearBtn)
      .should("be.disabled")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(delBtn).should("be.disabled");
    cy.get(clearBtn).should("be.disabled");

    cy.get(circle).should("have.length", 0);
  });
});
