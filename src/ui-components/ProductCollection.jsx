/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import Product from "./Product";
import { Collection } from "@aws-amplify/ui-react";
export default function ProductCollection(props) {
  const { items, overrides: overridesProp, ...rest } = props;
  const overrides = { ...overridesProp };
  return (
    <Collection
      type="list"
      direction="column"
      justifyContent="stretch"
      items={items || []}
      {...rest}
      {...getOverrideProps(overrides, "Collection")}
    >
      {(item, index) => (
        <Product
          key={item.id}
          {...item}
          {...getOverrideProps(overrides, "Collection.Product[0]")}
        ></Product>
      )}
    </Collection>
  );
}
