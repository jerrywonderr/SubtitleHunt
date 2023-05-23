import { ScrollView, View, ActivityIndicator } from "react-native";
import MostDownloadedItem from "./MostDownloadedItem";
import { HeaderText } from "../MText";
import useFetch from "../../hooks/fetch";
import theme from "../../styles";

const index = () => {
  const { data: movies } = useFetch({
    endpoint:
      "https://imdb8.p.rapidapi.com/title/v2/get-popular-movies-by-genre",
    headerType: "rapid-api",
    params: { genre: "adventure", limit: 10 },
  });
  return (
    <View
      style={{
        paddingVertical: 12,
        flex: 1,
      }}
    >
      <HeaderText>Most downloaded subititles</HeaderText>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          justifyContent: "space-evenly",
        }}
      >
        {movies ? (
          movies.map((value: string) => (
            <MostDownloadedItem key={value} id={value} />
          ))
        ) : (
          <View
            style={{
              width: "100%",
              height: 120,
              backgroundColor: theme.colors.backdrop,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default index;
