const request = require('supertest');
const { expect } = require('chai');

const api = request('http://localhost:4567');

describe('POST /crawl', () => {
//Teste Busca com keyword válida
    it('Deve iniciar uma busca com keyword válida', async () => {
        const response = await api
            .post('/crawl')
            .send({ keyword: 'security' });

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('keyword', 'security');
        expect(response.body).to.have.property('found', true);
        expect(response.body.urls).to.be.an('array').that.is.not.empty;
    });
//Busca Cases insensitives
    it('Deve fazer busca case insensitive dentro do HTML', async () => {
        const response = await api
            .post('/crawl')
            .send({ keyword: 'SECRET' });

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('keyword', 'SECRET');
        expect(response.body).to.have.property('found', true);
        expect(response.body.urls).to.be.an('array').that.is.not.empty;
    });

    
    //Teste buscas simultâneas
    it('Deve executar múltiplas buscas simultaneamente', async () => {
        const requests = [
            api.post('/crawl').send({ keyword: 'security' }),
            api.post('/crawl').send({ keyword: 'network' }),
            api.post('/crawl').send({ keyword: 'firewall' })
        ];

        const responses = await Promise.all(requests);

        expect(responses).to.have.length(3);
        responses.forEach((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('keyword');
        });
    });
});
