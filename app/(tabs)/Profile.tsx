import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavSideBar from "../../components/NavSideBar";
import EditProfile from "../EditProfile";
import SignOut from "../SignOut";

export default function profile() {
  const tabs = [
    { tabname: "edit-profile", label: "Edit Profile" },
    { tabname: "sign-out", label: "Sign Out" },
  ];

  const [selectedTab, setSelectedTab] = useState("");

  return (
    <SafeAreaView className="flex-1 p-4 items-center justify-center bg-white">
      <Text className=" text-lg font-semibold mb-2">
        Hello User's name here welcome to your profile
      </Text>
      <Text className="mb-4">
        you have this many insert number here of todos
      </Text>

      <View className="flex-1 flex-row gap-4">
        <NavSideBar
          tabs={tabs}
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
        />
        <View className="w-[70%] bg-gray-400">
          {selectedTab === "edit-profile" && <EditProfile />}
          {selectedTab === "sign-out" && <SignOut />}
        </View>
      </View>
    </SafeAreaView>
  );
}
