export default {
  main: {
    flex: 1,
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    width: '100%',
    borderColor: '#171717',
  },
  order_main: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#08623F',
    borderBottomColor: '#171717',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,

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
  order_item: {
    backgroundColor: '#08623F',
    flexGrow: 1,
    paddingVertical: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 0,
  },
  order_title: {
    color: 'white',
    fontSize: 25,
  },
  order_subtitle: {
    color: 'white',
    fontSize: 18,
  },
  order_price: {
    color: 'white',
    fontSize: 25,
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
