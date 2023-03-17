import { JsonForms } from "@jsonforms/react";
import schema from "./schema.json";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { FC, useEffect, useState } from "react";
import { DataBlockFormProps } from "./types";
import assetControlTester from "./renders/AssetControl/assetControlTester";
import AssetControl from "./renders/AssetControl";
import assetsControlTester from "./renders/AssetsControl/assetsControlTester";
import AssetsControl from "./renders/AssetsControl";

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: assetControlTester, renderer: AssetControl },
  { tester: assetsControlTester, renderer: AssetsControl },
];

const DataBlockForm: FC<DataBlockFormProps> = ({ sdk }) => {
  const [data, setData] = useState<any>(sdk.field.getValue());

  useEffect(() => {
    sdk.field.setValue(data);
  }, [data, sdk]);

  useEffect(() => {});

  return (
    <JsonForms
      schema={schema}
      data={data}
      renderers={renderers}
      cells={materialCells}
      onChange={({ errors, data }) => {
        console.log("onchange", data);
        setData(data);
      }}
    />
  );
};

export default DataBlockForm;
