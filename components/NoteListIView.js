import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export function NoteListViewUi({ item }) {
    const [imgUrl,setImgUrl] = useState("");
    if(item.category === "study")
        // setImgUrl("../assets/images/note_images/study.png");
  return (
    <View style={styles.mainView}>
        <View style={styles.imageView}>
          <Image style={styles.image} source={require("../assets/images/note_images/study.png")}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:"#e3e2de",
        marginStart: 10,
        marginEnd: 10,
        paddingTop:10,
        paddingBottom: 10,
        paddingStart:2
    },
    imageView:{
        width: 60,
        height:60,
        alignItems: "center",
        justifyContent:"center",
        borderRadius:50,
        backgroundColor:"#deebce",
        objectFit:"contain"
    },
    image:{
    width: 50,
    height:50
    }
});
