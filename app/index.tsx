import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import PopularMovies from "../lib/components/popular-movies";
import MostDownloaded from "../lib/components/most-downloaded";
import theme from "../lib/styles";

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.base,
    backgroundColor: theme.colors.lightWhite,
    // backgroundColor: 'red',
    flex: 1,
  },
});

const index = () => {
  return (
    <View style={styles.container}>
      <Tabs.Screen
        options={{
          headerTitle: "SubtitleHunt",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            color: theme.colors.lightWhite
          }
        }}
      />
      <PopularMovies />
      <MostDownloaded />
    </View>
  );
};

export default index;
