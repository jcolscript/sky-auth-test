import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .required()
      .min(6),
    phones: Yup.array().of(
      Yup.object().shape({
        area: Yup.string()
          .required()
          .min(2)
          .max(2),
        number: Yup.string()
          .required()
          .matches(/^(?:((?:9\d|[2-9])\d{3})(\d{4}))$/, 'invalid phone format'),
      })
    ),
  });

  schema
    .validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(errors => {
      const schemaErrors = errors.inner.map(err => {
        return { field: err.path, message: err.message };
      });

      return res.status(400).json({
        message: 'Alguns campos não são válidos',
        fields: schemaErrors,
      });
    });
};
