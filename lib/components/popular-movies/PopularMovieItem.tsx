import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import theme from "../../styles";
import { useState } from "react";
import MImage from "../MImage";
import { useRouter } from "expo-router";

const placeholderImage = require("../../../assets/placeholder-image.jpg");

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 150,
    backgroundColor: theme.colors.primary,
    marginEnd: 12,
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
    position: "absolute",
  },
  text: {
    fontSize: theme.fontSize.base,
    fontWeight: "600",
    color: theme.colors.lightWhite,
    textAlign: "center",
    marginTop: 8,
  },
});

type PopularMovieItemProps = {
  id: string;
  imageURI: string;
  movieName: string;
  style?: Record<string, string | number>;
};

const PopularMovieItem = ({
  id,
  style,
  imageURI,
  movieName,
}: PopularMovieItemProps) => {
  const [imageLoadError, setImageLoadError] = useState(false);
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...style }}
      onPress={() =>
        router.push({
          pathname: "download",
          params: { subtitle_id: id },
        })
      }
    >
      <MImage
        source={imageLoadError ? placeholderImage : { uri: imageURI }}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
        onError={() => setImageLoadError(true)}
      />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={[styles.text]}>
          {movieName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularMovieItem;
