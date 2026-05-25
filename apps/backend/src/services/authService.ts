import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { RegisterRequest, LoginRequest, AuthResponse } from "../types";
import { JwtUtil } from "../utils/jwt";
import {
  ConflictError,
  AuthenticationError,
  NotFoundError,
} from "../utils/errors";
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

export class AuthService {
  static async register(data: RegisterRequest): Promise<AuthResponse> {
    const { email, password, firstName, lastName, role} = data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictError("User with this email already exists");
    }

    // Hash password
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || "12");
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Employee Id
    const employee_code = `RG-${nanoid(4)}`;

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
        employee_code
      },
    });

    // Generate token
    const token = JwtUtil.generateToken({
      userId: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
        role,
        employee_code
      },
      token,
    };
  }

  static async login(data: LoginRequest): Promise<AuthResponse> {
    const { email, password } = data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (!user.isActive) {
      throw new AuthenticationError("Account is deactivated");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AuthenticationError("Invalid credentials");
    }

    // Generate token
    const token = JwtUtil.generateToken({
      userId: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
        employee_code: user.employee_code,
        role: user.role,
      },
      token,
    };
  }

  static async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        employee_code: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }
}
