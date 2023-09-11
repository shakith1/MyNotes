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

export function HomeUi({navigation}){
    const [fontsLoaded] = useFonts({
        "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
        "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf")    
      });
    
      if (fontsLoaded) {
        return (
          <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.iconView}>
              <Image source={require("./assets/images/icon.png")} />
            </View>
            <View style={styles.contentView}>
              <TextInput style={styles.input} placeholder="Mobile Number" maxLength={10} inputMode="numeric"/>
              <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}/>
              <Pressable>
                <View style={styles.loginButton}>
                  <Text style={styles.text}>Sign In</Text>
                </View>
              </Pressable>
              <Pressable onPress={()=>navigation.navigate('Register')}>
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
      alignItems: "center"
    },
    input: {
      width: 310,
      height: 45,
      borderWidth: 1,
      fontSize: 18,
      borderRadius: 10,
      padding: 10,
      fontFamily: "Montserrat-Regular",
      margin:5,
      letterSpacing:1
    },
    loginButton:{
      width:310,
      height:45,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#e0b541",
      margin:10,
      borderRadius:10
    },
    registerButton:{
      width:310,
      height:45,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#dec6f7",
      borderRadius:10
    },
    text:{
      fontFamily: "Montserrat-SemiBold",
      fontSize: 20,
      color:"black",
      letterSpacing:1,
    }
  });