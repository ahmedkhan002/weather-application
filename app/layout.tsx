import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Atmos — Spatial Weather Intelligence',
  description: 'A cinematic, spatial interface for understanding the atmosphere.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
