import { 
    rectangle, 
    rectangleFromPoints, 
    rectangleFromBounds, 
    rectangleFromSize, 
    intersects, 
    contains, 
    containsPoint 
} from './rect'

describe('Rectangle', () => {
    test('rectangle function creates a rectangle', () => {
        expect(rectangle(1, 2, 3, 4)).toEqual({ x: 1, y: 2, width: 3, height: 4 })
    })

    test('rectangleFromPoints creates a rectangle from two points', () => {
        expect(rectangleFromPoints(1, 2, 4, 6)).toEqual({ x: 1, y: 2, width: 3, height: 4 })
    })

    test('rectangleFromBounds creates a rectangle from bounds', () => {
        expect(rectangleFromBounds({ left: 1, top: 2, right: 4, bottom: 6 })).toEqual({ x: 1, y: 2, width: 3, height: 4 })
    })

    test('rectangleFromSize creates a rectangle with specified size and zero origin', () => {
        expect(rectangleFromSize(3, 4)).toEqual({ x: 0, y: 0, width: 3, height: 4 })
    })

    describe('intersects function', () => {
        test('returns true if rectangles intersect', () => {
            expect(intersects({ x: 1, y: 1, width: 2, height: 2 }, { x: 2, y: 2, width: 2, height: 2 })).toBeTruthy()
        })

        test('returns false if rectangles do not intersect', () => {
            expect(intersects({ x: 1, y: 1, width: 1, height: 1 }, { x: 3, y: 3, width: 2, height: 2 })).toBeFalsy()
        })
    })

    describe('contains function', () => {
        test('returns true if rectangle a contains rectangle b', () => {
            expect(contains({ x: 1, y: 1, width: 4, height: 4 }, { x: 2, y: 2, width: 1, height: 1 })).toBeTruthy()
        })

        test('returns false if rectangle a does not contain rectangle b', () => {
            expect(contains({ x: 1, y: 1, width: 2, height: 2 }, { x: 2, y: 2, width: 2, height: 2 })).toBeFalsy()
        })
    })

    describe('containsPoint function', () => {
        test('returns true if rectangle contains the point', () => {
            expect(containsPoint({ x: 1, y: 1, width: 4, height: 4 }, 2, 2)).toBeTruthy()
        })

        test('returns false if rectangle does not contain the point', () => {
            expect(containsPoint({ x: 1, y: 1, width: 2, height: 2 }, 4, 4)).toBeFalsy()
        })
    })
})
