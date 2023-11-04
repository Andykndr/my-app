import React from 'react';
import './style/Form.scss';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

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
          <label htmlFor="name">First Name:</label>
          <Field type="text" name="name" />

          <ErrorMessage className="formMess" name="name" component="div" />

          <label htmlFor="email">Email:</label>
          <Field type="email" name="email" />

          <ErrorMessage className="formMess" name="email" component="div" />

          <label htmlFor="amount">Amount:</label>
          <Field type="number" name="amount" />

          <ErrorMessage className="formMess" name="amount" component="div" />

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

          <label htmlFor="check">
            Agree with polite confidence!
            <Field type="checkbox" name="terms" />
          </label>

          <ErrorMessage className="formMess" name="terms" component="div" />

          <button className="frbtn" type="submit">
            Send!
          </button>
        </Form>
      </Formik>
    </div>
  );
}
