import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import theme from "../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { parseId } from "../../utils";
import useFetch from "../../hooks/fetch";

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.base,
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: 'relative'
  },
  textContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: theme.colors.backdrop,
    alignItems: "center",
    justifyContent: "flex-end",
    position: 'absolute'
  },
  text: {
    fontSize: theme.fontSize.base,
    fontWeight: "600",
    color: theme.colors.lightWhite,
    textAlign: "center",
    marginBottom: 8
  },
});

type MostDownloadedItemProps = {
  id: string;
};
const MostDownloadedItem = ({ id }: MostDownloadedItemProps) => {
  const { width } = Dimensions.get("window");
  const { data } = useFetch({
    endpoint: "https://imdb8.p.rapidapi.com/title/get-details",
    headerType: "rapid-api",
    params: { tconst: parseId(id) },
  });
  return (
    <TouchableOpacity style={[styles.container, { width: width / 2 - 15 }]}>
      {data ? (
        <>
          <Image
            source={{ uri: data.image.url }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />

          <View style={styles.textContainer}>
            <Text style={[styles.text]}>{data.title}</Text>
          </View>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </TouchableOpacity>
  );
};

export default MostDownloadedItem;
