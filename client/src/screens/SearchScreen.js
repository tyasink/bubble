import { Badge, Body, Container, Content, Left, ListItem, Right, Spinner, Text, Thumbnail, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { FormList } from '../components/FormComponents';
import FullWidthImage from '../components/FullWidthImage';
import api from '../lib/api';
import { genderToString } from '../lib/enums';

export default function SearchScreen({ navigation }) {

    const [isLoading, setIsLoading] = useState();
    const [list, setList] = useState([]);

    useEffect(() => {
        loadList();
    }, []);

    const loadList = async () => {
        setList(await api(setIsLoading).get("api/Search"));
    }

    const onSelect = x => {
        navigation.navigate('SitterScreen', { user: x });
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <FlatList
            data={list}
            keyExtractor={x => "" + x.id}
            renderItem={({ item: x }) => (
                <ListItem avatar onPress={() => onSelect(x)}>
                    <Left>
                        <Thumbnail source={{ uri: x.profileImageUrl }} />
                    </Left>
                    <Body>
                        <Text>{x.fullName}</Text>
                        <Text note>{x.biography}</Text>
                        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
                            {Object.keys(x.otherLanguagesSpoken.value).map(x => (
                                <Badge warning style={{ margin: 1 }}>
                                    <Text>{x}</Text>
                                </Badge>
                            ))}
                        </View>
                    </Body>
                    <Right>
                        <Text note>{x.distanceInKm} km</Text>
                        <Text note>£{x.hourlyRate}</Text>
                    </Right>
                </ListItem>
            )}
        />
    );
}