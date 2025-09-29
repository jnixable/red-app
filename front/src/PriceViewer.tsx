import { useEffect, useState } from "react";

export default function PriceViewer() {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <>
      ETH Price from RedStone:{" "}
      {price !== null ? `$${price.toFixed(2)}` : "Loading..."}
    </>
  );
}
