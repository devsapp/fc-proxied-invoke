import * as _ from 'lodash';
import { InputProps } from '../../common/entity'
import logger from '../../common/logger';

export abstract class Component {
  private readonly access: string;
  private readonly appName: string;
  private readonly path: any;

  constructor(access: string, appName: string, path: any) {
    this.access = access;
    this.appName = appName;
    this.path = path;
  }

  abstract genComponentProp();

  genComponentInputs(componentName?: string, projectName?: string, args?: string, command?: string, customDomains?: any): InputProps {
    let props: any = this.genComponentProp();
    if(!_.isEmpty(customDomains)) {
      props.domainName = customDomains[0].domainName;
    }
    logger.debug(`props: ${props}`);
    const inputProps: InputProps = {
      props,
      appName: this.appName,
      project: {
        component: componentName,
        access: this.access,
        projectName: projectName
      },
      path: this.path,
    };

    if (!_.isNil(args)) {
      Object.assign(inputProps, { args });
    }
    if (!_.isNil(command)) {
      Object.assign(inputProps, { command });
    }

    logger.debug(`inputs of component: ${inputProps?.project?.component} generated: \n${JSON.stringify(inputProps, null, '  ')}`);
    return inputProps;
  }
}
