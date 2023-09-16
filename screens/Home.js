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
import { useEffect, useState } from "react";
import { ErrorUi } from "../components/Error";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function HomeUi({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [error_1, setError_1] = useState(null);
  const [error_2, setError_2] = useState(null);
  const [ui, setUi] = useState(null);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("user", value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      if (jsonValue != null) {
        navigation.navigate("Note");
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (fontsLoaded) {
    // if (ui == null) {
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
                    mobile: mobile,
                    password: password,
                  }),
                }
              );
              const responseText = await response.text();
              if (!responseText.includes("{")) {
                const matches = responseText.match(/"([^"]+)"/);

                if (matches) {
                  if (matches[1] == "error_1")
                    setError_1("Please enter mobile number");
                  else if (matches[1] == "error_2")
                    setError_1("Please enter valid mobile number");
                  else if (matches[1] == "error_3")
                    setError_2("Please enter password");
                  else if (matches[1] == "error_4")
                    setError_2("Incorrect mobile number or password");
                }
              } else {
                storeData(responseText);
                navigation.navigate("Note");
              }
              alert(responseText);
            }}
          >
            <View style={styles.loginButton}>
              <Text style={styles.text}>Sign In</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Register");
              setError_1(null);
              setError_2(null);
            }}
          >
            <View style={styles.registerButton}>
              <Text style={styles.text}>Register</Text>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
}
//   }else
//     navigation.navigate("Note");
// }

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
