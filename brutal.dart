class _MyHomeState extends State<MyHome> {
  List<UploadJob>? _profilePictures = [];

  build(BuildContext context) {

    const profilePictureTile = new Material(
      color: Colors.transparent,
      child: new Column(

          crossAxisAlignment: CrossAxisAlignment.start,

          children: <Widget>[

            Text('Profile Picture',
                style: TextStyle(
                color: CupertinoColors.systemBlue,
                fontSize: 15.0,
            )),

            Padding(
              padding: EdgeInsets.only(bottom: 5.0),
            ),

            PictureUploadWidget(
              initialImages: _profilePictures,
              onPicturesChange: profilePictureCallback,
              buttonStyle: PictureUploadButtonStyle(),
              buttonText: 'Upload Picture',
              localization: PictureUploadLocalization(),
              settings: PictureUploadSettings(
                  // customDeleteFunction: ProfileController.deleteProfilePicture,
                  // customUploadFunction: RecipeController.uploadRecipePicture,
                  imageSource: ImageSourceExtended.askUser,
                  minImageCount: 0,
                  maxImageCount: 5,
                  imageManipulationSettings: const ImageManipulationSettings(
                      enableCropping: true, compressQuality: 75)),
              enabled: true,
            ),
          ],


      ),
    );

    return new Scaffold(
      body: Padding(
          padding: const EdgeInsets.fromLTRB(20, 100, 20, 50),
          child: Column(children: <Widget>[profilePictureTile])),
    );
  }

}
