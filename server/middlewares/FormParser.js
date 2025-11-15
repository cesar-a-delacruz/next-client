export class FormParser {
  constructor(schema) {
    this.schema = schema;
  }

  run = (formBody) => {
    for (const field in this.schema) {
      if (formBody.hasOwnProperty(field)) {
        formBody[field] = this.#convert(field, formBody[field]);
      }
    }
    return formBody;
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
        return value;
    }
  };
}
