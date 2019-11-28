import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .label('Username')
    .required('Please enter your username')
    .min(4, 'Username must have at least 4 characters '),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters ')
});

export default validationSchema;
