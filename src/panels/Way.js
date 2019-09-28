import React from 'react';
import connect from '@vkontakte/vk-connect';
import '@vkontakte/vkui/dist/vkui.css';
import {Panel, Group, PanelHeader, Div,
  FormLayout, Select, List, Cell, Button, CellButton, InfoRow, Separator,

  HeaderButton, ListItem, platform, IOS} from '@vkontakte/vkui';
import Icon24Camera from '@vkontakte/icons/dist/24/camera';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Icon24info from '@vkontakte/icons/dist/24/info';
import PropTypes from 'prop-types';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import Icon24Add from '@vkontakte/icons/dist/24/add';


const osname = platform();

class Way extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      props: props,
      draggingList: [2, 3, 1, 4, 5],
      removeList: ['Михаил Андриевский', 'Вадим Дорохов', 'Саша Колобов'],
      activePanel: 'way',
      lat: 0,
      long: 0,
      currentGeo: null,
      coordinates: null,
      activePanel: 'start',
    };



  };



  render(){
    return (
      <Panel id= "way">
      <PanelHeader
        left={<HeaderButton onClick={this.props.go} data-to="start">
          {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
        </HeaderButton>}>
        </PanelHeader>
               <Group description = "можно добавить описание тут" title="Информация о маршруте">
                  <List>
                  <Cell>
                    <InfoRow title="Мест для посещения">
                      10
                    </InfoRow>
                  </Cell>
                  <Cell>
                    <InfoRow title="Продолжительность">
                      1 ч 25 мин
                    </InfoRow>
                  </Cell>
                  <Cell>
                    <InfoRow title="Общее расстояние">
                      70 км
                    </InfoRow>
                  </Cell>
                </List>
              </Group>

              <Group title="Редактирование маршрута">
               <FormLayout>
                <Select top="Количество мест" placeholder="10">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </Select>
              </FormLayout>
                <CellButton before={<Icon24Add />} onClick={this.props.go} data-to="add">Добавить место</CellButton>
                <Separator style={{ margin: '12px 0' }} />
              <List>

              {this.state.removeList.length > 0 &&
                    <List>
                      {this.state.removeList.map((item, index) => (
                        <Cell key={item} removable draggable onRemove={() => {
                          this.setState({
                            removeList: [...this.state.removeList.slice(0, index), ...this.state.removeList.slice(index + 1)]
                          })
                        }} onDragFinish={({ from, to }) => {
                          const draggingList = [...this.state.draggingList];
                          draggingList.splice(from, 1);
                          draggingList.splice(to, 0, this.state.draggingList[from]);
                          this.setState({ draggingList });
                        }}
                        ><CellButton align = "left" before={<Icon24info  onClick={() => this.setState({ activeModal: 'first' }) } data-to="start"/>}>{item}</CellButton></Cell>

                      ))}
                    </List>

                }


              </List>
              </Group>
               <List>
               <CellButton expandable onClick={this.props.go} data-to="start">
                Вернуться обратно
                </CellButton>
                </List>
                <Button level="secondary" size="xl">Сбросить</Button>


                <Button size="xl">Завершить</Button>
                {this.props.player}
      </Panel>
    );
  }
}

Way.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};

export default Way;
