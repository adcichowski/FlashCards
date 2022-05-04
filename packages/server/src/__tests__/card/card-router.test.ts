import Request from "supertest";

import { app, server } from "../../server";
describe("Card Router", () => {
  it("GET /cards", async () => {
    await Request(app).get("/cards").expect("Content-Type", /json/).expect(200);
  });
});
afterAll(() => {
  server.close();
});
