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
  

describe("UC-206 Verwijderen van user", function () {

    it("TC-206-1 Gebruiker bestaat niet", function () {
      chai
      .request(server)
      .delete("/api/user/1")
    //   .set("Authorization", `Bearer ${token}`)
      .end(async function (err, response) {
        chai.expect(response).to.have.header("content-type", json);
        chai.expect(response).status(404);
        chai.expect(response).to.have.property(message).to.equal('User not found!');
        chai.expect(response.data).to.be.empty();
      });
    });
  
    it("TC-206-2 Gebruiker is niet ingelogd", function () {
      chai
        .request(server)
        .delete("/api/user/1")
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
  
    it("TC-206-3 De gebruiker is niet de eigenaar van de data", function () {
      chai
        .request(server)
        .delete("/api/user/1")
        // .set("Authorization", `Bearer ${falseToken}`)
        .end(async function (err, response) {
          chai.expect(response).to.have.header("content-type", json);
          chai.expect(response).status(404);
          chai
            .expect(response)
            .to.have.property(message)
            .to.equal("Not owner of this entity");
          chai.expect(response.data).to.be.empty();
        });
    });
    
  
    it("TC-206-4 Gebruiker succesvol verwijderd", function () {
      chai
        .request(server)
        .delete("/api/user/1")
        // .set("Authorization", `Bearer ${token}`)
        .end(async function (err, response) {
          chai.expect(response).to.have.header("content-type", /json/);
          chai.expect(response).status(200);
          chai.expect(response).to.have.property(message).to.equal("User was deleted successfully!");
          chai.expect(response.data).to.have.lengthOf(1);
        });
    });
})