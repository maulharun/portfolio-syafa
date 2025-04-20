// app/layout.js
import './globals.css';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import ThemeToggle from './components/ThemeToggle';

export const metadata = {
  title: 'PMOBILE_SYAFA',
  description: 'Portfolio website with AI features',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <ChatBot />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
