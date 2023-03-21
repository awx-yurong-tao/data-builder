import { FieldExtensionSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { prettyPrintJson } from "pretty-print-json";

import React from "react";

const JSONPreview = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  const data = sdk.field.getValue();
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: prettyPrintJson.toHtml(data),
      }}
    />
  );
};

export default JSONPreview;
