import { StatusBar } from "expo-status-bar";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import { useState } from "react";
import { ErrorUi } from "../components/Error";

export function HomeUi({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [error_1, setError_1] = useState(null);
  const [error_2, setError_2] = useState(null);

  if (fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.iconView}>
          <Image source={require("../assets/images/icon.png")} />
        </View>
        <View style={styles.contentView}>
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            maxLength={10}
            inputMode="numeric"
            onChangeText={setMobile}
            onChange={() => setError_1(null)}
          />
          <ErrorUi error={error_1} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
            onChange={() => setError_2(null)}
          />
          <ErrorUi error={error_2} />
          <Pressable
            onPress={async () => {
              const response = await fetch(
                "http://192.168.43.9/MyNotes/signin.php",
                {
                  method: "POST",
                  body: JSON.stringify({
                    "mobile": mobile,
                    "password": password,
                  }),
                }
              );
              const responseText = await response.text();
              // if (responseText == "error_1")
              //   setError_1("Please enter mobile number");
              // else if (responseText == "error_2")
              //   setError_1("Please enter valid mobile number");
              // else if (responseText == "error_3")
              //   setError_2("Please enter password");
              //   else if (responseText == "error_4")
              //   setError_2("Incorrect mobile number or password");
              //   else if (responseText == "success")
                  navigation.navigate("Note",{"mobile":mobile});
            }}
          >
            <View style={styles.loginButton}>
              <Text style={styles.text}>Sign In</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => {
            navigation.navigate("Register");
            setError_1(null);
            setError_2(null);
            }}>
            <View style={styles.registerButton}>
              <Text style={styles.text}>Register</Text>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  iconView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  contentView: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    width: 310,
    height: 45,
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 10,
    padding: 10,
    fontFamily: "Montserrat-Regular",
    margin: 5,
    letterSpacing: 1,
  },
  loginButton: {
    width: 310,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0b541",
    margin: 10,
    borderRadius: 10,
  },
  registerButton: {
    width: 310,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dec6f7",
    borderRadius: 10,
  },
  text: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 20,
    color: "black",
    letterSpacing: 1,
  },
});
