// app/api/chat/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message } = await request.json();
    
    // Simple chatbot logic
    const reply = getSimpleResponse(message);
    
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error processing message:', error);
    return NextResponse.json({ error: 'Error processing your message' }, { status: 500 });
  }
}

// Simple response logic
function getSimpleResponse(message) {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('halo') || lowerMsg.includes('hai') || lowerMsg.includes('hi')) {
    return 'Halo! Ada yang bisa saya bantu?';
  } else if (lowerMsg.includes('nama')) {
    return 'Saya adalah ChatBot AI milik Syafa. Senang berkenalan dengan Anda!';
  } else if (lowerMsg.includes('syafa')) {
    return 'Syafa adalah seorang mahasiswa semester 4 yang memiliki ketertarikan di bidang administrasi.';
  } else if (lowerMsg.includes('skill') || lowerMsg.includes('kemampuan')) {
    return 'Syafa memiliki kemampuan dalam Microsoft Office, administrasi, dan aktif berorganisasi.';
  } else if (lowerMsg.includes('kontak') || lowerMsg.includes('hubungi')) {
    return 'Anda dapat menghubungi Syafa melalui halaman Contact.';
  } else if (lowerMsg.includes('terima kasih') || lowerMsg.includes('makasih')) {
    return 'Sama-sama! Ada yang bisa saya bantu lagi?';
  } else {
    return 'Maaf, saya tidak mengerti. Bisa dijelaskan lebih spesifik?';
  }
}