import { ScrollView, View, ActivityIndicator } from "react-native";
import MostDownloadedItem from "./MostDownloadedItem";
import { HeaderText } from "../MText";
import useFetch from "../../hooks/fetch";
import theme from "../../styles";

const index = () => {
  const { data: movies } = useFetch({
    endpoint: "https://api.opensubtitles.com/api/v1/discover/most_downloaded",
    params: { type: "movie", langauges: "all" },
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
          movies.map((value: any) => (
            <MostDownloadedItem
              key={value.id}
              id={value.id}
              movieName={value.attributes.feature_details.movie_name}
              imageURI={value.attributes?.related_links[0].img_url}
            />
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
