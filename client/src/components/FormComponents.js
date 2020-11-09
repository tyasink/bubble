import React, { Component } from "react";
import { TouchableOpacity, FlatList } from "react-native";
import { Text, Input, Button, Card, View, CardItem, Body, Right, Icon, ListItem, Spinner } from "native-base";
import debounce from 'lodash/debounce';

export class FormInput extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false };
    }

    componentDidMount() {
        this.save = debounce(this.save, 1000);
    }

    componentDidUpdate(prevProps) {
        if (this.props.onSave && prevProps.value !== this.props.value) {
            this.save();
        }
    }

    save = async () => {
        this.setState({ isLoading: true });
        await this.props.onSave(this.props.value);
        this.setState({ isLoading: false });
    }

    focus = () => { this.txt._root.blur(); this.txt._root.focus(); }

    render() {
        return (
            <>
                <Input {...this.props}
                    ref={x => this.txt = x}
                    style={{ ...this.props.style, textAlignVertical: "top" }}
                    placeholderTextColor={this.props.placeholderTextColor || "lightgray"}
                    numberOfLines={this.props.multiline ? 3 : 1}
                    returnKeyType="done"
                />
                {!!this.state.isLoading && (
                    <Icon name="cloud-upload-alt" type="FontAwesome5" style={{ position: "absolute", top: 0, right: 0 }} />
                )}
            </>
        );
    }
}

export const FormButton = ({ text, onPress, backgroundColor, icon }) => (
    <View style={{ margin: 16 }}>
        <Button rounded block onPress={onPress} style={{ backgroundColor }} >
            {!!icon && <Icon name={icon} type="FontAwesome5" />}
            {!!text && <Text>{text}</Text>}
        </Button>
    </View>
);

export const FormList = ({ dict }) => (
    <Card>
        {dict.filter(x => x).map((x, i) => (
            (x[0] === null || x[0] === undefined)
                ? <View key={i} style={{ alignSelf: "stretch", height: 16, backgroundColor: "gray" }} />
                : <TouchableOpacity key={i} disabled={!x[2]} onPress={x[2]}>
                    {!!x[0] && (
                        <CardItem header>
                            <Text style={{ fontWeight: "bold" }}>{x[0]}</Text>
                        </CardItem>
                    )}
                    {!!(x[1] || x[2]) && (
                        <CardItem bordered>
                            <Body style={{ alignItems: "stretch" }}>
                                {!x[1] && x[2]
                                    ? <Text style={{ color: "red", fontStyle: "italic" }}>Missing</Text>
                                    : (typeof (x[1]) === "string" || typeof (x[1]) === "number")
                                        ? <Text>{x[1]}</Text>
                                        : x[1]}
                            </Body>
                            {!!x[2] && (
                                <Right style={{ flex: 0, marginLeft: 10 }}>
                                    <Icon name="pen" type="FontAwesome5" />
                                </Right>
                            )}
                        </CardItem>
                    )}
                </TouchableOpacity>
        ))}
    </Card>
)

export const FormTable = ({ basliklar, satirlar, secildi, seciliMi }) => {

    const Th = (props) => <Text style={{ ...props.style, flex: 1, fontSize: 10, textAlign: "center", fontWeight: "bold" }}>{props.children}</Text>
    const Td = (props) => <Text style={{ ...props.style, flex: 1, fontSize: 14, textAlign: "center" }}>{props.children}</Text>
    const Tr = (props) => <ListItem style={{ ...props.style, flex: 1, backgroundColor: "white" }} {...props}>{props.children}</ListItem>

    return (
        <FlatList
            data={satirlar}
            keyExtractor={(x, i) => "" + i}
            stickyHeaderIndices={[0]}

            ListHeaderComponent={() => (
                <>
                    {
                        basliklar.map((baslik, i) => (
                            <Tr key={i}>
                                {baslik.map((x, i) => (
                                    <Th key={i}>
                                        {x}
                                    </Th>
                                ))}
                            </Tr>
                        ))
                    }
                </>
            )}
            renderItem={({ item: x, index: i }) => (
                <Tr onPress={() => secildi?.(x, i)} style={{ backgroundColor: seciliMi?.(x, i) ? "orange" : "white" }}>
                    {basliklar[0].map((_, i) => (
                        <Td style={{ fontWeight: i ? "normal" : "bold" }} key={i}>
                            {x[i]}
                        </Td>
                    ))}
                </Tr>
            )}
        />
    );
}

export const FormTableInline = ({ basliklar, satirlar }) => {

    const Th = (props) => <Text style={{ ...props.style, flex: 1, fontSize: 10, textAlign: "center", fontWeight: "bold" }}>{props.children}</Text>
    const Td = (props) => <Text style={{ ...props.style, flex: 1, fontSize: 14, textAlign: "center" }}>{props.children}</Text>
    const Tr = (props) => <View style={{ ...props.style, flex: 1, flexDirection: "row", backgroundColor: "white" }} {...props}>{props.children}</View>

    return (
        <>
            {basliklar.map((baslik, i) => (
                <Tr key={i}>
                    {baslik.map((x, i) => (
                        <Th key={i}>
                            {x}
                        </Th>
                    ))}
                </Tr>
            ))}
            {satirlar.map((x, i) => (
                <Tr key={i}>
                    {basliklar[0].map((_, i) => (
                        <Td key={i}>
                            {x[i]}
                        </Td>
                    ))}
                </Tr>
            ))}
        </>
    );
}

export const MaskSpinner = () => (
    <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center" }}>
        <Spinner />
    </View>
);