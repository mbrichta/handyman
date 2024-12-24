import React, { useState } from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import { Button, Input, ButtonGroup } from "@rneui/themed";
import { Link } from "expo-router";
import { supabase } from "../../lib/supabase";

const ROLES = ["Customer", "Professional"];

export default function SignUp() {
  const [roleIndex, setRoleIndex] = useState(0);
  const role = ROLES[roleIndex].toLowerCase(); // "customer" | "professional"

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
            fullname: `${firstName} ${lastName}`,
            username,
          },
        },
      });

      if (error) {
        Alert.alert("Error message", error.message);
      } else if (!session) {
        Alert.alert(
          "Check your inbox",
          "Please verify your email to continue."
        );
      }
    } catch (err: any) {
      Alert.alert("Error message", err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView className="p-4">
      <View className="mb-4 items-center">
        <Text className="mb-2 font-bold">Select Account Type</Text>
        <ButtonGroup
          buttons={ROLES}
          selectedIndex={roleIndex}
          onPress={(index) => {
            setRoleIndex(index);
          }}
        />
      </View>

      <View className="mb-4">
        <Input
          label="First Name"
          leftIcon={{ type: "font-awesome", name: "user" }}
          onChangeText={setFirstName}
          value={firstName}
          placeholder="John"
        />
      </View>

      <View className="mb-4">
        <Input
          label="Last Name"
          leftIcon={{ type: "font-awesome", name: "user" }}
          onChangeText={setLastName}
          value={lastName}
          placeholder="Doe"
        />
      </View>

      <View className="mb-4">
        <Input
          label="Username"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={setUsername}
          value={username}
          placeholder="johnDoe123"
          autoCapitalize="none"
        />
      </View>

      <View className="mb-4">
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={setEmail}
          value={email}
          placeholder="example@email.com"
          autoCapitalize="none"
        />
      </View>
      <View className="mb-4">
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={setPassword}
          value={password}
          placeholder="********"
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      <View className="mb-4">
        <Button title="Sign Up" onPress={signUpWithEmail} loading={loading} />
      </View>

      <View className="mb-4">
        <Text className="text-center">
          Already have an account? <Link href={"/(auth)/sign-in"}>Sign in</Link>
        </Text>
      </View>
      <View className="mb-4">
        <Text className="text-center">
          Forgot your password?{" "}
          <Link href={"/(auth)/forgot-password"}>Reset password</Link>
        </Text>
      </View>
    </ScrollView>
  );
}
