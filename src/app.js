import { Component } from 'react';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import registerScreens from './components/screens/screens';
import * as appActions from './actions/index';
import { iconsMap, iconsLoaded } from './components/app-icons';
//import store from './store';
import configureStore from './store';

const { store, persistor } = configureStore();
registerScreens(store, Provider);
export default class App extends Component {
  constructor(props) {
    super(props);
    
    store.subscribe(this.onStoreUpdate.bind(this));
    this.unsubscribe = store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(appActions.appInitialized());    
  }
 
  onStoreUpdate() {
      const { root } = store.getState().root;
      
       // handle a root change
      // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
      if (this.currentRoot !== root) {
        this.currentRoot = root;

        iconsLoaded.then(() => {
          this.startApp(root);
          });
          //persistor.purge();
      }
    }
    
  startApp(root) {
    switch (root) {
        case 'login':
          Navigation.startSingleScreenApp({
                    screen: {
                    screen: 'EventApp2.Login',
                    title: 'Welcome',
                    navigatorStyle: {}, 
                    navigatorButtons: {},
                    },
                   
                });
                return;
              
        case 'after-login':
            Navigation.startTabBasedApp({
                tabs: [
                    {
                    label: 'Sessions',
                    screen: 'EventApp2.Sessions',
                    icon: iconsMap['ios-mic-outline'],
                    selectedIcon: iconsMap['ios-mic'],
                    title: 'Sessions',
                    overrideBackPress: false,
                    navigatorStyle: {},
                    navigatorButtons: {
                        leftButtons: [
                            {
                              //title: 'logout', // for a textual button, provide the button title (label)
                              id: 'showmap', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                              testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
                              disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
                              disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
                              showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
                              buttonColor: '#3A8794', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
                              buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
                              buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
                            },
                            {
                              icon: iconsMap['ios-map-outline'], // for icon button, provide the local image asset name
                              id: 'maps' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                            }
                          ]
                    },
                    },
                    {
                    label: 'Attendees',
                    screen: 'EventApp2.Attendees',
                    icon: iconsMap['ios-contacts-outline'],
                    selectedIcon: iconsMap['ios-contacts'],
                    title: 'Attendees',
                    navigatorStyle: {}
 
                    },
                    {
                    label: 'Settings',
                    screen: 'EventApp2.Settings',
                    icon: iconsMap['ios-settings-outline'],
                    selectedIcon: iconsMap['ios-settings'],
                    title: 'Settings',
                    navigatorStyle: {},
                    navigatorButtons: {
                        rightButtons: [
                            {
                              title: 'Logout', // for a textual button, provide the button title (label)
                              id: 'logout2755', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                              testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
                              disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
                              disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
                              showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
                              buttonColor: '#3A8794', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
                              buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
                              buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
                            },
                            {
                              //icon: iconsMap['ios-settings-outline'], // for icon button, provide the local image asset name
                              id: 'add' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                            }
                          ]
                    },
     
                    },
                    {
                      label: 'Locations',
                      screen: 'EventApp2.Locations',
                      icon: iconsMap['ios-navigate-outline'],
                      selectedIcon: iconsMap['ios-navigate'],
                      title: 'Maps',
                      navigatorStyle: {}
   
                      },
                    
                ],
                tabsStyle: { 
                    tabBarButtonColor: '#008996', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
                    // tabBarSelectedButtonColor: '#ff9900', // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
                    // tabBarBackgroundColor: '#551A8B', // optional, change the background color of the tab bar
                    initialTabIndex: 0, // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
                  },
            });
            return;
            case 'Landing':
          Navigation.startSingleScreenApp({
                    screen: {
                    screen: 'EventApp2.Landing',
                    title: 'Home',
                    navigatorStyle: {}, 
                    },
                   
                });
            return;
          default: 
            console.log('Not Root Found');
        }
    }
}
