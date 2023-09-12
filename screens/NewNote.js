import { Image, Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

export function NewNoteUi() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Ubuntu-Regular": require("../assets/fonts/Ubuntu-Regular.ttf"),
  });

  if (fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.headerView}>
          <View style={styles.firstView}>
            <Image
              style={styles.backBtn}
              source={require("../assets/images/back.png")}
            />
          </View>
          <View style={styles.secondView}>
            <Pressable>
                <View style={styles.saveButton}>

                </View>
            </Pressable>
          </View>
        </View>
        <View style={styles.contentView}></View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerView: {
    flex: 1,
    // backgroundColor: "red",
    justifyContent: "center",
    marginStart: 15,
    marginEnd: 15,
  },
  contentView: {
    flex: 6,
    // backgroundColor: "yellow",
    // alignItems: "center",
    // justifyContent: "center",
  },
  backBtn: {
    width: 40,
    height: 40,
  },
  saveButton:{
    
  }
});
