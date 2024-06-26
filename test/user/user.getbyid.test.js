// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const server = require('../../index')
// const tracer = require('tracer')

// const jwt = require('jsonwebtoken')

// const { jwtSecretKey } = require('../../src/util/config')

// chai.should()
// chai.use(chaiHttp)
// tracer.setLevel('warn')

// const endpointToTest = '/api/user'

// let token;
// let falseToken;

// beforeEach(() => {

//   token = jwt.sign({ id: "1" }, jwtSecretKey);
//   falseToken = jwt.sign({ id: "99999"}, jwtSecretKey)
// });

// describe("UC-204 Opvragen van usergegevens bij ID", function () {

//     it("TC-204-1 Ongeldig token", function () {
//       chai
//         .request(server)
//         .get("/api/user/100")
//         .set("Authorization", `Bearer ${falseToken}`)
//         .end(async function (err, response) {
//           chai.expect(response).to.have.header("content-type", /json/);
//           chai.expect(response).status(401);
//           chai.expect(response).to.have.property(message).to.equal('Invalid token');
//           chai.expect(response.data).to.be.empty();
//         });
//     });
  
//     it("TC-204-2 Gebruiker-ID bestaat niet", function () {
//       chai
//         .request(server)
//         .get("/api/user/100")
//         .set("Authorization", `Bearer ${token}`)
//         .end(async function (err, response) {
//           chai.expect(response).to.have.header("content-type", /json/);
//           chai.expect(response).status(404);
//           chai.expect(response).to.have.property(message).to.equal('User with id 100 not found!');
//           chai.expect(response.data).to.be.empty();
//         });
//     });
  
//     it("TC-204-3 Gebruiker-ID bestaat", function () {
//       chai
//         .request(server)
//         .get("/api/user/1")
//         .set("Authorization", `Bearer ${token}`)
//         .end(async function (err, response) {
//           chai.expect(response).to.have.header("content-type", /json/);
//           chai.expect(response).status(200);
//           chai.expect(response).to.have.property(message);
//           chai.expect(response.data).to.have.property(user);
//         });
//     });
//   });
  