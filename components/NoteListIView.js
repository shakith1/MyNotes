import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export function NoteListViewUi({ item }) {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "RobotoMono-Light": require("../assets/fonts/RobotoMono-Light.ttf"),
  });
  const [imgUrl, setImgUrl] = useState("");

  function getImage() {
    if (item.category === "study")
      setImgUrl(require("../assets/images/note_images/study.png"));
    else if (item.category === "work")
      setImgUrl(require("../assets/images/note_images/work.png"));
    else if (item.category === "personal")
      setImgUrl(require("../assets/images/note_images/personal.png"));
    else if (item.category === "travel")
      setImgUrl(require("../assets/images/note_images/travel.png"));
  }
  useEffect(() => {
    getImage();
  });
  if (fontsLoaded) {
    return (
      <View style={styles.mainView}>
        <View style={styles.dateView}>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.imageView}>
            <Image style={styles.image} source={imgUrl} />
          </View>
          <View style={styles.contentView}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    borderTopWidth:1,
    borderBottomWidth: 1,
    borderColor: "#e3e2de",
    marginStart: 10,
    marginEnd: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingStart: 2,
  },
  content: {
    flexDirection: "row",
  },
  dateView: {
    marginBottom: 2,
    alignItems: "flex-end",
  },
  imageView: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#deebce",
    objectFit: "contain",
  },
  image: {
    width: 50,
    height: 50,
  },
  contentView: {
    marginStart: 15,
    justifyContent: "center",
    flexShrink: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: "Montserrat-SemiBold",
    letterSpacing: 1,
  },
  description: {
    fontSize: 15,
    fontFamily: "Montserrat-Regular",
    letterSpacing: 1,
    // flexShrink:1
  },
  date: {
    fontFamily: "RobotoMono-Light",
    fontSize:13
  },
});
