import { type SchemaTypeDefinition } from "sanity";
import { digitalArt } from "./digitalArt";
import { traditionalArt } from "./traditionalArt";
import { mangaPanel } from "./mangaPanel";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [digitalArt, traditionalArt, mangaPanel],
};
