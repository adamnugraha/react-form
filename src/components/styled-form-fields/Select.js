
// Import React
import React, { Component } from 'react';

// Import classNames for generating classes
import classNames from 'classnames';

// Inport the form input
import FormField from '../FormField';

// Import our message
import Message from './Message';

// Import styled utils
import Utils from './utils';

class SelectWrapper extends Component {

  render() {

    // console.log('RENDER');

    const {
      fieldApi,
      options,
      onChange,
      onBlur,
      placeholder,
      ...rest
    } = this.props;

    const {
      getValue,
      getError,
      getWarning,
      getSuccess,
      setValue,
      setTouched,
    } = fieldApi;

    const error = getError();
    const warning = getWarning();
    const success = getSuccess();

    const type = Utils.getMessageType( error, warning, success );

    const classes = classNames(
      'react-form-input',
      'react-form-select',
      {
        [`react-form-input-${type}`]: type,
        [`react-form-select-${type}`]: type
      }
    );

    const resolvedOptions = options.find(d => d.value === '') ? options : [
      {
        label: placeholder || 'Select One...',
        value: '',
        disabled: true
      },
      ...options
    ];

    const nullIndex = resolvedOptions.findIndex(d => d.value === '');
    const selectedIndex = resolvedOptions.findIndex(d => d.value === getValue());

    return (
      <div>
        <div className={classes}>
          <select
            {...rest}
            value={selectedIndex > -1 ? selectedIndex : nullIndex}
            onChange={(e) => {
              const val = resolvedOptions[e.target.value].value;
              setValue(val);
              if (onChange) {
                onChange(val, e);
              }
            }}
            onBlur={(e) => {
              setTouched();
              if ( onBlur ) {
                onBlur(e);
              }
            }}
          >
            {resolvedOptions.map((option, i) => (
              <option
                key={option.value}
                value={i}
                disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="react-form-select-arrow" />
        </div>
        { type ? <Message message={Utils.getMessage( error, warning, success )} type={type} /> : null }
      </div>
    );
  }
}

const Select = FormField(SelectWrapper);

export default Select;