import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import CharList from '../charList/CharList';
import RandomChar from '../randomChar/RandomChar';
import CharInfo from '../charInfo/CharInfo';
import decoration from '../../resources/img/vision.png';
import Modal from '../modal/Modal';
import FindCharacter from '../findCharacter/FindCharacter';

export default function MainPage() {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (id) => {
    setSelectedChar(id);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Helmet>
        <meta name="description" content="A website Marvel" />
        <title>Marvel Portal</title>
      </Helmet>
      <div>
        <Modal onClose={setShowModal} show={showModal} />
        <button
          type="button"
          className="btn btn-success"
          onClick={() => setShowModal(true)}
        >
          Open
        </button>
      </div>

      <RandomChar />
      <div className="char__content">
        <CharList onCharSelected={onCharSelected} />
        <div>
          <CharInfo charId={selectedChar} />
          <FindCharacter />
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
}
