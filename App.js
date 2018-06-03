/**
 * Created by Max Kim
 * https://github.com/Goodbutnot2good
 */

import React, { Component } from 'react';
import { LayoutAnimation, StyleSheet, TouchableOpacity, Text, View, Dimensions } from 'react-native';

var colors = ["#000000", "#0000ff", "#00ffff", "#00ff00", "#ff00ff", "#ff0000", "#ffff00"]
//an array that saves the color sequence. This array will act as a "circular array"

//class used to hold data about each individual square in the grid
class Square extends Component {
  constructor(props) {
    super(props)
    this.state = {   
      index: 0      //index determines the color that the square will show. 
    };
    this.changeColor = this.changeColor.bind(this);    
  }

  //function to change color when pressed
  changeColor() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);  //fade animation
    this.setState({index: (this.state.index+1)%7})  //increment color in sequence. Use % to utilize circular array.
  }

  render() {
    return (    //utilize TouchableOpacity to act as square. Color is determined by state and "count" variable, which is passed in later on
      <TouchableOpacity
        onPress={this.changeColor}
        style={[styles.squareContainer, {backgroundColor: colors[(this.state.index+this.props.count)%7]}]}
      > 
        <Text></Text>
      </TouchableOpacity>
    );
  }
}


type Props = {};
export default class App extends Component<Props> {
  //function that will create squares. The initial color of each square is determined by "count" variable 
  createSquares() {
    const squares = [];
    for (var i=0; i<7; i++) {
      squares.push(<Square key={i} count={i}/>);
    }
    return squares;
  }

  render() {
    return (   //create 7 rows with 7 squares to create a 7x7 grid.
      <View style={styles.columnContainer}>
        <View style={styles.rowContainer}>
          {this.createSquares()}
        </View>
        <View style={styles.rowContainer}>
          {this.createSquares()}
        </View>
        <View style={styles.rowContainer}>
          {this.createSquares()}
        </View>
        <View style={styles.rowContainer}>
          {this.createSquares()}
        </View>
        <View style={styles.rowContainer}>
          {this.createSquares()}
        </View>
        <View style={styles.rowContainer}>
          {this.createSquares()}
        </View>
        <View style={styles.rowContainer}>
          {this.createSquares()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  columnContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  squareContainer: {   //7 x 7 grid of squares will fit perfectly into screen size
    width: Dimensions.get('window').width/7,
    height: Dimensions.get('window').height/7
  }
});
