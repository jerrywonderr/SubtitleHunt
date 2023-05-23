import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import PopularMovieItem from "./PopularMovieItem";
import { HeaderText } from "../MText";
import theme from "../../styles";
import { memo, useEffect, useState } from "react";
import Constants from "expo-constants";
import useFetch from "../../hooks/fetch";

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.base,
  },
});

const index = () => {
  const { data: movies } = useFetch({
    endpoint: "https://imdb8.p.rapidapi.com/title/get-most-popular-movies",
    headerType: "rapid-api",
  });
  return (
    <View style={styles.container}>
      <HeaderText>Popular movies</HeaderText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movies ? (
          <>
            {movies.slice(0, 5).map((value: string) => (
              <PopularMovieItem key={value} id={value} />
            ))}

            <PopularMovieItem
              id={movies[movies.length - 1]}
              style={{ marginEnd: 0 }}
            />
          </>
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.primary,
              width: 200,
              height: 150,
              borderRadius: 8
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
