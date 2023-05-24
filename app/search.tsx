import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import theme from "../lib/styles";
import { Tabs, useRouter } from "expo-router";
import { mFetch } from "../lib/hooks/fetch";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import MImage from "../lib/components/MImage";
import Header from "../lib/components/Header";

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
          headerTitle: (props) => (
            <Header title="Search for any subtitle" headerProps={props} />
          ),
        }}
      />
      <View
        style={{
          marginVertical: 12,
          elevation: 20,
        }}
      >
        <TextInput
          placeholder="Enter movie title here"
          placeholderTextColor={theme.colors.lightWhite}
          onChangeText={(text: string) => setQuery(text)}
          defaultValue={query}
          style={{
            borderWidth: 3,
            fontSize: 16,
            padding: 12,
            borderRadius: 12,
            color: theme.colors.lightWhite,
            backgroundColor: theme.colors.primaryLight,
            borderColor: theme.colors.primary,
          }}
        />
      </View>
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
                    subtitle_id: item.id,
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
                <MImage
                  source={{ uri: item.attributes?.related_links[0].img_url }}
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
