require("ts-node/register");

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  createUserSchema,
  registerSchema,
} = require("../src/utils/validation");
const {
  getAircraftSchema,
} = require("../src/validations/aircraftValidations");
const {
  getAircraftModelSchema,
} = require("../src/validations/aircraftModelValidation");
const {
  bulkGetFlightSchema,
} = require("../src/validations/flightValidation");
const { createRouteSchema } = require("../src/validations/routeValidation");
const { authorize } = require("../src/middleware/auth");

const validUser = {
  email: "user@example.com",
  password: "strong-password",
  firstName: "Test",
  lastName: "User",
};

test("public registration does not accept a role", () => {
  const result = registerSchema.validate({ ...validUser, role: "ADMIN" });

  assert.ok(result.error);
});

test("admin user creation accepts only known roles", () => {
  const validResult = createUserSchema.validate({ ...validUser, role: "ADMIN" });
  const invalidResult = createUserSchema.validate({ ...validUser, role: "OWNER" });

  assert.equal(validResult.error, undefined);
  assert.ok(invalidResult.error);
});

test("bulk request schemas use consistent property names", () => {
  assert.equal(
    getAircraftSchema.validate({ aircraftIds: ["aircraft-1"] }).error,
    undefined
  );
  assert.equal(
    getAircraftModelSchema.validate({ aircraftModelIds: ["model-1"] }).error,
    undefined
  );
  assert.equal(
    bulkGetFlightSchema.validate({ flightIds: ["flight-1"] }).error,
    undefined
  );
});

test("a route cannot have the same origin and destination", () => {
  const result = createRouteSchema.validate({
    originId: "airport-1",
    destinationId: "airport-1",
    distanceKm: 100,
    estimatedTime: 60,
  });

  assert.ok(result.error);
});

test("admin authorization blocks non-admin users", () => {
  let nextCalled = false;
  const response = {
    statusCode: 200,
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };

  authorize("ADMIN")(
    {
      user: {
        userId: "user-1",
        email: "user@example.com",
        role: "SYSTEM_USER",
        isActive: true,
      },
    },
    response,
    () => {
      nextCalled = true;
    }
  );

  assert.equal(nextCalled, false);
  assert.equal(response.statusCode, 403);
});
