import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavSideBar from "../../components/NavSideBar";
import EditProfile from "../EditProfile";
import SignOut from "../SignOut";
import { useAuth } from "../../contexts/auth.context";
import { useTodos } from "../../contexts/todo.context";

export default function profile() {
  const tabs = [
    { tabname: "edit-profile", label: "Edit Profile" },
    { tabname: "sign-out", label: "Sign Out" },
  ];

  const [selectedTab, setSelectedTab] = useState("");

  const { user } = useAuth();

  const { todos } = useTodos();

  return (
    <SafeAreaView className="flex-1 p-4 items-center justify-center bg-white">
      <Text className=" text-lg font-semibold mb-2">
        {`Hello ${user?.name}, welcome to your profile.`}
      </Text>
      <Text className=" text-center mb-4 font-semibold">{`you have ${todos.length} todos`}</Text>

      <View className="flex-1 flex-row gap-4">
        <NavSideBar
          tabs={tabs}
          selectedTab={selectedTab}
          selectTabSetter={setSelectedTab}
        />
        <View className="w-[70%] bg-white">
          {selectedTab === "edit-profile" && <EditProfile />}
          {selectedTab === "sign-out" && <SignOut />}
        </View>
      </View>
    </SafeAreaView>
  );
}
