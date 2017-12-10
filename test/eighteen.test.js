const React = require('react');
const { expect } = require('chai');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const { spy } = require('sinon');

Enzyme.configure({ adapter: new Adapter() });

const { shallow } = Enzyme;
const Eighteen = require('../index');
const { Text } = Eighteen;

describe('eighteen', () => {
  Eighteen.configure({
    defaultLocale: 'en-GB',
    locales: {
      'en-US': {
        'Hello, world!': 'Howdy, world!',
        'You have %s new messages': 'Yeehaww! %s new messages'
      },
      'fr-FR': {
        'Hello, world!': 'Bonjour, world!',
        'You have %s new messages': 'Les messages %s'
      },
      'en-GB': {
        'Hello, world!': null,
        'You have %s new messages': null,
        'You %%s have %s': null
      }
    }
  });
  it('outputs a string in a default locale', () => {
    const str = 'Hello, world!';
    const wrapper = shallow(<Text>{str}</Text>);
    expect(wrapper.text()).to.equal(str);
  });
  it('outputs a string without an entry, but gives a warning', () => {
    const str = "This doesn't exist";
    const warning = spy(console, 'warn');
    const wrapper = shallow(<Text>{str}</Text>);
    expect(wrapper.text()).to.equal(str);
    expect(warning.called).to.equal(true);
    console.warn.restore();
  });
  it('translates a string from one locale to another', () => {
    const wrapper = shallow(<Text locale='fr-FR'>Hello, world!</Text>);
    expect(wrapper.text()).to.equal('Bonjour, world!');
  });
  it('throws an error if a locale does not exist', () => {
    try {
      const wrapper = shallow(<Text locale='el-FISH'>Hello, world!</Text>);
    } catch (e) {
      expect(e.message).to.equal('No such locale.');
    }
  });
  it('translates a string with variables from one locale to another', () => {
    const wrapper = shallow(<Text locale='fr-FR' args={[ 12 ]}>You have %s new messages</Text>);
    expect(wrapper.text()).to.equal('Les messages 12')
  });
  it('allows escaping of translation variable types', () => {
    const wrapper = shallow(<Text locale='en-GB' args={[ 'red' ]}>You %%s have %s</Text>);
    expect(wrapper.text()).to.equal('You %s have red')
  });
});
