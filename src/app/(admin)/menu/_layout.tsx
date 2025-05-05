import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function MenuStack() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.tint, // Blue background to match admin theme
          shadowColor: "#000", // Subtle shadow for depth
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 5, // For Android shadow
        },
        headerTintColor: Colors.light.background, // White back button/icon
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
          color: Colors.light.background, // White title for contrast
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Admin Part, Add Items",
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-square-o"
                    size={25}
                    color={Colors.light.background}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Product Details",
          // We'll define headerRight in ProductDetailsScreen
        }}
      />
    </Stack>
  );
}