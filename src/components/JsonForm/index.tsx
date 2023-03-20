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
import { Button, Drawer, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: assetControlTester, renderer: AssetControl },
  { tester: assetsControlTester, renderer: AssetsControl },
];

const Content = styled.div`
  width: 90vw;
`;

const DataBlockForm: FC<DataBlockFormProps> = ({ sdk }) => {
  const [data, setData] = useState<any>(sdk.field.getValue());
  const [drawerVisible, setDrawerVisible] = useState(false);

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
          console.log("onchange", data);
          setData(data);
        }}
      />
      <Button onClick={toggleDrawer(true)}>{"open"}</Button>
      <Drawer open={drawerVisible} onClose={toggleDrawer(false)}>
        <DrawerHeader>
          <IconButton onClick={toggleDrawer(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Content>{"hello"}</Content>
      </Drawer>
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
