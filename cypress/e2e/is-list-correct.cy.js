import {
  addHeadBtn,
  delHeadBtn,
  addTailBtn,
  delTailBtn,
  addIndBtn,
  delIndBtn,
  valInput,
  indInput,
  circle,
  result,
  changingColor,
  defaultColor,
  modifiedColor,
  element,
  circleSmall,
  listTag,
} from "../constants/constants";

describe("list is correct", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.get(listTag).click();
    cy.contains("Связный");
  });

  it("initial state is correct", function () {
    cy.get(valInput).should("have.value", "");
    cy.get(addHeadBtn).should("be.disabled");
    cy.get(addTailBtn).should("be.disabled");
    cy.get(addIndBtn).should("be.disabled");
    cy.get(delIndBtn).should("be.disabled");
    cy.get(delHeadBtn).should("be.enabled");
    cy.get(delTailBtn).should("be.enabled");

    cy.get(indInput).should("have.value", "");
    cy.get(addIndBtn).should("be.disabled");
    cy.get(delIndBtn).should("be.disabled");

    cy.get(result).then((el) => {
      cy.get(el[0]).invoke("text").should("include", "head");
    });

    cy.get(result).then((el) => {
      cy.get(el[3]).invoke("text").should("include", "tail");
    });
  });

  it("adds elements to head correctly", function () {
    cy.get(valInput).type("1").should("have.value", "1");
    cy.get(addHeadBtn).should("be.enabled").click();
    cy.get(addHeadBtn)
      .should("be.disabled")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(delIndBtn).should("be.disabled");
    cy.get(delHeadBtn).should("be.disabled");
    cy.get(delTailBtn).should("be.disabled");
    cy.get(addIndBtn).should("be.disabled");
    cy.get(delIndBtn).should("be.disabled");

    cy.get(element).then((el) => {
      cy.get(el[0])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingColor));
    });

    cy.wait(1000);
    cy.get(circle).then((el) => {
      cy.get(el[0])
        .should("have.text", "1")
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedColor));
    });

    cy.get(delHeadBtn).should("be.enabled");
    cy.get(delTailBtn).should("be.enabled");

    cy.get(circle).then((el) => {
      cy.get(el[0])
        .should("have.text", "1")
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultColor));
    });

    cy.get(result).then((el) => {
      cy.get(el[0]).invoke("text").should("include", "head");
    });

    cy.get(addHeadBtn).should("be.disabled");
    cy.get(valInput).should("have.value", "");
  });

  it("adds elements to tail correctly", function () {
    cy.wait(1000);
    cy.get(valInput).type("1").should("have.value", "1");
    cy.wait(1000);
    cy.get(addTailBtn).should("be.enabled").click();
    cy.get(addTailBtn)
      .should("be.disabled")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(addHeadBtn).should("be.disabled");
    cy.get(delIndBtn).should("be.disabled");
    cy.get(delHeadBtn).should("be.disabled");
    cy.get(delTailBtn).should("be.disabled");
    cy.get(addIndBtn).should("be.disabled");
    cy.get(delIndBtn).should("be.disabled");

    cy.get(element).then((el) => {
      cy.get(el[3])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingColor));
    });

    cy.wait(1000);

    cy.get(circle).then((el) => {
      cy.get(el[4])
        .should("have.text", "1")
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedColor));
    });

    cy.get(delHeadBtn).should("be.enabled");
    cy.get(delTailBtn).should("be.enabled");

    cy.get(circle).then((el) => {
      cy.get(el[4])
        .should("have.text", "1")
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultColor));
    });

    cy.get(result).then((el) => {
      cy.get(el[4]).invoke("text").should("include", "tail");
    });

    cy.get(addTailBtn).should("be.disabled");
    cy.get(valInput).should("have.value", "");
  });

  it("removes elements from head correctly", function () {
    cy.get(delHeadBtn)
      .should("be.enabled")
      .click()
      .should("be.disabled")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(delIndBtn).should("be.disabled");
    cy.get(addHeadBtn).should("be.disabled");
    cy.get(delTailBtn).should("be.disabled");
    cy.get(addIndBtn).should("be.disabled");
    cy.get(delIndBtn).should("be.disabled");

    cy.get(element).then((el) => {
      cy.get(el[0])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingColor));
    });

    cy.get(circle).then((el) => {
      cy.get(el[0])
        .should("have.text", "")
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultColor));
    });

    cy.get(delHeadBtn).should("be.enabled");
    cy.get(delTailBtn).should("be.enabled");

    cy.get(result).then((el) => {
      cy.get(el[0]).invoke("text").should("include", "head");
    });

    cy.get(addHeadBtn).should("be.disabled");
    cy.get(valInput).should("have.value", "");
    cy.get(circle).should("have.length", "3");
  });

  it("removes elements from tail correctly", function () {
    cy.get(delTailBtn)
      .should("be.enabled")
      .click()
      .should("be.disabled")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(delIndBtn).should("be.disabled");
    cy.get(addHeadBtn).should("be.disabled");
    cy.get(delHeadBtn).should("be.disabled");
    cy.get(addIndBtn).should("be.disabled");
    cy.get(delIndBtn).should("be.disabled");

    cy.get(element).then((el) => {
      cy.get(el[3])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingColor));
    });

    cy.get(circle).then((el) => {
      cy.get(el[3])
        .should("have.text", "")
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultColor));
    });

    cy.get(delHeadBtn).should("be.enabled");
    cy.get(delTailBtn).should("be.enabled");

    cy.get(result).then((el) => {
      cy.get(el[2]).invoke("text").should("include", "tail");
    });

    cy.get(valInput).should("have.value", "");
    cy.get(circle).should("have.length", "3");
  });

  it("adds elements by index correctly", function () {
    cy.get(valInput).type("1").should("have.value", "1");
    cy.get(addIndBtn).should("be.disabled");
    cy.get(indInput).type("1").should("have.value", "1");
    cy.get(addIndBtn)
      .should("be.enabled")
      .click()
      .should("be.disabled")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(delIndBtn).should("be.disabled");
    cy.get(addHeadBtn).should("be.disabled");
    cy.get(delHeadBtn).should("be.disabled");
    cy.get(delTailBtn).should("be.disabled");
    cy.get(delIndBtn).should("be.disabled");

    cy.wait(700);

    cy.get(element).then((el) => {
      cy.get(el[1])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingColor));
    });
    cy.wait(500);

    cy.get(circle).then((el) => {
      cy.get(el[1])
        .should("have.text", "1")
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(modifiedColor));
    });
    cy.wait(500);

    cy.get(circle).then((el) => {
      cy.get(el[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(defaultColor));
    });

    cy.get(addIndBtn).should("be.disabled");
    cy.get(valInput).should("have.value", "");
    cy.get(indInput).should("have.value", "");
    cy.get(circle).should("have.length", "5");
  });

  it("removes elements by index correctly", function () {
    cy.get(indInput).type("1").should("have.value", "1");
    cy.get(delIndBtn)
      .should("be.enabled")
      .click()
      .should("be.disabled")
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(delIndBtn).should("be.disabled");
    cy.get(addHeadBtn).should("be.disabled");
    cy.get(delHeadBtn).should("be.disabled");
    cy.get(delTailBtn).should("be.disabled");
    cy.get(addIndBtn).should("be.disabled");

    cy.wait(700);

    cy.get(circle).then((el) => {
      cy.get(el[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingColor));
    });

    cy.wait(500);

    cy.get(circle).then((el) => {
      cy.get(el[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingColor));
      cy.get(el[1])
        .should("have.text", "")
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingColor));
    });

    cy.get(element).then((el) => {
      cy.get(el[1])
        .find(circleSmall)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(changingColor));
    });

    cy.wait(500);

    cy.get(circle).should("have.length", "3");
    cy.get(indInput).should("have.value", "");
    cy.get(delIndBtn).should("be.disabled");
  });
});
