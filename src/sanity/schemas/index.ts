import { type SchemaTypeDefinition } from 'sanity'
import category from './category'
import subcategory from './subcategory'
import product from './product'
import siteSettings from './siteSettings'

export const schemaTypes: SchemaTypeDefinition[] = [category, subcategory, product, siteSettings]