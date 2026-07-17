import { Rule } from 'sanity';

export default {
  name: 'subcategory',
  title: '🌸 Subcategories Catalog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Subcategory Collection Name',
      type: 'string',
      description: 'Example: Pure Silk Saree, Banarasi Masterpieces, Party Wear Luxury',
      validation: (Rule: Rule) => Rule.required().error('Subcategory title is required.'),
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
      name: 'image',
      title: '📸 Collection Cover Photo',
      type: 'image',
      description: 'Upload the dynamic showcase picture for this interior card grid block.',
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required().error('Collection card image is highly necessary.'),
    },
    {
      name: 'description',
      title: 'Curated Collection Note',
      type: 'text',
      description: 'Write a brief dynamic line about this specific design style.',
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
};