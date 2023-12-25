import { EventEmitter } from '../eventemitter'

describe('EventEmitter', () => {
    let eventEmitter

    beforeEach(() => {
        eventEmitter = new EventEmitter()
    })

    test('should dispatch event using emit(type, ...data)', () => {
        const mockCallback = jest.fn()
        const event = { data: 'testData' }
        eventEmitter.on('testEvent', mockCallback)
        eventEmitter.emit('testEvent', event)
        expect(mockCallback).toHaveBeenCalledWith(event)
    })

    test('should dispatch event using dispatchEvent({ type, ...data })', () => {
        const mockCallback = jest.fn()
        const event = { type: 'testEvent', data: 'testData' }
        eventEmitter.on('testEvent', mockCallback)
        eventEmitter.dispatchEvent(event)
        expect(mockCallback).toHaveBeenCalledWith(event)
    })

    test('should add event listener using on()', () => {
        const mockCallback = jest.fn()
        eventEmitter.on('testEvent', mockCallback)
        eventEmitter.emit('testEvent')
        expect(mockCallback).toHaveBeenCalled()
    })
    
    test('should add event listener using addEventListener()', () => {
        const mockCallback = jest.fn()
        eventEmitter.addEventListener('testEvent', mockCallback)
        eventEmitter.emit('testEvent')
        expect(mockCallback).toHaveBeenCalled()
    })

    test('should remove event listener using off()', () => {
        const mockCallback = jest.fn()
        eventEmitter.on('testEvent', mockCallback)
        eventEmitter.off('testEvent', mockCallback)
        eventEmitter.emit('testEvent')
        expect(mockCallback).not.toHaveBeenCalled()
    })

    test('should remove event listener using removeEventListener', () => {
        const mockCallback = jest.fn()
        eventEmitter.addEventListener('testEvent', mockCallback)
        eventEmitter.removeEventListener('testEvent', mockCallback)
        eventEmitter.emit('testEvent')
        expect(mockCallback).not.toHaveBeenCalled()
    })
})
