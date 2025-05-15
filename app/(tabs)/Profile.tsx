import { View, Text } from "react-native";
import React, { useState, Dispatch, SetStateAction } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavSideBar from "../../components/NavSideBar";
import EditProfile from "../../components/EditProfile";
import ChangePassword from "../../components/ChangePassword";
import SignOut from "../SignOut";
import { useAuth } from "../../contexts/auth.context";
import { useTodos } from "../../contexts/todo.context";

export type SetTabProps = {
  setSelectedTab: Dispatch<SetStateAction<string>>;
};

export default function profile() {
  const tabs = [
    { tabname: "edit-profile", label: "Edit Profile" },
    { tabname: "change-password", label: "Change Password" },
    { tabname: "sign-out", label: "Sign Out" },
  ];

  const [selectedTab, setSelectedTab] = useState("");

  const { user } = useAuth();

  const { todos } = useTodos();

  return (
    <SafeAreaView className=" flex-1  bg-white ">
      <Text className=" text-center text-lg font-semibold mb-2">
        {`Hello ${user?.name}, welcome to your profile.`}
      </Text>
      <Text className="text-center mb-4 font-semibold">{`you have ${todos.length} todos`}</Text>

      <NavSideBar
        tabs={tabs}
        selectedTab={selectedTab}
        selectTabSetter={setSelectedTab}
      />

      <View className="px-4 w-full flex-1 justify-center">
        {selectedTab === "" && (
          <Text className="text-2xl font-bold text-center">
            Please Select a tab item
          </Text>
        )}
        {selectedTab === "edit-profile" && <EditProfile />}
        {selectedTab === "change-password" && (
          <ChangePassword setSelectedTab={setSelectedTab} />
        )}
        {selectedTab === "sign-out" && <SignOut />}
      </View>
    </SafeAreaView>
  );
}
