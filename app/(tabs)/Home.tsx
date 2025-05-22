import {
  View,
  TextInput,
  FlatList,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useRef } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import {
  Todo,
  handleAddBlankTodo,
  handleChangeTodoText,
  handleOnBlur,
  handleFetchTodos,
  handleUpdateToggleCheckMark,
  handleDeleteTodo,
} from "@/helper_functions/todoHelpers";
import { useTodos } from "../../contexts/todo.context";
import { useAuth } from "../../contexts/auth.context";

export default function Home() {
  const { todos, setTodos } = useTodos();
  const [errorMessage, setErrorMessage] = useState("");
  const originalTodoText = useRef("");

  const { accessToken, setAccessToken } = useAuth();

  const [isTodosLoading, setIsTodosLoading] = useState(true);

  function renderRightActions(todoToBeDeleted: Todo) {
    return (
      <View className="flex-row bg-yellow-600 ">
        <Pressable
          className="p-1 justify-center rounded"
          onPress={() =>
            handleDeleteTodo(
              todoToBeDeleted,
              todos,
              setTodos,
              setErrorMessage,
              accessToken,
              setAccessToken
            )
          }
        >
          <Feather name="x" size={24} color="white" />
        </Pressable>
      </View>
    );
  }

  useEffect(() => {
    handleFetchTodos(
      setTodos,
      setErrorMessage,
      accessToken,
      setAccessToken,
      setIsTodosLoading
    );
  }, []);

  if (isTodosLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {todos.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl font-bold text-center">
            You have no todo items. Click the + button to create one!
          </Text>
        </View>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <ReanimatedSwipeable
              renderRightActions={() => renderRightActions(item)}
            >
              <View className="flex-row items-center justify-center rounded">
                <Pressable
                  onPress={() =>
                    handleUpdateToggleCheckMark(
                      item._id,
                      item.isCompleted,
                      setTodos,
                      setErrorMessage,
                      accessToken,
                      setAccessToken
                    )
                  }
                  className={`w-8 h-8 rounded-full mr-3 border items-center justify-center
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
                  onFocus={() => {
                    originalTodoText.current = item.todoText;
                  }}
                  onChangeText={(text) =>
                    handleChangeTodoText(item._id, text, setTodos)
                  }
                  onBlur={() => {
                    handleOnBlur(
                      item,
                      originalTodoText,
                      setTodos,
                      setErrorMessage,
                      accessToken,
                      setAccessToken,
                      todos
                    );
                  }}
                />
              </View>
            </ReanimatedSwipeable>
          )}
        />
      )}

      <View className="items-end justify-end mr-6 mt-6 ">
        <Pressable
          className="w-14 h-14 bg-blue-600 rounded-full items-center justify-center"
          onPress={() => handleAddBlankTodo(todos, setTodos)}
        >
          <AntDesign name="plus" size={24} color="white" />
        </Pressable>
      </View>

      {/* 4. Error message */}
      {errorMessage ? (
        <Text className="text-red-500 text-center mb-4"> {errorMessage}</Text>
      ) : null}
    </SafeAreaView>
  );
}
