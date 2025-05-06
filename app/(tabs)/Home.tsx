import { View, TextInput, FlatList, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import {
  Todo,
  addBlankTodo,
  changeTodoText,
  getTodosFromDb,
  saveTodoToDb,
  updateTodoFromDb,
  handleCheckMark,
} from "@/helper_functions/todoHelpers";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const renderRightActions = () => (
    <View className="flex-row bg-yellow-600 ">
      <Pressable className="p-1 justify-center rounded">
        <Feather name="x" size={24} color="white" />
      </Pressable>
    </View>
  );

  useEffect(() => {
    getTodosFromDb(setTodos, setErrorMessage);
  }, []);

  return (
    <SafeAreaView className="flex-1 relative">
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <ReanimatedSwipeable renderRightActions={renderRightActions}>
            <View className="flex-row items-center justify-center rounded">
              <Pressable
                onPress={() =>
                  handleCheckMark(
                    item._id,
                    item.isCompleted,
                    setTodos,
                    setErrorMessage
                  )
                }
                className={`w-6 h-6 rounded-full mr-3 border items-center justify-center
                  ${
                    item.isCompleted
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-400"
                  }
                `}
              >
                {item.isCompleted && (
                  <AntDesign name="check" size={16} color="white" />
                )}
              </Pressable>
              <TextInput
                className="flex-1 bg-blue-600 rounded px-3 py-2"
                placeholder=""
                editable={true}
                multiline={true}
                value={item.todoText}
                onChangeText={(text) =>
                  changeTodoText(item._id, text, setTodos)
                }
                onBlur={() => {
                  item.isNewTodo
                    ? saveTodoToDb(item, setTodos, setErrorMessage)
                    : updateTodoFromDb();
                }}
              />
            </View>
          </ReanimatedSwipeable>
        )}
      />

      <Pressable
        className="absolute bottom-6 right-6 w-12 h-12 bg-blue-600 rounded-full items-center justify-center"
        onPress={() => addBlankTodo(setTodos)}
      >
        <AntDesign name="plus" size={24} color="white" />
      </Pressable>
      {/* 4. Error message */}
      {errorMessage ? (
        <Text className="text-red-500 text-center mb-4"> {errorMessage}</Text>
      ) : null}
    </SafeAreaView>
  );
}
