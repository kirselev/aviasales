import React from 'react';
import connect from '@vkontakte/vkui-connect';
import '@vkontakte/vkui/dist/vkui.css';
import { ModalRoot, Panel, ListItem, List, Slider, Progress, HeaderButton, SelectMimicry, FixedLayout, Tabs, TabsItem, FormLayoutGroup, Cell, InfoRow, ModalPage, View, ModalPageHeader, Radio, Button, FormLayout, Group, Input, Checkbox, Div, Avatar, PanelHeader,  platform, IOS} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Sound from 'react-sound';
import Start from './panels/Start'


import Maps from './panels/Maps';
import Way from './panels/Way';
import AddPlace from './panels/AddPlace';
import Modal from './panels/Modal';

const MODAL_PAGE_MUSIC = 'music';

const osname = platform();
const IS_PLATFORM_ANDROID = osname != IOS;
const IS_PLATFORM_IOS = osname != IOS;

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'start',
			fetchedUser: null,
			activeModal: null,
			modalHistory: [],
			position: 0,
			volume: 100,
			playbackRate: 1,
			loop: false,
			playStatus: Sound.status.PAUSED,
		};

		this.modalBack = (e) => {
			this.setActiveModal(this.state.modalHistory[this.state.modalHistory.length - 2]);
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
	};


	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	getStatusText() {
		switch (this.state.playStatus) {
			case Sound.status.PLAYING:
				return 'playing';
			case Sound.status.PAUSED:
				return 'paused';
			case Sound.status.STOPPED:
				return 'stopped';
			default:
				return '(unknown)';
		}
	}

	handleSongSelected = (song) => {
    this.setState({ currentSong: song, position: 0});
  }

  renderCurrentSong() {
    return (
      <p>
        Current song {this.state.currentSong.title}. Song is {this.getStatusText()}
      </p>
    );
  }

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {

		const { volume, playbackRate, loop } = this.state;




		return (
			<View activePanel={this.state.activePanel}>
				<Start id="start" fetchedUser={this.state.fetchedUser} go={this.go}/>
				<Way id="way" go={this.go} />
				<AddPlace id = "add" go={this.go}/>
				<Modal id = "modal" go={this.go}/>

			</View>
		);
	}
}

export default App;
