import Ember from 'ember';

export default Ember.Controller.extend({
  progress: 0,
  actions: {
    didSelectFiles(data) {
      console.log(data);
      const storageRef = window.firebase.storage().ref();
      let file = data;
      var uploadTask = storageRef.child('images/' + file[0].name).put(file[0]);
      uploadTask.on(window.firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          this.set('progressText', `Upload is ${Math.round(progress * 100) / 100} % done`);
          this.set('progress', progress);
          switch (snapshot.state) {
            case window.firebase.storage.TaskState.PAUSED:
              this.set('status', 'Upload is paused');
              break;
            case window.firebase.storage.TaskState.RUNNING:
              this.set('status', 'Upload is running');
              break;
          }
        }, (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      }, () => {
        this.set('downloadURL', uploadTask.snapshot.downloadURL);
      });
    }
  }
});
