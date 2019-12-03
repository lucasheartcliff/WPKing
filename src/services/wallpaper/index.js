import Wallpaper from 'rnwallpaper';

const setWallpaper = (image) => {
    const res = Wallpaper.setWallpaper(image,(result=>result));
    return res;
}

export default setWallpaper;