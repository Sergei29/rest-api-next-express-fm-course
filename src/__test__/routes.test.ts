import supertest from "supertest";

import { app } from "../server";

describe("GET `/`", () => {
  it("should send back some data", async () => {
    const result = await supertest(app).get("/");

    expect(result.body.message).toEqual("Hello!");
  });
});
