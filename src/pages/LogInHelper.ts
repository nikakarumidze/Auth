import validator from 'validator';
import axios from 'axios';

export default async function LogInHelper(
  event: React.FormEvent<HTMLFormElement>,
  setFormState: any,
  setReqErr: any,
  setLoading: any,
  dispatch: any,
  applyToken: any
) {
  const formData = new FormData(event.currentTarget);
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
    checkbox: !!formData.get('checkbox'),
  } as const;

  const isEmailValid = validator.isEmail(data.email as string);
  const isPasswordValid = validator.isStrongPassword(data.password as string, {
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  });

  setFormState({
    isEmailValid: isEmailValid,
    isPasswordValid: isPasswordValid,
  });
  if (!isEmailValid || !isPasswordValid) return;

  setReqErr(false);
  setLoading(true);

  try {
    const answer = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
      {
        email: data.email,
        password: data.password,
        returnSecureToken: true,
      }
    );
    const expireDate = new Date().getTime() + answer.data.expiresIn;
    dispatch(
      applyToken({
        token: answer.data.idToken,
        id: answer.data.localId,
        date: expireDate,
      })
    );
    if (data.checkbox) {
      localStorage.setItem('token', answer.data.idToken);
      localStorage.setItem('date', expireDate);
    }
    return true;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      setLoading(false);
      setReqErr(true);
      setFormState({
        isEmailValid: false,
        isPasswordValid: false,
      });
    }
  }
}
