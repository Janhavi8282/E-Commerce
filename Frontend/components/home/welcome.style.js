import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  welcomeTxt: {
    fontFamily: "bold",
    fontSize: SIZES.xxLarge - 10,
    marginTop: SIZES.xSmall,
    color: COLORS.gray,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
  },
  searchIcon: {
    marginHorizontal: SIZES.small,
    color: COLORS.gray,
    marginTop: SIZES.small,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    color: COLORS.black,
    paddingHorizontal: SIZES.small,
  },
});

export default styles;
