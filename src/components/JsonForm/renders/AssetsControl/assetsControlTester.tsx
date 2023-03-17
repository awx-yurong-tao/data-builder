import {
  and,
  JsonSchema,
  rankWith,
  schemaMatches,
  scopeEndsWith,
} from "@jsonforms/core";

export default rankWith(
  2, //increase rank as needed
  schemaMatches(
    (
      schema: JsonSchema & {
        control?: string;
      }
    ) => {
      return schema.hasOwnProperty("control") && schema.control === "assets";
    }
  )
);
