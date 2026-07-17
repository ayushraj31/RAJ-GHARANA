import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'
import { myCustomStructure } from './src/sanity/deskStructure'

export default defineConfig({
  name: 'default',
  title: 'RAJ GHARANA',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [structureTool({ structure: myCustomStructure })],

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: 'productWithCategory',
        title: 'New Product',
        schemaType: 'product',
        parameters: [
          { name: 'categoryId', type: 'string' },
          { name: 'subCategoryId', type: 'string' },
        ],
        value: (params: any) => ({
          category: { _type: 'reference', _ref: params.categoryId },
          subcategory: { _type: 'reference', _ref: params.subCategoryId },
        }),
      },
    ],
  },

  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((item) => ['category', 'subcategory'].includes(item.templateId))
      }
      return prev
    },
  },
})