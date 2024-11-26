import {NativeBaseProvider} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Provider, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './SRC/Store/index';
import AppNavigator from './SRC/appNavigation';
import SplashScreen from './SRC/Screens/SplashScreen';
import {
  requestCameraPermission,
  requestLocationPermission,
  requestReadPermission,
  requestWritePermission,
} from './SRC/Utillity/utils';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <MainContainer />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

const MainContainer = () => {
  const dispatch = useDispatch();
  // firebase.initializeApp(servicesConfig);

  // fcm
  //  useEffect(() => {
  //      Notifications. ;
  //      // app opened
  //      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //          Notifications.postLocalNotification({
  //              title: remoteMessage.notification.title,
  //              body: remoteMessage.notification.body,
  //            });

  //            Notifications.events().registerNotificationOpened(
  //                (notification: Notification, completion) => {
  //                    if (remoteMessage?.data?.flag == "Chat") {
  //                        navigationService.navigate("ChatScreen", {
  //                            roomId: remoteMessage?.data?.roomId,
  //                          });
  //                        }
  //                        completion();
  //                      }
  //                    );
  //                  });

  //                  // app opened from background
  //                  messaging().onNotificationOpenedApp((remoteMessage) => {
  //                      if (remoteMessage?.data?.flag == "Chat") {
  //                          navigationService.navigate("ChatScreen", {
  //                              roomId: remoteMessage?.data?.roomId,
  //                            });
  //                          }
  //                        });

  //                        // when app is in quite state
  //                        messaging()
  //                          .getInitialNotification()
  //                          .then((remoteMessage) => {
  //                              if (remoteMessage) {
  //                                  if (remoteMessage?.data?.flag == "Chat") {
  //                                      navigationService.navigate("ChatScreen", {
  //                                          roomId: remoteMessage?.data?.roomId,
  //                                        });
  //                                      }
  //                                    }
  //                                  });

  //                                // Register background handler
  //                                messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //                                    console.log("Message handled in the background!", remoteMessage);
  //                                  });

  //                                  return unsubscribe;
  //                                }, []);
  // fcm ends

  // useEffect(() => {
  //     async function GetPermission() {
  //       await requestCameraPermission();
  //       await requestWritePermission();
  //       await requestLocationPermission();
  //       await requestReadPermission();
  //     await  requestUserPermission
  //   //  await   requestNotificationPermission()
  //       // await requestManagePermission();

  //     }
  //     console.log('>hererererer');
  //      messaging().getToken()
  //        .then((_token) => {
  //          console.log("🚀 ~mg here ================  .then ~ _token:", _token)
  //         //  dispatch(SetFCMToken(_token));
  //        })
  //        .catch(() => console.log("token error"));
  //     GetPermission();
  //   }, []);

  useEffect(() => {
    async function GetPermission() {
      await requestCameraPermission();
      await requestWritePermission();
      await requestLocationPermission();
      await requestReadPermission();
    }
    GetPermission();
    requestCameraPermission();
  }, []);

  const [isloading] = useloader(true);
  if (isloading == true) {
    return <SplashScreen />;
  }
  return <AppNavigator />;
};

const useloader = value => {
  const [isloading, setIsloading] = useState(value);
  const [loadingTime] = useState(2000);
  useEffect(() => {
    setTimeout(() => setIsloading(false), loadingTime);
  }, []);
  return [isloading];
};
export default App;
