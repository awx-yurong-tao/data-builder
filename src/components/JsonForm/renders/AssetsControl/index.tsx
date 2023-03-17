import { FieldExtensionSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { Button } from "@mui/material";
import { FC } from "react";

interface AssetsControlProps {
  data: Array<any>;
  handleChange(path: string, value: any): void;
  path: string;
}

const AssetsControl: FC<AssetsControlProps> = ({ data }) => {
  const sdk = useSDK<FieldExtensionSDK>();
  return <div>{"Assets Control"}</div>;
  return (
    <>
      {data.map((asset) => {
        return (
          <Button
            onClick={() => {
              sdk.dialogs.selectMultipleAssets().then((assets) => {
                console.log(assets);
              });
            }}
          >
            Asset Control
          </Button>
        );
      })}
    </>
  );
};

export default withJsonFormsControlProps(AssetsControl);
