const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../index')
const tracer = require('tracer')

chai.should()
chai.use(chaiHttp)
tracer.setLevel('warn')

const endpointToTest = '/api/user'
describe('UC201 Registreren als nieuwe user', () => {
    /**
     * Voorbeeld van een beforeEach functie.
     * Hiermee kun je code hergebruiken of initialiseren.
     */
    beforeEach((done) => {
        console.log('Before each test')
        done()
    })

    it("TC-201-1 Verplicht veld ontbreekt", function () {
        chai
          .request(server)
          .post("/api/user")
          .send({
            lastName: "Sari",
            emailAdress: "mikailsari123@gmail.com",
            city: "Roosendaal",
            street: "blaablaastraat",
            phoneNumber: "0612345678",
            password: "Secret123",
            roles: "Guest"
    
          })
          .end(async function (err, response) {
            chai.expect(response).to.have.header("content-type", /json/);
            chai.expect(response).status(400);
            chai.expect(response.message).to.equal("first name is required");
            chai.expect(response.data).to.be.empty();
          });
      });
    
      it("TC-201-2 Niet-valide emailadres", function () {
        chai
          .request(server)
          .post("/api/user")
          .send({
            firstName: "Mikail",
            lastName: "Sari",
            emailAdress: "mikailsari123@gmail.com",
            city: "Roosendaal",
            street: "blaablaastraat",
            phoneNumber: "0612345678",
            password: "TestSecret123",
            roles: "Guest"
    
          })
          .end(async function (err, response) {
            chai.expect(response).to.have.header("content-type", /json/);
            chai.expect(response).status(400);
            chai.expect(response.message).to.equal("Invalid email adress");
            chai.expect(response.data).to.be.empty();
          });
      });
    
      it("TC-201-3 Niet-valide wachtwoord", function () {
        chai
          .request(server)
          .post("/api/user")
          .send({
            firstName: "Mikail",
            lastName: "Sari",
            emailAdress: "m.sari@domain.com",
            city: "Roosendaal",
            street: "blaablaastraat",
            phoneNumber: "0612345678",
            password: "Secret123",
            roles: "Guest"
    
          })
          .end(async function (err, response) {
            chai.expect(response).to.have.header("content-type", /json/);
            chai.expect(response).status(400);
            chai.expect(response.message).to.equal("Password must be at least 8 characters long and contain at least one uppercase letter and one digit");
            chai.expect(response.data).to.be.empty();
          });
      });
    
      
      it("TC-201-4 Gebruiker bestaat al", function () {
        chai
          .request(server)
          .post("/api/user")
          .send({
            firstName: "Markk",
            lastName: "Van Dam",
            emailAdress: "mm.vandam@server.nl",
            city: "Breda",
            street: "Lovensdijkstraat 61",
            phoneNumber: "06 12312345",
            password: "secret",
            roles: ['']
          })
          .end(async function (err, response) {
            chai.expect(response).to.have.header("content-type", /json/);
            chai.expect(response).status(403);
            chai.expect(response.message).to.equal("User with email j.doe@server.com already exists.");
            chai.expect(response.data).to.be.empty();
          });
      });
    
      // it("TC-201-5 Gebruiker succesvol geregistreerd", function () {
      //   chai
      //     .request(server)
      //     .post("/api/user")
      //     .send({
      //           firstName: 'Mikail',
      //           lastName: 'Sari',
      //           emailAddress: 'm.sari1@server.nl',
      //           password: 'Secret123',
      //           isActive: true,
      //           street: 'Blauwstraat 12',
      //           city: 'Roosendaal',
      //           phoneNumber: '0612345678',
      //           roles: ['admin']
      //     })
      //     .end(async function (err, response) {
      //       chai.expect(response).to.have.header("content-type", /json/);
      //       chai.expect(response).status(201);
      //       chai.expect(response).to.have.property(message);
      //       chai.expect(response.data).to.have.property(user);
      //       chai.expect(response.data).to.have.property(user.id).to.be.not.null();
      //     });
      // });
    });
