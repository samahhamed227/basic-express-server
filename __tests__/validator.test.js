'use strict';

const { server } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server);
describe("validator middleware", () => {
    test("should check the Person query name is NOT valid", async () => {
        const response = await mockRequest.get("/person");
        expect(response.status).toEqual(500);
    });
    test("should check the Person query name is valid", async () => {
        const response = await mockRequest.get("/person?name=samah");
        expect(response.status).toEqual(200);
    });
});