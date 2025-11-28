export class FormParser {
  constructor(schema) {
    this.schema = schema;
  }

  run = (formBody) => {
    let parsedBody = {};
    for (const field in formBody) {
      if (this.schema.hasOwnProperty(field) && formBody[field]) {
        parsedBody[field] = this.#convert(field, formBody[field]);
      }
    }
    return parsedBody;
  };

  #convert = (field, value) => {
    const type = this.schema[field];
    switch (type) {
      case "string":
        return String(value);
      case "number":
        return Number(value);
      case "date":
        return new Date(value);
      default:
        return null;
    }
  };
}
