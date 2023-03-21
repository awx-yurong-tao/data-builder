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
import { Button, Drawer, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: assetControlTester, renderer: AssetControl },
];

const Content = styled.div`
  width: 90vw;
`;

const DataBlockForm: FC<DataBlockFormProps> = ({ sdk, pageName }) => {
  const [data, setData] = useState<any>(sdk.field.getValue());
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [schema, setSchema] = useState<any>(undefined);

  const updateSchma = () => {
    import(`./schemas/${pageName}.json`).then((schema) => {
      setSchema(schema.default);
    });
  };

  useEffect(() => {
    updateSchma();
  }, [pageName]);

  useEffect(() => {
    sdk.field.setValue(data);
  }, [data, sdk]);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerVisible(open);
  };

  return (
    <>
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
    </>
  );
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "0 8px",
  justifyContent: "flex-end",
}));

export default DataBlockForm;
