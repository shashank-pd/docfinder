import './globals.css'

export const metadata = {
  title: 'DocFinder',
  description: 'Find doctors with ease',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}