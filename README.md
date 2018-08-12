# Titanium Loading HUD-Control

A simple loading HUD that uses native UI elements to present
a modal loading indicator.

## Requirements

- Titanium SDK 7.1.0+
- ES6 enabled (`<transpile>true</transpile`)

## Example

Simply put the `loader.js` into `app/lib` (Alloy) or `Resources` (Classic).

```js
import Loader from 'loader';

const loader = new Loader({
  view: $.window,
  title: 'Loading …',
});

loader.show();

setTimeout(() => {
  loader.hide();
}, 2000);
```

## License

MIT

## Author 

Hans Knöchel