import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import { ErrorUi } from "../components/Error";

export function RegisterUI({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Employee", value: "employee" },
    { label: "Student", value: "student" },
  ]);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [error_1, setError_1] = useState(null);
  const [error_2, setError_2] = useState(null);
  const [error_3, setError_3] = useState(null);
  const [error_4, setError_4] = useState(null);
  const [error_5, setError_5] = useState(null);
  const [error_6, setError_6] = useState(null);

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
            placeholder="First Name"
            onChangeText={setFname}
            onChange={() => setError_1(null)}
          />
          <ErrorUi error={error_1} />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={setLname}
            onChange={() => setError_2(null)}
          />
          <ErrorUi error={error_2} />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            maxLength={10}
            inputMode="numeric"
            onChangeText={setMobile}
            onChange={() => setError_3(null)}
          />
          <ErrorUi error={error_3} />
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            disableBorderRadius={false}
            textStyle={{
              fontSize: 18,
              fontFamily: "Montserrat-Regular",
              letterSpacing: 1,
            }}
            containerStyle={{ width: 310, margin: 5 }}
            placeholder="Select User Type"
            onChangeValue={() => setError_4(null)}
          />
          <ErrorUi error={error_4} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
            onChange={() => setError_5(null)}
          />
          <ErrorUi error={error_5} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={setCPassword}
            onChange={() => setError_6(null)}
          />
          <ErrorUi error={error_6} />

          <Pressable
            onPress={async () => {
              const response = await fetch(
                "http://192.168.43.9/MyNotes/register.php",
                {
                  method: "POST",
                  body: JSON.stringify({
                    fname: fname,
                    lname: lname,
                    mobile: mobile,
                    type: value,
                    password: password,
                    c_password: cpassword,
                  }),
                }
              );
              const responseText = await response.text();
              if (responseText == "error_1")
                setError_1("Please enter first name");
              else if (responseText == "error_2")
                setError_2("Please enter last name");
              else if (responseText == "error_3")
                setError_3("Please enter mobile");
              else if (responseText == "error_4")
                setError_4("Please select user type");
              else if (responseText == "error_5")
                setError_5("Please enter password");
              else if (responseText == "error_6")
                setError_6("Please enter confirm password");
              else if (responseText == "error_7")
                setError_3("Please enter valid mobile number");
              else if (responseText == "error_8")
                setError_5("Please enter 6 characters long password");
              else if (responseText == "error_9")
                setError_6("Passwords did not match");
              else if (responseText == "error_10")
                setError_6("User already exists. Please Sign In");
              else if (responseText == "success"){
                Alert.alert("Info", "Account created successfully");
                navigation.navigate('Home');
              }
            }}
          >
            <View style={styles.loginButton}>
              <Text style={styles.text}>Create New Account</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Home")} margin={5}>
            <View style={styles.registerButton}>
              <Text style={styles.text}>Sign In</Text>
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
    flex: 1,
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
