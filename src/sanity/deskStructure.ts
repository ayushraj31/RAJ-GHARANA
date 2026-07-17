import type { StructureResolver } from 'sanity/structure'

export const myCustomStructure: StructureResolver = (S) =>
  S.list()
    .title('Raj Gharana Main Menu')
    .items([
      S.listItem()
        .title('Manage Master Categories')
        .child(S.documentTypeList('category').title('All Categories')),

      S.listItem()
        .title('Manage Master Sub Categories')
        .child(S.documentTypeList('subcategory').title('All Sub Categories')),

      S.listItem()
        .title('Products Inventory (Classified)')
        .child(
          S.documentTypeList('category')
            .title('Select Main Category')
            .child((categoryId) =>
              S.documentTypeList('subcategory')
                .title('Select Sub Category')
                .filter('_type == "subcategory" && category._ref == $categoryId')
                .params({ categoryId })
                .child((subCategoryId) =>
                  S.documentTypeList('product')
                    .title('Products')
                    .filter('_type == "product" && subcategory._ref == $subCategoryId')
                    .params({ subCategoryId })
                    .initialValueTemplates([
                      S.initialValueTemplateItem('productWithCategory', {
                        categoryId,
                        subCategoryId,
                      }),
                    ])
                )
            )
        ),

      S.listItem()
        .title('All Products')
        .child(S.documentTypeList('product').title('All Products')),

      S.listItem()
        .title('Global Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ])