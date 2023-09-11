import { StyleSheet, Text, View } from "react-native";

export function ErrorUi({ error }) {
  if (error == null) return null;
  else {
    return (
      <View>
        <Text style={styles.errorField}>{error}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorField: {
    color: "red",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
});
