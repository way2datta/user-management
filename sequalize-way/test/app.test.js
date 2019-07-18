import chai, {expect} from "chai";
import chaiHttp from  "chai-http";

chai.use(chaiHttp);

import app from "./../app.js";

describe("app", () => {
  it("should return hello world", () => {
    chai
      .request(app)
      .get("/")
      .end((req, res) => {
        expect(res.text).to.be.equal(
          "Hello World!",
          "Home route is working properly."
        );
      });
  });
});
