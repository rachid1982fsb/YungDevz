import React, { Component } from "react";
import { ScrollView, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import StudentCard from "components/StudentCard";
import colors from "config/colors";
import studentImages from "config/studentImages"
import { Font } from 'expo';
import mapStateToCurrentClassProps from 'screens/TeacherScreens/helpers/mapStateToCurrentClassProps'
import QcParentScreen from "screens/QcParentScreen";

export class ClassMainScreen extends QcParentScreen {

  name = "ClassMainScreen";
  
  async componentDidMount() {
    super.componentDidMount();
    //This may not be the eventual right approach here.. but this is a current mitigation to the 
    // fact that we get an error about 'regular' font not loaded yet if we redirect to add class or edit class 
    // pages before explicitly loading the fonts. 
    // Todo: figure out a safer way to do this without having to hold the UI until the font is loaded.
    await Font.loadAsync({
      regular: require('assets/fonts/Montserrat-Regular.ttf'),
      light: require('assets/fonts/Montserrat-Light.ttf'),
      bold: require('assets/fonts/Montserrat-Bold.ttf'),
    });

    const { classId } = this.props;

    if (classId === -1) {
      this.props.navigation.push('AddClass');
    }
  }

  render() {
    const classId = this.props.classId;

    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.props.students}
          keyExtractor={(item) => item.name} // fix, should be item.id (add id to classes)
          renderItem={({ item }) => (
            <StudentCard
              key={item.id}
              studentName={item.name}
              background={colors.white}
              profilePic={studentImages.images[item.imageId]}
              currentAssignment={this.props.currentAssignments.byStudentId[item.id][0].name}
              onPress={() =>
                this.props.navigation.push("StudentProfile", {
                  studentId: item.id,
                  classId: classId
                })
              }
            />
          )}
        />
      </ScrollView>
    );
  }
}

//Styles for the entire container along with the top banner
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: colors.lightGrey,
    flex: 1
  },
  classTitle: {
    color: colors.primaryDark,
    fontSize: 25
  }
});

const mapStateToProps = (state) => {
  return mapStateToCurrentClassProps(state)
};

export default connect(mapStateToProps)(ClassMainScreen);
