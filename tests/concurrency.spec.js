const request = require("supertest");
const { expect } = require("chai");

const api = require("../helpers/api");

describe("Execução Simultânea", () => {

    it("Executar 20 buscas simultâneas", async () => {

        let requests = [];

        for (let i = 0; i < 20; i++) {

            requests.push(

                request(api.baseURL)
                    .post("/crawl")
                    .send({
                        keyword: "security"
                    })

            );

        }

        const responses = await Promise.all(requests);

        responses.forEach(response => {

            expect(response.status).to.equal(200);

        });

    });

});