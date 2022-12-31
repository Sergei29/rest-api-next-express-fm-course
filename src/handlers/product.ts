import { RequestHandler } from "express";

import prisma from "../db";
import { handleError } from ".";

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
    return;
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
    return;
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
        id_belongsToId: {
          id,
          belongsToId: user.id,
        },
      },
      data: {
        name,
      },
    });

    res.status(200).json({ data: updatedProduct });
    return;
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
        id_belongsToId: {
          id,
          belongsToId: user.id,
        },
      },
    });

    res.status(200).json({ data: deletedProduct });
    return;
  } catch (error) {
    handleError(res, error, "Failed to delete the product");
    return;
  }
};
