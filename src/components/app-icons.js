import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// define your suffixes by yourself..
// here we use active, big, small, very-big..
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
    'ios-home': [30, '#3A8794'],
    'ios-home-outline': [30, '#3A8794'],

    'ios-map': [30, '#3A8794'],
    'ios-map-outline': [30, '#3A8794'],

    'ios-navigate': [30, '#3A8794'],
    'ios-navigate-outline': [30, '#3A8794'],

    'ios-person': [30, '#bbb'],
    'ios-person--big': [50, '#bbb'],

    'ios-contacts': [30, '#bbb'],
    'ios-contacts-outline': [30, '#bbb'],
    'ios-contacts-big': [50, '#bbb'],

    'ios-mic-outline': [30, '#fff'],
    'ios-mic': [30, '#fff'],
    'ios-mic-active--big': [50, '#fff'],
    'ios-mic-active--very-big': [100, '#fff'],

    'ios-people': [30, '#bbb'],
    'ios-people-outline': [30, '#bbb'],
    'ios-people-active': [30, '#fff'],

    'ios-settings': [30, '#bbb'],
    'ios-settings-outline': [30, '#bbb'],

    'ios-chatbubbles': [30, '#bbb'],
    'ios-chatbubbles-active': [30, '#fff'],

 
};

const defaultIconProvider = Ionicons;

const iconsMap = {};
const iconsLoaded = new Promise((resolve, reject) => {
    new Promise.all(
        Object.keys(icons).map(iconName => {
            const Provider = icons[iconName][2] || defaultIconProvider; // Ionicons
            return Provider.getImageSource(
                iconName.replace(replaceSuffixPattern, ''),
                icons[iconName][0],
                icons[iconName][1]
            );
        })
    ).then(sources => {
        Object.keys(icons)
            .forEach((iconName, idx) => iconsMap[iconName] = sources[idx])

        // Call resolve (and we are done)
        resolve(true);
    });
});

export {
    iconsMap,
    iconsLoaded
};
