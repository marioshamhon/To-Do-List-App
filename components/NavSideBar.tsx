import React from "react";

import { View, Text, Pressable } from "react-native";

type Tab = {
  tabname: string;
  label: string;
};

type Props = {
  tabs: Tab[];
  selectedTab: string;
  selectTabSetter: (key: string) => void;
};

function handleRenderTabItems(
  tabs: Tab[],
  selectedTab: string,
  selectTabSetter: (tabname: string) => void
) {
  const allTabs = tabs.map((tab) => {
    return (
      <Pressable key={tab.tabname} onPress={() => selectTabSetter(tab.tabname)}>
        <Text
          className={`mb-2 ${
            selectedTab === tab.tabname
              ? "text-blue-600 font-bold"
              : "text-black"
          }
                `}
        >
          {tab.label}
        </Text>
      </Pressable>
    );
  });

  return allTabs;
}

export default function NavSideBar({
  tabs,
  selectedTab,
  selectTabSetter,
}: Props) {
  return (
    <View className="w-[30%]  p-2">
      {handleRenderTabItems(tabs, selectedTab, selectTabSetter)}
    </View>
  );
}
