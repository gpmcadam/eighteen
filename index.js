const React = require('react');
const util = require('util');

let _config = {
  defaultLocale: 'en-GB',
  locales: {}
};

const Text = props => {
  const locale = props.locale || _config.defaultLocale;
  const key = props.children;
  let translation;
  if (!_config.locales.hasOwnProperty(locale)) {
    throw new Error('No such locale.');
  }
  if (!_config.locales[locale].hasOwnProperty(key)) {
    translation = key;
    console.warn('Warning: no direct translation in locale for entry. Returning the raw string.');
  } else {
    translation = _config.locales[locale][key] || key;
  }
  translation = util.format.apply(null, [ translation, ...(props.args || []) ]);
  return (
    <span>{translation}</span>
  );
};

const Eighteen = {
  configure: config => {
    _config = Object.assign(_config, config);
  },
  Text
};

module.exports = Eighteen;
