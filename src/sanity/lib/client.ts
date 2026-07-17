import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // useCdn: true matlab fast speed se static data load hoga. 
  // Production me isko dynamic sync ke liye server cache se control karenge.
  useCdn: true, 
})