/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Image, Text, View } from "@aws-amplify/ui-react";
export default function Product(props) {
  const {
    imageUrl = "https://via.placeholder.com/200x240.png?text=product+image",
    name = "Product name",
    price = "99 EUR",
    overrides: overridesProp,
    ...rest
  } = props;
  const overrides = { ...overridesProp };
  return (
    <View
      width="301px"
      height="369px"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(255,255,255,1)"
      {...rest}
      {...getOverrideProps(overrides, "View")}
    >
      <Image
        width="301px"
        height="283px"
        position="absolute"
        left="0px"
        top="0px"
        border="1px SOLID rgba(234.00000125169754,236.00000113248825,238.00000101327896,1)"
        padding="0px 0px 0px 0px"
        src={imageUrl}
        {...getOverrideProps(overrides, "View.Image[0]")}
      ></Image>
      <Text
        fontFamily="Basier Square"
        fontSize="14px"
        fontWeight="400"
        color="rgba(12.000000234693289,12.000000234693289,12.000000234693289,1)"
        lineHeight="23.80000114440918px"
        textAlign="center"
        display="flex"
        direction="column"
        justifyContent="flex-start"
        width="301px"
        position="absolute"
        left="0px"
        top="295px"
        padding="0px 0px 0px 0px"
        children={name}
        {...getOverrideProps(overrides, "View.Text[0]")}
      ></Text>
      <Text
        fontFamily="Basier Square"
        fontSize="20px"
        fontWeight="400"
        color="rgba(12.000000234693289,12.000000234693289,12.000000234693289,1)"
        lineHeight="34px"
        textAlign="center"
        display="flex"
        direction="column"
        justifyContent="flex-start"
        width="301px"
        position="absolute"
        left="0px"
        top="335px"
        padding="0px 0px 0px 0px"
        children={price}
        {...getOverrideProps(overrides, "View.Text[1]")}
      ></Text>
    </View>
  );
}
