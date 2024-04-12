import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../../utils/supabase";

export default function FirstNameScreen() {
  const [firstName, setFirstName] = useState("");
  const router = useRouter();

  const updateProfile = async () => {
    const { data } = await supabase.auth.getUser();

    console.log("update Profile called");
    console.log(data);

    if (data.user && data.user.id) {
      console.log(data.user.id);
      const { error } = await supabase
        .from("profiles")
        .update({ first_name: firstName })
        .match({ id: data.user.id });
      if (error) {
        console.log("asdf");
        Alert.alert("Error", error.message);
      } else {
        router.push("/auth/username");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>What's your first name?</Text>
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        value={firstName}
      />
      <Button title="Next" onPress={updateProfile} />
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
