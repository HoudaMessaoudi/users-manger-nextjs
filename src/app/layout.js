import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

export const metadata = {
  title: "Feefty admin test",
  description: "Nor's take",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className="mx-auto max-w-md">
        <Theme> 
          {children}
        </Theme>
        
        </body>
    </html>
  );
}
