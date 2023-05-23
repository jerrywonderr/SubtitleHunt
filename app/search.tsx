import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import theme from "../lib/styles";
import { HeaderText } from "../lib/components/MText";
import { Tabs, useRouter } from "expo-router";
import { mFetch } from "../lib/hooks/fetch";
import { useEffect, useState } from "react";

const Search = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let timer: any;

    if (query.length) {
      timer = setTimeout(() => {
        setLoading(true);
        const { request } = mFetch({
          endpoint: "https://api.opensubtitles.com/api/v1/subtitles",
          headerType: "subtitle",
          params: { query: query },
        });
        request
          .then((resp) => {
            const data = resp.data;
            setData(data.data);
          })
          .catch((err) => console.log(err))
          .finally(() => setLoading(false));
      }, 1500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <View
      style={{
        padding: theme.spacing.base,
        flex: 1,
      }}
    >
      <Tabs.Screen
        options={{
          headerTitle: "Search for any subtitle",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            color: theme.colors.lightWhite,
          },
        }}
      />
      <View
        style={{
          marginVertical: 12,
        }}
      >
        <TextInput
          placeholder="Enter movie title here"
          onChangeText={(text: string) => setQuery(text)}
          defaultValue={query}
          style={{
            borderWidth: 1,
            padding: 6,
            borderRadius: 12,
          }}
        />
      </View>
      <HeaderText>Results</HeaderText>
      {loading && (
        <View>
          <ActivityIndicator />
        </View>
      )}
      {data.length && !loading ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.lightWhite,
                marginBottom: 12,
                borderRadius: 8,
                flexWrap: "wrap",
                overflow: "hidden",
              }}
              onPress={() =>
                router.push({
                  pathname: "download",
                  params: {
                    subtitle_id: item.id
                  },
                })
              }
            >
              <View
                style={{
                  width: "100%",
                  height: 120,
                }}
              >
                <Image
                  source={{ uri: item.attributes?.related_links[0].img_url }}
                  // resizeMethod="auto"
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 8,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  {item.attributes.feature_details.movie_name}
                </Text>
                <View
                  style={{
                    flexWrap: "wrap",
                    flexDirection: "row",
                    gap: 4,
                    marginVertical: 8,
                  }}
                >
                  <Tag header="language" text={item.attributes.language} />
                  <Tag
                    header="downloads"
                    text={item.attributes.download_count}
                  />
                  <Tag
                    header="year"
                    text={item.attributes.feature_details.year}
                  />
                  <Tag header="ratings" text={item.attributes.ratings} />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={{ textAlign: "center" }}>
          Search results will appear here...
        </Text>
      )}
      {!data.length && (
        <Text style={{ textAlign: "center" }}>
          No result found. Try something else.
        </Text>
      )}
    </View>
  );
};

export default Search;

const Tag = ({ header, text }: Record<string, string>) => (
  <View
    style={{
      width: 64,
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      padding: 4,
    }}
  >
    <Text
      style={{
        color: theme.colors.lightWhite,
        textAlign: "center",
        textTransform: "lowercase",
        fontSize: 12,
      }}
    >
      {header}
    </Text>
    <Text
      style={{
        color: theme.colors.lightWhite,
        fontWeight: "800",
        textAlign: "center",
        fontSize: 12,
      }}
    >
      {text}
    </Text>
  </View>
);
