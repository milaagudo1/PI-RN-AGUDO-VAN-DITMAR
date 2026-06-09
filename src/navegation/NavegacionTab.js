import Home from "../screens/Home";
import Profile from "../screens/Profile";
import AddPost from "../screens/AddPost";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable } from "react-native";

const Tab = createBottomTabNavigator();

export default function NavegacionTab() {
    return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Profile" component={Profile} />
                <Tab.Screen name="AddPost" component={AddPost} />
               
            </Tab.Navigator>
    );
}