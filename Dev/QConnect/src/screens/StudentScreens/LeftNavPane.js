//This will be the actual drawer items that will display from the student side when the click on
//the hamburger icon
import React from "react";
import { View, FlatList, ScrollView, StyleSheet } from "react-native";
import colors from "config/colors";
import classImages from "config/classImages";
import { SafeAreaView } from "react-navigation";
import QcAppBanner from "components/QcAppBanner";
import QcDrawerItem from "components/QcDrawerItem";
import studentImages from "config/studentImages";
import strings from 'config/strings';
import QcParentScreen from "screens/QcParentScreen";
import { saveStudentInfo } from "model/actions/saveStudentInfo";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

class LeftNavPane extends QcParentScreen {
    name = "LeftNavPane";

    openClass = (id, className) => {
        //update current class index in redux
        this.props.saveStudentInfo(
            { currentClassID: id }
        );

        //navigate to the selected class
        this.props.navigation.push("CurrentClass");
        this.props.navigation.closeDrawer();
    };

    //todo: change the ListItem header and footer below to the shared drawer component intead
    //generalize the QcDrawerItem to accept either an image or an icon
    render() {
        const { classes, name, imageId } = this.props;

        const profileCaption = name + strings.sProfile
        const studentImageId = imageId;

        return (
            <ScrollView style={{ flex: 1, backgroundColor: colors.lightGrey }}>
                <SafeAreaView
                    style={styles.container}
                    forceInset={{ top: "always", horizontal: "never" }}
                >
                    <View
                        style={{
                            padding: 10,
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <QcAppBanner />
                    </View>

                    <QcDrawerItem
                        title={profileCaption}
                        image={studentImages.images[studentImageId]}
                        onPress={() => this.props.navigation.push("StudentProfileScreen")}
                    />

                    <FlatList
                        data={classes}
                        keyExtractor={(item, index) => item.name} // fix, should be item.id (add id to classes)
                        renderItem={({ item, index }) => (
                            <QcDrawerItem
                                title={item.name}
                                image={classImages.images[item.imageId]}
                                onPress={() => this.openClass(item.id, item.name)}
                            />
                        )} />

                    <QcDrawerItem
                        title={strings.JoinClass}
                        icon="plus"
                        onPress={() => this.props.navigation.push("JoinClass")} />

                    <QcDrawerItem
                        title={strings.Settings}
                        icon="cogs"
                        onPress={() => this.props.navigation.push("Settings")} />

                </SafeAreaView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const getStudentClasses = (classIds, classes) => {
    return Object.values(classes).filter(c => classIds.includes(c.id))
}

const mapStateToProps = state => {
    const { name, imageId, currentClassID } = state.data.student;
    const classes = getStudentClasses(state.data.student.classes, state.data.classes);

    return { classes, name, imageId, currentClassID };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        saveStudentInfo
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavPane);
