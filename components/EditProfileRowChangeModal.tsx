import React, { useState, SetStateAction, Dispatch } from "react";
import { View, Text, TextInput, Pressable, Modal } from "react-native";
import colors from "tailwindcss/colors";
import { useAuth } from "../contexts/auth.context";
import { handleSaveButtonPressed } from "../helper_functions/userHelpers";

interface EditProfileRowChangeModalProps {
  label: string;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function EditProfileRowChangeModal({
  label,
  showModal,
  setShowModal,
}: EditProfileRowChangeModalProps) {
  const [nameOrEmail, setNameOrEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { setUser, accessToken, setAccessToken } = useAuth();

  return (
    <Modal visible={showModal} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black/50 px-4">
        <View className="w-full bg-white rounded-3xl p-5">
          {errorMessage ? (
            <Text className="text-red-500 text-center mb-1">
              {errorMessage}
            </Text>
          ) : null}
          <Text className="text-2xl font-bold mb-6 text-center">
            {`Change ${label}`}
          </Text>

          <TextInput
            className="border border-black rounded-2xl p-4 mb-4"
            placeholder={`Enter new ${label.toLowerCase()}`}
            placeholderTextColor={colors.gray[400]}
            onChangeText={setNameOrEmail}
            value={nameOrEmail}
          />

          <View className="flex-row justify-center gap-x-1 ">
            <Pressable
              className="bg-purple-500 rounded-2xl p-4"
              onPress={() => setShowModal(false)}
            >
              <Text className="text-center text-white font-semibold">
                Cancel
              </Text>
            </Pressable>

            <Pressable
              className="bg-blue-600 rounded-2xl p-4"
              onPress={() =>
                handleSaveButtonPressed(
                  nameOrEmail,
                  label,
                  setUser,
                  setErrorMessage,
                  setShowModal,
                  accessToken,
                  setAccessToken
                )
              }
            >
              <Text className="text-center text-white font-semibold">Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
