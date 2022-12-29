import { Router } from "express";

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
router.get(`${product}`, (req, res) => {
  res.status(200).json({ message: "products list" });
});
router.get(`${product}/:id`, (req, res) => {});
router.post(`${product}`, (req, res) => {});
router.put(`${product}/:id`, (req, res) => {});
router.delete(`${product}/:id`, (req, res) => {});

/**
 * Update
 */
router.get(`${update}`, (req, res) => {
  res.status(200).json({ message: "updates list" });
});
router.get(`${update}/:id`, (req, res) => {});
router.post(`${update}`, (req, res) => {});
router.put(`${update}/:id`, (req, res) => {});
router.delete(`${update}/:id`, (req, res) => {});

/**
 * Update Point
 */
router.get(`${updatePoint}`, (req, res) => {
  res.status(200).json({ message: "update points list" });
});
router.get(`${updatePoint}/:id`, (req, res) => {});
router.post(`${updatePoint}`, (req, res) => {});
router.put(`${updatePoint}/:id`, (req, res) => {});
router.delete(`${updatePoint}/:id`, (req, res) => {});

export default router;
