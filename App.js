import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeUi } from "./screens/Home";
import { RegisterUI } from "./screens/Register";
import { NoteUi } from "./screens/Note";
import { NewNoteUi } from "./screens/NewNote";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeUi} />
        <Stack.Screen name="Register" component={RegisterUI} />
        <Stack.Screen name="Note" component={NoteUi} />
        <Stack.Screen name="NewNote" component={NewNoteUi} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
