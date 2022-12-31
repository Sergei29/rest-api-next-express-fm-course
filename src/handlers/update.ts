import { RequestHandler } from "express";

import prisma from "../db";
import { handleError } from ".";

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

export const getUpdates: RequestHandler = async (req, res) => {
  /**
   * The best way would be to pass `?productId=abcd` query string to the GET request, then to find all updates for a given product,
   * BUT, for a sake of this course we are going to get here all updates for all user's products
   */
  const { user } = req as Record<string, any>;

  try {
    // products updates for a given user
    const updates = await getUserProductUpdates(user.id);

    res.status(200).json({ data: updates });
    return;
  } catch (error) {
    handleError(res, error, "Failed to fetch updates list");
    return;
  }
};

export const getOneUpdate: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const updateFound = await prisma.update.findUnique({
      where: { id },
    });

    res.status(200).json({ data: updateFound });
    return;
  } catch (error) {
    handleError(res, error, "Failed to fetch the update");
    return;
  }
};

export const createUpdate: RequestHandler = async (req, res) => {
  const { user } = req as Record<string, any>;
  const { productId, title, body, status, version, asset } = req.body;
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.body.productId },
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
    handleError(res, error, "Failed to create new update");
    return;
  }
};

export const updateUpdate: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { user } = req as Record<string, any>;
  const { title, body, status, version, asset } = req.body;
  try {
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
    handleError(res, error, "Failed to edit the update");
    return;
  }
};

export const deleteUpdate: RequestHandler = async (req, res) => {
  const { user } = req as Record<string, any>;
  const { id } = req.params;
  try {
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
    handleError(res, error, "Failed to delete the update");
    return;
  }
};
