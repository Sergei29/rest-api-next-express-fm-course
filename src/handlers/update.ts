import { RequestHandler } from "express";

import { errorTypes } from "../constants";
import prisma from "../db";

/**
 * @description fins all updates for user's products
 * @param {string} userId current user's ID
 * @returns {Array<Update>} a list of updates found
 */
const getUserProductUpdates = async (userId: string) => {
  const products = await prisma.product.findMany({
    where: { belongsToId: userId },
    include: {
      updates: true,
    },
  });

  return products.reduce(
    (allUpdates, currentProd) => [...allUpdates, ...currentProd.updates],
    [] as Record<string, any>[]
  );
};

export const getUpdates: RequestHandler = async (req, res, next) => {
  /**
   * The best way would be to pass `?productId=abcd` query string to the GET request, then to find all updates for a given product,
   * BUT, for a sake of this course we are going to get here all updates for all user's products
   */
  try {
    const { user } = req as Record<string, any>;
    // products updates for a given user
    const updates = await getUserProductUpdates(user.id);

    res.status(200).json({ data: updates });
    return;
  } catch (error) {
    error.type = errorTypes.getUpdatesError;
    next(error);
    return;
  }
};

export const getOneUpdate: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateFound = await prisma.update.findUnique({
      where: { id },
    });

    res.status(200).json({ data: updateFound });
    return;
  } catch (error) {
    error.type = errorTypes.getOneUpdateError;
    next(error);
    return;
  }
};

export const createUpdate: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req as Record<string, any>;
    const { productId, title, body, status, version, asset } = req.body;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product || product.belongsToId !== user.id) {
      throw new Error("Not authorized");
    }

    const newUpdate = await prisma.update.create({
      data: {
        title,
        body,
        status,
        version,
        asset,
        product: {
          connect: {
            id: product.id,
          },
        },
      },
    });
    res.status(200).json({ data: newUpdate });
    return;
  } catch (error) {
    error.type = errorTypes.createUpdateError;
    next(error);
    return;
  }
};

export const updateUpdate: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req as Record<string, any>;
    const { title, body, status, version, asset } = req.body;
    const updates = await getUserProductUpdates(user.id);
    const foundUpdate = updates.find((current) => current.id === id);

    if (!foundUpdate) {
      throw new Error("Not authorized");
    }

    const editedUpdate = await prisma.update.update({
      where: { id },
      data: {
        title,
        body,
        status,
        version,
        asset,
        updatedAt: new Date().toISOString(),
      },
    });
    res.status(200).json({ data: editedUpdate });
    return;
  } catch (error) {
    error.type = errorTypes.updateUpdateError;
    next(error);
    return;
  }
};

export const deleteUpdate: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req as Record<string, any>;
    const { id } = req.params;
    const updates = await getUserProductUpdates(user.id);
    const foundUpdate = updates.find((current) => current.id === id);

    if (!foundUpdate) {
      throw new Error("Not authorized");
    }

    const deleted = await prisma.update.delete({
      where: { id },
    });

    res.status(200).json({ data: deleted });
  } catch (error) {
    error.type = errorTypes.deleteUpdateError;
    next(error);
    return;
  }
};
