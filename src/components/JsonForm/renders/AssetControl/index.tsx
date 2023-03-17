import { Asset, FieldExtensionSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { withJsonFormsControlProps } from "@jsonforms/react";
import React, { FC, useEffect } from "react";
import styled from "@emotion/styled";

type IData = {
  url?: string;
  caption?: string;
};
interface AssetControlProps {
  data: IData | undefined;
  handleChange(path: string, value: any): void;
  path: string;
}

const Image = styled.img`
  max-width: 60%;
`;

const AssetControl: FC<AssetControlProps> = ({ handleChange, data, path }) => {
  const sdk = useSDK<FieldExtensionSDK>();
  const [value, setValue] = React.useState<IData | undefined>(data);

  useEffect(() => {
    if (value === undefined) return;
    handleChange?.(path, value);
  }, [value, path, handleChange]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Asset</Typography>
        <div>
          <Image src={value?.url} />
        </div>
        <div>
          <Button
            onClick={() => {
              sdk.dialogs.selectSingleAsset<Asset | null>().then((asset) => {
                if (!asset) return;
                setValue({
                  url: asset?.fields.file[sdk.locales.default].url,
                  caption: asset?.fields.title[sdk.locales.default],
                });
              });
            }}
          >
            Choose Asset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default withJsonFormsControlProps(AssetControl);
