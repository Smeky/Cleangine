const { makeObservable } = require('../observable')

describe('makeObservable', () => {
    test('returns an object with a correct value property', () => {
        const observable = makeObservable(0)
        expect(observable.value).toBe(0)
    })

    test('notifies observers on primitive value change', () => {
        const observable = makeObservable(0)
        let latestValue
        observable.observe(newValue => { latestValue = newValue })

        observable.value = 1
        expect(latestValue).toBe(1)
    })

    test('notifies observers when nested object changes', () => {
        const originalObj = { nested: { a: 1 } }
        const observable = makeObservable(originalObj)
        let latestValue
        observable.observe(newValue => { latestValue = newValue })

        observable.value.nested.a = 2
        expect(latestValue.nested.a).toBe(2)
        expect(originalObj.nested.a).toBe(2)
    })

    test('notifies observers when nested object is replaced', () => {
        const originalObj = { nested: { a: 1 } }
        const observable = makeObservable(originalObj)
        let latestValue
        observable.observe(newValue => { latestValue = newValue })

        observable.value.nested = { b: 2 }
        expect(latestValue.nested.b).toBe(2)
        expect(originalObj.nested.b).toBe(2)
    })

    test('does not notify observers after they unsubscribe', () => {
        const observable = makeObservable({ a: 1 })
        let timesNotified = 0
        const unsubscribe = observable.observe(() => { timesNotified++ })

        observable.value = { a: 2 }
        unsubscribe()
        observable.value = { a: 3 }

        expect(timesNotified).toBe(1)
    })

    test('handles multiple observers correctly', () => {
        const observable = makeObservable(0)
        let firstObserverCalled = false
        let secondObserverCalled = false

        const firstUnsubscribe = observable.observe(() => { firstObserverCalled = true })
        observable.observe(() => { secondObserverCalled = true })

        observable.value = 10
        firstUnsubscribe()
        observable.value = 20

        expect(firstObserverCalled).toBe(true)
        expect(secondObserverCalled).toBe(true)
    })
})
