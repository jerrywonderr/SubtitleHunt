import {
  Text,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";
import theme from "../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import MImage from "../MImage";
import { useRouter } from "expo-router";

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.base,
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  textContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: theme.colors.backdrop,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "absolute",
  },
  text: {
    fontSize: theme.fontSize.base,
    fontWeight: "600",
    color: theme.colors.lightWhite,
    textAlign: "center",
    marginBottom: 8,
  },
});

type MostDownloadedItemProps = {
  id: string;
  movieName: string;
  imageURI: string;
};
const MostDownloadedItem = ({
  id,
  movieName,
  imageURI,
}: MostDownloadedItemProps) => {
  const { width } = Dimensions.get("window");

  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.container, { width: width / 2 - 15 }]}
      onPress={() =>
        router.push({
          pathname: "download",
          params: { subtitle_id: id },
        })
      }
    >
      <MImage
        source={{ uri: imageURI }}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      />

      <View style={styles.textContainer}>
        <Text style={[styles.text]}>{movieName}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MostDownloadedItem;
