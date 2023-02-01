const request = require("supertest");

const app = require("../app");

describe("Simple 200 on GET", () => {
    test("200 status code on the GET birthdays method", async () => {
        const response = await request(app).get("/birthdays");
        expect(response.statusCode).toBe(200);
    });
});


describe("Inserting a Birthday", () => {
    test("204 status code on the POST birthdays method", async () => {

        const testBirthday = {
            name: "test",
            birthday: "2023-01-31"
        };

        // insert bday
        let response = await request(app).post("/birthdays").send(testBirthday);
        expect(response.statusCode).toBe(204);

        // get bday list
        response = await request(app).get("/birthdays");
        expect(response.statusCode).toBe(200);

        // confirm new bday in list
        const matchingRecord = response._body.filter(birthday => birthday.name == testBirthday.name)
        expect(matchingRecord.length).toBe(1);

    });
});

describe("Deleting a Birthday", () => {
    test("204 status code on the DELETE birthdays method", async () => {

        const testBirthday = {
            name: "test",
            birthday: "2023-01-31"
        };

        // insert test bday
        let response = await request(app).post("/birthdays").send(testBirthday);
        expect(response.statusCode).toBe(204);

        // delete bday
        response = await request(app).delete("/birthdays").send(testBirthday);
        expect(response.statusCode).toBe(204);

        // get bday list
        response = await request(app).get("/birthdays");
        expect(response.statusCode).toBe(200);

        // confirm new bday NOT in list
        const matchingRecord = response._body.filter(birthday => birthday.name == testBirthday.name)
        expect(matchingRecord.length).toBe(0);
    });
});
