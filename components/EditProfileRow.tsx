import { View, Text, Pressable } from "react-native";
import EditProfileRowChangeModal from "./EditProfileRowChangeModal";
import { useState } from "react";

interface EditProfileRowProps {
  label: string;
  value: string | undefined;
}

export default function EditProfileRow({ label, value }: EditProfileRowProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <View className="flex-row items-center rounded-3xl border border-white bg-white/20 p-4 mb-4">
        <View className="flex-1">
          <Text className="text-sm text-white">{`${label}:`}</Text>
          <Text className="text-base font-semibold">{value}</Text>
        </View>
        <Pressable
          className="bg-blue-600 rounded-2xl p-4"
          onPress={() => setShowModal(true)}
        >
          <Text className="text-white text-sm">Change</Text>
        </Pressable>
      </View>

      {showModal && (
        <EditProfileRowChangeModal
          label={label}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}
