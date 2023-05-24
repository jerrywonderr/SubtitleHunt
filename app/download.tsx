import { Tabs, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import * as Linking from "expo-linking";
import useFetch from "../lib/hooks/fetch";
import theme from "../lib/styles";
import { HeaderText } from "../lib/components/MText";
import Header from "../lib/components/Header";

const DownloadSubtitle = () => {
  const { subtitle_id } = useLocalSearchParams();
  const router = useRouter();

  const { data, loading } = useFetch({
    method: "POST",
    endpoint: "https://api.opensubtitles.com/api/v1/download",
    extraHeaders: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    data: {
      file_id: subtitle_id,
    },
  });

  return (
    <View
      style={{
        padding: 8,
      }}
    >
      <Tabs.Screen
        options={{
          headerTitle: (props) => (
            <Header title="Download your subtitle" headerProps={props} />
          ),
        }}
      />

      {!loading && data ? (
        <View>
          <TouchableOpacity
            onPress={() => Linking.openURL(data.link)}
            style={{
              backgroundColor: theme.colors.primary,
              width: 120,
              borderRadius: 8,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              elevation: 12,
              margin: "auto",
            }}
          >
            <Text
              style={{
                color: theme.colors.lightWhite,
                fontWeight: "600",
                fontSize: 18,
              }}
            >
              Download now
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <HeaderText>Generating link</HeaderText>
          <ActivityIndicator />
          <TouchableOpacity
            onPress={() => router.push('search')}
            style={{
              backgroundColor: theme.colors.primary,
              width: 120,
              borderRadius: 8,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              elevation: 12,
              margin: "auto",
            }}
          >
            <Text
              style={{
                color: theme.colors.lightWhite,
                fontWeight: "600",
                fontSize: 18,
              }}
            >
              Run a search
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default DownloadSubtitle;
