import React from "react";
import { View } from "react-native";
import EditProfileRow from "./EditProfileRow";
import { useAuth } from "../contexts/auth.context";

export default function EditProfile() {
  const { user } = useAuth();

  return (
    <View>
      <EditProfileRow label="Name" value={user?.name}></EditProfileRow>
      <EditProfileRow label="Email" value={user?.email}></EditProfileRow>
    </View>
  );
}
