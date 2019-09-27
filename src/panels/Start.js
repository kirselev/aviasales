import React from 'react';
import connect from '@vkontakte/vk-connect';
import '@vkontakte/vkui/dist/vkui.css';
import {Panel, Div, Group,Cell, PanelHeader, Button, List, ANDROID,
   View, FormLayout, Select, CellButton, Header, Switch, PopoutWrapper,
  HeaderButton, ListItem, platform, IOS, } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import PropTypes from 'prop-types';
import { YMaps, Map, Placemark } from 'react-yandex-maps';




const osname = platform();

function FormattedGeo(props) {
  return <Div> long: {props.data.long}, lat: {props.data.lat}. </Div>
}

class Start extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstEntry: true, // Решает баг с постоянно всплывающим предложением разрешить доступ к гео
        lat: 0,
        long: 0,
        currentGeo: null,
        coordinates: null,
        draggingList: [2, 3, 1, 4, 5],
        activePanel: 'start',
      };

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
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        10000
      );
    }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    tick() {
      connect.send("VKWebAppGetGeodata", {});
    }
    render(){
    return (
      <View activePanel={this.state.activePanel}>
        <Panel id= "start">
        <PanelHeader>
    			Время и Гео
    		</PanelHeader>
          <Group>
          <Header>
            Плейлисты
          </Header>


            {this.state.currentGeo && <YMaps>
              <Div>
                <Map defaultState={this.state.currentGeo}>
                  {this.state.coordinates.map(coordinate => (<Placemark geometry={coordinate} />))}
                </Map>
              </Div>
            </YMaps>}
          </Group>

          <List>
            <Cell asideContent={<Switch />}>
              Heatmap
            </Cell>

          <Cell expandable onClick={this.props.go} data-to="way">Построить маршрут</Cell>
          {this.props.player}
          </List>
          <Cell expandable onClick={this.props.go} data-to="modal">Открыть модальную страницу</Cell>


        </Panel>

			</View>

    );
  }
}

export default Start;
