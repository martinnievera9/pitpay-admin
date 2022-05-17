export default async mutate => {
  try {
    return await mutate();
  } catch (e) {
    let errors = e.graphQLErrors;
    console.log('errors', e, errors, typeof errors);
    if (!errors) return null;

    // try {
    //   errors = errors.map(error =>
    //     JSON.parse(error.message.replace('Error: ', ''))
    //   );
    // } catch (e) {
    //   return null;
    // }

    return {
      global: errors.filter(error => error.field).length === 0,
      errors: errors
        .filter(error => error.field)
        .reduce((acc, error) => ({ [error.field]: error.message, ...acc }), {})
    };
  }
};
