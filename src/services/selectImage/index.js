import ImagePicker from 'react-native-image-crop-picker';

const selectImage = () => {
    return (
        ImagePicker.openPicker({
            multiple: true
        }).then(images => images)
    )
}

export default selectImage;