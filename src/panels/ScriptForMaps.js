{this.state.currentGeo && <YMaps>
  <Div>
    <Map defaultState={this.state.currentGeo}>
      {this.state.coordinates.map(coordinate => (<Placemark geometry={coordinate} />))}
    </Map>
  </Div>
</YMaps>}
</Group>


componentDidMount() {
  connect.subscribe((e) => {
    switch (e.detail.type) {
      case 'VKWebAppGeodataResult':
        this.setState({
          lat: e.detail.data.lat,
          long: e.detail.data.long,
          firstEntry: false,
          currentGeo : { center: [e.detail.data.lat, e.detail.data.long], zoom: 15 },
          coordinates : [[e.detail.data.lat, e.detail.data.long]],

        });
        break;
      default:
        console.log("error");
    }
    connect.send("VKWebAppGetGeodata", {});
  });
}

<Cell size="l" > Инфор </Button>} key={thematic.id}><Button onClick={this.props.go} data-to="way"> info </Button></Cell>)}

/*<Cell size="l" asideContent={<Button onClick={this.props.player}> Инфор </Button>} key={thematic.id}><Button onClick={this.props.go} data-to="way">   {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>} {thematic.name} </Button></Cell>)}*/


/*{this.thematics.map(thematic => <Cell asideContent={ <div> <Button size = 'm'> <Icon24Add/> </Button> <Button size = 'm'><Icon24Info/></Button></div>} key={thematic.id}>{thematic.name}</Cell>)}*/
