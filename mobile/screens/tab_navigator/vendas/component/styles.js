export default {
  main: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
  },
  imageItems: {
    flexGrow: 3,
    resizeMode: 'cover',
    width: null,
    height: 120,
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'notoserif',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowColor: '#5A5A5A',
    textShadowRadius: 5,
    alignSelf: 'center',
    marginLeft: 0
  },
  items: {
    backgroundColor: '#5A5A5A',
    flexGrow: 1,
    paddingVertical: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  price: {
    fontSize: 25,
    color: 'green',
  },
};
