import {
  Alert,
  BackHandler,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import moment from "moment";
import DropDownPicker from "react-native-dropdown-picker";
import { useFocusEffect } from "@react-navigation/native";
import { ErrorUi } from "../components/Error";

export function NewNoteUi({ navigation,route }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Personal", value: "personal" },
    { label: "Study", value: "study" },
    { label: "Work", value: "work" },
    { label: "Travel", value: "travel" },
  ]);

  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Ubuntu-Regular": require("../assets/fonts/Ubuntu-Regular.ttf"),
  });

  const [date, setDate] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [error_1, setError_1] = useState(null);
  const [error_2, setError_2] = useState(null);
  const [error_3, setError_3] = useState(null);

  const getCurrentTime = () => {
    const date = moment().utcOffset("+5.30").format("DD MMM Y hh:mm a");
    setDate(date);
  };

  const [height, setHeight] = useState(40);

  useEffect(() => {
    getCurrentTime();
  });

  function updateSize(height) {
    setHeight(height);
  }

  // Back Button

  // const backAction = () => {
  //   //   Alert.alert("Message","ok");
  //   // saveData();
  //   // alert(value);
  //   // const d = await saveData();
  //   // alert(d);
  //   return false;
  // };

  // useEffect(() => {
  //   const fetch =  () => {
  //     const d =  saveData();
  //     // alert(d);
  //     if (d == 1) navigation.goBack();
  //   };
  //   const handleBackButton = () => {
  //     fetch();
  //     return true;
  //   };
  //   BackHandler.addEventListener("hardwareBackPress", handleBackButton);

  //   // return () =>
  //   //   BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
  // }, []);

  async function saveData() {
    const response = await fetch("http://192.168.43.9/MyNotes/save_note.php", {
      method: "POST",
      body: JSON.stringify({
        "title": title,
        "category": value,
        "description": description,
        "date": date,
        "mobile": route.params.mobile
      }),
    });
    const responseText = await response.text();
    if (responseText == "error_1") setError_1("Please enter title");
    else if (responseText == "error_2") setError_2("Please select category");
    else if (responseText == "error_3") setError_3("Please enter description");
    else alert(responseText);
  }

  if (fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.headerView}>
          <View style={styles.firstView}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                style={styles.backBtn}
                source={require("../assets/images/back.png")}
              />
            </Pressable>
          </View>
          <View style={styles.secondView}>
            <Pressable onPress={saveData}>
              <View style={styles.saveButton}>
                <Text style={styles.buttonText}>Save</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.contentView}>
          <View style={styles.dateView}>
            <Text style={styles.date}>{date}</Text>
          </View>
          <View style={styles.noteView}>
            <TextInput
              style={styles.title}
              placeholder="Title"
              onChangeText={setTitle}
              onChange={() => setError_1(null)}
            />
            <View style={{ alignItems: "center" }}>
              <ErrorUi error={error_1} />
            </View>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              disableBorderRadius={true}
              textStyle={{
                fontSize: 18,
                fontFamily: "Montserrat-Regular",
                letterSpacing: 1,
              }}
              style={styles.dropDown}
              dropDownContainerStyle={{ borderWidth: 0, marginStart: 25 }}
              listItemContainerStyle={{ height: 30 }}
              placeholder="Select Category"
              onChangeValue={() => setError_2(null)}
            />
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <ErrorUi error={error_2} />
            </View>
            <TextInput
              style={[styles.description, { height }]}
              placeholder="Description"
              multiline={true}
              onContentSizeChange={(e) => {
                updateSize(e.nativeEvent.contentSize.height);
              }}
              onChangeText={setDescription}
              onChange={() => setError_3(null)}
            />
            <View style={{ alignItems: "center" }}>
              <ErrorUi error={error_3} />
            </View>
          </View>
        </View>
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginStart: 15,
    marginEnd: 15,
    marginTop: 15,
  },
  firstView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  secondView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    marginEnd: 10,
  },
  contentView: {
    flex: 6,
    // backgroundColor: "yellow",
    // alignItems: "center",
    // justifyContent: "center",
  },
  backBtn: {
    width: 35,
    height: 35,
  },
  saveButton: {
    width: 100,
    height: 30,
    backgroundColor: "#f0b11d",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
    color: "white",
  },
  dateView: {
    alignItems: "center",
  },
  date: {
    color: "#b3afaf",
    fontFamily: "Montserrat-Regular",
  },
  noteView: {
    justifyContent: "center",
  },
  title: {
    marginStart: 15,
    marginEnd: 15,
    marginTop: 15,
    width: "auto",
    height: 45,
    fontSize: 18,
    padding: 10,
    fontFamily: "Montserrat-SemiBold",
    letterSpacing: 1,
  },
  dropDown: {
    marginStart: 15,
    marginEnd: 15,
    width: "auto",
    height: 45,
    padding: 10,
    letterSpacing: 1,
    borderWidth: 0,
  },
  description: {
    marginStart: 15,
    marginTop: 5,
    marginEnd: 15,
    width: "auto",
    // height: {height},
    fontSize: 18,
    padding: 10,
    fontFamily: "Montserrat-Regular",
    letterSpacing: 1,
  },
});
