import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMemorySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Get all memories
  app.get("/api/memories", async (req, res) => {
    try {
      const memories = await storage.getAllMemories();
      res.json(memories);
    } catch (error) {
      console.error("Error fetching memories:", error);
      res.status(500).json({ error: "Failed to fetch memories" });
    }
  });

  // Get a single memory
  app.get("/api/memories/:id", async (req, res) => {
    try {
      const memory = await storage.getMemory(req.params.id);
      if (!memory) {
        return res.status(404).json({ error: "Memory not found" });
      }
      res.json(memory);
    } catch (error) {
      console.error("Error fetching memory:", error);
      res.status(500).json({ error: "Failed to fetch memory" });
    }
  });

  // Create a new memory
  app.post("/api/memories", async (req, res) => {
    try {
      const body = {
        ...req.body,
        date: new Date(req.body.date),
      };
      
      const parsed = insertMemorySchema.parse(body);
      const memory = await storage.createMemory(parsed);
      res.status(201).json(memory);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating memory:", error);
      res.status(500).json({ error: "Failed to create memory" });
    }
  });

  // Update a memory (including toggle favorite)
  app.patch("/api/memories/:id", async (req, res) => {
    try {
      const updates = { ...req.body };
      if (updates.date) {
        updates.date = new Date(updates.date);
      }
      
      const memory = await storage.updateMemory(req.params.id, updates);
      if (!memory) {
        return res.status(404).json({ error: "Memory not found" });
      }
      res.json(memory);
    } catch (error) {
      console.error("Error updating memory:", error);
      res.status(500).json({ error: "Failed to update memory" });
    }
  });

  // Delete a memory
  app.delete("/api/memories/:id", async (req, res) => {
    try {
      const success = await storage.deleteMemory(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Memory not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting memory:", error);
      res.status(500).json({ error: "Failed to delete memory" });
    }
  });

  return httpServer;
}
