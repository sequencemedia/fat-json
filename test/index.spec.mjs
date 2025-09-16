// @ts-nocheck

import {
  use,
  expect
} from 'chai'

import Sinon from 'sinon'
import sinonChai from '@sequencemedia/sinon-chai'

import {
  useReplacerWithType,
  useReviverWithType,
  useReplacerWithPath,
  useReviverWithPath
} from '#fat-json'

use(sinonChai)

describe('fat-json', () => {
  describe('`useReplacerWithType`', () => it('is a function', () => expect(useReplacerWithType).to.be.a('function')))

  describe('`useReviverWithType`', () => it('is a function', () => expect(useReviverWithType).to.be.a('function')))

  describe('`useReplacerWithPath`', () => it('is a function', () => expect(useReplacerWithPath).to.be.a('function')))

  describe('`useReviverWithPath`', () => it('is a function', () => expect(useReviverWithPath).to.be.a('function')))

  describe('`useReplacerWithType()`', () => {
    it ('returns a function', () => {
      expect(useReplacerWithType(Sinon.spy())).to.be.a('function')
    })

    describe('Stringify', () => {
      let replacer
      let v

      describe('Value is an array', () => {
        const a = [1]

        beforeEach(() => {
          replacer = Sinon.spy((key, value) => value)
          v = JSON.stringify(a, useReplacerWithType(replacer), 2)
        })

        it('stringifies', () => {
          expect(v).to.be.a('string')
        })

        it('calls the replacer', () => {
          expect(replacer).to.have.been.calledWith('', a, 'object')
        })

        it('calls the replacer', () => {
          expect(replacer).to.have.been.calledWith('0', 1, 'number')
        })
      })

      describe('Value is an object', () => {
        const o = { v: 1 }

        beforeEach(() => {
          replacer = Sinon.spy((key, value) => value)
          v = JSON.stringify(o, useReplacerWithType(replacer), 2)
        })

        it('stringifies', () => {
          expect(v).to.be.a('string')
        })

        it('calls the replacer', () => {
          expect(replacer).to.have.been.calledWith('', o, 'object')
        })

        it('calls the replacer', () => {
          expect(replacer).to.have.been.calledWith('v', 1, 'number')
        })
      })
    })
  })

  describe('`useReviverWithType()`', () => {
    it ('returns a function', () => {
      expect(useReviverWithType(Sinon.spy())).to.be.a('function')
    })

    describe('Parse', () => {
      let reviver
      let v

      describe('Value is an array', () => {
        const a = '[1]'

        beforeEach(() => {
          reviver = Sinon.spy((key, value) => value)
          v = JSON.parse(a, useReviverWithType(reviver), 2)
        })

        it('parses', () => {
          expect(v).to.be.an('array')
        })

        it('calls the reviver', () => {
          expect(reviver).to.have.been.calledWith('', [1], 'object')
        })

        it('calls the reviver', () => {
          expect(reviver).to.have.been.calledWith('0', 1, 'number')
        })
      })

      describe('Value is an object', () => {
        const o = '{"v":1}'

        beforeEach(() => {
          reviver = Sinon.spy((key, value) => value)
          v = JSON.parse(o, useReviverWithType(reviver), 2)
        })

        it('parses', () => {
          expect(v).to.be.an('object')
        })

        it('calls the reviver', () => {
          expect(reviver).to.have.been.calledWith('', { v: 1 }, 'object')
        })

        it('calls the reviver', () => {
          expect(reviver).to.have.been.calledWith('v', 1, 'number')
        })
      })
    })
  })

  describe('`useReplacerWithPath()`', () => {
    it ('returns a function', () => {
      expect(useReplacerWithType(Sinon.spy())).to.be.a('function')
    })

    describe('Stringify', () => {
      let replacer
      let v

      describe('Value is an array', () => {
        const a = [1]

        beforeEach(() => {
          replacer = Sinon.spy((key, value) => value)
          v = JSON.stringify(a, useReplacerWithPath(replacer), 2)
        })

        it('stringifies', () => {
          expect(v).to.be.a('string')
        })

        it('calls the replacer', () => {
          expect(replacer).to.have.been.calledWith('', a, '$')
        })

        it('calls the replacer', () => {
          expect(replacer).to.have.been.calledWith('0', 1, '$[0]')
        })
      })

      describe('Value is an object', () => {
        const o = { v: 1 }

        beforeEach(() => {
          replacer = Sinon.spy((key, value) => value)
          v = JSON.stringify(o, useReplacerWithPath(replacer), 2)
        })

        it('stringifies', () => {
          expect(v).to.be.a('string')
        })

        it('calls the replacer', () => {
          expect(replacer).to.have.been.calledWith('', o, '$')
        })

        it('calls the replacer', () => {
          expect(replacer).to.have.been.calledWith('v', 1, '$.v')
        })
      })
    })
  })

  describe('`useReviverWithPath()`', () => {
    it ('returns a function', () => {
      expect(useReviverWithPath(Sinon.spy())).to.be.a('function')
    })

    describe('Parse', () => {
      let reviver
      let v

      describe('Value is an array', () => {
        const a = '[1]'

        beforeEach(() => {
          reviver = Sinon.spy((key, value) => value)
          v = JSON.parse(a, useReviverWithPath(reviver), 2)
        })

        it('parses', () => {
          expect(v).to.be.an('array')
        })

        it('calls the reviver', () => {
          expect(reviver).to.have.been.calledWith('', [1], '$')
        })

        it('calls the reviver', () => {
          expect(reviver).to.have.been.calledWith('0', 1, '$[0]')
        })
      })

      describe('Value is an array with an object', () => {
        const a = '[{"v":1}]'

        beforeEach(() => {
          reviver = Sinon.spy((key, value) => value)
          v = JSON.parse(a, useReviverWithPath(reviver), 2)
        })

        it('parses', () => {
          expect(v).to.be.an('array')
        })

        it('calls the reviver', () => {
          expect(reviver).to.have.been.calledWith('', [{ v: 1 }], '$')
        })

        it('calls the reviver', () => {
          expect(reviver).to.have.been.calledWith('0', { v: 1 }, '$[0]')
        })

        it('calls the reviver', () => {
          expect(reviver).to.have.been.calledWith('v', 1, '$[0].v')
        })
      })

      describe('Value is an object', () => {
        const o = '{"v":1}'

        beforeEach(() => {
          reviver = Sinon.spy((key, value) => value)
          v = JSON.parse(o, useReviverWithPath(reviver), 2)
        })

        it('parses', () => {
          expect(v).to.be.an('object')
        })

        it('calls the reviver', () => {
          expect(reviver).to.have.been.calledWith('', { v: 1 }, '$')
        })

        it('calls the reviver', () => {
          expect(reviver).to.have.been.calledWith('v', 1, '$.v')
        })
      })

      describe('Value is an object with an array', () => {
        const o = '{"v":[1]}'

        beforeEach(() => {
          reviver = Sinon.spy((key, value) => value)
          v = JSON.parse(o, useReviverWithPath(reviver), 2)
        })

        it('parses', () => {
          expect(v).to.be.an('object')
        })

        it('calls the reviver', () => {
          expect(reviver).to.have.been.calledWith('', { v: [1] }, '$')
        })

        it('calls the reviver', () => {
          expect(reviver).to.have.been.calledWith('v', [1], '$.v')
        })

        it('calls the reviver', () => {
          expect(reviver).to.have.been.calledWith('0', 1, '$.v[0]')
        })
      })
    })
  })
})
