describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Test User",
      username: "testuser",
      password: "testpass",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("");
  });

  it("renders login button initially", function () {
    cy.contains("login");
  });

  it("user can login with correct password", function () {
    cy.contains("login").click();
    cy.get("#username").type("testuser");
    cy.get("#password").type("testpass");
    cy.contains("login").click();
    cy.contains("Test User logged in");
  });

  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("testuser");
    cy.get("#password").type("wrongpass");
    cy.contains("login").click();

    cy.get(".error")
      .should("contain", "invalid username or password")
      .and("have.css", "border-style", "solid")
      .and("have.css", "border-color", "rgb(255, 8, 0)");

    cy.get("html").should("not.contain", "Test User logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testuser", password: "testpass" });
    });

    it("new blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("title by cypress");
      cy.get("#author").type("testauthor");
      cy.get("#url").type("http://www.test.com/");
      cy.contains("create").click();
      cy.contains("title by cypress");
    });

    describe("and blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "blog by cypress",
          author: "cypress",
          url: "https://www.cypress.io/test_blog",
        });
      });

      it("user can like blog", function () {
        cy.contains("blog by cypress").as("newBlog");
        cy.get("@newBlog").contains("view").click();
        cy.get("@newBlog").contains("Likes 0").contains("like").click();
        cy.get("@newBlog").contains("Likes 1");
      });

      it("user who created it can delete it", function () {
        cy.contains("blog by cypress").as("newBlog");
        cy.get("@newBlog").contains("view").click();
        cy.get("@newBlog").contains("remove").as("removeButton");
        cy.get("@removeButton").click();
        cy.get(".success").should("contain", "blog by cypress deleted");
        cy.get("html").should("not.contain", "blog by cypress");
      });

      it("other than user who created it cannot delete it", function () {
        const user = {
          name: "Secondary User",
          username: "seconduser",
          password: "secondpass",
        };
        cy.request("POST", "http://localhost:3001/api/users", user);
        cy.login({ username: "seconduser", password: "secondpass" });
        cy.contains("blog by cypress").as("newBlog");
        cy.get("@newBlog").contains("view").click();
        cy.get("@newBlog").should("not.contain", "remove");
      });

      it("blogs are sorted in descending number of likes", function () {
        cy.createBlog({
          title: "blog with higher likes",
          author: "cypress",
          url: "https://www.cypress.io/test_blog",
          likes: 100,
        });
        cy.get(".blog").eq(0).should("contain", "blog with higher likes");
        cy.get(".blog").eq(1).should("contain", "blog by cypress");
      });
    });
  });
});
