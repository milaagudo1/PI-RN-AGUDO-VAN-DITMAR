import Login from "../screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/Register";
import NavegationTab from "./navigationTab";

const Stack = createNativeStackNavigator();

export default function Navegation() {
    console.log("Navegation cargada");
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login}  options = {{headerShown: false}} />
                <Stack.Screen name="Register" component={Register} options = {{headerShown: false}} />
                <Stack.Screen name="NavegationTab" component={NavegationTab} options = {{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
