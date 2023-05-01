import { GoogleSignin } from '@react-native-google-signin/google-signin';

const useGoogleLogin = () => {
  const login = async () => {
    GoogleSignin.configure({
      webClientId: '629397680151-ddanmmurphd401a47956hd5efi039s07.apps.googleusercontent.com',
      iosClientId: '629397680151-07imd6m10o7nm8f3cqii26hpdamj6sd1.apps.googleusercontent.com',
    });

    await logout();

    try {
      await GoogleSignin.hasPlayServices();
    } catch (error) {
      console.log('[GOOGLE PLAY SERVICE]', error);
    }

    try {
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.log('[GOOGLE SIGNIN]', error);
    }
  };
  const logout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch {
      console.log('[GOOGLE SIGNOUT]');
    }
  };

  return { login, logout };
};

export default useGoogleLogin;
