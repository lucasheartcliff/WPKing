import React from 'react';
import {AppRegistry} from 'react-native';
import setWallpaper from '../wallpaper';

const TASK_NAME = 'ChangeWallpaper';

const setBackgroundTask = ({timeout, imageList, index, setIndex}) => {
  AppRegistry.registerHeadlessTask(
    TASK_NAME,
    setInterval(async () => {
      // await setWallpaper(imageList[index]);
      // setIndex(
      //   index<imageList.length
      //   ? index+1
      //   :0
      // )
      console.log(Date.now());
    }, timeout),
  );
};

export default setBackgroundTask;
