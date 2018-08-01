import { schema } from 'normalizr'
import * as userSchemas from './user'

export const blogEntity = new schema.Entity('blogs', {
  user: userSchemas.userEntity,
}, {
  idAttribute: (value, parent, key) => {
    return 'blog_'+value.id
  }
})
export const blogList = { blogs: [blogEntity] }
