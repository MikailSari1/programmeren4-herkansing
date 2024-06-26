// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const server = require('../../index')
// const tracer = require('tracer')

// chai.should()
// chai.use(chaiHttp)
// tracer.setLevel('warn')

// const endpointToTest = '/api/user'

// const jwt = require('jsonwebtoken');
// const jwtSecretKey = require('../../src/util/config').secretkey;


// let authToken = '';

// before((done) => {
//     const payload = {
//         userId: '2',
//     };

//     jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' }, (err, token) => {
//         if (err) {
//             done(err);
//         } else {
//             authToken = token;
//             done();
//         }
//     });
// });

// describe("UC-202 Opvragen van overzicht van users", function () {

//     it("TC-202-1 Toon alle gebruikers (minimaal 2)", function () {
//       chai
//         .request(server)
//         .get("/api/user")
//         .set("Authorization", `Bearer ${authToken}`)
//         .end(async function (err, response) {
//           chai.expect(response).to.have.header("content-type", /json/);
//           chai.expect(response).status(200);
//           chai.expect(response).to.have.property(message);
//           chai.expect(response.data).to.have.length.greaterThanOrEqual(2);
//         });
//     });
  
//     it("TC-202-2 Toon alle gebruikers met zoekterm op niet-bestaande velden", function () {
//       chai
//         .request(server)
//         .get("/api/user?animal=Monkey")
//         .set("Authorization", `Bearer ${authToken}`)
//         .end(async function (err, response) {
//           chai.expect(response).to.have.header("content-type", /json/);
//           chai.expect(response).status(200);
//           chai.expect(response).to.have.property(message).to.equal('Unknown field found');
//           chai.expect(response.data).to.be.empty()
//         });
//     });
  
//     it("TC-202-3 Toon alle gebruikers met gebruik van de zoekterm op het veld 'isActive'=false", function () {
//       chai
//         .request(server)
//         .get("/api/user?isActive=False")
//         .set("Authorization", `Bearer ${authToken}`)
//         .end(async function (err, response) {
//           chai.expect(response).to.have.header("content-type", /json/);
//           chai.expect(response).status(200);
//           chai.expect(response).to.have.property(message);
//           chai.expect(response.data).length.to.be.greaterThanOrEqual(2);
//         });
//     });
  
//     it("TC-202-4 Toon alle gebruikers met gebruik van de zoekterm op het veld 'isActive'=true", function () {
//       chai
//         .request(server)
//         .get("/api/user?isActive=True")
//         .set("Authorization", `Bearer ${authToken}`)
//         .end(async function (err, response) {
//           chai.expect(response).to.have.header("content-type", /json/);
//           chai.expect(response).status(200);
//           chai.expect(response).to.have.property(message);
//           chai.expect(response.data).length.to.be.greaterThanOrEqual(2);
//         });
//     });
  
//     it("TC-202-5 Toon gebruikers met gebruik van de zoekterm op bestaande velden (max op 2 velden filteren)", function () {
//       chai
//         .request(server)
//         .get("/api/user?city=Roosendaal&street=Gerard doustraat")
//         .set("Authorization", `Bearer ${authToken}`)
//         .end(async function (err, response) {
//           chai.expect(response).to.have.header("content-type", /json/);
//           chai.expect(response).status(200);
//           chai.expect(response).to.have.property(message);
//           chai.expect(response.data).length.to.be.greaterThanOrEqual(2);
//         });
//     });
//   });
  