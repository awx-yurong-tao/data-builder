import { Asset, FieldExtensionSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { Card, CardContent, Typography } from "@mui/material";
import { Button } from "@contentful/f36-components";
import { withJsonFormsControlProps } from "@jsonforms/react";
import React, { FC, useEffect } from "react";
import styled from "@emotion/styled";
import { ControlProps } from "@jsonforms/core";

type IData = {
  url?: string;
  caption?: string;
};

type AssetControlProps = ControlProps;

const Image = styled.img`
  max-width: 50%;
  height: 200px;
`;

const AssetControl: FC<AssetControlProps> = ({
  handleChange,
  data,
  path,
  label,
}) => {
  const sdk = useSDK<FieldExtensionSDK>();
  const [value, setValue] = React.useState<IData | undefined>(data);

  useEffect(() => {
    if (value === undefined) return;
    handleChange?.(path, value);
  }, [value, path, handleChange]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{label}</Typography>
        <div>{value?.url && <Image src={value?.url} />}</div>
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
