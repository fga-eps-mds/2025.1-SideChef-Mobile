import { useRef, useState } from 'react';
import { Animated, Easing, Image, Modal, Text, TouchableOpacity, View } from 'react-native';

export default function Login() {
    const [showOptions, setShowOptions] = useState(false);
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(50)).current;

    const openModal = () => {
        setShowOptions(true);
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 0,
                duration: 400,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            })
        ]).start();
    };

    const closeModal = () => {
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 50,
                duration: 400,
                useNativeDriver: true,
            })
        ]).start(() => setShowOptions(false));
    };

  return (

     <View
          style={{
            flex: 1,
            backgroundColor: '#D3D3D3',
          }}
            >
           
            <View style={{justifyContent: 'flex-start', alignItems: 'center', 
            paddingTop: 30,

            }}> 
<Image source={require('../assets/images/logoInteiro.png')} 
          style={{width: 200, height: 200 }}
          resizeMode='contain'
          /> 




    </View>
<View style={{justifyContent: 'flex-end', alignItems: 'center'}}> 
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000', marginTop: 150, marginHorizontal: 40, textAlign: 'center'}}>
            Falta pouco para iniciar a sua jornada na cozinha!
            </Text>
            <Text style={{fontSize: 18, fontWeight: 'light', color: '#000000', marginTop: 10, marginHorizontal: 40, textAlign: 'center'}}>
            Como deseja continuar?
            </Text>
    </View>    


<View style={{justifyContent: 'flex-end', alignItems: 'center'}}> 
    <TouchableOpacity onPress={() => console.log('Continuar com Google')} style={{flexDirection: 'row', backgroundColor: '#1E90FF', width: 300, height: 50, borderRadius: 10, justifyContent: 'flex-start', alignItems: 'center', marginTop: 20, paddingHorizontal: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
        <View style={{backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginRight: 10, borderRadius: 10, height: 30, width: 30}}>
        <Image style={{height: 20, width: 20}} source={require('../assets/images/Google.png')}/>
        </View>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFFFFF'}}>Continuar com o Google</Text>
    </TouchableOpacity>


    <TouchableOpacity onPress={openModal} style={{ backgroundColor: '#F5F5F5', width: 300, height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20, paddingHorizontal: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>Outras opções</Text>
    </TouchableOpacity>


    <TouchableOpacity onPress={() => console.log('Continuar sem login')}>
    <Text style={{fontSize: 16, fontWeight: 'light', color: '#A9A9A9', marginTop: 30, marginHorizontal: 40, textAlign: 'center'}}>
            Continuar sem salvar minhas receitas
            </Text>
    </TouchableOpacity>
</View> 
<Modal
  visible={showOptions}
  transparent={true}
  onRequestClose={closeModal}
>
  <TouchableOpacity onPress={closeModal} style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}} activeOpacity={1}>
    <Animated.View style={{
      backgroundColor: '#FFFFFF',
      width: '100%',
      height: 250,
      borderRadius: 10,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 20,
      bottom: 0,
      position: 'absolute',
      opacity: opacityAnim,
      transform: [{ translateY: translateYAnim }],
    }}>
      <Text style={{fontSize: 20}} >Como deseja continuar?</Text>
      <TouchableOpacity onPress={() => console.log('Facebook')} style={{flexDirection: 'row', backgroundColor: '#3b5998', width: 300, height: 50, borderRadius: 10, justifyContent: 'flex-start', alignItems: 'center', marginTop: 20, paddingHorizontal: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
        <View style={{backgroundColor: '#3b5998', justifyContent: 'center', alignItems: 'center', marginRight: 5, borderRadius: 10, height: 30, width: 30}}>
        <Image style={{height: 25, width: 25}} source={require('../assets/images/Facebook.png')}/>
        </View>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFFFFF'}}>Continuar com o Facebook</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 300, height: 50, marginTop: 20}}>  
        <TouchableOpacity onPress={() => console.log('Celular') } style={{ backgroundColor: '#FFFFFF', width: 140, height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>Celular</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Email') } style={{ backgroundColor: '#FFFFFF', width: 140, height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>Email</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  </TouchableOpacity>
</Modal>
</View>
  );
}
