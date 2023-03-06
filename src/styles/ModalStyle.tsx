import { StyleSheet } from 'react-native';
export const modalStyle = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalViewUno: {
        width: 350,
        height: 500,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalViewDos: {
        width: 350,
        height: 300,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalViewTres: {
        width: 350,
        height: 200,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    viewButton: {
        flexDirection: 'row',
    },
    buttonOpen: {
        backgroundColor: "#0788fa",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonClose: {
        position: 'absolute',
        padding: 10,
        left: 300,
        marginTop: 0
    },
    buttonImage: {
        backgroundColor: "#0788fa",
        borderRadius: 25,
        padding: 10,
        marginRight: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        marginLeft:5
    },
    modalText: {
        marginBottom: 15,
        color: 'black',
        fontWeight: 'bold'
    },
    textInputUno: {
        width: '100%',
        height: '30%',
        borderWidth: 1,
        borderRadius: 10
    },
    textInputDos: {
        width: '100%',
        height: '60%',
        borderWidth: 1,
        borderRadius: 10
    },
});