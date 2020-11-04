import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    label:{
        color: '#8fa7b3',
        fontFamily: 'Nunito_600SemiBold',
        marginBottom: 8,
    },
    input:{
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#d3e2e6',
        borderRadius: 20,
        height: 56,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
    },
    title: {
        color: '#5c8599',
        fontSize: 24,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 32,
        paddingBottom: 24,
        borderBottomWidth: 0.8,
        borderBottomColor: '#D3E2E6'
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    nextButton: {
      backgroundColor: '#15c3d6',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      height: 56,
      marginTop: 32,
    },
  
    nextButtonText: {
      fontFamily: 'Nunito_800ExtraBold',
      fontSize: 16,
      color: '#FFF',
    },
    carroOnboarding:{
      position: 'absolute',
      width: 30,
      height: 4,
      left: '13%',
      top: '95%',
    },
    nextOnboarding: {
      backgroundColor: '#D1EDF2',
      borderRadius: 100,
      position: 'absolute',
      width: 56,
      height: 56,
      left: '75%',
      top: '90%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    nextOnboardingText: {
      fontFamily: 'Nunito_800ExtraBold',
      fontSize: 25,
      color: '#15B6D6',
    },
});

export default styles;