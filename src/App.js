import React from 'react';
import connect from '@vkontakte/vkui-connect';
import '@vkontakte/vkui/dist/vkui.css';
import { ModalRoot, Panel, ListItem,ModalCard, List, Slider, Progress, HeaderButton, SelectMimicry, FixedLayout, Tabs, TabsItem, FormLayoutGroup, Cell, InfoRow, ModalPage, View, ModalPageHeader, Radio, Button, FormLayout, Group, Input, Checkbox, Div, Avatar, PanelHeader,  platform, IOS} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon56MoneyTransferOutline from '@vkontakte/icons/dist/56/money_transfer_outline';
import Icon56NotificationOutline from '@vkontakte/icons/dist/56/notification_outline';
import Sound from 'react-sound';
import Start from './panels/Start'
import songs from './panels/songs';


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
			currentSong: songs[0],
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


	/*componentDidMount() {
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
	}*/

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

		const modal = (
			<ModalRoot activeModal={this.state.activeModal}>
				<ModalPage
					id={MODAL_PAGE_MUSIC}
					onClose={this.modalBack}
					header={
						<ModalPageHeader
							left={IS_PLATFORM_ANDROID && <HeaderButton onClick={this.modalBack}><Icon24Cancel /></HeaderButton>}
							right={<HeaderButton onClick={this.modalBack}>{IS_PLATFORM_IOS ? 'Готово' : <Icon24Done />}</HeaderButton>}
						>
							Фильтры
						</ModalPageHeader>
					}
				>
				<Group title="Player">
					<Div>

						<Div>
							<InfoRow title={this.state.currentSong.title}>
								<Progress value={this.state.position/this.state.currentSong.duration * 100} />
							</InfoRow>
						</Div>
						<FormLayout>
							<Slider
								min={0}
								max={100}
								value={Number(this.state.volume)}
								onChange={value => this.setState({volume: value})}
								top="Volume"
							/>
						</FormLayout>
						<FormLayout>
							<Slider
								min={0}
								max={5}
								value={Number(this.state.playbackRate)}
								onChange={value => this.setState({playbackRate: value})}
								top="Playback Rate"
							/>
						</FormLayout>

					</Div>
				</Group>
				<Group title="Player">
					<Div>

						<Div>
							<InfoRow title={this.state.currentSong.title}>
								<Progress value={this.state.position/this.state.currentSong.duration * 100} />
							</InfoRow>
						</Div>
						<FormLayout>
							<Slider
								min={0}
								max={100}
								value={Number(this.state.volume)}
								onChange={value => this.setState({volume: value})}
								top="Volume"
							/>
						</FormLayout>
						<FormLayout>
							<Slider
								min={0}
								max={5}
								value={Number(this.state.playbackRate)}
								onChange={value => this.setState({playbackRate: value})}
								top="Playback Rate"
							/>
						</FormLayout>

					</Div>
				</Group>
				<Group title="Player">
					<Div>

						<Div>
							<InfoRow title={this.state.currentSong.title}>
								<Progress value={this.state.position/this.state.currentSong.duration * 100} />
							</InfoRow>
						</Div>
						<FormLayout>
							<Slider
								min={0}
								max={100}
								value={Number(this.state.volume)}
								onChange={value => this.setState({volume: value})}
								top="Volume"
							/>
						</FormLayout>
						<FormLayout>
							<Slider
								min={0}
								max={5}
								value={Number(this.state.playbackRate)}
								onChange={value => this.setState({playbackRate: value})}
								top="Playback Rate"
							/>
						</FormLayout>

					</Div>
				</Group>

				</ModalPage>
			</ModalRoot>
		);

		const audioPlayer = (
			<Group>
				<Div>
					{this.state.playStatus == Sound.status.PLAYING &&
						<Sound
							url={this.state.currentSong.url}
							playStatus={this.state.playStatus}
							position={this.state.position}
							volume={volume}
							playbackRate={playbackRate}
							loop={loop}
							onLoading={({ bytesLoaded, bytesTotal }) => console.log(`${bytesLoaded / bytesTotal * 100}% loaded`)}
							onLoad={() => console.log('Loaded')}
							onPlaying={({ position }) => this.setState({ position })}
							onFinishedPlaying={() => this.setState({ playStatus: Sound.status.STOPPED })}
						/>
					}
				</Div>
				<FixedLayout vertical="bottom">
					<Button size="xl" level="secondary" onClick={() => this.setActiveModal(MODAL_PAGE_MUSIC)}>
							Открыть модальную страницу
					</Button>
				</FixedLayout>
			</Group>
		);



		return (
			<View activePanel={this.state.activePanel} modal={modal}>
				<Start id="start" fetchedUser={this.state.fetchedUser} go={this.go} player={audioPlayer}/>
				<Way id="way" go={this.go} player={audioPlayer}/>
				<AddPlace id = "add" go={this.go}/>
				<Modal id = "modal" go={this.go}/>
			</View>
		);
	}
}

export default App;
