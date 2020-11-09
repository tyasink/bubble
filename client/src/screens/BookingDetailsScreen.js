import React, { useEffect, useState } from "react";
import { Container, Content, H3, Spinner, Text } from "native-base";
import api from "../lib/api";

export default function BookingDetailsScreen({ route, navigation }) {

    const { booking: { id } } = route.params;

    const [isLoading, setIsLoading] = useState();
    const [booking, setBooking] = useState();

    useEffect(() => {
        loadBooking();
    }, [id]);

    const loadBooking = async () => {
        setBooking(await api(setIsLoading).get("api/booking/" + id));
    }

    if (isLoading) {
        return <Spinner />
    }

    if (!booking) return null;

    return (
        <Container>
            <Content>
                <H3>TODO: implement booking details screen</H3>
                <Text></Text>
                <Text>{JSON.stringify(booking)}</Text>
            </Content>
        </Container>
    );
}