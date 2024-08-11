// @ts-nocheck

import { useState } from "react";
import { View, Text, Button, Pressable, TextInput } from "react-native";

export default function Header() {
  const [adicionar, setAdicionar] = useState(false);
  const [planta, setPlanta] = useState("");

  async function enviarPlanta() {
    await fetch("https://esp32-agrinho.vercel.app/api/dados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planta: parseInt(planta),
      }),
    });

    setAdicionar(!adicionar);
  }

  return (
    <View>
      <View
        style={{
          backgroundColor: "#00133d",
          width: "100vw",
          height: 100,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomColor: "#5b9cff",
          borderWidth: 2,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            marginStart: 20,
            fontFamily: "System",
          }}
        >
          Agrinho 2024
        </Text>

        <Pressable
          style={{
            backgroundColor: "#5b9cff",
            padding: 10,
            borderRadius: 20,
            marginEnd: 20,
          }}
          onPress={() => setAdicionar(!adicionar)}
        >
          <Text
            style={{
              fontWeight: "500",
              color: "white",
            }}
          >
            Adicionar Nova Planta
          </Text>
        </Pressable>
      </View>
      {adicionar && (
        <View
          style={{
            backgroundColor: "#00133d",
            margin: 20,
            padding: 20,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
            }}
          >
            Identificação da planta:{" "}
          </Text>
          <TextInput
            style={{
              backgroundColor: "white",
              marginTop: 20,
              marginBottom: 20,
            }}
            onChangeText={(numeroPlanta) => setPlanta(numeroPlanta)}
          />
          <Pressable
            style={{
              backgroundColor: "#5b9cff",
              padding: 10,
              borderRadius: 20,
              marginEnd: 20,
              width: "100%",
            }}
            onPress={enviarPlanta}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Adicionar
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
