import { Inter } from 'next/font/google';
import MuiProvider from './components/Provider/MuiProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Pokémon Search',
  description: 'Search engine for Pokémon using PokeAPI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MuiProvider>
          {children}
        </MuiProvider>
      </body>
    </html>
  );
}