const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../index')
const tracer = require('tracer')

chai.should()
chai.use(chaiHttp)
tracer.setLevel('warn')

const endpointToTest = '/api/user'

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

describe("UC-305 Verwijderen van maaltijd", function () {

    it("TC-305-1 Niet ingelogd", function () {
      chai
        .request(server)
        .delete("/api/meal/1")
        .end(async function (err, response) {
          chai.expect(response).to.have.header("content-type", json);
          chai.expect(response).status(401);
          chai
            .expect(response)
            .to.have.property(message)
            .to.equal("No token provided");
          chai.expect(response.data).to.be.empty();
        });
    });
    
    it("TC-305-2 Niet de eigenaar van de data", function () {
      chai
        .request(server)
        .delete("/api/meal/1")
        // .set("Authorization", `Bearer ${falseToken}`)
        .end(async function (err, response) {
          chai.expect(response).to.have.header("content-type", json);
          chai.expect(response).status(403);
          chai
            .expect(response)
            .to.have.property(message)
            .to.equal("Not owner of this entity");
          chai.expect(response.data).to.be.empty();
        });
    });
  
  
    it("TC-305-3 Maaltijd bestaat niet", function () {
      chai
        .request(server)
        .delete("/api/meal/99999")
        .set("Authorization", `Bearer ${authToken}`)
        .end(async function (err, response) {
          chai.expect(response).to.have.header("content-type", json);
          chai.expect(response).status(404);
          chai
            .expect(response)
            .to.have.property(message)
            .to.equal("Meal not found!");
          chai.expect(response.data).to.be.empty();
        });
    });
  
    it("TC-206-4 Gebruiker succesvol verwijderd", function () {
      chai
        .request(server)
        .delete("/api/user/5")
        .set("Authorization", `Bearer ${authToken}`)
        .end(async function (err, response) {
          chai.expect(response).to.have.header("content-type", /json/);
          chai.expect(response).status(200);
          chai
            .expect(response)
            .to.have.property(message)
            .to.equal("User was deleted successfully!");
          chai.expect(response.data).to.have.lengthOf(1);
        });
    });
})