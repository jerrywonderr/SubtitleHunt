import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../../styles";
import useFetch from "../../hooks/fetch";
import { parseId } from "../../utils";

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
    position: 'relative'
  },
  textContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: theme.colors.backdrop,
    alignItems: "center",
    position: 'absolute'
  },
  text: {
    fontSize: theme.fontSize.base,
    fontWeight: "600",
    color: theme.colors.lightWhite,
    textAlign: "center",
    marginTop: 8
  },
});

type PopularMovieItemProps = {
  id: string;
  style?: Record<string, string | number>;
};

const PopularMovieItem = ({ id, style }: PopularMovieItemProps) => {
  const { data } = useFetch({
    endpoint: "https://imdb8.p.rapidapi.com/title/get-details",
    headerType: 'rapid-api',
    params: {tconst: parseId(id)}
  });

  return (
    <TouchableOpacity style={{ ...styles.container, ...style }}>
      {data ? <>
        <Image source={{uri: data.image.url}} resizeMode="cover" style={{width: '100%', height: '100%'}} />
        <View style={styles.textContainer}>
            <Text style={[styles.text]}>{data.title}</Text>
          </View></> : <ActivityIndicator />
      }
    </TouchableOpacity>
  );
};

export default PopularMovieItem;
