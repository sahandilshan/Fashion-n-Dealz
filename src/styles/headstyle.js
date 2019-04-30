import { StyleSheet, Platform ,StatusBar} from 'react-native';
export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: "#D72020",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
});