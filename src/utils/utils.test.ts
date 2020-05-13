import assert from 'assert';
import {transformPositionToOrientation, inverseTransformPositionToOrientation} from './utils'

describe('Testing utility functions', function(){
    describe('transformPositionToOrientation', function(){
        const positionX = 100;
        const positionY = 200;
        const tableWidth = 500;
        const tableHeight = 300;

        it('should mirror and translate by tables witdth on the x axis', function(){
            const transformedPosition = transformPositionToOrientation(positionX, positionY, tableWidth, tableHeight);
            assert.equal(transformedPosition[0], -positionX + tableWidth);
        })
        it('should mirror and translate by tables height on the y axis', function(){
            const transformedPosition = transformPositionToOrientation(positionX, positionY, tableWidth, tableHeight);
            assert.equal(transformedPosition[1], -positionY + tableHeight);
        })
    })

    describe('inverseTransformPositionToOrientation', function(){
        const positionX = 100;
        const positionY = 200;
        const tableWidth = 500;
        const tableHeight = 300;

        it('should invert transformPositionToOrientation', function(){
            const transformedPosition = transformPositionToOrientation(positionX, positionY, tableWidth, tableHeight);
            const invertedPosition = inverseTransformPositionToOrientation(transformedPosition[0], transformedPosition[1], tableWidth, tableHeight);
            assert.equal(invertedPosition[0], positionX);
            assert.equal(invertedPosition[1], positionY);
        })  
    })
})