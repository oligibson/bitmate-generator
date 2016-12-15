'use strict';

const test = require('ava');
const helper = require('../../test-helper');
const product = require('cartesian-product');

let context;

test.beforeEach(() => {
    context = helper.mock();
    context.writeJSON = {};
    context.write = {};
});

const combinations = product([
    ['react', 'angular2'],
    ['babel', 'typescript']
]);

const getExtensions = require('../../../src/Utils').getExtensions;

combinations.forEach(combination => {
    test(`Return correct extension for ${combination[0]} and ${combination[1]}`, t => {
        const props = {
            framework: combination[0],
            js: combination[1],
            css: 'css'
        };
        const ts = props.framework === 'react' ? 'tsx' : 'ts';
        const expected = {
            css: 'css',
            js: props.js === 'typescript' ? ts : 'js'
        };
        const extensions = getExtensions.call(context, props);
        t.deepEqual(extensions, expected);
    });
});