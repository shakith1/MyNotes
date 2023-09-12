import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export function NoteUi({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Ubuntu-Regular": require("../assets/fonts/Ubuntu-Regular.ttf"),
  });

  if (fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.headerView}>
          <View style={styles.header}>
            <View style={styles.headerTitle}>
              <Text style={styles.title}>My Notes</Text>
            </View>
            <View style={styles.headerContent}>
              <View style={styles.headerButtonView}>
              <Image
                  style={styles.add}
                  source={require("../assets/images/plus.png")}
                />
              </View>
              <View style={styles.headerMenuView}>
                <Image
                  style={styles.menu}
                  source={require("../assets/images/menu.png")}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.contentView}>
          <Image
            style={styles.image}
            source={require("../assets/images/image.jpg")}
          />
          <Text style={styles.text1}>No Notes to Show</Text>
          <Text style={styles.text2}>Click + to add a new note</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  headerView: {
    flex: 1,
    // backgroundColor: "red",
    justifyContent: "center",
    marginStart: 15,
    marginEnd: 15,
  },
  header: {
    flexDirection: "row",
  },
  headerTitle: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerButtonView: { 
    // backgroundColor: "red" 
    justifyContent:"center",
    alignItems:"center"
  },
  headerMenuView: {
    //  backgroundColor: "yellow" 
    justifyContent:"center",
    alignItems:"center"
},
  contentView: {
    flex: 6,
    // backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "Ubuntu-Regular",
    color: "#f0b11d",
  },
  image: {
    width: 150,
    height: 150,
  },
  text1: {
    marginTop: 10,
    fontSize: 14,
    color: "#b0acac",
    fontFamily: "Montserrat-Regular",
  },
  text2: {
    color: "#b0acac",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    marginBottom: 100,
  },
  menu: {
    width: 25,
    height: 25,
  },
  add: {
    width: 23,
    height:23,
    marginEnd: 25
  },
});
