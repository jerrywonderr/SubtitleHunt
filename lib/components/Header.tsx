import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type HeaderProps = {
  title: string;
  headerProps: any;
};
const Header = ({ title, headerProps }: HeaderProps) => {
  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    }}>
      <Text
        {...headerProps}
        style={{
          ...headerProps.style,
          fontSize: 24,
        }}
      >
        {title}
      </Text>
      <Icon color={headerProps.style.color} name="share-variant" adjustsFontSizeToFit size={24}/>
    </View>
  );
};

export default Header;
