import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { NoteListViewUi } from "./NoteListIView";

export function NoteListUI({ mobile }) {
  const [ui, setUi] = useState(null);

  const [data, setData] = useState(null);

  const getData = async () => {
    const response = await fetch(
      "http://192.168.43.9/MyNotes/search_notes.php",
      {
        method: "POST",
        body: JSON.stringify({
          mobile: mobile,
        }),
      }
    );
    const responseText = await response.json();

    if (responseText.length == 0) {
      setUi(0);
    } else {
      setData(responseText);
      setUi(1);
    }
  };

  useEffect(() => {
    getData();
  });

  if (ui == null) return false;
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
  } else {
    return (
      <View style={{marginBottom:10}}>
        <FlatList
          data={data}
          renderItem={({ item,index }) => {
            return <NoteListViewUi item={item} index={index} />
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentView: {
    flex: 6,
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
});
