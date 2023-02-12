import validator from 'validator';
import axios from 'axios';

export default async function signUpHelper(
  event: React.FormEvent<HTMLFormElement>,
  setFormState: any,
  setReqStatus: any,
  setLoading: any
) {
  const formData = new FormData(event.currentTarget);
  const data = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    checkbox: !!formData.get('checkbox'),
  } as const;

  const isNameValid = !!data.firstName;
  const isLastNameValid = !!data.lastName;
  const isEmailValid = validator.isEmail(data.email as string);
  const isPasswordValid = validator.isStrongPassword(data.password as string, {
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
  });

  setFormState({
    isNameValid: isNameValid,
    isLastNameValid: isLastNameValid,
    isEmailValid: isEmailValid,
    isPasswordValid: isPasswordValid,
  });

  if (!isNameValid || !isLastNameValid || !isEmailValid || !isPasswordValid)
    return;
  setReqStatus({ fullfill: null });
  setLoading(true);

  try {
    await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`,
      {
        email: data.email,
        password: data.password,
      }
    );
    setReqStatus({
      fullfill: true,
      message: 'Successfully registered!',
    });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      setReqStatus({
        fullfill: false,
        message: err.message + ': ' + err.response?.data.error.message,
      });
      setFormState({
        isNameValid: true,
        isLastNameValid: true,
        isEmailValid: false,
        isPasswordValid: true,
      });
    }
  }
  setLoading(false);
}
