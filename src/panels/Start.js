import React from 'react';
import connect from '@vkontakte/vk-connect';
import '@vkontakte/vkui/dist/vkui.css';
import {Panel, Div, Group,Cell, PanelHeader, Button, List, ANDROID, Checkbox,
   View, FormLayout, Select, CellButton, Header, Switch, PopoutWrapper,
  HeaderButton, ListItem, platform, IOS, } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import PropTypes from 'prop-types';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import axios from 'axios'
import Mapmap from './Map';


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
        posts:[],
      };



    };
    componentDidMount() {
      axios.get('http://95.213.38.144:5002/get_places?user_id=137802991')
      .then(response => {
        console.log(response)
        this.props.setstate(this.props.groups,response.data)
      })

      .catch(error => {
        console.log(error)
      })
    }

    render(){
    return (
      <View activePanel={this.state.activePanel}>
        <Panel id= "start">
        <PanelHeader>
    			Aviasales
    		</PanelHeader>
          <Group title="Карты">

          <Cell>
            <Mapmap/>
          </Cell>


          <List>
            <Cell asideContent={<Switch />}>
              Heatmap
            </Cell>

          <Cell expandable onClick={this.props.go} data-to="way">Построить маршрут</Cell>
          </List>

          </Group>
          <Group title="Фильтры">
            <Checkbox>Парки</Checkbox>
            <Checkbox>Музеи </Checkbox>
            <Checkbox>Заведения </Checkbox>
            <Checkbox>Развлечения </Checkbox>
          </Group>
          {this.props.player}

        </Panel>

			</View>

    );
  }
}

export default Start;
