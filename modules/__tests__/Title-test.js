import React from 'react'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { expect } from 'expect'
import { afterEach, beforeEach, describe, it } from 'node:test'
import Title, { flushTitle } from '../Title'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

describe('Title', () => {
  let roots = []
  let bInstance

  beforeEach(() => {
    flushTitle()
    document.title = ''
    roots = []
    bInstance = null
  })

  afterEach(() => {
    roots.forEach(root => {
      act(() => {
        root.unmount()
      })
    })
    flushTitle()
  })

  class A extends React.Component {
    render() {
      return (
        <div>
          <Title render="A"/>
          <B ref={instance => { bInstance = instance }}/>
        </div>
      )
    }
  }

  class B extends React.Component {
    state = {
      title: 'B'
    }

    render() {
      return (
        <div>
          <Title render={prev => `${prev} | ${this.state.title}`}/>
          <C/>
        </div>
      )
    }
  }

  class C extends React.Component {
    render() {
      return (
        <div>
          <Title render={prev => `${prev} | C`}/>
        </div>
      )
    }
  }

  function renderApp(element) {
    const div = document.createElement('div')
    const root = createRoot(div)
    roots.push(root)

    act(() => {
      root.render(element)
    })

    return root
  }

  it('renders the title', () => {
    renderApp(<A/>)
    expect(document.title).toEqual('A | B | C')
  })

  it('handles state changes in the middle of a chain', () => {
    // incidentally tests the previous and next instances
    // not getting screwed up too.
    renderApp(<A/>)
    expect(document.title).toEqual('A | B | C')

    act(() => {
      bInstance.setState({
        title: 'B Updated'
      })
    })

    expect(document.title).toEqual('A | B Updated | C')
  })

  describe('server rendering with flushTitle', () => {
    it('returns the title', () => {
      renderToString(<A/>)
      const title = flushTitle()
      expect(title).toEqual('A | B | C')
    })

    it('can handle multiple renders (simulating multiple requests)', () => {
      renderToString(<A/>)
      const title = flushTitle()
      expect(title).toEqual('A | B | C')
      // next request comes in
      const NEW_TITLE = 'sorry, I used a singleton'
      renderToString(<Title render={NEW_TITLE}/>)
      const newTitle = flushTitle()
      expect(newTitle).toEqual(NEW_TITLE)
    })
  })

})
