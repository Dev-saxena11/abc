import {
  type User,
  type InsertUser,
  type Memory,
  type InsertMemory,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllMemories(): Promise<Memory[]>;
  getMemory(id: string): Promise<Memory | undefined>;
  createMemory(memory: InsertMemory): Promise<Memory>;
  updateMemory(id: string, updates: Partial<Memory>): Promise<Memory | undefined>;
  deleteMemory(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private memories: Map<string, Memory>;

  constructor() {
    this.users = new Map();
    this.memories = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllMemories(): Promise<Memory[]> {
    return Array.from(this.memories.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getMemory(id: string): Promise<Memory | undefined> {
    return this.memories.get(id);
  }

  async createMemory(insertMemory: InsertMemory): Promise<Memory> {
    const id = randomUUID();
    const memory: Memory = {
      id,
      title: insertMemory.title,
      description: insertMemory.description,
      date: insertMemory.date,
      category: insertMemory.category as Memory["category"],
      imageUrl: insertMemory.imageUrl,
      isFavorite: insertMemory.isFavorite ?? false,
    };
    this.memories.set(id, memory);
    return memory;
  }

  async updateMemory(id: string, updates: Partial<Memory>): Promise<Memory | undefined> {
    const existing = this.memories.get(id);
    if (!existing) return undefined;
    
    const updated: Memory = { ...existing, ...updates, id };
    this.memories.set(id, updated);
    return updated;
  }

  async deleteMemory(id: string): Promise<boolean> {
    return this.memories.delete(id);
  }
}

export const storage = new MemStorage();
