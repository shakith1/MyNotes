import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeUi } from "./Home";
import { RegisterUI } from "./Register";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeUi} />
        <Stack.Screen name="Register" component={RegisterUI} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
