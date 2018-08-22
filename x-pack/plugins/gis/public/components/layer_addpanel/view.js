/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { XYZTMSSource } from '../../shared/layers/sources/xyz_tms_source';
import { EMSFileSource } from '../../shared/layers/sources/ems_file_source';
import {
  EuiAccordion,
  EuiText,
  EuiSpacer,
  EuiButton,
  EuiFlyout,
  EuiFlyoutBody,
  EuiButtonEmpty,
  EuiHorizontalRule,
  EuiFlyoutHeader,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyoutFooter,
  EuiTitle,
  EuiTextColor,
} from '@elastic/eui';

export class FlyOut extends React.Component {

  constructor() {
    super();
  }

  _addToMapBtn() {
    const { layerLoading, temporaryLayers, addAction } = this.props;
    const addToMapBtnText = 'Add to map';
    return (
      <EuiButton
        style={{ width: '10rem' }}
        disabled={!temporaryLayers || layerLoading}
        isLoading={layerLoading}
        iconType={temporaryLayers && !layerLoading ? 'check' : undefined}
        onClick={() => addAction()}
        fill
      >
        {addToMapBtnText}
      </EuiButton>
    );
  }

  _renderFlyout() {

    const editorProperties = {
      onPreviewSource: this.props.previewSource,
      dataSourcesMeta: this.props.dataSourcesMeta
    };
    const xyzTmsEditor = XYZTMSSource.renderEditor(editorProperties);
    const emsFileEditor = EMSFileSource.renderEditor(editorProperties);

    return (
      <EuiFlyout onClose={this.props.closeFlyout} style={{ maxWidth: 768 }}>
        <EuiFlyoutHeader>
          <EuiTitle size="l">
            <h2>Add layer</h2>
          </EuiTitle>
          <EuiSpacer size="m"/>
          <EuiTextColor color="subdued">
            <EuiText size="s">
              <p>Choose a source from one of the following options, then click Add to map to continue.</p>
            </EuiText>
          </EuiTextColor>
          <EuiSpacer/>
          <EuiHorizontalRule margin="none"/>
        </EuiFlyoutHeader>

        <EuiFlyoutBody style={{ paddingTop: 0 }}>
          <div>
            <EuiSpacer size="l"/>
            <EuiAccordion
              id="accordion2"
              buttonContent="From Elastic Maps Service"
              paddingSize="l"
            >
              {emsFileEditor}
            </EuiAccordion>
          </div>
          <div>
            <EuiSpacer size="l"/>
            <EuiAccordion
              id="accordion2"
              buttonContent="Tilemap service with XYZ url"
              paddingSize="l"
            >
              {xyzTmsEditor}
            </EuiAccordion>
          </div>
        </EuiFlyoutBody>

        <EuiFlyoutFooter>
          <EuiFlexGroup justifyContent="spaceBetween" responsive={false}>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                onClick={this.props.closeFlyout}
                flush="left"
              >
                Cancel
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              {this._addToMapBtn()}
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlyoutFooter>
      </EuiFlyout>
    );
  }

  render() {
    return (this.props.flyoutVisible) ? this._renderFlyout() : null;
  }
}