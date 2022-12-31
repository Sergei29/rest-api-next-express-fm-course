import { RequestHandler } from "express";

import { errorTypes } from "../constants";
import prisma from "../db";

export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req as Record<string, any>;
    const productList = await prisma.product.findMany({
      where: {
        belongsToId: user.id,
      },
    });
    res.status(200).json({ data: productList });
    return;
  } catch (error) {
    error.type = errorTypes.getProductsError;
    next(error);
    return;
  }
};

export const getOneProduct: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req as Record<string, any>;
    const { id } = req.params;
    const productFound = await prisma.product.findFirst({
      where: { id, belongsToId: user.id },
    });
    res.status(200).json({ data: productFound });
    return;
  } catch (error) {
    error.type = errorTypes.getOneProductError;
    next(error);
    return;
  }
};

export const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req as Record<string, any>;
    const { name } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        name,
        belongsToId: user.id,
      },
    });
    res.status(200).json({ data: newProduct });
    return;
  } catch (error) {
    error.type = errorTypes.createProductError;
    next(error);
    return;
  }
};

export const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req as Record<string, any>;
    const { id } = req.params;
    const { name } = req.body;
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
    error.type = errorTypes.updateProductError;
    next(error);
    return;
  }
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req as Record<string, any>;
    const { id } = req.params;
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
    error.type = errorTypes.deleteProductError;
    next(error);
    return;
  }
};
