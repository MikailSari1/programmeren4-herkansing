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

describe("UC-304 Opvragen van maaltijd bij ID", function () {
    it("TC-304-1 maaltijd bestaat niet", function () {
      chai
        .request(server)
        .get("/api/meal/999999999")
        .set("Authorization", `Bearer ${authToken}`)
        .end(async function (err, response) {
          chai.expect(response).to.have.header("content-type", /json/);
          chai.expect(response).status(404);
          chai
            .expect(response)
            .to.have.property(message)
            .to.equal("User with id 999999999 not found!");
          chai.expect(response.data).to.be.empty();
        });
    });
  
    it("TC-304-2 Details van maaltijd geretourneerd", function () {
      chai
        .request(server)
        .get("/api/meal/1")
        .set("Authorization", `Bearer ${authToken}`)
        .end(async function (err, response) {
          chai.expect(response).to.have.header("content-type", /json/);
          chai.expect(response).status(200);
          chai.expect(response).to.have.property(message);
          chai.expect(response.data).to.have.property(meal);
        });
    });
  });
  