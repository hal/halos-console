import { Button } from '@patternfly/react-core';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

interface GoHomeProps {
  title: string;
}

const GoHome: FunctionComponent<GoHomeProps> = ({ title }) => {
  const navigate = useNavigate();

  return <Button onClick={() => navigate('/')}>{title}</Button>;
};

export default GoHome;
