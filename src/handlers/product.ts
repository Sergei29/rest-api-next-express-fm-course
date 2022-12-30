import { Response, RequestHandler } from "express";

import prisma from "../db";

const handleError = (
  res: Response,
  error: any,
  defaultMessage = "An error occurred"
) => {
  const msg = error instanceof Error ? error.message : defaultMessage;
  res.status(400).json({ message: msg });
};

export const getProducts: RequestHandler = async (req, res) => {
  const { user } = req as Record<string, any>;

  try {
    const productList = await prisma.product.findMany({
      where: {
        belongsToId: user.id,
      },
    });
    res.status(200).json({ data: productList });
    return;
  } catch (error) {
    handleError(res, error, "Failed to fetch products list");
    return;
  }
};

export const getOneProduct: RequestHandler = async (req, res) => {
  const { user } = req as Record<string, any>;
  const { id } = req.params;
  try {
    const productFound = await prisma.product.findFirst({
      where: { id, belongsToId: user.id },
    });

    res.status(200).json({ data: productFound });
  } catch (error) {
    handleError(res, error, "Failed to fetch the product");
    return;
  }
};

export const createProduct: RequestHandler = async (req, res) => {
  const { user } = req as Record<string, any>;
  const { name } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        belongsToId: user.id,
      },
    });
    res.status(200).json({ data: newProduct });
  } catch (error) {
    handleError(res, error, "Failed to create new product");
    return;
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  const { user } = req as Record<string, any>;
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id,
        // belongsToId: user.id
      },
      data: {
        name,
      },
    });

    res.status(200).json({ data: updatedProduct });
  } catch (error) {
    handleError(res, error, "Failed to update the product");
    return;
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  const { user } = req as Record<string, any>;
  const { id } = req.params;
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id,
        // belongsToId: user.id
      },
    });

    res.status(200).json({ data: deletedProduct.id });
  } catch (error) {
    handleError(res, error, "Failed to delete the product");
    return;
  }
};
