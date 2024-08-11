import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";

export default function Monitorador({
  planta,
  umidade,
  temperatura,
  solo,
  automatico,
}: {
  planta: number;
  umidade: number;
  temperatura: number;
  solo: number;
  automatico: boolean;
}) {
  const [auto, setAuto] = useState(automatico);
  const [regarTexto, setRegarTexto] = useState("Regar agora");
  const [textoRemover, setTextoRemover] = useState("Remover");

  async function remover() {
    setTextoRemover("Removendo...");
    fetch("https://esp32-agrinho.vercel.app/api/dados", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planta,
      }),
    });
  }

  async function regar() {
    setRegarTexto("Regando...");

    await fetch("https://esp32-agrinho.vercel.app/api/dados", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planta,
        umidade,
        temperatura,
        solo,
        automatico,
        regar: true,
      }),
    });

    setRegarTexto("Regar agora");
  }

  async function irrigacao() {
    const response = await fetch(
      "https://esp32-agrinho.vercel.app/api/dados"
    ).then((res) => res.json());

    response.map(async (item: any) => {
      if (item.planta != planta) return;
      if (item.automatico) {
        setAuto(false);
        await fetch("https://esp32-agrinho.vercel.app/api/dados", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            planta,
            umidade,
            temperatura,
            solo,
            automatico: false,
            regar,
          }),
        });
      } else {
        setAuto(true);
        await fetch("https://esp32-agrinho.vercel.app/api/dados", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            planta,
            umidade,
            temperatura,
            solo,
            automatico: true,
            regar,
          }),
        });
      }
    });
  }

  return (
    <View
      style={{
        margin: 20,
        padding: 20,
        backgroundColor: "#00133d",
        borderRadius: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 25,
          }}
        >
          Planta {planta}
        </Text>

        <Pressable
          style={{
            backgroundColor: "red",
            padding: 10,
            borderRadius: 50,
          }}
          onPress={remover}
        >
          <Text
            style={{
              fontWeight: "700",
              color: "white",
            }}
          >
            {textoRemover}
          </Text>
        </Pressable>
      </View>

      <Text style={{ marginTop: 20, fontSize: 20, color: "white" }}>
        Umidade do ar: {umidade}%
      </Text>
      <Text style={{ fontSize: 20, color: "white" }}>
        Temperatura ambiente: {temperatura}°C
      </Text>
      <Text style={{ fontSize: 20, color: "white" }}>
        Umidade do solo: {solo}%
      </Text>

      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Tipo de irrigação</Text>
        <Pressable
          style={{
            backgroundColor: "#5b9cff",
            padding: 10,
            borderRadius: 20,
          }}
          onPress={irrigacao}
        >
          <Text
            style={{
              fontWeight: "500",
              color: "white",
            }}
          >
            {auto ? "Automático" : "Manual"}
          </Text>
        </Pressable>
      </View>
      <Pressable
        style={{
          backgroundColor: "#5b9cff",
          padding: 10,
          borderRadius: 20,
          marginTop: 20,
        }}
        onPress={regar}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "500",
            fontSize: 20,
          }}
        >
          {regarTexto}
        </Text>
      </Pressable>
    </View>
  );
}
