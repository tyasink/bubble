import { Button, Container, Content, Spinner, Text } from 'native-base';
import React, { useState } from 'react';
import authToken from '../lib/authToken';

export default function SettingsScreen() {

    const [isLoading, setIsLoading] = useState();

    if (isLoading) {
        return <Spinner />
    }

    return (
        <Container>
            <Content padder>
                <Button onPress={authToken.clear}>
                    <Text>Logout</Text>
                </Button>
            </Content>
        </Container>
    );
}