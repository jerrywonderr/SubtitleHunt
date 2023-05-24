import { Tabs } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import theme from "../lib/styles";

const _layout = () => {
  return (
    <>
      <Tabs
        screenOptions={({ route }) => {
          return {
            tabBarShowLabel: false,
            tabBarActiveTintColor: theme.colors.primary,
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTitleStyle: {
              color: theme.colors.lightWhite
            },
            tabBarIcon: ({focused, color, size}) => {
              let iconName: string;
              if (route.name === 'index') {
                iconName = focused ? 'home' : 'home-outline';
              } else {
                iconName = focused ? 'file-search' : 'file-search-outline';
              }
              return <Icon name={iconName} size={size} color={color} />
            },
          };
        }}
      >
        <Tabs.Screen name="download" options={{ href: null }} />
      </Tabs>
    </>
  );
};

export default _layout;
