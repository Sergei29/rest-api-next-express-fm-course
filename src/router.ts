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
router.get(`${product}/:id`, (req, res) => {
  res.status(200).json({ message: "product by ID" });
});
router.post(`${product}`, (req, res) => {
  res.status(200).json({ message: "new product created" });
});
router.put(`${product}/:id`, (req, res) => {
  res.status(200).json({ message: "product updated" });
});
router.delete(`${product}/:id`, (req, res) => {
  res.status(200).json({ message: "product deleted" });
});

/**
 * Update
 */
router.get(`${update}`, (req, res) => {
  res.status(200).json({ message: "updates list" });
});
router.get(`${update}/:id`, (req, res) => {
  res.status(200).json({ message: "update by ID" });
});
router.post(`${update}`, (req, res) => {
  res.status(200).json({ message: "new update created" });
});
router.put(`${update}/:id`, (req, res) => {
  res.status(200).json({ message: "update edited" });
});
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
router.post(`${updatePoint}`, (req, res) => {
  res.status(200).json({ message: "new update point" });
});
router.put(`${updatePoint}/:id`, (req, res) => {
  res.status(200).json({ message: "update point edited" });
});
router.delete(`${updatePoint}/:id`, (req, res) => {
  res.status(200).json({ message: "update point deleted" });
});

export default router;
