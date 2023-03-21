import React, { ChangeEventHandler, useCallback, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { FieldExtensionSDK } from "@contentful/app-sdk";
import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";
import JSONForms from "../components/JsonForm";
import { AppBar, Dialog, IconButton, Toolbar } from "@mui/material";
import { prettyPrintJson } from "pretty-print-json";
import { Select, Button } from "@contentful/f36-components";
import { PageNames } from "../constants";

const Field = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  useEffect(() => {
    sdk.window.startAutoResizer();
    return () => {
      sdk.window.stopAutoResizer();
    };
  }, []);
  const [pageName, setPageName] = React.useState(PageNames.HOMEPAGE);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const toggleDialog = (isOpen: boolean) => () => {
    setDialogOpen(isOpen);
  };

  const handleOnChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setPageName(event.target.value);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Select
          id="optionSelect-controlled"
          name="optionSelect-controlled"
          value={pageName}
          onChange={handleOnChange}
          style={{
            width: "80vw",
          }}
        >
          {Object.keys(PageNames).map((key) => (
            <Select.Option value={PageNames[key]}>
              {PageNames[key]}
            </Select.Option>
          ))}
        </Select>
        <Button onClick={toggleDialog(true)}>View Json</Button>
      </div>

      <JSONForms sdk={sdk} pageName={pageName} />
      <Dialog open={dialogOpen} fullScreen onClose={toggleDialog(false)}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleDialog(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <pre
          dangerouslySetInnerHTML={{
            __html: prettyPrintJson.toHtml(sdk.field.getValue()),
          }}
        />
      </Dialog>
    </div>
  );
};

export default Field;
