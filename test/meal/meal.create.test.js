const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../index')
const tracer = require('tracer')

chai.should()
chai.use(chaiHttp)
tracer.setLevel('warn')

const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../../src/util/config').secretkey;
const expect = chai.expect;

const endpointToTest = '/api/user'
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

describe("UC-301 Toevoegen van maaltijd", function () {

    // it("TC-301-1 Verplicht veld ontbreekt", function () {
    //   chai
    //     .request(server)
    //     .post("/api/meal")
    //     .set('Authorization', `Bearer ${authToken}`)
    //     .send({
    //       description: "Een hoop gebakken aardserverelen met worst.",
    //       imageURL: "",
    //       dateTime: new Date(),
    //       ingredients: ["Aardserverelen", "Worst"],
    //       allergies: ["Soja", "Kippenei"],
    //       isVega: false,
    //       isVegan: false,
    //       isToTakeHome: false,
    //       isActive: false,
    //       maxAmountParticipants: 1,
    //     })
    //     .end(function (err, response) {
    //         console.log('Response booty:', response.body);  // Log response body for debugging
    //         console.log('Response status:', response.status);  // Log status code for debugging

    //       chai.expect(response).to.have.header("content-type", /json/);
    //       chai.expect(response).status(400);
    //       chai.expect(response.message).to.equal("Invalid user data");

  
    //         // chai.expect(response.data).to.be.empty();
    //     });
    // });
  
    it("TC-301-2 Niet ingelogd", function () {
      chai
        .request(server)
        .post("/api/meal")
        .send({
          description: "Een hoop gebakken aardserverelen met worst.",
          imageURL: "",
          dateTime: new Date(),
          ingredients: ["Aardserverelen", "Worst"],
          allergies: ["Soja", "Kippenei"],
          isVega: false,
          isVegan: false,
          isToTakeHome: false,
          isActive: false,
          maxAmountParticipants: 1,
        })
        .set("Authorization", `Bearer ${authToken}`)
        .end(async function (err, response) {
          chai.expect(response).to.have.header("content-type", /json/);
          chai.expect(response).status(401);
          chai.expect(response.message).to.equal("No token provided");
        });
    });
  
    it("TC-301-3 Maaltijd succesvol toegevoegd", function () {
      chai
        .request(server)
        .post("/api/meal")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: "Stampot",
          description: "Een hoop gebakken aardserverelen met worst.",
          imageURL: "",
          dateTime: new Date(),
          ingredients: ["Aardserverelen", "Worst"],
          allergies: ["Soja", "Kippenei"],
          isVega: false,
          isVegan: false,
          isToTakeHome: false,
          isActive: false,
          maxAmountParticipants: 1,
        })
        .end(async function (err, response) {
          chai.expect(response).to.have.header("content-type", /json/);
          chai.expect(response).status(201);
          chai.expect(response).to.have.property(message);
          chai.expect(response.data).to.have.property(id).to.not.be.null();
          chai.expect(response.data).to.have.property(meal.owner).to.not.be.null();
        });
    });
  });
  
