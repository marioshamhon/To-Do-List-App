import React from "react";
import { View } from "react-native";
import EditProfileRow from "../components/EditProfileRow";
import { useAuth } from "@/contexts/auth.context";

export default function EditProfile() {
  const { user } = useAuth();

  return (
    <View className="">
      <EditProfileRow label="Name" value={user?.name}></EditProfileRow>
      <EditProfileRow label="Email" value={user?.email}></EditProfileRow>
    </View>
  );
}
