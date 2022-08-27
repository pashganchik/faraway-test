import React from 'react';
import { IPerson } from '../../../utils/types';
import Card from 'react-bootstrap/Card';

import './PersonItem.scss';

interface IPersonItemProps {
  person: IPerson;
}

const PersonItem = (props: IPersonItemProps): React.ReactElement => {
  const { person } = props;

  return (
    <Card className="person-item">
      <Card.Body>
        <Card.Title className="text-center">
          <small>Person:</small> {person.name}
        </Card.Title>
        <Card.Subtitle className="text-center mb-2">
          (<small>Gender:</small> {person.gender}, <small>Birth:</small> {person.birth_year})
        </Card.Subtitle>
        <div className="d-flex justify-content-center">
          <div className="m-2">
            <b>Physique</b>
            <hr className="my-1"></hr>
            <div>
              <small>Height:</small> {person.height}
            </div>
            <div>
              <small>Mass:</small> {person.mass}
            </div>
          </div>
          <div className="m-2">
            <b>Appearance</b>
            <hr className="my-1"></hr>
            <div>
              <small>Skin color:</small> {person.skin_color}
            </div>
            <div>
              <small>Eye color:</small> {person.eye_color}
            </div>
            <div>
              <small>Hair color:</small> {person.hair_color}
            </div>
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="text-center">
        <span className="me-3">
          <small>Created:</small> {new Date(person.created).toLocaleDateString()}
        </span>
        <span>
          <small>Edited:</small> {new Date(person.edited).toLocaleDateString()}
        </span>
      </Card.Footer>
    </Card>
  );
};

export default PersonItem;
