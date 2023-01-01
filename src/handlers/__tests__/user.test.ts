import { createNewUser } from "../users";

describe("user handler", () => {
  // you will need to use a mock DB and erase it after each test case
  it("should create a new user", async () => {
    const req = { body: { username: "hello", password: "secretPw" } };
    const status = jest.fn((code) => {});
    const json = jest.fn((jwt) => {});
    const res = {
      status,
      json,
    };
    const next = (err: unknown) => {};

    await createNewUser(req as any, res as any, next);

    expect(status.mock.calls.length).toBe(1);
    expect(status.mock.calls[0][0]).toEqual(200);
  });
});
