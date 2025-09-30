import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";

export default function PriceViewer() {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    async function fetchPrice() {
      try {
        const res = await fetch("http://localhost:8080/eth_price");
        if (!res.ok) throw new Error("Failed to fetch price");
        const data: EthPrice = await res.json();
        setPrice(data.price);
      } catch (e) {
        setPrice(null);
      }
    }
    if (tab === 0) {
      fetchPrice();
      interval = setInterval(fetchPrice, 15000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [tab]);

  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
          <Tab label="Solana" />
          <Tab label="EVM" />
          <Tab label="Ton" />
        </Tabs>
        <Box sx={{ p: 3 }}>
          {tab === 0 && (
            <div className="p-4 text-xl font-bold">
              ETH Price from RedStone:{" "}
              {price !== null ? `$${price.toFixed(2)}` : "Loading..."}
            </div>
          )}
          {tab === 1 && (
            <div className="p-4 text-xl font-bold">
              EVM price tab (coming soon)
            </div>
          )}
          {tab === 2 && (
            <div className="p-4 text-xl font-bold">
              Ton price tab (coming soon)
            </div>
          )}
        </Box>
      </Box>
    </Container>
  );
}

interface EthPrice {
  price: number;
  timestamp: number;
  decimals: number;
}
