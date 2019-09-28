import React from 'react';
import connect from '@vkontakte/vk-connect';
import '@vkontakte/vkui/dist/vkui.css';
import {Panel, Group, PanelHeader,
  FormLayout, Select, List, Cell, CellButton, InfoRow, Separator,
ModalPage, ModalPageHeader, Avatar, ModalCard, Textarea, Button,
View, UsersStack, Input, Checkbox, ModalRoot, IS_PLATFORM_IOS, IS_PLATFORM_ANDROID,
FormLayoutGroup, SelectMimicry, Radio,
  HeaderButton, ListItem, platform, IOS} from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import PropTypes from 'prop-types';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon56MoneyTransferOutline from '@vkontakte/icons/dist/56/money_transfer_outline';
import Icon56NotificationOutline from '@vkontakte/icons/dist/56/notification_outline';
import Icon24Done from '@vkontakte/icons/dist/24/done';


const MODAL_PAGE_FILTERS = 'filters';
const MODAL_PAGE_COUNTRIES = 'countries';
const MODAL_PAGE_STORY_FEEDBACK = 'story-feedback';
const MODAL_PAGE_USER_INFO = 'user-info';

const MODAL_CARD_MONEY_SEND = 'first';
const MODAL_CARD_APP_TO_MENU = 'app-to-menu';
const MODAL_CARD_ABOUT = 'say-about';
const MODAL_CARD_NOTIFICATIONS = 'notifications';
const MODAL_CARD_CHAT_INVITE = 'chat-invite';

const osname = platform();

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeModal: null,
      modalHistory: []
    };


  }
  setActiveModal(activeModal) {
  activeModal = activeModal || null;
  let modalHistory = this.state.modalHistory ? [...this.state.modalHistory] : [];

  if (activeModal === null) {
    modalHistory = [];
  } else if (modalHistory.indexOf(activeModal) !== -1) {
    modalHistory = modalHistory.splice(0, modalHistory.indexOf(activeModal) + 1);
  } else {
    modalHistory.push(activeModal);
  }

  this.setState({
    activeModal,
    modalHistory
  });
}


  render() {
    const modal = (
      <ModalRoot activeModal={this.state.activeModal}>

        <ModalCard
          id={'first'}
          onClose={ () => this.setState({activeModal:null})}
          icon={<Icon56MoneyTransferOutline />}
          title="Отправляйте деньги друзьям, используя банковскую карту"
          caption="Номер карты получателя не нужен — он сам решит, куда зачислить средства."
          actions={[{
            title: 'Попробовать',
            type: 'primary',
            action: () => {
              this.setState({activeModal:'second'});
            }
          }]}
        >
        </ModalCard>
        <ModalCard
          id={'second'}
          onClose={ () => this.setState({activeModal:null})}
          icon={<Icon56MoneyTransferOutline />}
          title="Вторая карта"
          caption="Номер карты получателя не нужен — он сам решит, куда зачислить средства."
          actions={[{
            title: 'Попробовать',
            type: 'primary',
            action: () => {
              this.setState({activeModal:'first'});
            }
          }]}
        >
        </ModalCard>
      </ModalRoot>
    );

    return (
      <View activePanel='modal' modal={modal}>
        <Panel id= "modal">
          <PanelHeader> Salut </PanelHeader>
          <Group>
            <FormLayout>
              <Button size="xl" level="secondary"
                  onClick={() => this.setActiveModal(MODAL_CARD_MONEY_SEND)}>
                  Открыть модальные карточки
              </Button>
            </FormLayout>
          </Group>
        </Panel>
      </View>
    );
  }
}

export default Modal;
