import { StyleSheet, Text, View, TextInput, ActivityIndicator, Image, Alert } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import { Stack } from "expo-router";
import Button from "@components/Button";
import { defaultPizzaImage } from "@components/ProductListItem";
import Colors from "@/constants/Colors";

const CreateProductScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    general: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const resetFields = () => {
    setFormData({ name: "", price: "", description: "" });
    setErrors({ name: "", price: "", description: "", image: "", general: "" });
    setSuccessMessage("");
    setImage(null);
  };

  const validateInput = () => {
    let isValid = true;
    const newErrors = { name: "", price: "", description: "", image: "", general: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
      isValid = false;
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
      isValid = false;
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
      isValid = false;
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
      isValid = false;
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = "Description cannot exceed 500 characters";
      isValid = false;
    }

    if (!image) {
      newErrors.image = "Product image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "", general: "" }));
    setSuccessMessage("");
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "Please allow access to photos to select an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1.91, 1],
      quality: 0.8, // Slightly reduced quality to optimize size
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImage(result.assets[0].uri);
      setErrors((prev) => ({ ...prev, image: "", general: "" }));
    }
  };

  const onCreate = async () => {
    if (!validateInput()) return;

    setIsLoading(true);
    try {
      // Simulated API call (replace with actual API integration)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Creating product:", { ...formData, image });
      setSuccessMessage("Product created successfully!");
      resetFields();
    } catch (error) {
      setErrors((prev) => ({ ...prev, general: "Failed to create product" }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.formContainer}>
        <Stack.Screen options={{ title: "Create Product" }} />

        <Image
          source={{ uri: image || defaultPizzaImage }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text onPress={pickImage} style={styles.textButton}>
          Select Image
        </Text>
        {errors.image && <Text style={styles.errorText}>{errors.image}</Text>}

        <Text style={styles.title}>Create New Product</Text>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
            placeholder="Enter product name"
            style={[styles.input, errors.name && styles.inputError]}
            autoCapitalize="words"
            maxLength={100}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        {/* Price Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Price (Rs)</Text>
          <TextInput
            value={formData.price}
            onChangeText={(text) => handleInputChange("price", text.replace(/[^0-9.]/g, ""))}
            placeholder="999.99"
            style={[styles.input, errors.price && styles.inputError]}
            keyboardType="decimal-pad"
            maxLength={10}
          />
          {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
        </View>

        {/* Description Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description (Optional)</Text>
          <TextInput
            value={formData.description}
            onChangeText={(text) => handleInputChange("description", text)}
            placeholder="Enter product description"
            style={[styles.input, styles.textArea, errors.description && styles.inputError]}
            multiline
            numberOfLines={4}
            maxLength={500}
          />
          {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
        </View>

        {/* Success/Error Messages */}
        {successMessage && <Text style={styles.successText}>{successMessage}</Text>}
        {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

        {/* Submit Button */}
        <Button
          onPress={onCreate}
          text={isLoading ? "Creating..." : "Create Product"}
          disabled={isLoading}
          style={[styles.submitButton, isLoading && styles.disabledButton]}
        />

        {/* Reset Button */}
        <Button
          onPress={resetFields}
          text="Reset Form"
          disabled={isLoading}
          style={styles.resetButton}
          textStyle={styles.resetButtonText}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  inputError: {
    borderColor: "#ff3333",
  },
  errorText: {
    color: "#ff3333",
    fontSize: 14,
    marginTop: 4,
  },
  successText: {
    color: "#28a745",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  disabledButton: {
    backgroundColor: "#99c2ff",
    opacity: 0.7,
  },
  resetButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#666",
    paddingVertical: 14,
    borderRadius: 8,
  },
  resetButtonText: {
    color: "#666",
  },
  image: {
    width: "50%",
    aspectRatio: 1.91,
    alignSelf: "center",
    borderRadius: 8,
    marginVertical: 10,
  },
  textButton: {
    textAlign: "center",
    marginVertical: 10,
    color: Colors.light.tint,
    fontWeight: "bold",
    fontSize: 16,
  },
});