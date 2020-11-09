import { Container, Content, ListItem, Spinner, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FormList } from '../components/FormComponents';
import FullWidthImage from '../components/FullWidthImage';
import api from '../lib/api';
import { genderToString } from '../lib/enums';

export default function HomeScreen() {

    const [isLoading, setIsLoading] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        setUser(await api(setIsLoading).get("api/User"));
    }

    if (isLoading) {
        return <Spinner />
    }

    if (!user) {
        return null;
    }

    return (
        <Container>
            <Content padder>
                <View style={{ width: "50%", alignSelf: "center" }}>
                    <FullWidthImage uri={user.profileImageUrl} borderRadius={100} />
                </View>
                <FormList dict={[
                    ["Name Surname", user.fullName],
                    ["E-Mail", user.email],
                    ["Mobile Number", user.mobileNumber],
                    ["About", user.biography],
                    ["Address", ["houseNo", "street", "town", "postcode"].map(x => user.address[x]).join(" ")],
                    ["Children", user.children.map((x, i) => (
                        <ListItem key={i} noBorder={i == user.children.length - 1}>
                            <Text>{genderToString(x.gender)} - {x.age} years old</Text>
                        </ListItem>
                    ))],
                    user.lastBookedSitter && ["Last Booked Sitter", (
                        <View style={{ justifyContent: "center" }}>
                            <View style={{ width: "25%" }}>
                                <FullWidthImage uri={user.lastBookedSitter.profileImageUrl} borderRadius={100} />
                            </View>
                            <Text>{user.lastBookedSitter.firstName} {user.lastBookedSitter.lastName}</Text>
                        </View>
                    )]
                ]} />
            </Content>
        </Container>
    );
}