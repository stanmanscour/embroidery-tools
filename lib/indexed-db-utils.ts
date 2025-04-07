import { openDB } from "idb";

export type StoredImage = {
  id: string;
  data: string; // base64 string
};

const DB_NAME = "canvas-tool";
const STORE_NAME = "images";
const DB_VERSION = 1;

// Init DB
const getDb = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

// Get all images
export const getAllImages = async (): Promise<StoredImage[]> => {
  const db = await getDb();
  return await db.getAll(STORE_NAME);
};

// Add image (auto-generate ID)
export const addImage = async (data: string): Promise<StoredImage> => {
  const db = await getDb();
  const newImage: StoredImage = {
    id: crypto.randomUUID(), // Génère un ID unique
    data,
  };
  await db.put(STORE_NAME, newImage);
  return newImage;
};

// Remove image by ID
export const removeImage = async (id: string): Promise<void> => {
  const db = await getDb();
  await db.delete(STORE_NAME, id);
};

// Clear all images
export const clearImages = async (): Promise<void> => {
  const db = await getDb();
  await db.clear(STORE_NAME);
};
