import React from 'react';
import './modal.scss';
import { CSSTransition } from 'react-transition-group';

export default function Modal(props) {
  const duration = 300;

  return (
    <CSSTransition classNames="modal" timeout={duration} in={props.show}>
      <div onClick={() => props.onClose(false)} className="modal d-block">
        <div onClick={(e) => e.stopPropagation(e)} className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Type of modal window</h5>
              <button
                onClick={() => props.onClose(false)}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>content</p>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => props.onClose(false)}
                type="button"
                className="close btn btn-secondary"
              >
                Close
              </button>
              <button
                onClick={() => props.onClose(false)}
                type="button"
                className="close btn btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
