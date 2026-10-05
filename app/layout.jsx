import './globals.css';
import './catalogue.css';
export const metadata = { title: 'Water Lily Atelier — One Piece at a Time', description: 'One-of-a-kind handmade gemstone necklaces. Designed around natural pearl, agate and geode, and finished by hand in Pune, India.', icons: { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%2352242c'/%3E%3Ctext x='20' y='28' text-anchor='middle' font-family='Georgia' font-size='27' fill='white'%3EW%3C/text%3E%3C/svg%3E" } };
export default function RootLayout({children}) { return <html lang="en"><body>{children}</body></html>; }
