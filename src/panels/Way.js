import React from 'react';
import connect from '@vkontakte/vk-connect';
import '@vkontakte/vkui/dist/vkui.css';
import {Panel, Group, PanelHeader, Div, Tabs, TabsItem,
  FormLayout, Select, List, Cell, Button, CellButton, InfoRow, Separator,

  HeaderButton, ListItem, platform, IOS} from '@vkontakte/vkui';
import Icon24Camera from '@vkontakte/icons/dist/24/camera';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Icon24info from '@vkontakte/icons/dist/24/info';
import PropTypes from 'prop-types';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import Icon24Add from '@vkontakte/icons/dist/24/add';
const MODAL_PAGE_MUSIC = 'music';


const osname = platform();

class Way extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      props: props,
      draggingList: this.props.groups,
      removeList: ['Михаил Андриевский', 'Вадим Дорохов', 'Саша Колобов'],
      activePanel: 'way',
      lat: 0,
      long: 0,
      currentGeo: null,
      coordinates: null,
      /*activeModal: 'start',*/
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
                <Group style={{ marginTop: 60 }}>
                <Tabs theme="light">
                  <TabsItem
                    onClick={() => this.setState({ activeTab4: 'dial' })}
                    selected={this.state.activeTab4 === 'dial'}
                  >
                    Диалоги
                  </TabsItem>
                  <TabsItem
                    onClick={() => this.setState({ activeTab4: 'messages' })}
                    selected={this.state.activeTab4 === 'messages'}
                  >
                    Сообщения
                  </TabsItem>
                  <TabsItem
                    onClick={() => this.setState({ activeTab4: 'unread' })}
                    selected={this.state.activeTab4 === 'unread'}
                  >
                    Непрочитанные
                  </TabsItem>
                </Tabs>
              </Group>








              <Group title="Редактирование маршрута">
               
                <CellButton before={<Icon24Add />} onClick={this.props.go} data-to="add">Добавить место</CellButton>
                <Separator style={{ margin: '12px 0' }} />
              <List>

              {this.props.groups.length > 0 &&
                    <List>
                      {this.props.groups.map((item, index) => (
                        <Cell key={item} removable draggable onRemove={() => {
                          this.props.setstate([...this.state.draggingList.slice(0, index), ...this.state.draggingList.slice(index + 1)])
                        }} onDragFinish={({ from, to }) => {
                          const draggingList = [...this.props.groups];
                          draggingList.splice(from, 1);
                          draggingList.splice(to, 0, this.props.groups[from]);
                          this.props.setstate(draggingList);
                        }}
                        >


                          <CellButton align = "left" before={<Icon24info/>} onClick={this.props.player}>
                            {item}
                          </CellButton>
                        </Cell>

                      ))}
                    </List>

                }



              </List>
              </Group>

              <Button level="secondary" size="xl">Сбросить</Button>


                <Button size="xl" onClick={this.props.go} data-to="finish">Завершить</Button>
      </Panel>
    );
  }
}

Way.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};

export default Way;
