export default {
  main: {
    flex: 1,
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    width: '100%',
    borderColor: '#171717',
  },
  items: {
    backgroundColor: '#171717',
    flexGrow: 1,
    paddingVertical: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 0,
  },
  imageItems: {
    flexGrow: 3,
    resizeMode: 'cover',
    width: null,
    height: 150,
  },
  text: {
    color: 'white',
    fontSize: 25,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowColor: '#5A5A5A',
    textShadowRadius: 5,
    alignSelf: 'center',
    marginLeft: 0
  },
};
