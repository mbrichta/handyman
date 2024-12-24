import { Link, Redirect, useNavigation } from "expo-router";
import { Text, View, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { Button } from "@rneui/themed";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (session) {
    return <Redirect href={"/(dashboard)/"} />; // Prevent rendering the home page if already signed in
  }

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-4xl font-bold mb-4">Welcome to Handyman</Text>
      <Text className="text-lg text-center mb-4">
        Your one-stop solution for all handyman services.
      </Text>
      <View className="flex-row gap-6">
        <Link href={"/(auth)/sign-in"}>
          <Button title={"Sign In"} />
        </Link>
        <Link href={"/(auth)/sign-up"}>
          <Button title={"Sign Up"} type="clear" />
        </Link>
      </View>
    </View>
  );
}
