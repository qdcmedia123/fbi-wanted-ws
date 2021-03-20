import request from "supertest";
import { app } from "../../app";
import { natsWrapper } from "../../nats-wrapper";

it("Throw en 401 auth error, if user is not authenticated", async () => {
  await request(app).get("/api/fbi/list/sdfsdf").send({}).expect(401);
});

it("Throw an bad request error if pagination value set to string", async () => {
  await request(app)
    .get("/api/fbi/list/sdfsdf")
    .set("Cookie", global.signin())
    .expect(400);
});

it("Fetch fbi wanted list from remote api", async () => {
  await request(app)
    .get("/api/fbi/list")
    .set("Cookie", global.signin())
    .send()
    .expect(200);
});

it("Fetch the FBI Want list api and publish the event", async () => {
  const response = await request(app)
    .get("/api/fbi/list")
    .set("Cookie", global.signin())
    .send()
    .expect(200);
  const parseString = JSON.parse(response.text);
  expect(parseString.total).toBeDefined();
  expect(parseString.items).toBeDefined();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('Throw 400 error if wanted list id is not found', async() => {
   await request(app)
  .get("/api/fbi/fbiById/testid")
  .set("Cookie", global.signin())
  .send()
  .expect(400);
});

it('Fetch the FBI Wanted list individual item list if id is valid', async() => {
  const response = await request(app)
  .get("/api/fbi/fbiById/2978c2dee66b4a10a4b3030a00aa7db7")
  .set("Cookie", global.signin())
  .send()
  .expect(200);
  const parseString = JSON.parse(response.text);
  expect(parseString.url).toBeDefined();
});

