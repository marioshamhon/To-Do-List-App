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
      <View className="flex-row items-center bg-gray-500 p-4 mb-2 rounded shadow">
        <View className="flex-1">
          <Text className="text-sm text-gray-300">{`${label}:`}</Text>
          <Text className="text-base font-semibold">{value}</Text>
        </View>
        <Pressable
          className="bg-blue-600 px-3 py-1 rounded"
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
