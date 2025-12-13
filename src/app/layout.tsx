import { Montserrat, Nunito } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap'
});

const nunito = Nunito({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap'
});

export const metadata = {
  title: 'Consiliul Național al Elevilor - Fii vocea colegilor tăi!',
  description: 'Consiliul Național al Elevilor este o structură independentă, ce menține o poziție neutră față de orice cult religios, asociație religioasă, partid sau formațiune politică, acționând exclusiv în interesul elevilor.',
  robots: 'max-image-preview:large',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro-RO" className={`${montserrat.variable} ${nunito.variable}`}>
      <head>
        <link rel="icon" href="/images/logo.png" sizes="32x32" />
      </head>
      <body>
        <div id="Wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}
