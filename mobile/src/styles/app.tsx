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
    pageNumber: {
      position: 'absolute',
      top: '5.49%',
      marginBottom: 0,
      paddingBottom: 0,
      fontFamily: 'Nunito_800ExtraBold',
      fontSize: 12,
      lineHeight: 22,

      textAlign: 'right',
      width: '100%',
      color: 'rgba(92, 133, 153, 1)'
    },
    pageNumberInactive: {
      position: 'absolute',
      top: '5.49%',
      marginBottom: 0,
      paddingBottom: 0,
      fontFamily: 'Nunito_800ExtraBold',
      fontSize: 12,
      lineHeight: 22,

      textAlign: 'right',
      width: '100%',
      color: '#rgba(143, 167, 178, 1)'
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
    nextOnboarding: {
      backgroundColor: '#D1EDF2',
      borderRadius: 100,
      width: 56,
      height: 56,
      right: '10%',
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