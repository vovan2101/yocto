// entities/FormRequest.js
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'FormRequest',
  tableName: 'form_requests',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: true,
    },
    device_id: {
      type: 'text',
      nullable: false,
    },
    type: {
      type: 'text',
      nullable: false,
    },
    form_name: {
      type: 'text',
      nullable: false,
    },
  },
});
