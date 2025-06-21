import express, { Request, Response } from "express";
import { User } from "../models/userModel";
import { z } from "zod";

export const userRoutes = express.Router();

const CreateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
  address: z.object({
    city: z.string(),
    street: z.string(),
    zip: z.number(),
  }),
});

userRoutes.post("/create", async (req: Request, res: Response) => {
  try {
    const body = await CreateUserZodSchema.parseAsync(req.body);

    // const body = req.body

    const user = await User.create(body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

userRoutes.get("/", async (req: Request, res: Response) => {
  const allUser = await User.find();
  res.status(200).json({
    success: true,
    allUser,
  });
});

userRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  res.status(200).json({
    success: true,
    user,
  });
});

userRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedBody = req.body;
  const notes = await User.findByIdAndUpdate(userId, updatedBody, {
    new: true,
  });

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    notes,
  });
});

userRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findByIdAndDelete(userId);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    user,
  });
});
