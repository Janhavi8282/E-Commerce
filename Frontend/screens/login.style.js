import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  loginImage: {
    height: SIZES.height / 2.9,
    width: SIZES.width - 40,
    resizeMode: "contain",
    marginBottom: SIZES.xxLarge,
  },
  textTitle: {
    fontFamily: "bold",
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    alignSelf: "center",
    marginBottom: SIZES.xxLarge,
  },
  textInputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    marginBottom: 5,
    marginStart: 5,
    textAlign: "left",
  },
  inputWrapper: (borderColor) => ({
    borderColor: borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  }),
  iconStyle: {
    marginRight: 10,
  },
  errorMessage: {
    color: COLORS.red,
    fontFamily: "regular",
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
  },
  registration: {
    marginTop: 20,
    textAlign: "center",
    color: "blue",
    fontSize: SIZES.medium,
  },
});

export default styles;
