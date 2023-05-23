import { Tabs } from "expo-router";

const _layout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen name="download" options={{ href: null }} />
      </Tabs>
    </>
  );
};

export default _layout;
