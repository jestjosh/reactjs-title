This is a port from [react-title-component](https://github.com/ryanflorence/react-title-component)

Reactjs Title
=====================

Nested document title management for React.

### Installation

Using [npm](https://www.npmjs.com/):

    $ npm install reactjs-title

`react` and `prop-types` are peer dependencies, so install them in your
application if they are not already present.

Then with a module bundler like [webpack](https://webpack.github.io/) that supports either CommonJS or ES2015 modules, use as you would anything else:

```js
// using an ES6 transpiler, like babel
import Title, { flushTitle } from 'reactjs-title'

// not using an ES6 transpiler
var ReactTitle = require('reactjs-title')
var Title = ReactTitle.default
var flushTitle = ReactTitle.flushTitle
```

The UMD build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/reactjs-title/umd/ReactTitleComponent.min.js"></script>
```

You can find the library on `window.ReactTitle`.

```js
const Title = window.ReactTitle.default
const flushTitle = window.ReactTitle.flushTitle
```

### Usage

```js
<Title render="My Title"/>
// `document.title` will now be "My Title"
```

That's nice, but the idea is that you don't want just one component
participating in the title of the document. As nested components come in
and out of the UI, you often want to append (or prepend) to the current
title.

```js
// First instance of `Title`
<Title render="My Title"/>

// Lower in the view hierarchy, another `Title` is rendered.
// If you pass it a function you'll get the previous title's value,
// so you can append, prepend, or ignore it.
<Title render={previousTitle => `${previousTitle} - More Title`}/>

// the title, if both of those are rendered, will be:
// "My Title - More Title"
```

It ends up looking something like this:

```js
import React from 'react'
import { createRoot } from 'react-dom/client'
import Title from 'reactjs-title'

function App() {
  return (
    <div>
      <Title render="Awesome Website"/>
      <DeeperPage/>
      {/* ... */}
    </div>
  )
}

function DeeperPage({ profile }) {
  // because it's a component, it gets to participate in the render
  // lifecycle, updating the title as state changes...
  const title = profile ? profile.fullName : 'Loading...'
  return (
    <div>
      <Title render={parentTitle => `More Stuff | ${title}`}/>
      {/* ... */}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App/>)
```

If you're using React Router, you probably want all of your route
components to add something to the title.

### Server Rendering

```js
import { flushTitle } from 'reactjs-title'
import { renderToString } from 'react-dom/server'

const markup = renderToString(<App/>) // App has some Titles in it.
const title = flushTitle() // returns the title and gets ready for the
                           // next request

renderFullPageHoweverYouDoIt(markup, title)
```

### Caveat

There is one caveat: You can't be removing titles from the middle of the
chain.  In other words, make sure that if your component renders a
`Title`, it always renders a Title.

```js
// GOOD
render() {
  return (
    <div>
      <Title render={prev => `${prev} | stuff`}/>
    </div>
  )
}

// BAD
render() {
  return (
    <div>
      {!this.state.screwUpTheTitleLib && (
        <Title render={prev => `${prev} | stuff`}/>
      )}
    </div>
  )
}
```

This could cause a title in the middle of the "title chain" to be
removed and then screw everything else up, the code makes assumptions
based on the order they get rendered.

This could be worked around, but it seems like a strange use-case that
would complicate the code a bit.

Enjoy!
