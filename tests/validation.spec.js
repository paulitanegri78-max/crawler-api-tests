const request = require("supertest");
const { expect } = require("chai");

const api = require("../helpers/api");
const generator = require("../helpers/generator");

//validar keywords
describe("Validação da Keyword", () => {

    it("Keyword menor que 4 caracteres", async () => {

        const response = await request(api.baseURL)
            .post("/crawl")
            .send({
                keyword: generator.keywordPequena()
            });

        expect(response.status).to.equal(400);

    });

    it("Keyword maior que 32 caracteres", async () => {

        const response = await request(api.baseURL)
            .post("/crawl")
            .send({
                keyword: generator.keywordGrande()
            });

        expect(response.status).to.equal(400);

    });

});

