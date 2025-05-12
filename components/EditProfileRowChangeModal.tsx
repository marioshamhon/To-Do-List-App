import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

interface EditProfileRowChangeModalProps {
  textTitle: string;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export default function EditProfileRowChangeModal({
  textTitle,
  showModal,
  setShowModal,
}: EditProfileRowChangeModalProps) {
  const [nameOrEmail, setNameOrEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <Modal visible={showModal} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black/50 px-4">
        <View className="w-full bg-white rounded-lg p-5">
          {errorMessage ? (
            <Text className="text-red-500 text-center mb-1">
              {errorMessage}
            </Text>
          ) : null}
          <Text className="text-2xl font-bold mb-6 text-center">
            {`Change ${textTitle}`}
          </Text>

          <TextInput
            className="border border-gray-300 rounded p-2 mb-4"
            placeholder={`Enter new ${textTitle.toLowerCase()}`}
            placeholderTextColor={colors.gray[400]}
            onChangeText={setNameOrEmail}
            value={nameOrEmail}
          />

          <View className="flex-row gap-x-1">
            <Pressable
              className="bg-red-600 rounded p-2"
              onPress={() => setShowModal(false)}
            >
              <Text className="text-center text-white font-semibold">
                Cancel
              </Text>
            </Pressable>

            <Pressable
              className="bg-blue-600 rounded p-2"
              onPress={() => console.log("save button pressed")}
            >
              <Text className="text-center text-white font-semibold">Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
