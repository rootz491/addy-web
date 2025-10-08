import { type SchemaTypeDefinition } from 'sanity'
import { digitalArt } from './digitalArt'
import { traditionalArt } from './traditionalArt'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [digitalArt, traditionalArt],
}
