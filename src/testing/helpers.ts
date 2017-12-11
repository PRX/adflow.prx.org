import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

// nicely stringify a debug/native element
export function niceEl(el: DebugElement|any): string {
  if (el instanceof DebugElement) {
    el = el.nativeElement;
  }
  if (el.tagName) {
    let str = `<${el.tagName.toLowerCase()}`;
    for (let a of el.attributes) {
      if (a.name[0] !== '_') { str += ` ${a.name}=${a.value}`; }
    }
    str += '>';
    for (let n of el.childNodes) {
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
