import React from "react";
import { View, Text, FlatList, ActivityIndicator, Alert } from "react-native";
import { Button } from "@rneui/themed"; // or "@rneui/base"
import { useServiceCategories } from "../../hooks/useServiceCategories";
import { supabase } from "../../lib/supabase"; // adjust import to match your setup
import { useRouter } from "expo-router";

async function handleLogout() {
  const { error } = await supabase.auth.signOut();
  const router = useRouter();
  if (error) {
    Alert.alert("Logout Error", error.message);
  } else {
    router.push("(auth)/sign-in");
  }
}

export default function Dashboard() {
  const { categories, loading, error } = useServiceCategories();

  return (
    <View className="flex-1 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">Service Categories</Text>

        <Button title="Logout" type="clear" onPress={handleLogout} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text className="text-red-500">{error}</Text>
      ) : categories.length === 0 ? (
        <Text>No categories available.</Text>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="mb-4 p-4 border rounded">
              <Text className="text-lg font-semibold">{item.name}</Text>
              {item.description && <Text>{item.description}</Text>}
            </View>
          )}
        />
      )}
    </View>
  );
}
