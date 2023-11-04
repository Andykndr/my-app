import React, { useState } from 'react';
import './findCharacter.scss';
import { ErrorMessage as FormikEM, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

export default function FindCharacter() {
  const [charList, setCharList] = useState(null);

  const { loading, error, clearError, getCharacterByName } = useMarvelService();

  const onRequest = (charName) => {
    clearError();

    getCharacterByName(charName).then(onLoaded);
  };

  const onLoaded = (charList) => {
    setCharList(charList);
  };

  const errorMessage = error ? (
      <div>
        <ErrorMessage />
      </div>
    ) : null,
    content = !charList ? null : charList.length > 0 ? (
      <div>
        Wow,you got it! Visit {charList[0].name} page?
        <Link to={`/characters/${charList[0].id}`} className="errMess">
          <div>To page</div>
        </Link>
      </div>
    ) : (
      <p className="errMess">No characters found with this name.</p>
    ),
    load = loading ? <Spinner /> : null;

  return (
    <div className="findForm">
      <Formik
        initialValues={{ name: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required'),
        })}
        onSubmit={({ name }) => {
          onRequest(name);
        }}
      >
        <Form>
          <h2>Find a character by Name:</h2>
          <div>
            <Field
              placeholder="Enter name..."
              className="searchInput"
              name="name"
              type="text"
            />
            <button className="search-button" type="submit">
              FIND
            </button>
          </div>

          <FormikEM className="errMess" name="name" component="div" />
        </Form>
      </Formik>

      {load}
      {content}
      {errorMessage}
    </div>
  );
}
