import * as Yup from 'yup';

const message = 'Username or password are not correct.';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .label('Username')
    .required(message)
    .min(4, message),
  password: Yup.string()
    .label('Password')
    .required(message)
    .min(4, message)
});

export default validationSchema;
