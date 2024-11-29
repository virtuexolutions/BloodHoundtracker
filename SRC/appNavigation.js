import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Icon} from 'native-base';
import React, {useEffect} from 'react';
import {Linking, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import Color from './Assets/Utilities/Color';
import Drawer from './Drawer/Drawer';
import navigationService from './navigationService';
import ChangePassword from './Screens/ChangePassword';
import CreateGroup from './Screens/CreateGroup';
import CreatePost from './Screens/CreatePost';
import DetailScreen from './Screens/DetailsScreen';
import EditProfile from './Screens/EditProfile';
import EnterEmail from './Screens/EnterEmail';
import GroupDeatils from './Screens/GroupDeatils';
import Groups from './Screens/Groups';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import MediaPlayerScreen from './Screens/MediaPlayerScreen';
import MessageList from './Screens/MessageList';
import MessagesScreen from './Screens/MessagesScreen';
import NotificationsScreen from './Screens/NotificationsScreen';
import Numberverfication from './Screens/Numberverfication';
import PrivacyPolicy from './Screens/PrivacyPolicy';
import Profile from './Screens/Profile';
import ResetPassword from './Screens/ResetPassword';
import Settings from './Screens/Settings';
import Signup from './Screens/Signup';
import TermsAndConditions from './Screens/TermsAndConditions';
import {windowHeight, windowWidth} from './Utillity/utils';
import ViewAllScreen from './Screens/ViewAllScreen';

const AppNavigator = () => {
  const isGoalCreated = useSelector(state => state.authReducer.isGoalCreated);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const isVerified = useSelector(state => state.authReducer.isVerified);
  const token = useSelector(state => state.authReducer.token);
  const selectedRole = useSelector(state => state.commonReducer.selectedRole);

  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const linking = {
    prefixes: ['https://blood-hound.cstmpanel.com'], // Make sure this matches the URL you're sharing
    config: {
      screens: {
        HomeScreen: 'HomeScreen/:id', // Path to the screen where you want to navigate, with dynamic params (e.g. `id`)
      },
    },
  };

  const AppNavigatorContainer = () => {
    // const navigation = useNavigation();
    const firstScreen = token == null ? 'LoginScreen' : 'TabNavigation';

    // Linking.getInitialURL().then(url => {
    //   if (url) {
    //     // Parse the URL to get the params and navigate
    //     const route = url.replace(/.*?:\/\//g, ''); // Remove the scheme
    //     const routeParts = route.split('/'); // Split the URL into parts
    //     const id = routeParts[1]; // Get the id part from the URL

    //     // Perform navigation (assuming you're using React Navigation)
    //     if (id) {
    //       // Navigate to the specific screen using the extracted `id`
    //       navigation.navigate('TabNavigation', { id });
    //     }
    //   }
    // });
    // const navigation = useNavigation();

    // useEffect(() => {
    //   const handleDeepLink = async () => {
    //     const url = await Linking.getInitialURL(); // Get the URL that opened the app
    //     if (url) {
    //       // Parse the deep link URL and navigate to the correct screen
    //       const route = url.replace(/.*?:\/\//g, ''); // Remove scheme
    //       const routeParts = route.split('/');
    //       const id = routeParts[1]; // Get the ID part

    //       // Navigate to the Post screen with the ID
    //       if (id) {
    //         navigation.navigate('TabNavigation', {id}); // PostStack should navigate to the Post screen
    //       }
    //     }
    //   };

    //   handleDeepLink();
    // }, [navigation]);

    console.log('=========================================== >>>>', linking);

    return (
      <NavigationContainer
        ref={navigationService.navigationRef}
        linking={linking}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          screenOptions={{headerShown: false}}>
          <RootNav.Screen name="TabNavigation" component={TabNavigation} />
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="Signup" component={Signup} />
          <RootNav.Screen name="DetailScreen" component={DetailScreen} />
          <RootNav.Screen name="GroupDeatils" component={GroupDeatils} />
          <RootNav.Screen name="MessagesScreen" component={MessagesScreen} />
          <RootNav.Screen name="CreateGroup" component={CreateGroup} />
          <RootNav.Screen name="EnterEmail" component={EnterEmail} />
          <RootNav.Screen name="VerifyNumber" component={Numberverfication} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
          <RootNav.Screen name="EditProfile" component={EditProfile} />
          <RootNav.Screen name="MessageList" component={MessageList} />
          <RootNav.Screen
            name="ChangePasswordScreen"
            component={ChangePassword}
          />
          <RootNav.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <RootNav.Screen
            name="TermsAndConditions"
            component={TermsAndConditions}
          />
          <RootNav.Screen name="CreatePost" component={CreatePost} />
          <RootNav.Screen
            name="MediaPlayerScreen"
            component={MediaPlayerScreen}
          />
          <RootNav.Screen name="ViewAllScreen" component={ViewAllScreen} />
        </RootNav.Navigator>
      </NavigationContainer>
    );
  };
  return <AppNavigatorContainer />;
};

export const TabNavigation = () => {
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconName;
          let color = Color.white;
          let size = moderateScale(20, 0.3);
          let type = Ionicons;
          if (route.name === 'Settings') {
            iconName = focused ? 'tune' : 'tune';
            type = MaterialIcons;
            color = focused ? Color.themeColor : Color.white;
            size = focused ? moderateScale(25, 0.3) : moderateScale(20, 0.3);
          } else if (route.name === 'Groups') {
            iconName = focused ? 'search' : 'search';
            type = FontAwesome;
            color = focused ? Color.themeColor : Color.white;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route.name === 'HomeScreen') {
            iconName = focused ? 'home-outline' : 'home';
            type = Ionicons;
            color = focused ? Color.themeColor : Color.white;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route?.name == 'NotificationsScreen') {
            // size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
            // iconName = focused ? 'user-circle-o' : 'user-circle';
            // color = focused ? Color.themeColor : Color.white;
            // type = FontAwesome
            iconName = focused ? 'notifications-outline' : 'notifications';
            color = focused ? Color.themeColor : Color.white;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else {
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
            iconName = focused ? 'user-circle-o' : 'user-circle';
            color = focused ? Color.themeColor : Color.white;
            type = FontAwesome;
          }
          return focused ? (
            <View
              style={{
                width: moderateScale(80, 0.6),
                height: moderateScale(70, 0.5),
                backgroundColor: Color.themeColor,
                // borderRadius: moderateScale(80, 0.6),
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: moderateScale(6, 0.6),
                borderTopLeftRadius: moderateScale(40, 0.6),
                borderTopRightRadius: moderateScale(40, 0.6),
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: windowHeight * 0.07,
                  height: windowHeight * 0.07,
                  borderRadius: moderateScale(windowHeight * 0.08) / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name={iconName} as={type} color={color} size={size} />
              </View>
            </View>
          ) : (
            // <ReanimatedCurvedTabBar height={230} reactNaviagtionBar={true}   {...props} iconsArray={[...Array(ARRAY_LENGTH)].map((item, index) => (
            //   <View style={styles.icon}>
            //     <Text>{index + 1}</Text>
            //   </View>
            // ))}
            //   allowDropAnime={true} />
            <Icon name={iconName} as={type} color={color} size={size} />
          );

          // route.name == 'CreateNew' ? (
          //   <View
          //     style={{
          //       borderWidth: 5,
          //       borderColor: Color.lightGrey,
          //       height: moderateScale(60, 0.3),
          //       width: moderateScale(60, 0.3),
          //       borderRadius: moderateScale(30, 0.3),
          //       backgroundColor: '#16232B',
          //       justifyContent: 'center',
          //       alignItems: 'center',
          //       marginTop: moderateScale(-30, 0.3),
          //     }}>
          //     <Icon
          //       name={'plus'}
          //       as={type}
          //       color={Color.white}
          //       size={moderateScale(30, 0.3)}
          //     />
          //   </View>
          // ) : (
          //   <Icon name={iconName} as={type} color={color} size={size} />
          // );
        },
        tabBarBackground: () => (
          <View
            style={{
              backgroundColor: '#0000FE',
              height: moderateScale(50, 0.6),
              width: windowWidth,
            }}
          />
        ),
        tabBarShowLabel: false,
      })}>
      {/* <Tabs.Screen name={'MessageList'} component={MessageList} /> */}
      <Tabs.Screen name={'Settings'} component={Settings} />
      <Tabs.Screen name="Groups" component={Groups} />
      <Tabs.Screen name={'HomeScreen'} component={HomeScreen} />
      <Tabs.Screen
        name={'NotificationsScreen'}
        component={NotificationsScreen}
      />
      <Tabs.Screen name={'Profile'} component={Profile} />
    </Tabs.Navigator>
  );
};

export const MyDrawer = () => {
  const DrawerNavigation = createDrawerNavigator();
  const role = useSelector(state => state.authReducer.role);
  const firstScreen = 'HomeScreen';

  return (
    <DrawerNavigation.Navigator
      drawerContent={props => <Drawer {...props} />}
      initialRouteName={'TabNavigation'}
      screenOptions={{
        headerShown: false,
      }}>
      <DrawerNavigation.Screen
        name={'TabNavigation'}
        component={TabNavigation}
      />
      <DrawerNavigation.Screen name={'HomeScreen'} component={HomeScreen} />
    </DrawerNavigation.Navigator>
  );
};

export default AppNavigator;
