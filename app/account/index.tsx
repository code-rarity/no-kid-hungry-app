import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { Button, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { LoggedInAccountDetails } from "@/components/account/LoggedInAccountDetails";
import outputs from "@/amplify_outputs.json";
Amplify.configure(outputs);

const SignOutButton = () => {
  const { signOut } = useAuthenticator();

  return (
    <ThemedView style={styles.signOutButton}>
      <Button title="Sign Out" onPress={signOut} />
    </ThemedView>
  );
};

const LoginScreen = () => {
  return (
    <Authenticator>
      <ThemedView style={styles.container}>
        <LoggedInAccountDetails />
        <SignOutButton />
      </ThemedView>
    </Authenticator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal:15,
  },
  signOutButton: {
    alignSelf: "flex-start",
  },
});

export default LoginScreen;