import {normalize, schema} from 'normalizr'
import * as userSchemas from './user'

export const blogEntity = new schema.Entity('blogs', {user: userSchemas.userEntity})
export const blogList = {blogs: [blogEntity]}
