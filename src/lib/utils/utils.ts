import * as _ from 'lodash';

export function mark(source: string): string {
    if (!source) { return source; }

    const subStr = source.slice(-4);
    return `***********${subStr}`;
}


export function isFalseValue(val) {
    return val && (_.toLower(val) === 'false' || val === '0');
}

