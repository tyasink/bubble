import React, { useState } from 'react';
import { Spinner, View } from 'native-base';
import FastImage from 'react-native-fast-image'
import authToken from '../lib/authToken';

export default function FullWidthImage({ uri, width, height, borderRadius }) {

    const [en, setEn] = useState(width || 0);
    const [boy, setBoy] = useState(height || 0);
    const [isLoading, setIsLoading] = useState(true);
    const [ratio, setRatio] = useState();

    const viewOnLayout = event => {
        //console.debug("viewOnLayout", event.nativeEvent);

        const w = event.nativeEvent.layout.width;
        setEn(w);
        setBoy(w * (ratio || 1));
    }

    const imageOnLoad = event => {
        //console.debug("imageOnLoad", event.nativeEvent);

        const temp = event.nativeEvent.height / event.nativeEvent.width;
        //console.log("temp=", temp);
        setRatio(temp);
        setBoy(en * temp);
        setIsLoading(false);
    }

    return (
        <View onLayout={viewOnLayout}>
            {isLoading && (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Spinner />
                </View>
            )}
            <FastImage
                source={{ uri }}
                style={{ width: en, height: isLoading ? 0 : boy, borderRadius: borderRadius || 0, borderColor: "lightgray", borderWidth: borderRadius ? 1 : 0 }}
                resizeMode={FastImage.resizeMode.stretch}
                onLoad={imageOnLoad}
            />
        </View>
    );
}