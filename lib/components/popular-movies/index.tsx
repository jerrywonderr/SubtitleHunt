import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import PopularMovieItem from "./PopularMovieItem";
import { HeaderText } from "../MText";
import theme from "../../styles";
import { memo } from "react";
import useFetch from "../../hooks/fetch";
import { useRouter } from "expo-router";

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.base,
  },
});

const index = () => {
  const { data: movies } = useFetch({
    endpoint: "https://api.opensubtitles.com/api/v1/discover/latest",
  });
  return (
    <View style={styles.container}>
      <HeaderText>Popular movies</HeaderText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movies && movies.length ? (
          <>
            {movies.slice(0, 15).map((value: any) => (
              <PopularMovieItem
                key={value.id}
                id={value.id}
                movieName={value.attributes.feature_details.movie_name}
                imageURI={value.attributes?.related_links[0].img_url}
              />
            ))}

            <PopularMovieItem
              id={movies[movies.length - 1].id}
              movieName={
                movies[movies.length - 1].attributes.feature_details.movie_name
              }
              imageURI={
                movies[movies.length - 1].attributes?.related_links[0].img_url
              }
              style={{ marginEnd: 0 }}
            />
          </>
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.colors.primary,
              width: 200,
              height: 150,
              borderRadius: 8,
            }}
          >
            <ActivityIndicator />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default memo(index);
