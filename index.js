const React = require('react');
const util = require('util');

let _config = {
  defaultLocale: 'en-GB',
  locales: {}
};

const format = (str, args = []) => {
  return util.format.apply(null, [ str, ...args ]);
};

const Text = props => {
  const key = props.children;
  const locale = props.locale || _config.defaultLocale;
  if (props.locale && !_config.locales.hasOwnProperty(props.locale)) {
    throw new Error('No such locale.');
  }
  if (!_config.locales[locale].hasOwnProperty(key)) {
    console.warn('Warning: no direct translation in locale for entry. Returning the raw string.');
  }
  const translation = _config.locales[locale][key] || key;
  return (
    <span>{format(translation, props.args)}</span>
  );
};

const Eighteen = {
  configure: config => {
    _config = Object.assign(_config, config);
  },
  Text
};

module.exports = Eighteen;
