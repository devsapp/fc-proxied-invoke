import { loadComponent } from '@serverless-devs/core';

export default class StdoutFormatter {
  static stdoutFormatter: any;

  static async initStdout() {
    this.stdoutFormatter = await loadComponent('devsapp/stdout-formatter');
  }
}
