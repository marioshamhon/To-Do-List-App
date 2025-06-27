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
import colors from "tailwindcss/colors";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from "@expo/vector-icons/Entypo";
import AiSuggestionsModal from "../../components/AiSuggestionsModal";

export default function Home() {
  const { todos, setTodos } = useTodos();
  const [errorMessage, setErrorMessage] = useState("");
  const [isTodosLoading, setIsTodosLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const originalTodoText = useRef("");
  const { accessToken, setAccessToken, isLoading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [fetchTodosErrorFlag, setFetchTodosErrorFlag] = useState(false);

  function renderRightActions(todoToBeDeleted: Todo) {
    return (
      <View className="justify-center ml-1">
        <Pressable
          className="justify-center items-center bg-red-600 w-12 h-12 rounded-full"
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
    if (!isLoading && accessToken) {
      handleFetchTodos(
        setTodos,
        setErrorMessage,
        accessToken,
        setAccessToken,
        setIsTodosLoading,
        setFetchTodosErrorFlag
      );
    }
  }, [isLoading]);

  if (isTodosLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const todosToShow =
    searchQuery.length > 0
      ? todos.filter((todo) =>
          todo.todoText.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : todos;

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row bg-white/20 border border-white rounded-2xl p-4 mb-4 mx-4">
        <EvilIcons name="search" size={24} color={colors.blue[600]} />
        <TextInput
          className="flex-1 placeholder:text-white text-white"
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        ></TextInput>
      </View>

      {errorMessage ? (
        <Text className="text-red-500 text-center mb-4"> {errorMessage}</Text>
      ) : null}

      {showModal && (
        <AiSuggestionsModal
          showModal={showModal}
          setShowModal={setShowModal}
          fetchTodosErrorFlag={fetchTodosErrorFlag}
        />
      )}

      {!isLoading && !errorMessage && todosToShow.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl font-bold text-center text-white">
            You have no todo items. Click the + button to create one!
          </Text>
        </View>
      ) : (
        <FlatList
          data={todosToShow}
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
                      item,
                      setTodos,
                      setErrorMessage,
                      accessToken,
                      setAccessToken
                    )
                  }
                  className={`w-10 h-10 rounded-full mr-3 items-center justify-center
                  ${
                    item.isCompleted
                      ? "bg-green-600 border-green-600"
                      : " border border-white"
                  }
                `}
                >
                  {item.isCompleted && (
                    <AntDesign name="check" size={20} color="white" />
                  )}
                </Pressable>
                <TextInput
                  className="flex-1 rounded-2xl p-4 text-white bg-white/20 border border-white"
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
                      todos,
                      false
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
          onPress={() => handleAddBlankTodo(todos, setTodos, setErrorMessage)}
        >
          <AntDesign name="plus" size={24} color="white" />
        </Pressable>
      </View>

      <View className="items-end justify-end mr-6 mt-6 ">
        <Pressable
          className="w-14 h-14 bg-purple-600 rounded-full items-center justify-center"
          onPress={() => setShowModal(true)}
        >
          <Entypo name="help" size={24} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
