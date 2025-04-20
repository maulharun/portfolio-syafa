// api/comments/routes.js

import { db } from '../../lib/firebase.js';
import { collection, getDocs, addDoc, query, where, getDoc, doc } from 'firebase/firestore';

// Add this to your existing routes for comments
export async function GET(request) {
  try {
    const ratingsCollection = collection(db, 'ratings');
    const ratingsSnapshot = await getDocs(ratingsCollection);
    
    let totalRating = 0;
    let count = 0;
    
    ratingsSnapshot.forEach((doc) => {
      const ratingData = doc.data();
      totalRating += ratingData.value;
      count++;
    });
    
    const averageRating = count > 0 ? totalRating / count : 0;
    
    return new Response(JSON.stringify({
      averageRating,
      voterCount: count
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch ratings' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { rating } = body;
    
    // Validate rating value
    if (!rating || rating < 1 || rating > 5) {
      return new Response(JSON.stringify({ error: 'Invalid rating value' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Add the new rating
    const ratingsCollection = collection(db, 'ratings');
    await addDoc(ratingsCollection, {
      value: rating,
      createdAt: new Date().toISOString()
    });
    
    // Recalculate average
    const updatedSnapshot = await getDocs(ratingsCollection);
    
    let totalRating = 0;
    let count = 0;
    
    updatedSnapshot.forEach((doc) => {
      const ratingData = doc.data();
      totalRating += ratingData.value;
      count++;
    });
    
    const averageRating = count > 0 ? totalRating / count : 0;
    
    return new Response(JSON.stringify({
      averageRating,
      voterCount: count
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error adding rating:', error);
    return new Response(JSON.stringify({ error: 'Failed to add rating' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}