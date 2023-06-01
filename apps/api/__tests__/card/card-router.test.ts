import Request from "supertest";

import { app, server } from "../../src/server.js";

describe("Card Router", () => {
  it("GET /cards", async () => {
    await Request(app).get("/cards").expect("Content-Type", /json/).expect(200);
  });

  it("GET /card/${id}", async () => {
    const card = await Request(app).get("/cards");
    const { id }: { readonly id: string } = card.body[0];
    await Request(app)
      .get(`/card/${id}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("GET /cards?subjet", async () => {
    const card = await Request(app).get("/cards");
    const { id }: { readonly id: string } = card.body[0];
    await Request(app)
      .get(`/card/${id}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("POST /card", () => {});

  afterAll(() => {
    server.close();
  });
});
