import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';
import MapsModal from '../../../../../screens/TabNavigator/cadastroEventos/MapsModal/index';

Enzyme.configure({adapter: new Adapter()});

it('renders correctly', () => {
  const tree = renderer.create(<MapsModal/>).toJSON();
  expect(tree).toMatchSnapshot();
});

jest.mock('react-native-maps', () => {                                           
  const React = require.requireActual('react');                                  
  const MapView = require.requireActual('react-native-maps');                    
                                                                                 
  class MockCallout extends React.Component {                                    
    render() {                                                                   
      return React.createElement('Callout', this.props, this.props.children);    
    }                                                                            
  }                                                                              
                                                                                 
  class MockMarker extends React.Component {                                     
    render() {                                                                   
      return React.createElement('Marker', this.props, this.props.children);     
    }                                                                            
  }                                                                              
                                                                                 
  class MockMapView extends React.Component {                                    
    render() {                                                                   
      return React.createElement('MapView', this.props, this.props.children);    
    }                                                                            
  }                                                                              
                                                                                 
  MockCallout.propTypes = MapView.Callout.propTypes;                             
  MockMarker.propTypes = MapView.Marker.propTypes;                               
  MockMapView.propTypes = MapView.propTypes;                                     
  MockMapView.Marker = MockMarker;                                               
  MockMapView.Callout = MockCallout;                                             
  return MockMapView;                                                            
}); 
