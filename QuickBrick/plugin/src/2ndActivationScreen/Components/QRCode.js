import * as React from "react";
import { Image } from "react-native";

export default function QRButton({ url }) {
  return (
    <Image
      style={{ width: 330, height: 330 }}
      resizeMode="contain"
      source={{ uri: `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chld=L|1&chl=${url}` }} // TODO: put into config
    />
  );
}
