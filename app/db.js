// db.js
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'comments.json');

// Ensure the data directory exists
const ensureDirectory = () => {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Initialize the database if it doesn't exist
const initializeDb = () => {
  ensureDirectory();
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ comments: [] }));
  }
};

// Get all comments
export const getComments = () => {
  try {
    initializeDb();
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data).comments;
  } catch (error) {
    console.error('Error reading comments:', error);
    return [];
  }
};

// Add a new comment
export const addComment = (comment) => {
  try {
    initializeDb();
    const data = fs.readFileSync(DB_PATH, 'utf8');
    const db = JSON.parse(data);
    
    // Add timestamp and ID to comment
    const newComment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    db.comments.push(newComment);
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    return newComment;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('Failed to add comment');
  }
};