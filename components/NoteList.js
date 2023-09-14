import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export function NoteListUI({ mobile }) {
  const [ui, setUi] = useState(null);

  const getData = async () => {
    // alert(ui)
    const response = await fetch(
      "http://192.168.43.9/MyNotes/search_notes.php",
      {
        method: "POST",
        body: JSON.stringify({
          "mobile": mobile,
        }),
      }
    );
    const responseText = await response.json();
    // alert(responseText.length);
    if (responseText.length == 0) setUi(0);
    else setUi(1);
  };

  useEffect(() => {
    getData();
  });
// alert(ui)
  if(ui == null)
  return(
    false
  );

  else if (ui === 0) {
    return (
      <View style={styles.contentView}>
        <Image
          style={styles.image}
          source={require("../assets/images/image.jpg")}
        />
        <Text style={styles.text1}>No Notes to Show</Text>
        <Text style={styles.text2}>Click + to add a new note</Text>
      </View>
    );
  }else{
    return(
        <View>
            <Text>Hello</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    contentView: {
        flex: 6,
        // backgroundColor: "yellow",
        alignItems: "center",
        justifyContent: "center",
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
})
