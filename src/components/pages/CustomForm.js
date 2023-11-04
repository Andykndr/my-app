import React from 'react';
import './style/form.scss';
import { ErrorMessage, Field, Form, Formik, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input {...props} {...field} />
      {meta.touched && meta.error ? (
        <div className="formMess">{meta.error}</div>
      ) : null}
    </>
  );
};
const MyCheckInput = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...props} {...field} />
        {children}
      </label>

      {meta.touched && meta.error ? (
        <div className="formMess">{meta.error}</div>
      ) : null}
    </>
  );
};
export default function CustomForm() {
  return (
    <div className="frm">
      <Formik
        initialValues={{
          name: '',
          email: '',
          amount: '',
          currency: '',
          text: '',
          terms: false,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Required')
            .min(3, 'You need more than 3'),
          email: Yup.string()
            .email('Invalid email address! Must be :"example@gmail.com"')
            .required('Required'),
          amount: Yup.number().required('Required'),
          currency: Yup.string().required('You must chouse'),
          text: Yup.string(),
          terms: Yup.boolean().oneOf(
            [true],
            'You must agree to the terms and conditions'
          ),
        })}
        onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
      >
        <Form className="form">
          <h2>Send money!</h2>

          <MyTextInput label="Your name" type="text" name="name" />

          <MyTextInput label="Your Email:" type="email" name="email" />

          <MyTextInput label="Amount:" type="number" name="amount" />

          <label htmlFor="currency">Valute:</label>
          <Field id="currency" name="currency" as="select">
            <option disabled value="1">
              Chouse
            </option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="UAH">UAH</option>
          </Field>

          <ErrorMessage className="formMess" name="currency" component="div" />

          <label htmlFor="text">Comments:</label>
          <Field as="textarea" name="text" rows="4" cols="50"></Field>

          <ErrorMessage className="formMess" name="text" component="div" />

          <MyCheckInput name="terms">
            Agree with polite confidence!
          </MyCheckInput>

          <button className="frbtn" type="submit">
            Send!
          </button>
        </Form>
      </Formik>
    </div>
  );
}
