import { View, Text, Pressable } from "react-native";
import React, { useState, Dispatch, SetStateAction } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavSideBar from "../../components/NavSideBar";
import EditProfile from "../../components/EditProfile";
import ChangePassword from "../../components/ChangePassword";
import { useAuth } from "../../contexts/auth.context";
import { useTodos } from "../../contexts/todo.context";
import { handleSignOut } from "../../helper_functions/authHelpers";
import { useRouter } from "expo-router";

export type SetTabProps = {
  setSelectedTab: Dispatch<SetStateAction<string>>;
};

export default function profile() {
  const tabs = [
    { tabname: "edit-profile", label: "Edit Profile" },
    { tabname: "change-password", label: "Change Password" },
  ];

  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const { user, setUser, accessToken, setAccessToken } = useAuth();

  const { todos } = useTodos();

  const userName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : "";

  return (
    <SafeAreaView className="flex-1">
      {errorMessage ? (
        <Text className="text-red-500 text-center mb-4"> {errorMessage}</Text>
      ) : null}
      <Pressable
        className="items-end p-4"
        onPress={() =>
          handleSignOut(
            accessToken,
            setAccessToken,
            setUser,
            setErrorMessage,
            router
          )
        }
      >
        <Text>Sign out</Text>
      </Pressable>
      <View className="flex-1 items-center justify-center">
        <View className="flex-row items-center gap-x-3">
          <View className="w-20 h-20 justify-center rounded-full border border-white">
            <Text className="text-center text-white text-bold text-2xl">
              {user?.name.charAt(0).toUpperCase()}{" "}
            </Text>
          </View>
          <View>
            <Text className="text-white">{userName}</Text>
            <View className="flex-row gap-x-1">
              <Text className="text-white">{user?.email}</Text>
              <Text className="text-white">•</Text>

              <Text className="text-white"> {todos.length} Todos</Text>
            </View>
          </View>
        </View>
      </View>

      <NavSideBar
        tabs={tabs}
        selectedTab={selectedTab}
        selectTabSetter={setSelectedTab}
      />

      <View className="px-4 w-full flex-1 justify-center">
        {selectedTab === "" && (
          <Text className="text-2xl font-bold text-center text-white">
            Please Select a tab item
          </Text>
        )}
        {selectedTab === "edit-profile" && <EditProfile />}
        {selectedTab === "change-password" && (
          <ChangePassword setSelectedTab={setSelectedTab} />
        )}
      </View>
    </SafeAreaView>
  );
}
