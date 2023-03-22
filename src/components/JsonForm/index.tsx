import { JsonForms } from "@jsonforms/react";
// import schema from "./schemas/homepage.json";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { FC, useEffect, useState } from "react";
import { DataBlockFormProps } from "./types";
import assetControlTester from "./renders/AssetControl/assetControlTester";
import AssetControl from "./renders/AssetControl";
import styled from "@emotion/styled";
import ReferenceControl from "./renders/ReferenceControl";
import referenceControlTester from "./renders/ReferenceControl/referenceControlTester";
import { css } from "emotion";

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: assetControlTester, renderer: AssetControl },
  { tester: referenceControlTester, renderer: ReferenceControl },
];

const Content = styled.div`
  width: 90vw;
`;

const DataBlockForm: FC<DataBlockFormProps> = ({ sdk, pageName }) => {
  const [data, setData] = useState<any>(sdk.field.getValue());
  const [schema, setSchema] = useState<any>({});

  const updateSchma = () => {
    import(`./schemas/${pageName}.json`).then((schema) => {
      setSchema(schema.default);
    });
  };

  useEffect(() => {
    if (pageName) {
      updateSchma();
    }
  }, [pageName]);

  useEffect(() => {
    sdk.field.setValue(data);
  }, [data, sdk]);

  return (
    <div>
      <JsonForms
        schema={schema}
        data={data}
        renderers={renderers}
        cells={materialCells}
        onChange={({ errors, data }) => {
          if (errors?.length) {
            console.log("errors", errors);
          }
          setData(data);
        }}
      />
    </div>
  );
};

export default DataBlockForm;
