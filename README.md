# Eighteen

A simple, elegant, i18n library for ReactJS.

## Principles

Eighteen is written to get out of your way, make internationalisation of your
React apps easy, and keep your code readable.

It's light, and has no dependencies.

## Get Started

Install Eighteen:

`npm install --save eighteen`

Configure:

```
import Eighteen from 'eighteen';

Eighteen.configure({
  locales: {
    'fr-FR': {
      'Hello': 'Bonjour'
    }
  }
});
```

Use:

```
import { Text } from 'eighteen';

class MyComponent extends Component {
  render() {
    return (
      <Text locale="fr-FR">Hello</Text>
    );
    // Renders:
    // <span>Bonjour</span>
  }
}
```

## Configuration

`Eighteen.configure` takes the following options.

### `locales` (Object)

An object, where each key is the locale identifier (e.g. `en-GB`) and the values are a key-value list of translations.

Translations are keyed by the default translation, and the value is the locale-specific translation. For example, if your default translation is `en-GB`, your `fr-FR` configuration might look like this:

```
locales: {
  'fr-FR': {
    'Hello': 'Bonjour'
  }
}
```

### `defaultLocale` (string)

The default locale key to use when a `locale` prop is not passed to the `Test` component.


## Advanced Formatting

You can provided advanced formatting for your translations by providing an `args` which replaces the format indicators in the order they are given.

```
<Text args={[ 1 ]}>You have %s new message(s)</Text>
// <span>You have 1 new message(s)</span>
```
