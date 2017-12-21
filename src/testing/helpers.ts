import { DebugElement } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { MockHalDoc } from 'ngx-prx-styleguide';

// nicely stringify a debug/native element
export function niceEl(el: DebugElement|any): string {
  if (el instanceof DebugElement) {
    el = el.nativeElement;
  }
  if (el.tagName) {
    let str = `<${el.tagName.toLowerCase()}`;
    for (const a of el.attributes) {
      if (a.name[0] !== '_') { str += ` ${a.name}=${a.value}`; }
    }
    str += '>';
    for (const n of el.childNodes) {
      if (n.nodeType === 1) {
        str += niceEl(n);
      } else if (n.nodeType !== 8) {
        str += n.textContent.replace(/\r?\n|\r/g, '').trim();
      }
    }
    str += `</${el.tagName.toLowerCase()}>`;
    return str;
  } else {
    return `${el}`;
  }
}

export function stubPipe(name, transformFn?) {
  @Pipe({name: name})
  class TestStubPipe implements PipeTransform {
    transform(val: any): any {
      return transformFn ? transformFn(val) : `${val}`;
    }
  }
  return TestStubPipe;
}

export function makeModel(modelType: any, data?: any, parent?: any, mocks?: any) {
  const parentDoc = parent ? new MockHalDoc(parent) : null;
  const modelDoc = new MockHalDoc(data);

  if (mocks) {
    for (const mockItem in mocks) {
      if (mocks[mockItem] instanceof Array) {
        modelDoc.mockItems(`prx:${mockItem}`, mocks[mockItem]);
      } else {
        modelDoc.mock(`prx:${mockItem}`, mocks[mockItem]);
      }
    }
  }
  return new modelType(parentDoc, modelDoc);
}
