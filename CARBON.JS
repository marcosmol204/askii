// Enums in JS - Marcos Molina 02/03/2021

// Possible solution
const BINARY = 'binary';
const NUMERIC = 'numeric';
const TEXT = 'text';

// A boolean function that checks if the value(typed) is valid
const checkAnswerType = (type) => type === BINARY || type === NUMERIC || type === TEXT;

// Notice: If we want to add a new value to the enum, we will break the function above;

// Handling the problem
const answerTypesEnum = {
    BINARY,
    NUMERIC,
    TEXT,
};

const isInArray = (value, array) => array.indexOf(value) > -1;

const isInObject = (type, object) => {
    const valuesArray = object.values(answerTypesEnum);
    return isInArray(type, valuesArray);
}

// isInObject(answerTypes,'binary') output: true
// isInObject(answerTypes,'mixed') output: false

// Notice: We can change the object everywhere.
// answerTypesEnum.MIXED = 'mixed' is possible

// Handling the problem using Object.freeze()
const answerTypesEnum = Object.freeze({
    BINARY : 'binary',
    NUMERIC: 'numeric',
    TEXT: 'text'
});
// Why?
/*
 "...A frozen object can no longer be changed; freezing an object prevents new properties
 from being added to it, existing properties from being removed,
 prevents changing the enumerability..." MDN
*/

// Now we can use isInObject() to check if the values is valid.

// We can't change the object everywhere :)
