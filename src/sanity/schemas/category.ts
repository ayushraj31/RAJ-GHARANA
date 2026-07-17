import { Rule } from 'sanity';

export default {
  name: 'category',
  title: '⚜️ Main Categories',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Name',
      type: 'string',
      description: 'Example: Women, Men, Accessories',
      validation: (Rule: Rule) => Rule.required().error('Category name is absolutely necessary.'),
    },
    {
      name: 'slug',
      title: '🔄 URL Web Address',
      type: 'slug',
      description: 'Just click the "Generate" button after writing the name.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Luxury Introduction Description',
      type: 'text',
      description: 'Write a premium summary line for this collection.',
    },
    {
      name: 'image',
      title: '📸 Beautiful Showcase Image',
      type: 'image',
      description: 'Upload the premium photo for the home page arched frame shape.',
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required().error('Showcase image is highly recommended.'),
    },
    {
      name: 'subcategories',
      title: '🔗 Linked Subcategories',
      type: 'array',
      description: 'Add multiple dynamic inner variants inside this category block.',
      of: [{ type: 'reference', to: [{ type: 'subcategory' }] }],
    }
  ],
  // Owner ke interactive view ke liye preview setup
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
};