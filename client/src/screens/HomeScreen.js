import { Container, Content, Spinner, Text } from 'native-base';
import React, { useState } from 'react';

export default function HomeScreen() {

    const [isLoading, setIsLoading] = useState();

    if (isLoading) {
        return <Spinner />
    }

    return (
        <Container>
            <Content padder>
                <Text>Home Screen</Text>
            </Content>
        </Container>
    );
}