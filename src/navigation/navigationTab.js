import HomeStack from "./homeStack";
import Profile from "../screens/Profile";
import AddPost from "../screens/AddPost";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function NavigationTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="AddPost" component={AddPost} />
        </Tab.Navigator>
    );
}