import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

class GeralDetails extends Component {
    render() {
        return (
            <View
                style={{
                    width: '100%',
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.2)',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginBottom: 5,
                }}
            >
                <View>
                    <Icon name={this.props.iconName} />
                </View>

                <View justifyContent='center'>
                    <Text style={{
                      textAlign: 'center',
                      textAlignVertical: 'center'
                    }}>{this.props.text}</Text>
                </View>
            </View>
        );
    }
}

export default GeralDetails;
