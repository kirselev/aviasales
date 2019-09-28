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
        activePanel: 'finish'
      };



    };




    render(){
    return (

        <Panel id= "finish">
        <PanelHeader left={<HeaderButton onClick={this.props.go} data-to="way">
          {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
        </HeaderButton>}>
    			Aviasales
    		</PanelHeader>


        <Button size = 'xl'> Открыть в Яндекс.Картах</Button>
        </Panel>
    );
  }
}

export default Start;
