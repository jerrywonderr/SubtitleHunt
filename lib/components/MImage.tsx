import { Image, ImageProps } from "react-native";
import { placeholderImage } from "../utils/constants";
import { useState } from "react";

const MImage = ({ source, ...props }: ImageProps) => {
  const [imageLoadError, setImageLoadError] = useState(false);

  const useFallbackImage = () => setImageLoadError(true);

  return (
    <Image
      source={imageLoadError ? placeholderImage : source}
      {...props}
      onError={useFallbackImage}
      defaultSource={placeholderImage}
    />
  );
};

export default MImage;
