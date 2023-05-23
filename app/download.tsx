import { Tabs, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Linking from "expo-linking";
import useFetch from "../lib/hooks/fetch";
import theme from "../lib/styles";
import { HeaderText } from "../lib/components/MText";

const DownloadSubtitle = () => {
  const { subtitle_id } = useLocalSearchParams();

  const { data, loading } = useFetch({
    method: "POST",
    endpoint: "https://api.opensubtitles.com/api/v1/download",
    headerType: "subtitle",
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
          headerTitle: "Download your subtitle",
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTitleStyle: {
            color: theme.colors.lightWhite,
          },
        }}
      />
      {/* <Image source={{uri: params.image_uri as string}} style={{width: '100%', height: '100%'}} /> */}

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
        </View>
      )}
    </View>
  );
};

export default DownloadSubtitle;
