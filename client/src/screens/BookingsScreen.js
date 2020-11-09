import { Badge, Body, H1, Left, ListItem, Right, Spinner, Text, Thumbnail, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, SectionList } from 'react-native';
import api from '../lib/api';

import 'moment';
import 'moment/locale/en-gb';
import moment from "moment";

export default function BookingsScreen({ navigation }) {

    const [isLoading, setIsLoading] = useState();
    const [bookings, setBookings] = useState();

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        setBookings(await api(setIsLoading).get("api/booking/activesummary"));
    }

    const onSelect = x => {
        navigation.navigate('BookingDetailsScreen', { booking: x });
    }

    if (isLoading) {
        return <Spinner />
    }

    if (!bookings) return null;

    return (
        <SectionList
            style={{padding: 16}}
            sections={[
                { title: "Requested Bookings", data: bookings.requestedBookings },
                { title: "Confirmed Bookings", data: bookings.confirmedBookings },
            ]}

            keyboardShouldPersistTaps={"always"}
            onScroll={() => Keyboard.dismiss()}

            stickySectionHeadersEnabled={true}
            keyExtractor={(item, index) => item + index}

            onRefresh={loadBookings}
            refreshing={!!isLoading}

            renderSectionHeader={({ section: { title } }) => (
                <H1>{title}</H1>
            )}

            renderSectionFooter={({ section }) => section.data.length == 0 && (
                <Text note style={{alignSelf: "center", marginVertical: 50, fontStyle: "italic"}}>
                    You don't have any {section.title.toLowerCase()}... 
                </Text>
            )}

            renderItem={({ item: x }) => (
                <ListItem avatar onPress={() => onSelect(x)}>
                    <Left>
                        <Thumbnail source={{ uri: x.imageUrl }} />
                    </Left>
                    <Body>
                        <Text>{x.otherUserFullName}</Text>
                        <Text note>{x.biography}</Text>
                    </Body>
                    <Right>
                        <Text note>{moment(x.scheduledStart).format("DD MMMM YYYY")}</Text>
                        <Text note>{moment.duration(x.scheduledDuration, "days").humanize()}</Text>
                    </Right>
                </ListItem>
            )}
        />
    );
}