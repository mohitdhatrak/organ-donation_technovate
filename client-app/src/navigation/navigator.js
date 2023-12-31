import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import Dashboard from '../screens/Dashboard';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import {Product} from '../screens/Product';
import {Cart} from '../screens/Cart';
import {Wishlist} from '../screens/Wishlist';
import Tutorial from '../screens/Onboarding';
import {Header} from '../components/Header';
import Menu from '../components/Menu';
import SideMenu from '@chakrahq/react-native-side-menu';
import {Category} from '../screens/Category';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faUser,
  faHeart,
  faMap,
  faMapMarked,
  faPlus,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';

import {
  faUser as faUserEmpty,
  faHeart as faHeartEmpty,
} from '@fortawesome/free-regular-svg-icons';

import {AuthStore} from '../store/auth';
import {observer} from 'mobx-react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNavigationContainerRef} from '@react-navigation/native';
import Profile from '../screens/Profile';
import Orders from '../screens/Orders';
import Order from '../screens/Order';
import MapPage from '../screens/Maps';
import DonorReq from '../screens/DonorReq';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const CartStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const navigationRef = createNavigationContainerRef();

const menu = <Menu navigationRef={navigationRef} />;

const HomeTabs = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Category" component={Category} />
    </HomeStack.Navigator>
  );
};

const CartTabs = () => {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Wishlist">
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Category" component={Category} />
    </CartStack.Navigator>
  );
};

const ProfileTabs = () => {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Wishlist">
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="Orders" component={Orders} />
    </CartStack.Navigator>
  );
};

const ConnectStack = createStackNavigator();

const ConnectScreen = () => {
  return (
    <View>
      {/* Your Connect Page UI and Logic */}
      <Text>This is the Connect Page</Text>
      {/* Add your button or navigation logic here */}
    </View>
  );
};

const ConnectStackScreen = () => {
  return (
    <ConnectStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ConnectStack.Screen name="DonorReq" component={DonorReq} />
      <ConnectStack.Screen name="Connect" component={ConnectScreen} />
    </ConnectStack.Navigator>
  );
};

const Tabs = ({navigation}) => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeTabs}
          options={{
            tabBarLabel: ({focused, color, size}) => (
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 10,
                }}>
                Home
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <>
                {focused ? (
                  <FontAwesomeIcon icon={faHome} />
                ) : (
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../../assets/icons/home.png')}
                  />
                )}
              </>
            ),
          }}
        />
        <Tab.Screen
          name="Connect"
          component={ConnectStackScreen} 
          options={{
            tabBarLabel: ({focused, color, size}) => (
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 10,
                }}>
                Connect
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon icon={focused ? faPlus : faPlusCircle} />
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapPage}
          options={{
            tabBarLabel: ({focused, color, size}) => (
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 10,
                }}>
                Maps
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon icon={focused ? faMap : faMapMarked} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileTabs}
          options={{
            tabBarLabel: ({focused, color, size}) => (
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 10,
                }}>
                Profile
              </Text>
            ),
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon icon={focused ? faUser : faUserEmpty} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export const Navigator = observer(() => {
  const [openMenu, setOpenMenu] = useState(false);

  const {
    state: {isAuthenticated},
  } = AuthStore;

  return (
    <>
      {isAuthenticated ? (
        <>
          <SideMenu menu={menu} isOpen={openMenu} autoClosing={true}>
            <Header setOpenMenu={setOpenMenu} navigationRef={navigationRef} />
            <NavigationContainer ref={navigationRef}>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
                initialRouteName="Main">
                <Stack.Screen name="Main" component={Tabs} />
              </Stack.Navigator>
            </NavigationContainer>
          </SideMenu>
        </>
      ) : (
        <>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName="Onboarding">
              <Stack.Screen name="Onboarding" component={Tutorial} />
              <Stack.Screen name="signup" component={Signup} />
              <Stack.Screen name="login" component={Login} />
            </Stack.Navigator>
          </NavigationContainer>
        </>
      )}
    </>
  );
});
