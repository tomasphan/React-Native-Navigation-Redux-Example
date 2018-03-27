import { Navigation } from 'react-native-navigation';
import Login from './login';
import Sessions from './Sessions';
import Attendees from './Attendees';
import Settings from './Settings';
import HomePage from './HomePage';
import AttendeeDetail from './AttendeeDetail';
import SessionDetail from './SessionDetail';
import Landing from './Landing';
import Locations from './Locations';

export default (store, Provider) => {
	Navigation.registerComponent('EventApp2.Login', () => Login, store, Provider);
	Navigation.registerComponent('EventApp2.Attendees', 
() => Attendees, store, Provider);
	Navigation.registerComponent('EventApp2.Sessions', () => Sessions, store, Provider);
	Navigation.registerComponent('EventApp2.Settings', () => Settings, store, Provider);
	Navigation.registerComponent('EventApp2.AttendeeDetail', 
	() => AttendeeDetail, store, Provider);
	Navigation.registerComponent('EventApp2.SessionDetail', 
	() => SessionDetail, store, Provider);
	Navigation.registerComponent('EventApp2.HomePage', 
	() => HomePage, store, Provider);
	Navigation.registerComponent('EventApp2.Landing', 
	() => Landing, store, Provider);
	Navigation.registerComponent('EventApp2.Locations', 
	() => Locations, store, Provider);
};
