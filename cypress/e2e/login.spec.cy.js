describe("Indicator App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Frontpage can be opened", () => {
    cy.contains("Iniciar Sesión");
  });

  it("User can login", () => {
    cy.uiLogin({
      username: "frontend@tests.cl",
      password: "UvjvjJ8v4eDKIe0L6",
    });
    cy.contains("Iniciar Sesión");
  });

  it("Login fails with wrong credentials", () => {
    cy.uiLogin({ username: "mail@example.cl", password: "123456" });
    cy.toast(
      /No puede iniciar sesión con las credenciales proporcionadas.|Unable to log in with provided credentials./g
    );
  });

  it("Login fails with wrong email", () => {
    cy.uiLogin({ username: "mail", password: "123456" });
    cy.toast("El correo electrónico ingresado no es válido");
  });

  it("Login fails with empty email", () => {
    cy.uiLogin({ password: "123456" });
    cy.toast("Todos los campos son requeridos");
  });

  it("Login fails with empty password", () => {
    cy.uiLogin({ username: "mail@example.cl" });
    cy.toast("Todos los campos son requeridos");
  });

  describe("When logged in", () => {
    beforeEach(() => {
      cy.request("POST", "/api/login", {
        username: "frontend@tests.cl",
        password: "UvjvjJ8v4eDKIe0L6",
      }).then((response) => {
        localStorage.setItem("token", response.token);
        cy.visit("http://localhost:3000");
      });
    });

    it("Dashboard can be opened ", () => {
      cy.contains("Dashboard");
    });

    it("User can logout ", () => {
      cy.intercept("GET", "https://www.mindicador.cl/api/**").as(
        "getIndicatorData"
      );
      cy.wait("@getIndicatorData");
      cy.get(".logOut").click();
    });
  });
});
