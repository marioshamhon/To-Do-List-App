import React from "react";

import { View, Text, Pressable } from "react-native";

type Tab = {
  tabname: string;
  label: string;
};

type Props = {
  tabs: Tab[];
  selectedTab: string;
  onSelectTab: (key: string) => void;
};

function handleRenderTabItems(
  tabs: Tab[],
  selectedTab: string,
  onSelectTab: (key: string) => void
) {
  const allTabs = tabs.map((tab) => {
    return (
      <Pressable key={tab.tabname} onPress={() => onSelectTab(tab.tabname)}>
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

export default function NavSideBar({ tabs, selectedTab, onSelectTab }: Props) {
  return (
    <View className="w-[30%] bg-emerald-400 p-2">
      {handleRenderTabItems(tabs, selectedTab, onSelectTab)}
    </View>
  );
}
