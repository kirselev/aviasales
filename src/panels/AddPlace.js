import React from 'react';
import connect from '@vkontakte/vk-connect';
import '@vkontakte/vkui/dist/vkui.css';
import {Panel, Div, Group,Cell, PanelHeader, Button, List, ANDROID,
   View, FormLayout, Select, CellButton, Header, Switch,Search, Avatar,
  HeaderButton, ListItem, platform, IOS, } from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import PropTypes from 'prop-types';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon24Search from '@vkontakte/icons/dist/24/search';
import Icon24Info from '@vkontakte/icons/dist/24/info';
import Icon24AddOutline from '@vkontakte/icons/dist/24/add_outline';

const osname = platform();


const thematics = [
  {id: 3201, name: "Аренда автомобилей"},
  {id: 3273, name: "Автотовары"},
  {id: 3205, name: "Автосалон"},
  {id: 3282, name: "Автосервис"},
  {id: 3283, name: "Услуги для автовладельцев"},
  {id: 3284, name: "Велосипеды"},
  {id: 3285, name: "Мотоциклы и другая мототехника"},
  {id: 3286, name: "Водный транспорт"},
  {id: 3287, name: "Автопроизводитель"},
  {id: 3288, name: "Автомойка"},
  {id: 3117, name: "Автошкола"},
  {id: 3118, name: "Детский сад"},
  {id: 3119, name: "Гимназия"},
  {id: 3120, name: "Колледж"},
  {id: 3121, name: "Лицей"},
  {id: 3122, name: "Техникум"},
  {id: 3123, name: "Университет"},
  {id: 3124, name: "Школа"},
  {id: 3125, name: "Институт"},
  {id: 3126, name: "Обучающие курсы"},
  {id: 3276, name: "Дополнительное образование"},
  {id: 3275, name: "Тренинг, семинар"},
  {id: 3127, name: "Танцевальная школа"}
];






const places = [


class SimpleSearch extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      search: '',
      activePanel: 'add',

    }
    this.onChange = this.onChange.bind(this);
  }

  onChange (search) { this.setState({ search }); }

  get thematics () {
    const search = this.state.search.toLowerCase();
    return places.filter(({title}) => title.toLowerCase().indexOf(search) > -1);
  }

  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader
          noShadow
          left={<HeaderButton onClick={this.props.go} data-to="way">
            {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
          </HeaderButton>}>
          Выбор тематики
        </PanelHeader>
        <Search value={this.state.search} onChange={this.onChange}/>
        {this.thematics.length > 0 &&
          <List>
            {this.thematics.map(thematic =>

              <Cell
                  size="l"
                  bottomContent={
                    <div style={{ display: 'flex' }}>
                      <Button size="m" onClick={this.props.go} data-to="way">Добавить</Button>
                      <Button size="m" level="secondary" style={{ marginLeft: 8 }} onClick={this.props.player}>Информация</Button>
                    </div>
                  }
                >
                  {thematic.title}</Cell>)}


          </List>
        }
      </Panel>
    );
  }
}


export default SimpleSearch;