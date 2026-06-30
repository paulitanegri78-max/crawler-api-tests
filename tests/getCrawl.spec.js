const request = require("supertest");
const { expect } = require("chai");
const api = require("../helpers/api");

describe("GET /crawl/{id}", () => {

    let id;

    before(async () => {

        const response = await request(api.baseURL)
            .post("/crawl")
            .send({
                keyword: "security"
            });

        id = response.body.id;

    });

    it("Consultar busca", async () => {

        const response = await request(api.baseURL)
            .get(`/crawl/${id}`);

        expect(response.status).to.equal(200);

        expect(response.body.id).to.equal(id);

        expect(response.body.urls).to.be.an("array");

    });

});