import React from 'react';
import setWallpaper from '../wallpaper';
import BackgroundTask from 'react-native-background-task'

const TASK_NAME = 'ChangeWallpaper';

BackgroundTask.define(async () => {
  await console.log(Date.now())
  BackgroundTask.finish()
})
const checkStatus = async()=> {
  const status = await BackgroundTask.statusAsync()
  
  if (status.available) {
    // Everything's fine
    console.info('Granted', 'Your background task is running')
    return
  }
  
  const reason = status.unavailableReason
  if (reason === BackgroundTask.UNAVAILABLE_DENIED) {
    console.warn('Denied', 'Please enable background "Background App Refresh" for this app')
  } else if (reason === BackgroundTask.UNAVAILABLE_RESTRICTED) {
    console.warn('Restricted', 'Background tasks are restricted on your device')
  }
}
const setBackgroundTask = ({timeout, imageList, index, setIndex}) => {
  BackgroundTask.schedule({period:10})
  checkStatus()
};

export default setBackgroundTask;
