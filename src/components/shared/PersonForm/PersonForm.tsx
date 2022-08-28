import React, { Dispatch, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import { IPersonFull, IRootState, Gender } from '../../../utils/types';
import { selectLoading, selectError, selectPerson } from '../../../redux/selectors';
import { getPerson } from '../../../redux/actions';
import { useHistory, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import NoData from '../NoData/NoData';
import { localDb } from '../../../utils/db';

import './PersonForm.scss';
import { pickPerson } from '../../../utils/window';

interface IPersonFormParams {
  personId?: string;
}

const PersonForm = (props: IPersonFormProps): React.ReactElement => {
  const { person, isLoading, getPerson } = props;
  const [innerPerson, setInnerPerson] = useState<IPersonFull | undefined>(person);
  const { personId } = useParams<IPersonFormParams>();
  const history = useHistory();
  const intl = useIntl();

  useEffect(() => {
    getPerson(+(personId || 0));
  }, [personId]);

  useEffect(() => {
    setInnerPerson(person);
  }, [person]);

  const handleSave = (): void => {
    if (innerPerson) {
      localDb.savePersonToLocal(pickPerson(innerPerson));
      toast.success(intl.formatMessage({ id: 'success' }));
    }
  };

  const handleCancel = (): void => {
    history.push('/');
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof IPersonFull): void => {
    const newValue = e.target.value;
    if (innerPerson) {
      innerPerson[fieldName] = newValue;
      setInnerPerson({ ...innerPerson });
    }
  };

  if (isLoading) return <Loading />;

  if (!isLoading && !innerPerson) return <NoData />;

  if (!innerPerson) return <NoData />;

  return (
    <Container className="person-form">
      <Form>
        <Row>
          <Col xs={12} sm={6}>
            <Form.Label>Person Name:</Form.Label>
            <Form.Control type="text" value={innerPerson.name} onChange={(e) => handleFieldChange(e as any, 'name')} />

            <Form.Label>Gender:</Form.Label>
            <Form.Select value={innerPerson.gender} onChange={(e) => handleFieldChange(e as any, 'gender')}>
              {Object.values(Gender).map((x, i) => (
                <option key={i} value={x}>
                  {x}
                </option>
              ))}
            </Form.Select>

            <Form.Label>Birth Year:</Form.Label>
            <Form.Control
              type="text"
              value={innerPerson.birth_year}
              onChange={(e) => handleFieldChange(e as any, 'birth_year')}
            />
          </Col>
          <Col xs={12} sm={6}>
            <Form.Label>Height:</Form.Label>
            <Form.Control
              type="text"
              value={innerPerson.height}
              onChange={(e) => handleFieldChange(e as any, 'height')}
            />

            <Form.Label>Mass:</Form.Label>
            <Form.Control type="text" value={innerPerson.mass} onChange={(e) => handleFieldChange(e as any, 'mass')} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <Form.Label>Skin Color:</Form.Label>
            <Form.Control
              type="text"
              value={innerPerson.skin_color}
              onChange={(e) => handleFieldChange(e as any, 'skin_color')}
            />

            <Form.Label>Eye Color:</Form.Label>
            <Form.Control
              type="text"
              value={innerPerson.eye_color}
              onChange={(e) => handleFieldChange(e as any, 'eye_color')}
            />

            <Form.Label>Hair Color:</Form.Label>
            <Form.Control
              type="text"
              value={innerPerson.hair_color}
              onChange={(e) => handleFieldChange(e as any, 'hair_color')}
            />
          </Col>
          <Col xs={12} sm={6}>
            <Form.Label>Home World:</Form.Label>
            <Form.Control type="text" value={innerPerson.homeworldFull?.name} readOnly />

            <Form.Label>Films:</Form.Label>
            <Form.Control type="text" value={innerPerson.filmsFull?.map((x) => x.title).join(';')} readOnly />

            <Form.Label>Species:</Form.Label>
            <Form.Control type="text" value={innerPerson.speciesFull?.map((x) => x.name).join(';')} readOnly />

            <Form.Label>Vehicles:</Form.Label>
            <Form.Control type="text" value={innerPerson.vehiclesFull?.map((x) => x.name).join(';')} readOnly />

            <Form.Label>Starships:</Form.Label>
            <Form.Control type="text" value={innerPerson.starshipsFull?.map((x) => x.name).join(';')} readOnly />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <span className="me-3">
              <small>Created:</small> {new Date(innerPerson.created).toLocaleDateString()}
            </span>
            <span>
              <small>Edited:</small> {new Date(innerPerson.edited).toLocaleDateString()}
            </span>
          </Col>
          <Col xs={12} sm={6} className="text-end">
            <Button onClick={handleSave} variant="primary" className="me-2">
              Save
            </Button>
            <Button onClick={handleCancel} variant="secondary">
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

interface IPropsState {
  person: IPersonFull | undefined;
  isLoading: boolean;
  error: string | undefined;
}
const mapStateToProps = (state: IRootState): IPropsState => {
  return {
    person: selectPerson(state),
    isLoading: selectLoading(state),
    error: selectError(state),
  };
};

interface IPropsDispatch {
  getPerson: (personId: number) => void;
}
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IPropsDispatch => {
  return {
    getPerson: (personId: number): void => dispatch(getPerson({ personId })),
  };
};

interface IPropsOwn {}

type IPersonFormProps = IPropsState & IPropsDispatch & IPropsOwn;

export default connect(mapStateToProps, mapDispatchToProps)(PersonForm);
