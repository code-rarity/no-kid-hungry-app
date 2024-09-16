import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { Button, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { LoggedInUserDetails } from "@/components/account/LoggedInAccountDetails";
import outputs from "./../amplify_outputs.json";
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
    <Authenticator.Provider>
      <Authenticator>
        <ThemedView style={styles.container}>
          <ThemedView style={{paddingHorizontal:15}}>
          </ThemedView>
          <ThemedView style={{paddingHorizontal:15}}>
            <LoggedInUserDetails />
            <SignOutButton />
          </ThemedView>
        </ThemedView>
      </Authenticator>
    </Authenticator.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  signOutButton: {
    alignSelf: "flex-end",
  },
});

export default LoginScreen;