import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import { NoteListUI } from "../components/NoteList";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBackHandler } from "@react-native-community/hooks";
import { useIsFocused } from "@react-navigation/native";

export function NoteUi({ navigation}) {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Ubuntu-Regular": require("../assets/fonts/Ubuntu-Regular.ttf"),
  });

  const [username, setUserName] = useState(null);
  const [mobile, setMobile] = useState(null);

  const isFocused = useIsFocused();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      
      if (jsonValue != null) {
        var user = JSON.parse(jsonValue);
        setUserName(user.fname + " " + user.lname);
        setMobile(user.mobile);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useBackHandler(() => {
    if (isFocused) {
      BackHandler.exitApp();
      return true; // Prevent the default back action only on the home page
    }
    return false; // Allow the default back action to occur (navigate to the previous screen)
  });

  if (fontsLoaded) {
    return (
      <MenuProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          <View style={styles.headerView}>
            <View style={styles.header}>
              <View style={styles.headerTitle}>
                <Text style={styles.title}>My Notes</Text>
              </View>

              <View style={styles.headerContent}>
                <View style={styles.headerButtonView}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("NewNote", { mobile: mobile });
                    }}
                  >
                    <Image
                      style={styles.add}
                      source={require("../assets/images/plus.png")}
                    />
                  </Pressable>
                </View>
                <View style={styles.headerMenuView}>
                  <Menu>
                    <MenuTrigger>
                      <Image
                        style={styles.menu}
                        source={require("../assets/images/menu.png")}
                      />
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption style={styles.menuOption} disableTouchable>
                        <Image
                          style={styles.optionIcon}
                          source={require("../assets/images/user.png")}
                        />
                        <Text style={styles.username}>{username}</Text>
                      </MenuOption>
                      <MenuOption
                        style={styles.menuOption}
                        onSelect={() => {
                          Alert.alert('Logout', 'Do you want to logout from My Notes ?', [
                            {
                              text: 'Cancel',
                              onPress: () => null,
                              style: 'cancel',
                            },
                            {
                              text: 'Exit',
                              onPress: async () => {
                                await AsyncStorage.removeItem("user");
                                navigation.navigate("Home");
                              },
                            },
                          ]);
                          
                        }}
                      >
                        <Image
                          style={styles.optionIcon}
                          source={require("../assets/images/logout.png")}
                        />
                        <Text style={styles.username}>Logout</Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.contentView}>
            {mobile != null ? <NoteListUI mobile={mobile} /> : null}
          </View>
        </SafeAreaView>
      </MenuProvider>
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
    justifyContent: "center",
    alignItems: "center",
  },
  headerMenuView: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "Ubuntu-Regular",
    color: "#f0b11d",
  },
  contentView: {
    flex: 6,
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
    height: 23,
    marginEnd: 25,
  },
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    width: 25,
    height: 25,
  },
  username: {
    marginStart: 6,
    fontFamily: "Montserrat-Regular",
  },
});
