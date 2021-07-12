import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
export interface ProfileSection {
  component: | React.ComponentType<RouteComponentProps<any>>
  | React.ComponentType<any>;
  profileSectionLabel: string;
}