import React from 'react';
import { Input, InputPropTypes } from './Input';

export const Textarea = props => {
  return <Input as="textarea" {...props} />;
};
Textarea.propTypes = InputPropTypes;
