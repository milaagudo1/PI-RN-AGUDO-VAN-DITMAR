import Login from "./screens/login";
import Home from "./screens/home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Pressable } from "react-native";

const Stack = createStackNavigator();

export default function Navegation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="NavegacionTab" component={NavegacionTab} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

<Pressable>
    onPress={() => navigation.navigate("Home")}
</Pressable>