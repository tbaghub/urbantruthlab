export const metadata = {
  title: "UrbanTruthLab — Intelligence They Don't Want You To Have",
  description: "Street-level economic signals, crypto arbitrage, underground wealth strategies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0A0A0B" }}>
        {children}
      </body>
    </html>
  );
}
