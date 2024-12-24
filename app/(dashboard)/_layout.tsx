import { Stack } from "expo-router/stack";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { Redirect } from "expo-router";

export default function Layout() {
  const { session, userType, loading } = useAuth();

  useEffect(() => {
    if (userType) {
      // fetchJobs(userType);
    }
  }, [userType]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg">Loading...</Text>
      </View>
    );
  }

  if (!session) {
    return <Redirect href={"/"} />;
  }

  return <Stack />;
}
