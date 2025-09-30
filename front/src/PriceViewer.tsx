import { useEffect, useState } from "react";

export default function PriceViewer() {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    (async () => {})();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:8080/eth_price");
        if (!res.ok) throw new Error("Failed to fetch price");
        const data: EthPrice = await res.json();
        setPrice(data.price);
      } catch (e) {
        setPrice(null);
      }
    })();
  }, []);

  return (
    <div className="p-4 text-xl font-bold">
      ETH Price from RedStone:{" "}
      {price !== null ? `$${price.toFixed(2)}` : "Loading..."}
    </div>
  );
}

interface EthPrice {
  price: number;
  timestamp: number;
  decimals: number;
}
