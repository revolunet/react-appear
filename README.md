# react-appear

Use [in-viewport](https://www.npmjs.com/package/in-viewport) to trigger transitions on your components when they become visible in the viewport

`npm i -S react-appear`

See the [demo](http://revolunet.github.io/react-appear)

## Usage

```jsx
const Example = () => (<Appear className='MyTransition'>
                          <img src="http://placekitten.com/g/200/300"/>
                       </Appear>)

```

Initially, your component will be wrapped in `<div class="MyTransition"></div>`.

When entering the viewport, the div will get additional `MyTransition--inViewport` className.

You need to define the CSS rules, example :

```css
.MyTransition {
  opacity: 0;
  transition: all 0.5s ease-out;
}

.MyTransition--inViewport {
  opacity: 1;
}
```

## License

*react-appear* is available under MIT. See LICENSE for more details.

