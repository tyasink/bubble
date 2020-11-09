import { Body, Button, Container, Content, Form, Header, Input, Item, Label, Spinner, Text, Title } from 'native-base';
import React, { useState } from 'react';
import api from '../lib/api';

export default function LoginScreen({ loggedIn }) {

    const [isLoading, setIsLoading] = useState();
    const [username, setUsername] = useState(__DEV__ ? "janet.stevans@siliconrhino.io" : "");
    const [password, setPassword] = useState(__DEV__ ? "12345" : "");

    const login = async () => {
        if (!username) {
            alert("Please enter your username");
            return;
        }
        if (!password) {
            alert("Please enter your password");
            return;
        }

        const result = await api(setIsLoading).post("auth/local?web=0", { email: username, password });

        loggedIn(result.token);
    }

    return (
        <Container>
            <Header>
                <Body>
                    <Title>Login</Title>
                </Body>
            </Header>
            <Content padder>
                {isLoading ? <Spinner /> : (<>
                    <Form>
                        <Item stackedLabel>
                            <Label>Username</Label>
                            <Input value={username} onChangeText={setUsername} />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Password</Label>
                            <Input secureTextEntry value={password} onChangeText={setPassword} />
                        </Item>
                    </Form>
                    <Button block onPress={login} style={{ marginTop: 50 }}>
                        <Text>Login</Text>
                    </Button>
                </>)}
            </Content>
        </Container>
    );
}