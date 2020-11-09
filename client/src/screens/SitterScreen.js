import React from "react";
import { Body, Container, Content, H1, H3, Header, Text, Title } from "native-base";

export default function SitterScreen({ route, navigation }) {

    const { user } = route.params;

    return (
        <Container>
            <Content>
                <H3>TODO: implement sitter screen</H3>
                <Text></Text>
                <Text>{JSON.stringify(user)}</Text>
            </Content>
        </Container>
    );
}