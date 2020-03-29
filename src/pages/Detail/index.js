import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';

import logoImg from '../../assets/logo.png';
import styles from './styles';

import * as MailComposer from 'expo-mail-composer';

export default function Detail({ navigation, route }) {
    const incident = route.params.incident;
    
    const message = `Olá ${incident.name}, estou entrando em contato pois 
    gostaria de ajudar no caso "${incident.title}" com o valor de 
    ${Intl.NumberFormat({
        style: 'currency',
        currency: 'BRL'
    }).format(incident.value)}.`;

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        });
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=140${incident.whatsapp}
        &text=${message}`);
    }
    
    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image source={logoImg} />

           <TouchableOpacity onPress={() => navigation.goBack()}>
               <Feather name="arrow-left" size={28} color="#E82041" />
               </ TouchableOpacity> 
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}
                </Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat({
                    style: 'currency',
                    currency: 'BRL'
                }).format(incident.value)}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o heroi desse caso</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                    <Text style={styles.actionText}>Whatsapp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.action} onPress={sendMail}>
                    <Text style={styles.actionText}>E-mail</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}