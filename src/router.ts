import { body } from "express-validator";
import { Router } from "express";

import { handleInputErrors } from "./modules/middleware";
import {
  getProducts,
  getOneProduct,
  updateProduct,
  createProduct,
  deleteProduct,
} from "./handlers/product";

const router = Router();
const endPoints = {
  product: "/product",
  update: "/update",
  updatePoint: "/updatepoint",
} as const;

const { product, update, updatePoint } = endPoints;

const validate = {
  product: {
    post: [body("name").exists({ checkFalsy: true }).isString()],
    put: [body("name").exists({ checkFalsy: true }).isString()],
  },
  update: {
    post: [
      body("title").exists({ checkFalsy: true }).isString(),
      body("body").exists({ checkFalsy: true }).isString(),
      body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
      body("version").optional(),
      body("asset").optional(),

      body("productId").custom(async (value) => {}),
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
      body("name").exists({ checkFalsy: true }).isString(),
      body("description").exists({ checkFalsy: true }).isString(),
      body("updateId").exists({ checkFalsy: true }).isString(),
    ],
    put: [body("name").optional(), body("description").optional()],
  },
};

/**
 * Product
 */
router.get(`${product}`, getProducts);
router.get(`${product}/:id`, getOneProduct);
router.post(
  `${product}`,
  ...validate.product.post,
  handleInputErrors,
  createProduct
);
router.put(
  `${product}/:id`,
  ...validate.product.put,
  handleInputErrors,
  updateProduct
);
router.delete(`${product}/:id`, deleteProduct);

/**
 * Update
 */
router.get(`${update}`, (req, res) => {
  res.status(200).json({ message: "updates list" });
});
router.get(`${update}/:id`, (req, res) => {
  res.status(200).json({ message: "update by ID" });
});
router.post(
  `${update}`,
  ...validate.update.post,
  handleInputErrors,
  (req, res) => {
    res.status(200).json({ message: "new update created" });
  }
);
router.put(
  `${update}/:id`,
  ...validate.update.put,
  handleInputErrors,
  (req, res) => {
    res.status(200).json({ message: "update edited" });
  }
);
router.delete(`${update}/:id`, (req, res) => {
  res.status(200).json({ message: "update deleted" });
});

/**
 * Update Point
 */
router.get(`${updatePoint}`, (req, res) => {
  res.status(200).json({ message: "update points list" });
});
router.get(`${updatePoint}/:id`, (req, res) => {
  res.status(200).json({ message: "update point by ID" });
});
router.post(
  `${updatePoint}`,
  ...validate.updatePoint.post,
  handleInputErrors,
  (req, res) => {
    res.status(200).json({ message: "new update point" });
  }
);
router.put(
  `${updatePoint}/:id`,
  ...validate.updatePoint.put,
  handleInputErrors,
  (req, res) => {
    res.status(200).json({ message: "update point edited" });
  }
);
router.delete(`${updatePoint}/:id`, (req, res) => {
  res.status(200).json({ message: "update point deleted" });
});

export default router;
