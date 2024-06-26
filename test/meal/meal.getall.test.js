const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../index')
const tracer = require('tracer')

chai.should()
chai.use(chaiHttp)
tracer.setLevel('warn')

const endpointToTest = '/api/user'


describe("UC-202 Opvragen van alle maaltijden", function () {
    it("TC-303-1 Lijst van maaltijden geretourneerd", function () {
      chai
        .request(server)
        .get("/api/meal")
        .end(async function (err, response) {
          chai.expect(response).to.have.header("content-type", /json/);
          chai.expect(response).status(200);
          chai.expect(response).to.have.property(message);
          chai.expect(response.data).to.have.greaterThanOrEqual(1);
        });
    });
  });
  