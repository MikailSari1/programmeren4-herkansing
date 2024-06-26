const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../index')
const tracer = require('tracer')

// const jwt = require('jsonwebtoken')

// const { jwtSecretKey } = require('../../src/util/config')

chai.should()
chai.use(chaiHttp)
tracer.setLevel('warn')

const endpointToTest = '/api/user'

// let token;


// beforeEach(() => {
//     console.log(process.env.JWT_SECRET_KEY);

//     token = jwt.sign({ id: "1" }, jwtSecretKey);
//   });

const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../../src/util/config').secretkey;

let authToken = '';

before((done) => {
    const payload = {
        userId: '2',
    };

    jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' }, (err, token) => {
        if (err) {
            done(err);
        } else {
            authToken = token;
            done();
        }
    });
});
  

describe("UC-205 Wijzigen van user", function() {
    it("TC-205-1 Verplicht veld emailaddress ontbreekt", function () {
      chai
      .request(server)
      .put("/api/user/1")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        firstName: "Mikail",
        lastName: "Sari",
        city: "Roosendaal",
        street: "blauwstraat 11",
        phoneNumber: "0612345678",
        password: "TestSecret123",
        roles: "Admin"
      })
      .end(async function (err, response) {
        chai.expect(response).to.have.header("content-type", json);
        chai.expect(response).status(400);
        chai.expect(response).to.have.property(message).to.equal('emailAdress is required');
        chai.expect(response.data).to.be.empty();
      });
    })
  
    it("TC-205-2 De gebruiker is niet de eigenaar van de data", function () {
      chai
      .request(server)
      .put("/api/user/1")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        firstName: "Mikail",
        lastName: "Sari",
        city: "Roosendaal",
        street: "blauwstraat 11",
        phoneNumber: "0612345678",
        password: "TestSecret123",
        roles: "Admin"
      })
      .end(async function (err, response) {
        chai.expect(response).to.have.header("content-type", json);
        chai.expect(response).status(403);
        chai.expect(response).to.have.property(message).to.equal('Not owner of this entity');
        chai.expect(response.data).to.be.empty();
      });
    })
  
    it("TC-205-3 Niet-valide telefoonnummer", function () {
      chai
      .request(server)
      .put("/api/user/1")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        firstName: "Mikail",
        lastName: "Sari",
        city: "Roosendaal",
        street: "blauwstraat 11",
        phoneNumber: "0612345678",
        password: "TestSecret123",
        roles: "Admin"
      })
      .end(async function (err, response) {
        chai.expect(response).to.have.header("content-type", json);
        chai.expect(response).status(400);
        chai.expect(response).to.have.property(message).to.equal('Phone number must start with 06 and contain 10 digits (e.g. 06-12345678)');
        chai.expect(response.data).to.be.empty();
      });
    })
  
  
    it("TC-205-4 Gebruiker bestaat niet", function () {
      chai
      .request(server)
      .put("/api/user/1")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        firstName: "Mikail",
        lastName: "Sari",
        city: "Roosendaal",
        street: "blauwstraat 11",
        phoneNumber: "0612345678",
        password: "TestSecret123",
        roles: "Admin"
      })
      .end(async function (err, response) {
        chai.expect(response).to.have.header("content-type", json);
        chai.expect(response).status(404);
        chai.expect(response).to.have.property(message).to.equal('User not found!');
        chai.expect(response.data).to.be.empty();
      });
    });
  
    it("TC-205-5 Niet-ingelogd", function () {
      chai
      .request(server)
      .put("/api/user/1")
      .send({
        firstName: "Mikail",
        lastName: "Sari",
        city: "Roosendaal",
        street: "blauwstraat 11",
        phoneNumber: "0612345678",
        password: "TestSecret123",
        roles: "Admin"
      })
      .end(async function (err, response) {
        chai.expect(response).to.have.header("content-type", json);
        chai.expect(response).status(401);
        chai.expect(response).to.have.property(message).to.equal('No token provided');
        chai.expect(response.data).to.be.empty();
      });
    })
  
    it("TC-205-6 Gebruiker successvol gewijzigd", function () {
      chai
      .request(server)
      .put("/api/user/1").send({
        firstName: "Mikail",
        lastName: "Sari",
        city: "Roosendaal",
        street: "blauwstraat 11",
        phoneNumber: "0612345678",
        password: "TestSecret123",
        roles: "Admin"
      })
      .end(async function (err, response) {
        chai.expect(response).to.have.header("content-type", json);
        chai.expect(response).status(200);
        chai.expect(response).to.have.property(message).to.equal('User updated successfully!');
        chai.expect(response.data).to.be.empty();
      });
    });
  });
  