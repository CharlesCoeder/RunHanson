import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../utils/supabase";

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (data.user.email) {
          setUser(data.user.email);
        }
      } catch (error) {
        Alert.alert("Fetch Failed");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.replace("/");
    } catch (error) {
      Alert.alert("Logout Failed");
    }
  };

  return (
    <View style={styles.container}>
      {user && <Text style={styles.userInfo}>Logged in as: {user}</Text>}
      <Button title="Logout" onPress={handleLogout} color="#841584" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 20,
  },
});
