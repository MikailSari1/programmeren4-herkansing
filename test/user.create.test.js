const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
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

    /**
     * Hier starten de testcases
     */
    it.skip('TC-201-1 Verplicht veld ontbreekt', (done) => {
        chai.request(server)
            .post(endpointToTest)
            .send({
                // firstName: 'Hendrik', (eerste naam is verplicht, maar ontbreekt)
                lastName: 'van Dam',
                emailAddress: 'xxxxx.xxxx@server.nl',
                isActive: true,
                password: 'Secret12',
                phoneNumber: '0612345678',
                roles: ['admin', 'user'],
                street: 'Kerkstra 1',
                city: 'Amsterdam',
            })
            .end((err, res) => {
                /**
                 * Voorbeeld uitwerking met chai.expect
                 */
                chai.expect(res).to.have.status(400)
                chai.expect(res).not.to.have.status(200)
                chai.expect(res.body).to.be.a('object')
                chai.expect(res.body).to.have.property('status').equals(400)
                chai.expect(res.body)
                    .to.have.property('message')
                    .equals('Missing or incorrect firstName field')
                chai
                    .expect(res.body)
                    .to.have.property('data')
                    .that.is.a('object').that.is.empty

                done()
            })
    })

    it.skip('TC-201-2 Niet-valide email adres', (done) => {
        chai.request(server)
            .post(endpointToTest)
            .send({
                firstName: 'Hendrik',
                lastName: 'van Dam',
                isActive: true,
                password: 'Secret12',
                phoneNumber: '0612345678',
                roles: ['admin', 'user'],
                street: 'Kerkstra 1',
                city: 'Amsterdam',
                emailAddress: 'azure%%%server.nl' // invalid emailaddress
            })
            .end((err, res) => {
        chai.expect(res).to.have.status(400)
        chai.expect(res).not.to.have.status(200)
        chai.expect(res.body).to.be.a('object')
        chai.expect(res.body).to.have.property('status').equals(400)
        chai.expect(res.body)
            .to.have.property('message')
            .equals('Missing or incorrect emailAddress field')
        chai
            .expect(res.body)
            .to.have.property('data')
            .that.is.a('object').that.is.empty

        done()
            })
    })

    it.skip('TC-201-3 Niet-valide password', (done) => {
        chai.request(server)
            .post(endpointToTest)
            .send({
                firstName: 'Hendrik',
                lastName: 'van Dam',
                emailAddress: 'hv.dd@server.nl',
                isActive: true,
                password: '?',
                phoneNumber: '0612345678',
                roles: ['admin', 'user'],
                street: 'Kerkstra 1',
                city: 'Amsterdam'
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400)
                chai.expect(res).not.to.have.status(200)
                chai.expect(res.body).to.be.a('object')
                chai.expect(res.body).to.have.property('status').equals(400)
                chai.expect(res.body)
                    .to.have.property('message')
                    .equals('Missing or incorrect password field')
                chai
                    .expect(res.body)
                    .to.have.property('data')
                    .that.is.a('object').that.is.empty

                done()
    })

    it.skip('TC-201-4 Gebruiker bestaat al', (done) => {
        chai.request(server)
            .post(endpointToTest)
            .send({
                firstName: 'Hendrik',
                lastName: 'van Dam',
                emailAddress: 'hv.dd@server.nl',
                isActive: true,
                password: 'Secret12',
                phoneNumber: '0612345678',
                roles: ['admin', 'user'],
                street: 'Kerkstra 1',
                city: 'Amsterdam',
            },{firstName: 'Hendrik',
                lastName: 'van Dam',
                emailAddress: 'hv.dd@server.nl',
                isActive: true,
                password: 'Secret12',
                phoneNumber: '0612345678',
                roles: ['admin', 'user'],
                street: 'Kerkstra 1',
                city: 'Amsterdam'})
            .end((err, res) => {
                chai.expect(res).to.have.status(400)
                chai.expect(res).not.to.have.status(200)
                chai.expect(res.body).to.be.a('object')
                chai.expect(res.body).to.have.property('status').equals(400)
                chai.expect(res.body)
                    .to.have.property('message')
                    .equals('Missing or incorrect password field')
                chai
                    .expect(res.body)
                    .to.have.property('data')
                    .that.is.a('object').that.is.empty
        done()
    })

    it.skip('TC-201-5 Gebruiker succesvol geregistreerd', (done) => {
        chai.request(server)
            .post(endpointToTest)
            .send({
                firstName: 'Voornaam',
                lastName: 'Achternaam',
                emailAdress: 'v.a@server.nl'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                res.body.should.have.property('data').that.is.a('object')
                res.body.should.have.property('message').that.is.a('string')

                const data = res.body.data
                data.should.have.property('firstName').equals('Voornaam')
                data.should.have.property('lastName').equals('Achternaam')
                data.should.have.property('emailAdress')
                data.should.have.property('id').that.is.a('number')

                done()
            })
    })
})})})