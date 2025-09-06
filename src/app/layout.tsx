import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CoreoForm - Criador de Coreografias',
  description: 'Ferramenta profissional para criação e sincronização de coreografias com áudio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}