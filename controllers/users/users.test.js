// const myMock = jest.fn();
const signup = require("./signup");
const { HttpCode } = require("../../config/constants");
const AuthService = require("../../service/auth");

jest.mock("../../service/auth");

describe("Unit test registration", () => {
  // beforeAll(fn)
  // beforeEach(fn)
  // afterAll(fn)
  // afterEach(fn)

  let req, res, next;
  beforeEach(() => {
    req = { body: { email: "test@test.com", password: "12345678" } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data) };
    next = jest.fn()
    AuthService.create = jest.fn(async (data) => data);
  });
  test("Signup new user", async () => {
    AuthService.isUserExist = jest.fn(async () => false);
    await signup(req, res, next);
    expect(AuthService.isUserExist).toHaveBeenCalledWith(req.body.email)
    expect(res.status).toHaveBeenCalledWith(HttpCode.CREATED)
  });
  test("Signup, user is already exist", async () => {
    AuthService.isUserExist = jest.fn(async () => true);
    await signup(req, res, next);
    expect(AuthService.isUserExist).toHaveBeenCalledWith(req.body.email)
    expect(res.status).toHaveBeenCalledWith(HttpCode.CONFLICT)
  });
  test("Signup with DB error", async () => {
    const testError = new Error('DB error')
    AuthService.isUserExist = jest.fn(async () => {throw testError});
    await signup(req, res, next);
    expect(AuthService.isUserExist).toHaveBeenCalledWith(req.body.email)
    expect(next).toHaveBeenCalledWith(testError)
  });
});
