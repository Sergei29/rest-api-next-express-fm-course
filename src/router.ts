import { Router } from "express";

import { handleInputErrors } from "./modules/middleware";
import { validate } from "./constants/routesValidation";
import {
  getProducts,
  getOneProduct,
  updateProduct,
  createProduct,
  deleteProduct,
  getUpdates,
  getOneUpdate,
  createUpdate,
  updateUpdate,
  deleteUpdate,
} from "./handlers";

const router = Router();
const endPoints = {
  product: "/product",
  update: "/update",
  updatePoint: "/updatepoint",
} as const;

const { product, update, updatePoint } = endPoints;

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
router.get(`${update}`, getUpdates);
router.get(`${update}/:id`, getOneUpdate);
router.post(
  `${update}`,
  ...validate.update.post,
  handleInputErrors,
  createUpdate
);
router.put(
  `${update}/:id`,
  ...validate.update.put,
  handleInputErrors,
  updateUpdate
);
router.delete(`${update}/:id`, deleteUpdate);

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
