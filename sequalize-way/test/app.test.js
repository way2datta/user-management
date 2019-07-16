const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = require("chai").expect;

chai.use(chaiHttp);

const app = require(__dirname+'/../app')
describe("app", () => {
  it("should add two numbers", () => {
    expect(3 + 4).to.be.equal(7, "Mocha is not setup properly");
  });
  it("should return hello world", () => {
      chai.request(app)
      .get('/')
      .end((req, res)=>{
          expect(res.text).to.be.equal('Hello World!', "Home route is working properly.");
      })
  });
  it.only("should get all users", ()=>{
    chai.request(app)
    .get('/api/users')
    .end((req, res) => {
      expect(res.text).to.be.equal('This is get all');

    });
    
  })
  
  it("should create user", ()=>{

  })
  
  it("should update user", ()=>{
    
  })

  it("should get user by id", ()=>{
    
  })
});
