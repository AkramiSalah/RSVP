// app/layout.js
import './globals.css';
import ClientComponent from '../components/ClientComponent';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900" suppressHydrationWarning={true}>
        <ClientComponent>
          {children}
        </ClientComponent>
      </body>
    </html>
  );
}
