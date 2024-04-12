import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../../utils/supabase";

export default function UsernameScreen() {
  const initialUsername = `runner${Math.floor(
    100000 + Math.random() * 900000
  )}`;

  const [username, setUsername] = useState(initialUsername);
  const router = useRouter();

  const updateProfile = async () => {
    const { data } = await supabase.auth.getUser();
    const trimmedUsername = username.trim();

    if (trimmedUsername.length < 5) {
      Alert.alert(
        "Username Too Short",
        "Please choose a username with at least 5 characters."
      );
      return;
    }

    if (data.user && data.user.id) {
      const { error } = await supabase
        .from("profiles")
        .update({ username: trimmedUsername })
        .match({ id: data.user.id });

      if (error) {
        Alert.alert("Username is taken!");
      } else {
        router.push("/(tabs)");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Choose a username:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        autoCapitalize="none"
      />
      <Button title="Finish" onPress={updateProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});
