export const returnFieldsEmpty = (conteextFields: any) => {
  const requiredFields = [
    'title',
    'description',
    'value',
    'area',
    'address',
    'public_place',
    'number',
    'adjunct',
    'neighborhood',
    'zip_code',
    'city',
    'state',
  ];

  return requiredFields.filter(field => {
    if (conteextFields[field].length === 0) {
      return field;
    }
  });
};
