// app/api/ratings/route.js

import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Path to ratings data file
const dataFilePath = path.join(process.cwd(), 'data', 'ratings.json');

// Function to ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch (error) {
    // If directory doesn't exist, create it
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Function to read ratings data
async function readRatingsData() {
  try {
    await ensureDataDirectory();
    
    try {
      const data = await fs.readFile(dataFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // If file doesn't exist or is invalid, return default data
      return { ratings: [] };
    }
  } catch (error) {
    console.error('Error reading ratings data:', error);
    return { ratings: [] };
  }
}

// Function to write ratings data
async function writeRatingsData(data) {
  try {
    await ensureDataDirectory();
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing ratings data:', error);
  }
}

// Function to calculate average rating
function calculateAverageRating(ratings) {
  if (ratings.length === 0) {
    return 0;
  }
  
  const sum = ratings.reduce((total, rating) => total + rating.value, 0);
  return sum / ratings.length;
}

// GET handler for fetching ratings
export async function GET() {
  try {
    const data = await readRatingsData();
    const averageRating = calculateAverageRating(data.ratings);
    
    return NextResponse.json({
      averageRating,
      voterCount: data.ratings.length
    });
  } catch (error) {
    console.error('Error in GET ratings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ratings' },
      { status: 500 }
    );
  }
}

// POST handler for submitting ratings
export async function POST(request) {
  try {
    const body = await request.json();
    const { rating } = body;
    
    // Validate rating
    if (!rating || rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return NextResponse.json(
        { error: 'Invalid rating. Must be an integer between 1 and 5.' },
        { status: 400 }
      );
    }
    
    // Read existing data
    const data = await readRatingsData();
    
    // Add new rating with timestamp
    data.ratings.push({
      value: rating,
      timestamp: new Date().toISOString()
    });
    
    // Write updated data
    await writeRatingsData(data);
    
    // Calculate new average
    const averageRating = calculateAverageRating(data.ratings);
    
    return NextResponse.json({
      averageRating,
      voterCount: data.ratings.length
    });
  } catch (error) {
    console.error('Error in POST ratings:', error);
    return NextResponse.json(
      { error: 'Failed to submit rating' },
      { status: 500 }
    );
  }
}