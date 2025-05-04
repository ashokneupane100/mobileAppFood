import { Stack,Link } from "expo-router";
import { Text, View, Animated,Pressable, } from "react-native";
import { useEffect, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from '@/constants/Colors'

export default function MenuStack() {
  // Animation setup for fade and slide
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  // Animation setup for glowing stars
  const glowAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    // Fade and slide animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous glowing star animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.6,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim, slideAnim, glowAnim]);

  const glowStyle = {
    opacity: glowAnim,
    transform: [{ scale: glowAnim }],
  };

  return (
    <Stack screenOptions={{
      headerRight: () => (
        <Link href="/cart" asChild>
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name="shopping-cart"
                size={25}
                color={Colors.light.tint}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      )

    }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => (
            <View
              style={{
                backgroundColor: "#341C02",
                paddingVertical: 1,
                paddingHorizontal: 10,
                marginTop: 12,
                marginBottom: 5,
                borderRadius: 16,
                alignItems: "center",
              }}
            >
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Animated.Text style={[glowStyle, { color: "#ffd700", fontSize: 16, marginRight: 5 }]}>
                  ✨
                </Animated.Text>
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#fff",
                      textAlign: "center",
                      textShadowColor: "rgba(0, 0, 0, 0.2)",
                      textShadowOffset: { width: 1, height: 1 },
                      textShadowRadius: 3,
                    }}
                  >
                    Pizza Ordering App
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#fff",
                      textAlign: "center",
                      marginTop: 3,
                    }}
                  >
                    made by Ashok Neupane
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#fff",
                      textAlign: "center",
                      marginTop: 3,
                    }}
                  >
                    💖 Made with Love 💖
                  </Text>
                </View>
                <Animated.Text style={[glowStyle, { color: "#ffd700", fontSize: 16, marginLeft: 5 }]}>
                  ✨
                </Animated.Text>
              </Animated.View>
            </View>
          ),
          headerStyle: {
            backgroundColor: "#fff8f0",
          },
        }}
      />
    </Stack>
  );
}