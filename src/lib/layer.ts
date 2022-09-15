import * as core from '@serverless-devs/core';
import path from 'path';
import logger from '../common/logger';

const { fse, loadComponent, unzip, lodash: _ } = core;

export const supportLayer = (runtime: string) => {
  return runtime.startsWith('nodejs') || runtime.startsWith('python');
}

export const genLayerCodeCachePath = (baseDir, serviceName, functionName) =>
  path.join(baseDir, '.s', 'opt', serviceName, functionName);

export async function loadLayer({
  credentials, region, layers, baseDir, runtime,
  serviceName, functionName,
}) {
  if (!supportLayer(runtime) || _.isEmpty(layers)) {
    logger.debug('Skip load layer');
    return;
  }
  const loadLayerVM = core.spinner('load layer...');
  try {
    const layerCodeCachePath = genLayerCodeCachePath(baseDir, serviceName, functionName);
    const cacheLayerListFilePath = path.join(layerCodeCachePath, '.cache-layer-list');
    try {
      const cacheLayerList = JSON.parse(fse.readFileSync(cacheLayerListFilePath, 'utf-8'));
      if (_.isEqual(cacheLayerList, cacheLayerList)) {
        logger.debug('Has cache, skip load layer');
        loadLayerVM.stop();
        return;
      }
    } catch (_ex) { /**/ }
  
    await downloadLayer(layerCodeCachePath, layers, credentials, region);
    await fse.writeFile(cacheLayerListFilePath, JSON.stringify(layers));
    loadLayerVM.stop();
  } catch (ex) {
    loadLayerVM.fail();
    throw ex;
  }
}

async function downloadLayer(layerCodeCachePath, layers, credentials, region) {
  fse.emptyDirSync(layerCodeCachePath);
  const fcLayer = await loadComponent('devsapp/fc-layer');
  const filters = [];
  for (const layerArn of layers) {
    const inputs = {
      credentials,
      props: { region, arn: layerArn }
    };
    const cachePath = await fcLayer.download(inputs);
    await unzip(cachePath, layerCodeCachePath, {
      filter: file => {
        if (filters.includes(file.path)) {
          return false;
        }
        filters.push(file.path);
        return true;
      },
    });
  }
}