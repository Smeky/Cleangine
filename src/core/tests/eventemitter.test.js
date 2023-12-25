import { EventEmitter } from '../eventemitter'

describe('EventEmitter', () => {
    let eventEmitter

    beforeEach(() => {
        eventEmitter = new EventEmitter()
    })

    test('should add event listener', () => {
        const mockCallback = jest.fn()
        eventEmitter.addEventListener('testEvent', mockCallback)
        eventEmitter.dispatchEvent({ type: 'testEvent' })
        expect(mockCallback).toHaveBeenCalled()
    })

    test('should remove event listener', () => {
        const mockCallback = jest.fn()
        eventEmitter.addEventListener('testEvent', mockCallback)
        eventEmitter.removeEventListener('testEvent', mockCallback)
        eventEmitter.dispatchEvent({ type: 'testEvent' })
        expect(mockCallback).not.toHaveBeenCalled()
    })

    test('should dispatch event', () => {
        const mockCallback = jest.fn()
        eventEmitter.addEventListener('testEvent', mockCallback)
        const event = { type: 'testEvent', data: 'testData' }
        eventEmitter.dispatchEvent(event)
        expect(mockCallback).toHaveBeenCalledWith(event)
    })
})
