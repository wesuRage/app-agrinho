import { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import Header from "./src/components/Header";
import Monitorador from "./src/components/Monitorador";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://esp32-agrinho.vercel.app/api/dados"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading)
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "500" }}>
          Atualizando dados
        </Text>
      </View>
    );

  return (
    <View>
      <Header />
      <ScrollView>
        {data.map((item: any) => {
          return (
            <Monitorador
              key={item.id}
              planta={item.planta}
              umidade={item.umidade}
              temperatura={item.temperatura}
              solo={item.solo}
              automatico={item.automatico}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
