import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import PopularMovies from "../lib/components/popular-movies";
import MostDownloaded from "../lib/components/most-downloaded";
import theme from "../lib/styles";
import Header from "../lib/components/Header";

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
          headerTitle: (props) => <Header title="SubtitleHunt" headerProps={props} />
        }}
      />
      <PopularMovies />
      <MostDownloaded />
    </View>
  );
};

export default index;
