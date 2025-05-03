import { View, TextInput, FlatList, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { postNewTodo } from "@/services/todo.service";

const Home = () => {
  type Todo = {
    _id: string;
    todoText: string;
    isCompleted: boolean;
    isNewTodo: boolean;
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddBlankTodo = () => {
    const newTodo = {
      _id: Date.now().toString(),
      todoText: "",
      isCompleted: false,
      isNewTodo: true,
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  const handleTextChange = (newText: string, _id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === _id ? { ...todo, todoText: newText } : todo
      )
    );
  };

  const handleAddRealTodo = async (tempTodo: Todo) => {
    const result = await postNewTodo(tempTodo.todoText, tempTodo.isCompleted);

    if (!result.success) {
      setErrorMessage(result.message);
      return;
    }

    const [todoFromDb] = result.data.newTodo;

    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === tempTodo._id
          ? {
              _id: todoFromDb._id,
              todoText: todoFromDb.todoText,
              isCompleted: todoFromDb.isCompleted,
              isNewTodo: false,
            }
          : todo
      )
    );
  };

  const handleUpdate = () => {
    console.log("placeholder update function");
  };

  const renderRightActions = () => (
    <View className="flex-row bg-yellow-600 ">
      <Pressable className="p-1 justify-center rounded">
        <Feather name="x" size={24} color="white" />
      </Pressable>
    </View>
  );

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
              <Pressable className="w-6 h-6 rounded-full border border-gray-400 mr-3" />
              <TextInput
                className="flex-1 bg-red-300 rounded px-3 py-2"
                placeholder="To-do..."
                editable={true}
                multiline={true}
                value={item.todoText}
                onChangeText={(text) => handleTextChange(text, item._id)}
                onBlur={() => {
                  item.isNewTodo ? handleAddRealTodo(item) : handleUpdate();
                }}
              />
            </View>
          </ReanimatedSwipeable>
        )}
      />

      <Pressable
        className="absolute bottom-6 right-6 w-12 h-12 bg-blue-600 rounded-full items-center justify-center"
        onPress={handleAddBlankTodo}
      >
        <AntDesign name="plus" size={24} color="white" />
      </Pressable>
      {/* 4. Error message */}
      {errorMessage ? (
        <Text className="text-red-500 text-center mb-4"> {errorMessage}</Text>
      ) : null}
    </SafeAreaView>
  );
};

export default Home;
