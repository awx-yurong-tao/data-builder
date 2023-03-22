import { Entry, FieldExtensionSDK } from "@contentful/app-sdk";
import { useSDK, useCMA } from "@contentful/react-apps-toolkit";
import { Card, CardContent, Typography } from "@mui/material";
import { withJsonFormsControlProps } from "@jsonforms/react";
import React, { FC, useEffect, useMemo } from "react";
import { Select, Button, EntryCard } from "@contentful/f36-components";
import { ControlProps } from "@jsonforms/core";

type ReferenceValue = {
  sys: {
    id: string;
    type: string;
    linkType: string;
  };
};
type IData = {
  entryId?: string;
};
type ReferenceControlProps = ControlProps;

const ReferenceControl: FC<ReferenceControlProps> = ({
  handleChange,
  data,
  path,
  label,
}) => {
  const sdk = useSDK<FieldExtensionSDK>();
  const cma = useCMA();
  const [value, setValue] = React.useState<IData | undefined>(data);
  const [referencedEntry, setReferencedEntry] = React.useState<Entry | null>(
    null
  );

  useEffect(() => {
    if (data?.entryId) {
      cma.entry
        .get<Entry>({
          entryId: data.entryId,
        })
        .then((entry) => {
          setReferencedEntry(entry);
        });
    }
  }, [data]);

  useEffect(() => {
    if (value === undefined) return;
    handleChange?.(path, value);
  }, [value, path, handleChange]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{label}</Typography>

        <div>
          <Button
            onClick={() => {
              sdk.dialogs.selectSingleEntry<Entry | null>().then((entry) => {
                if (!entry) return;
                setValue({
                  entryId: entry.sys.id,
                });
                sdk.entry.fields.references.removeValue(sdk.field.locale);
                sdk.entry.fields.references.setValue(
                  [
                    ...(sdk.entry.fields.references.getValue() || []),
                    {
                      sys: {
                        id: entry.sys.id,
                        type: "Link",
                        linkType: "Entry",
                      },
                    },
                  ],
                  sdk.field.locale
                );
              });
            }}
          >
            Choose Entry
          </Button>
          <EntryCard
            status={"published"}
            contentType={referencedEntry?.sys?.contentType?.sys.id}
            title={referencedEntry?.fields?.title[sdk.field.locale]}
            description={
              referencedEntry?.fields?.description?.[sdk.field.locale]
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default withJsonFormsControlProps(ReferenceControl);
