import React, { useState, SetStateAction, Dispatch, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../contexts/auth.context";
import { useTodos } from "../contexts/todo.context";
import { handleFetchGeminiSuggestions } from "../helper_functions/geminiHelpers";
import { handlePostNewTodo } from "../helper_functions/todoHelpers";
import { SafeAreaView } from "react-native-safe-area-context";

export interface AiSuggestion {
  _id: string;
  textSuggestion: string;
  isCompleted: boolean;
}

interface AiSuggestionsModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  fetchTodosErrorFlag: boolean;
}

export default function AiSuggestionsModal({
  showModal,
  setShowModal,
  fetchTodosErrorFlag,
}: AiSuggestionsModalProps) {
  const [suggestionsArray, setSugguestionsArray] = useState<AiSuggestion[]>([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { accessToken, setAccessToken } = useAuth();
  const { todos, setTodos } = useTodos();

  useEffect(() => {
    if (todos.length > 0) {
      handleFetchGeminiSuggestions(
        todos,
        setSugguestionsArray,
        accessToken,
        setAccessToken,
        setErrorMessage,
        setIsSuggestionsLoading
      );
    } else {
      setIsSuggestionsLoading(false);
    }
  }, []);

  return (
    <Modal visible={showModal} animationType="slide" transparent>
      <SafeAreaView className="flex-1 justify-center items-center bg-black/50 px-4">
        <SafeAreaView className="w-full bg-white rounded-3xl p-5">
          {isSuggestionsLoading ? (
            <ActivityIndicator size="large" />
          ) : todos.length === 0 && !errorMessage && !fetchTodosErrorFlag ? (
            <>
              <Text className="text-2xl font-bold text-center text-black leading-6">
                You have no todo items. Please go add at least one todo item so
                the AI can give you some suggestions.
              </Text>

              <Pressable
                className="bg-purple-600 rounded-2xl p-3 mt-5"
                onPress={() => setShowModal(false)}
              >
                <Text className="text-center text-white font-semibold">
                  Close
                </Text>
              </Pressable>
            </>
          ) : errorMessage && suggestionsArray.length === 0 ? (
            <>
              <Text className="text-red-500 text-center mb-1">
                {errorMessage}
              </Text>
              <Pressable
                className="bg-purple-600 rounded-2xl p-3 mt-5"
                onPress={() => setShowModal(false)}
              >
                <Text className="text-center text-white font-semibold">
                  Close
                </Text>
              </Pressable>
            </>
          ) : !errorMessage && fetchTodosErrorFlag ? (
            <>
              <Text className="text-2xl font-bold text-center text-red-500">
                Error fetching Todos. Please try again later
              </Text>

              <Pressable
                className="bg-purple-600 rounded-2xl p-3 mt-5"
                onPress={() => setShowModal(false)}
              >
                <Text className="text-center text-white font-semibold">
                  Close
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              {errorMessage ? (
                <Text className="text-red-500 text-center mb-4">
                  {errorMessage}
                </Text>
              ) : null}
              <Text className="text-2xl font-bold mb-6 text-center">
                AI Suggestions
              </Text>

              <FlatList
                data={suggestionsArray}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={() => (
                  <View className="h-px bg-gray-200 my-3" />
                )}
                renderItem={({ item }) => (
                  <View className="flex-row items-center justify-between gap-x-4">
                    <Text className="flex-1 pr-4 leading-5">
                      {item.textSuggestion}
                    </Text>
                    <Pressable
                      className="bg-blue-600 px-4 py-2 rounded-full"
                      onPress={() =>
                        handlePostNewTodo(
                          item._id,
                          item.textSuggestion,
                          item.isCompleted,
                          setTodos,
                          setErrorMessage,
                          accessToken,
                          setAccessToken,
                          true
                        )
                      }
                    >
                      <Text className="text-white font-medium text-sm whitespace-nowrap">
                        {" "}
                        Add to todo List{" "}
                      </Text>
                    </Pressable>
                  </View>
                )}
              />

              <Pressable
                className="bg-purple-600 rounded-2xl p-3 mt-5"
                onPress={() => setShowModal(false)}
              >
                <Text className="text-center text-white font-semibold">
                  Close
                </Text>
              </Pressable>
            </>
          )}
        </SafeAreaView>
      </SafeAreaView>
    </Modal>
  );
}
