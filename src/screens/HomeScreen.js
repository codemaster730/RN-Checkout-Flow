import { View, ScrollView } from "react-native";
import { useSelector } from "react-redux";

import CategoryBlock from "../component/CategoryBlock";

const HomeScreen = (props) => {
  const categories = useSelector((state) => state.product.products);

  const navigateToAddToCardScreen = () => {
    props.navigation.navigate("AddToCart");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {categories.map((category, index) => (
          <CategoryBlock
            key={category.id}
            id={category.id}
            image={category.image}
            title={category.title}
            index={index}
            navigateToAddToCardScreen={navigateToAddToCardScreen}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
};

export default HomeScreen;
