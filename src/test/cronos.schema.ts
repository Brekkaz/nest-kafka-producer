import { Schema } from 'dynamoose';

export const CronosSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: {
    type: String,
  },
});
