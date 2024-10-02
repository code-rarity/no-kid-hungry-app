import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react-native";
import { LoggedInAccountDetails } from "@/components/account/LoggedInAccountDetails";
import outputs from "@/amplify_outputs.json";
import { getValueFor } from "@/helpers/misc";
Amplify.configure(outputs);

const AccountScreen = () => {
  return (
    <Authenticator>
      <ThemedView style={styles.container}>
        <LoggedInAccountDetails />
      </ThemedView>
    </Authenticator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal:15,
  }
});

export default AccountScreen;