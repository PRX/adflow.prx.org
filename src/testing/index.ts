import { matchers } from './matchers';

// custom jasmine matchers
beforeEach(() => jasmine.addMatchers(matchers));

// normal exports
export { stubPipe, niceEl } from './helpers';
export { By } from '@angular/platform-browser';
