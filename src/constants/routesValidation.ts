import { body } from "express-validator";

export const validate = {
  user: {
    signUp: [
      body("username").exists({ checkFalsy: true }).isString(),
      body("password").exists({ checkFalsy: true }).isString(),
    ],
    signIn: [
      body("username").exists({ checkFalsy: true }).isString(),
      body("password").exists({ checkFalsy: true }).isString(),
    ],
  },
  product: {
    post: [
      body("name")
        .exists({ checkFalsy: true })
        .isString()
        .isLength({ max: 255 }),
    ],
    put: [
      body("name")
        .exists({ checkFalsy: true })
        .isString()
        .isLength({ max: 255 }),
    ],
  },
  update: {
    post: [
      body("title").exists({ checkFalsy: true }).isString(),
      body("body").exists({ checkFalsy: true }).isString(),
      body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
      body("version").optional(),
      body("asset").optional(),

      body("productId").exists({ checkFalsy: true }).isString(),
    ],
    put: [
      body("title").optional(),
      body("body").optional(),
      body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
      body("version").optional(),
      body("asset").optional(),
    ],
  },
  updatePoint: {
    post: [
      body("name")
        .exists({ checkFalsy: true })
        .isString()
        .isLength({ max: 255 }),
      body("description").exists({ checkFalsy: true }).isString(),
      body("updateId").exists({ checkFalsy: true }).isString(),
    ],
    put: [
      body("name").optional().isLength({ max: 255 }),
      body("description").optional(),
    ],
  },
};
