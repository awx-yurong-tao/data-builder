import { JsonSchema, rankWith, schemaMatches } from "@jsonforms/core";

export default rankWith(
  3, //increase rank as needed
  schemaMatches(
    (
      schema: JsonSchema & {
        control?: string;
      }
    ) => {
      return schema.hasOwnProperty("control") && schema.control === "reference";
    }
  )
);
