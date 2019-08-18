import React from 'react';
import TopBanner from 'components/TopBanner'
import { createStackNavigator } from 'react-navigation';
import ClassTabsNavigator from './ClassTabsNavigator';
import StudentProfileScreen from 'screens/TeacherScreens/ClassTabs/StudentProfileScreen';
import ClassEditScreen from 'screens/TeacherScreens/ClassTabs/ClassEditScreen';
import EvaluationPage from 'screens/Evaluation/EvaluationPage';
import strings from 'config/strings';

const ClassHeaderNavigator = createStackNavigator({
  CurrentClass: {
    screen: ClassTabsNavigator,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  StudentProfile: {
    screen: StudentProfileScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <TopBanner
          LeftIconName="angle-left"
          LeftOnPress={() => navigation.goBack()}
          Title={strings.StudentProfile}
        />
      )
    })
  },
  EvaluationPage: {
    screen: EvaluationPage,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  //Will lead to the edit class screen. If the user clicks the left back button, the changes
  //to the class should not be saved. If however the user clicks the check mark, the changes to
  //the class will be changed. (That still needs to be coded in)
  ClassEdit: {
    screen: ClassEditScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <TopBanner
          Title={strings.EditClass}
          RightTextName={strings.Done}
          RightOnPress={() => navigation.goBack()}
        />
      )
    })
  },
})


export default ClassHeaderNavigator;