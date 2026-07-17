import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: '1. Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: '2. Sub Category',
      type: 'reference',
      to: [{ type: 'subcategory' }],
      options: {
        filter: ({ document }: any) => {
          if (!document?.category?._ref) return { filter: '' }
          return {
            filter: 'category._ref == $catId',
            params: { catId: document.category._ref },
          }
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Selling Price (INR)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price (MRP)',
      type: 'number',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (out of 5)',
      type: 'number',
    }),
    defineField({
      name: 'reviewCount',
      title: 'Review Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isNew',
      title: 'New Arrival?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock?',
      type: 'boolean',
      initialValue: true,
    }),
   defineField({
  name: 'sizes',
  title: 'Available Sizes',
  type: 'array',
  of: [{ type: 'string' }],
  description: 'Har size ke liye "Add item" dabao aur khud type karo (jaise: S, M, L, 32, Free Size)',
}),
    defineField({
      name: 'description',
      title: 'Description / Fabric Specs',
      type: 'text',
    }),
    defineField({
      name: 'variants',
      title: 'Color Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'variant',
          fields: [
            { name: 'colorName', title: 'Color Name', type: 'string' },
            {
              name: 'images',
              title: 'Gallery Images',
              type: 'array',
              of: [{ type: 'image', options: { hotspot: true } }],
            },
            {
              name: 'videoFile',
              title: 'Video (Optional)',
              type: 'file',
              options: { accept: 'video/*' },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'reviews',
      title: 'Customer Reviews',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'review',
          fields: [
            { name: 'reviewerName', title: 'Customer Name', type: 'string' },
            { name: 'reviewRating', title: 'Rating', type: 'number' },
            { name: 'comment', title: 'Comment', type: 'text' },
            {
              name: 'realPhotos',
              title: 'Customer Photos',
              type: 'array',
              of: [{ type: 'image', options: { hotspot: true } }],
            },
          ],
        },
      ],
    }),
  ],
})